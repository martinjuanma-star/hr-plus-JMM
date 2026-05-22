const CATEGORY_QUERIES = {
  "beneficios":          { q: "employee benefits wellness mental health workplace", lang: "es", qEn: "employee benefits wellness mental health" },
  "marca-empleadora":    { q: "employer branding marca empleadora EVP talento", lang: "es", qEn: "employer branding employee value proposition" },
  "people-experience":   { q: "employee experience onboarding engagement recursos humanos", lang: "es", qEn: "employee experience onboarding engagement" },
  "compensaciones":      { q: "compensación salarial transparencia salarial pay equity", lang: "es", qEn: "salary transparency pay equity compensation" },
  "payroll":             { q: "liquidación sueldos nómina payroll Argentina", lang: "es", qEn: "payroll automation salary management" },
  "desarrollo":          { q: "capacitación upskilling liderazgo desarrollo organizacional", lang: "es", qEn: "employee training upskilling leadership development" },
  "cultura":             { q: "cultura organizacional diversidad inclusión DEI clima laboral", lang: "es", qEn: "organizational culture diversity inclusion DEI" },
  "talent":              { q: "reclutamiento selección talento recursos humanos Argentina", lang: "es", qEn: "talent acquisition recruitment hiring" },
  "indicadores":         { q: "people analytics métricas RRHH KPI recursos humanos", lang: "es", qEn: "people analytics HR metrics workforce data" },
  "hr-tech":             { q: "inteligencia artificial RRHH tecnología recursos humanos HR tech", lang: "es", qEn: "HR technology artificial intelligence HRIS automation" },
  "change-management":   { q: "gestión del cambio transformación organizacional liderazgo", lang: "es", qEn: "change management organizational transformation" },
  "relaciones-laborales":{ q: "relaciones laborales paritarias sindicato Argentina derecho laboral", lang: "es", qEn: "labor relations employment law Argentina" },
  "prompts-hr":          { q: "inteligencia artificial ChatGPT recursos humanos automatización", lang: "es", qEn: "AI ChatGPT HR automation prompts" },
};

const SOURCES_BY_CATEGORY = {
  "relaciones-laborales": "infobae.com,cronista.com,iprofesional.com,lanacion.com.ar",
  "default": "shrm.org,hbr.org,forbes.com,infobae.com,cronista.com,iprofesional.com,lanacion.com.ar"
};

function cleanText(str) {
  if (!str) return "";
  return str.replace(/\[.*?\]/g, "").replace(/<[^>]+>/g, "").trim();
}

function getSourceName(url) {
  try {
    const host = new URL(url).hostname.replace("www.", "");
    const names = {
      "shrm.org": "SHRM",
      "hbr.org": "Harvard Business Review",
      "forbes.com": "Forbes",
      "infobae.com": "Infobae",
      "lanacion.com.ar": "La Nacion",
      "cronista.com": "Cronista",
      "iprofesional.com": "iProfesional",
      "mckinsey.com": "McKinsey",
      "gallup.com": "Gallup",
      "deloitte.com": "Deloitte",
      "aihr.com": "AIHR",
      "joshbersin.com": "Josh Bersin",
      "sloanreview.mit.edu": "MIT Sloan",
      "mercer.com": "Mercer",
      "adrha.org.ar": "ADRHA",
    };
    return names[host] || host;
  } catch { return "Fuente"; }
}

export default async function handler(req, res) {
  const category = req.query?.category || "beneficios";
  const type = req.query?.type || "news";
  const newsApiKey = process.env.NEWS_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "s-maxage=7200, stale-while-revalidate=14400");

  // IPC — use Claude for INDEC data
  if (type === "ipc") {
    if (!anthropicKey) return res.status(500).json({ success: false, error: "No API key", ipc: null });
    try {
      const today = new Date().toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" });
      const prompt = `Eres experto en estadísticas argentinas. Hoy es ${today}. Dame los últimos datos oficiales del IPC de Argentina publicados por INDEC. Responde SOLO con JSON válido sin texto adicional:\n{"mes":"abril 2026","variacion_mensual":"X.X%","variacion_interanual":"XX.X%","variacion_acumulada":"XX.X%","url_indec":"https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31","nota":"aclaración si aplica"}`;
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": anthropicKey, "anthropic-version": "2023-06-01" },
        body: JSON.stringify({ model: "claude-haiku-4-5-20251001", max_tokens: 500, system: "Responde SOLO con JSON válido.", messages: [{ role: "user", content: prompt }] })
      });
      const d = await r.json();
      const text = d.content?.find(b => b.type === "text")?.text || "{}";
      const ipc = JSON.parse(text.replace(/```json|```/g, "").trim());
      return res.status(200).json({ success: true, ipc });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message, ipc: null });
    }
  }

  if (!newsApiKey) return res.status(500).json({ success: false, error: "NEWS_API_KEY not configured", news: [] });

  try {
    const catConfig = CATEGORY_QUERIES[category] || CATEGORY_QUERIES["beneficios"];
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);
    const from = thirtyDaysAgo.toISOString().split("T")[0];

    // Try Spanish first, then English
    const queries = [
      { q: catConfig.q, language: "es" },
      { q: catConfig.qEn, language: "en" }
    ];

    let allArticles = [];

    for (const query of queries) {
      if (allArticles.length >= 5) break;
      try {
        const params = new URLSearchParams({
          q: query.q,
          language: query.language,
          from,
          sortBy: "relevancy",
          pageSize: "10",
          apiKey: newsApiKey
        });
        const response = await fetch(`https://newsapi.org/v2/everything?${params}`);
        if (!response.ok) continue;
        const data = await response.json();
        if (data.status !== "ok" || !data.articles) continue;

        const filtered = data.articles.filter(a =>
          a.url &&
          !a.url.includes("removed") &&
          a.title &&
          a.title !== "[Removed]" &&
          a.description &&
          a.description !== "[Removed]"
        );
        allArticles = [...allArticles, ...filtered];
      } catch (e) {}
    }

    if (allArticles.length === 0) {
      return res.status(404).json({ success: false, error: "No articles found", news: [] });
    }

    // Deduplicate and take top 5
    const seen = new Set();
    const unique = allArticles.filter(a => {
      if (seen.has(a.url)) return false;
      seen.add(a.url);
      return true;
    }).slice(0, 5);

    const news = unique.map((article, i) => ({
      id: `news-${category}-${i}-${Date.now()}`,
      rank: i + 1,
      title: cleanText(article.title),
      summary: cleanText(article.description || article.content || ""),
      source: article.source?.name || getSourceName(article.url),
      url: article.url,
      date: article.publishedAt ? article.publishedAt.split("T")[0] : new Date().toISOString().split("T")[0],
      isLive: true,
      image: article.urlToImage || null,
      idioma: article.language === "es" ? "español" : "inglés"
    }));

    return res.status(200).json({
      success: true,
      news,
      category,
      updatedAt: today.toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })
    });

  } catch (err) {
    return res.status(500).json({ success: false, error: err.message, news: [], category });
  }
}
