const CATEGORY_QUERIES = {
  "beneficios":           "employee benefits wellness mental health workplace flexible benefits",
  "marca-empleadora":     "employer branding employee value proposition EVP talent attraction",
  "people-experience":    "employee experience onboarding offboarding engagement lifecycle",
  "compensaciones":       "salary transparency pay equity compensation total rewards gender pay gap",
  "payroll":              "payroll automation salary management nómina compliance",
  "desarrollo":           "employee training upskilling reskilling leadership development learning",
  "cultura":              "organizational culture diversity inclusion DEI psychological safety",
  "talent":               "talent acquisition recruitment hiring candidate experience workforce",
  "indicadores":          "people analytics HR metrics KPI dashboard workforce data",
  "hr-tech":              "HR technology artificial intelligence HRIS automation HCM",
  "change-management":    "change management organizational transformation leadership restructuring",
  "relaciones-laborales": "labor relations employment law Argentina workers rights union",
  "prompts-hr":           "AI ChatGPT HR automation prompts generative AI human resources",
};

const CATEGORY_LABELS = {
  "beneficios":           "Beneficios",
  "marca-empleadora":     "Marca Empleadora",
  "people-experience":    "People Experience",
  "compensaciones":       "Compensaciones",
  "payroll":              "Payroll",
  "desarrollo":           "Desarrollo",
  "cultura":              "Cultura",
  "talent":               "Talent y Adquisicion",
  "indicadores":          "Indicadores y Dashboards",
  "hr-tech":              "HR Technology e IA",
  "change-management":    "Change Management",
  "relaciones-laborales": "Relaciones Laborales",
  "prompts-hr":           "Prompts para HR",
};

function cleanText(str) {
  if (!str) return "";
  return str.replace(/\[.*?\]/g, "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().slice(0, 600);
}

async function fetchNewsAPI(query, newsApiKey) {
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);
  const from = thirtyDaysAgo.toISOString().split("T")[0];

  const params = new URLSearchParams({
    q: query,
    from,
    sortBy: "relevancy",
    pageSize: "10",
    language: "en",
    apiKey: newsApiKey
  });

  const response = await fetch(`https://newsapi.org/v2/everything?${params}`);
  if (!response.ok) throw new Error(`NewsAPI error: ${response.status}`);
  const data = await response.json();
  if (data.status !== "ok") throw new Error(data.message || "NewsAPI error");

  return (data.articles || []).filter(a =>
    a.url && a.title && a.title !== "[Removed]" &&
    a.description && a.description !== "[Removed]" &&
    !a.url.includes("removed")
  ).slice(0, 8);
}

async function translateAndFilter(articles, category, categoryLabel, anthropicKey) {
  const today = new Date().toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" });

  const articlesText = articles.map((a, i) =>
    `[${i}] TITULO: ${a.title}\nDESCRIPCION: ${cleanText(a.description)}\nFUENTE: ${a.source?.name || "Desconocida"}\nURL: ${a.url}\nFECHA: ${a.publishedAt?.split("T")[0] || today}`
  ).join("\n\n");

  const prompt = `Eres experto en Recursos Humanos. Hoy es ${today}.

Tenés estos artículos en inglés sobre "${categoryLabel}". Tu tarea:
1. Selecciona los 3 MAS relevantes para profesionales de RRHH de Argentina y LATAM
2. Traduce el titulo al español
3. Escribe un resumen en español de 3 oraciones mínimo explicando el contenido real
4. Conserva el URL original exacto sin modificarlo

ARTICULOS:
${articlesText}

Responde SOLO con JSON válido, sin texto adicional, sin markdown:
[
  {
    "indice": 0,
    "titulo_es": "Título traducido al español",
    "resumen_es": "Resumen en español de al menos 3 oraciones.",
    "fuente": "Nombre de la fuente",
    "url": "URL original exacta sin cambios",
    "fecha": "YYYY-MM-DD"
  }
]`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": anthropicKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2000,
      system: "Eres experto en RRHH. Respondes SOLO con JSON válido, sin texto adicional, sin markdown, sin backticks.",
      messages: [{ role: "user", content: prompt }]
    })
  });

  if (!response.ok) throw new Error(`Anthropic error: ${response.status}`);
  const data = await response.json();
  const text = data.content?.find(b => b.type === "text")?.text || "[]";
  return JSON.parse(text.replace(/```json|```/g, "").trim());
}

export default async function handler(req, res) {
  const category = req.query?.category || "beneficios";
  const type = req.query?.type || "news";
  const newsApiKey = process.env.NEWS_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "s-maxage=7200, stale-while-revalidate=14400");

  const today = new Date().toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" });

  // IPC endpoint
  if (type === "ipc") {
    if (!anthropicKey) return res.status(500).json({ success: false, error: "No Anthropic key", ipc: null });
    try {
      const prompt = `Eres experto en estadísticas argentinas. Hoy es ${today}. Dame los últimos datos oficiales del IPC de Argentina publicados por INDEC. Responde SOLO con JSON válido:\n{"mes":"mayo 2026","variacion_mensual":"X.X%","variacion_interanual":"XX.X%","variacion_acumulada":"XX.X%","url_indec":"https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31","nota":"aclaración si aplica"}`;
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": anthropicKey, "anthropic-version": "2023-06-01" },
        body: JSON.stringify({ model: "claude-haiku-4-5-20251001", max_tokens: 400, system: "Responde SOLO con JSON válido.", messages: [{ role: "user", content: prompt }] })
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
  if (!anthropicKey) return res.status(500).json({ success: false, error: "ANTHROPIC_API_KEY not configured", news: [] });

  try {
    const query = CATEGORY_QUERIES[category] || CATEGORY_QUERIES["beneficios"];
    const categoryLabel = CATEGORY_LABELS[category] || category;

    // Step 1: Get real articles from NewsAPI
    const articles = await fetchNewsAPI(query, newsApiKey);

    if (articles.length === 0) {
      return res.status(404).json({ success: false, error: "No articles found", news: [] });
    }

    // Step 2: Filter and translate with Claude
    const filtered = await translateAndFilter(articles, category, categoryLabel, anthropicKey);

    if (!Array.isArray(filtered) || filtered.length === 0) {
      throw new Error("No filtered articles");
    }

    // Step 3: Build final response with real URLs
    const news = filtered.map((item, i) => {
      const original = articles[item.indice] || articles[i] || {};
      return {
        id: `rh-${category}-${i}-${Date.now()}`,
        rank: i + 1,
        title: item.titulo_es || original.title || "",
        summary: item.resumen_es || cleanText(original.description || ""),
        source: item.fuente || original.source?.name || "",
        url: item.url || original.url || "#",
        date: item.fecha || original.publishedAt?.split("T")[0] || new Date().toISOString().split("T")[0],
        image: original.urlToImage || null,
        isLive: true,
        idioma: "español"
      };
    });

    return res.status(200).json({
      success: true,
      news,
      category,
      updatedAt: today
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
      news: [],
      category
    });
  }
}
