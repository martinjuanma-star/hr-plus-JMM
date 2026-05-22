const CATEGORY_PROMPTS = {
  "beneficios": "beneficios laborales, bienestar de empleados, paquetes de compensación total, salud mental en el trabajo, beneficios flexibles, work-life balance",
  "marca-empleadora": "employer branding, marca empleadora, propuesta de valor al empleado EVP, reputación como empleador, atracción de talento",
  "people-experience": "employee experience, experiencia del empleado, onboarding, offboarding, engagement, ciclo de vida del empleado",
  "compensaciones": "compensación salarial, transparencia salarial, pay equity, brecha salarial de género, bandas salariales, total rewards",
  "payroll": "liquidación de sueldos, payroll, nómina, gestión de salarios, compliance salarial",
  "desarrollo": "desarrollo organizacional, capacitación, upskilling, reskilling, liderazgo, planes de carrera",
  "cultura": "cultura organizacional, diversidad e inclusión DEI, seguridad psicológica, valores corporativos, clima laboral",
  "talent": "reclutamiento, adquisición de talento, selección de personal, talent acquisition, movilidad interna, candidate experience",
  "indicadores": "people analytics, métricas de RRHH, KPIs de recursos humanos, dashboards de HR, datos de fuerza laboral",
  "hr-tech": "tecnología en recursos humanos, HRIS, inteligencia artificial en HR, automatización de RRHH, HR tech",
  "change-management": "gestión del cambio organizacional, transformación cultural, change management, resistencia al cambio",
  "prompts-hr": "inteligencia artificial aplicada a recursos humanos, prompts para HR, ChatGPT en RRHH, automatización con IA",
  "relaciones-laborales": "derecho laboral argentino, relaciones laborales Argentina, convenios colectivos, sindicalismo, legislación laboral, Ministerio de Capital Humano, ARCA, Boletín Oficial, paritarias, indemnizaciones"
};

const RELACIONES_LABORALES_PROMPT = (today) => `Eres un experto en derecho laboral y relaciones laborales en Argentina. Hoy es ${today}.

Busca y selecciona las 5 novedades más importantes y recientes (últimos 60 días) sobre relaciones laborales en Argentina.

Fuentes prioritarias: iProfesional (iprofesional.com), Argentina.gob.ar/capital-humano/trabajo, ARCA (arca.gob.ar), Boletín Oficial (boletinoficial.gob.ar), Infobae, La Nación, Cronista.

Temas: paritarias, convenios colectivos, legislación laboral nueva, resoluciones del Ministerio de Capital Humano, ARCA y empleo, conflictos gremiales, jurisprudencia laboral, cambios en indemnizaciones.

REGLAS: SOLO noticias de Argentina, SOLO en español, links específicos al artículo.

Responde ÚNICAMENTE con JSON válido sin texto adicional:
[{"titulo":"...","resumen":"resumen de 3 oraciones mínimo","fuente":"...","url":"https://...","fecha":"YYYY-MM-DD","tema":"paritarias|legislacion|gremios|jurisprudencia|empleo|arca"}]`;

const IPC_PROMPT = (today) => `Eres un experto en estadísticas económicas argentinas. Hoy es ${today}.

Busca el último informe técnico del IPC publicado por el INDEC en https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31

Dame estos datos del último informe disponible:
- Variación mensual del IPC
- Variación interanual del IPC
- Variación acumulada desde inicio del año
- Mes y año de los datos
- Link directo al informe

Responde ÚNICAMENTE con JSON válido sin texto adicional:
{"mes":"abril 2026","variacion_mensual":"X.X%","variacion_interanual":"XX.X%","variacion_acumulada":"XX.X%","url_informe":"https://www.indec.gob.ar/...","url_indec":"https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31","nota":"aclaración si aplica"}`;

const NEWS_PROMPT = (today, topic) => `Eres un experto en Recursos Humanos. Hoy es ${today}.

Busca y selecciona 3 noticias REALES y RECIENTES (últimos 60 días) sobre: ${topic}.

REGLAS:
- Link específico al artículo (no a la home)
- Prioriza noticias en español
- Si es en inglés, traduce título y resumen al español
- Fuentes válidas: SHRM, Harvard Business Review, MIT Sloan, Josh Bersin, AIHR, Gallup, McKinsey, Deloitte, LinkedIn Talent Blog, Forbes, Mercer, Gartner, ADRHA, IDEA Argentina, Infobae, La Nación, Cronista, universidades
- Resumen de al menos 3 oraciones

Responde ÚNICAMENTE con JSON válido sin texto adicional:
[{"titulo":"...","resumen":"...","fuente":"...","url":"https://...","fecha":"YYYY-MM-DD","idioma_original":"español o inglés"}]`;

async function callClaude(prompt, apiKey) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 2500,
      system: "Respondes SOLO con JSON válido, sin texto adicional, sin markdown, sin backticks.",
      messages: [{ role: "user", content: prompt }]
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Anthropic API error: ${response.status} - ${errText}`);
  }

  const data = await response.json();
  const text = data.content?.find(b => b.type === "text")?.text || "[]";
  return text.replace(/```json|```/g, "").trim();
}

export default async function handler(req, res) {
  const category = req.query?.category || "beneficios";
  const type = req.query?.type || "news";
  const apiKey = process.env.ANTHROPIC_API_KEY;

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "s-maxage=7200, stale-while-revalidate=14400");

  if (!apiKey) {
    return res.status(500).json({ success: false, error: "API key not configured", news: [] });
  }

  const today = new Date().toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" });

  try {
    if (type === "ipc") {
      const raw = await callClaude(IPC_PROMPT(today), apiKey);
      const ipc = JSON.parse(raw);
      return res.status(200).json({ success: true, ipc, updatedAt: today });
    }

    if (category === "relaciones-laborales") {
      const raw = await callClaude(RELACIONES_LABORALES_PROMPT(today), apiKey);
      const articles = JSON.parse(raw);
      if (!Array.isArray(articles) || articles.length === 0) throw new Error("No articles");
      const news = articles.map((item, i) => ({
        id: `claude-rel-${i}-${Date.now()}`,
        rank: i + 1,
        title: item.titulo || "",
        summary: item.resumen || "",
        source: item.fuente || "",
        url: item.url || "#",
        date: item.fecha || new Date().toISOString().split("T")[0],
        isLive: true,
        tema: item.tema || ""
      }));
      return res.status(200).json({ success: true, news, category, updatedAt: today });
    }

    const topic = CATEGORY_PROMPTS[category] || CATEGORY_PROMPTS["beneficios"];
    const raw = await callClaude(NEWS_PROMPT(today, topic), apiKey);
    const articles = JSON.parse(raw);
    if (!Array.isArray(articles) || articles.length === 0) throw new Error("No articles");

    const news = articles.map((item, i) => ({
      id: `claude-${category}-${i}-${Date.now()}`,
      rank: i + 1,
      title: item.titulo || item.title || "",
      summary: item.resumen || item.summary || "",
      source: item.fuente || item.source || "",
      url: item.url || "#",
      date: item.fecha || new Date().toISOString().split("T")[0],
      isLive: true,
      idioma: item.idioma_original || "español"
    }));

    return res.status(200).json({ success: true, news, category, updatedAt: today });

  } catch (err) {
    return res.status(500).json({ success: false, error: err.message, news: [], category });
  }
}
