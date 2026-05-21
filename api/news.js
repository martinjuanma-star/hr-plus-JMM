export const config = { runtime: "edge" };

const CATEGORY_PROMPTS = {
  "beneficios": "beneficios laborales, bienestar de empleados, paquetes de compensación total, salud mental en el trabajo, beneficios flexibles, work-life balance",
  "marca-empleadora": "employer branding, marca empleadora, propuesta de valor al empleado EVP, reputación como empleador, atracción de talento, Glassdoor rankings",
  "people-experience": "employee experience, experiencia del empleado, onboarding, offboarding, engagement, ciclo de vida del empleado",
  "compensaciones": "compensación salarial, transparencia salarial, pay equity, brecha salarial de género, bandas salariales, total rewards",
  "payroll": "liquidación de sueldos, payroll, nómina, gestión de salarios, compliance salarial, payroll technology",
  "desarrollo": "desarrollo organizacional, capacitación, upskilling, reskilling, liderazgo, planes de carrera, aprendizaje corporativo",
  "cultura": "cultura organizacional, diversidad e inclusión DEI, seguridad psicológica, valores corporativos, clima laboral",
  "talent": "reclutamiento, adquisición de talento, selección de personal, talent acquisition, movilidad interna, candidate experience",
  "indicadores": "people analytics, métricas de RRHH, KPIs de recursos humanos, dashboards de HR, datos de fuerza laboral",
  "hr-tech": "tecnología en recursos humanos, HRIS, inteligencia artificial en HR, automatización de RRHH, HR tech, sistemas HCM",
  "change-management": "gestión del cambio organizacional, transformación cultural, change management, resistencia al cambio, liderazgo en transformación",
  "prompts-hr": "inteligencia artificial aplicada a recursos humanos, prompts para HR, ChatGPT en RRHH, automatización con IA en gestión de personas",
  "relaciones-laborales": "derecho laboral argentino, relaciones laborales Argentina, convenios colectivos de trabajo, sindicalismo Argentina, legislación laboral, Ministerio de Capital Humano Argentina, ARCA Argentina, Boletín Oficial Argentina, conflictos laborales, paritarias Argentina, indemnizaciones laborales, jurisprudencia laboral"
};

const CATEGORY_LABELS = {
  "beneficios": "Beneficios",
  "marca-empleadora": "Marca Empleadora",
  "people-experience": "People Experience",
  "compensaciones": "Compensaciones",
  "payroll": "Payroll",
  "desarrollo": "Desarrollo",
  "cultura": "Cultura",
  "talent": "Talent & Acquisition",
  "indicadores": "Indicadores y Dashboards",
  "hr-tech": "HR Technology & IA",
  "change-management": "Change Management",
  "prompts-hr": "Prompts para HR",
  "relaciones-laborales": "Relaciones Laborales"
};

const RELACIONES_LABORALES_PROMPT = `Eres un experto en derecho laboral y relaciones laborales en Argentina. Hoy es ${new Date().toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })}.

Busca y selecciona las 5 novedades más importantes y recientes (últimos 60 días) sobre relaciones laborales en Argentina.

Fuentes prioritarias (en este orden de prioridad):
1. iProfesional (iprofesional.com) - sección laboral
2. Argentina.gob.ar/capital-humano/trabajo
3. ARCA - Agencia de Recaudación y Control Aduanero (arca.gob.ar)
4. Boletín Oficial de la República Argentina (boletinoficial.gob.ar)
5. Infobae - sección economía/trabajo
6. La Nación - sección economía
7. Cronista Comercial

Temas a cubrir: paritarias, convenios colectivos, legislación laboral nueva, resoluciones del Ministerio de Capital Humano, ARCA y empleo, conflictos gremiales, jurisprudencia laboral importante, cambios en indemnizaciones o liquidaciones.

REGLAS ESTRICTAS:
- SOLO noticias de Argentina
- SOLO en español
- Links específicos al artículo, NO a la home del sitio
- Si no conocés el link exacto, usá la sección correspondiente del sitio
- Responde ÚNICAMENTE con JSON válido, sin texto adicional, sin markdown, sin backticks

Formato exacto:
[
  {
    "titulo": "Título de la noticia",
    "resumen": "Resumen detallado de al menos 3 oraciones explicando el contenido real.",
    "fuente": "Nombre del medio",
    "url": "https://url-especifica.com/articulo",
    "fecha": "YYYY-MM-DD",
    "tema": "paritarias|legislacion|gremios|jurisprudencia|empleo|arca"
  }
]`;

const IPC_PROMPT = `Eres un experto en estadísticas económicas argentinas. Hoy es ${new Date().toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })}.

Busca el último informe técnico del IPC (Índice de Precios al Consumidor) publicado por el INDEC en https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31

Necesito los siguientes datos del último informe disponible:
- Variación mensual del IPC (mes vs mes anterior)
- Variación interanual del IPC (mes vs mismo mes del año anterior)  
- Variación acumulada del IPC desde inicio del año hasta el último mes disponible
- Mes y año al que corresponden los datos
- Link directo al informe PDF o página del INDEC

REGLAS:
- Si no tenés datos exactos del último mes, usá los más recientes que conozcas e indicá el mes
- Responde ÚNICAMENTE con JSON válido, sin texto adicional, sin markdown, sin backticks

Formato exacto:
{
  "mes": "nombre del mes y año (ej: abril 2026)",
  "variacion_mensual": "X.X%",
  "variacion_interanual": "XX.X%",
  "variacion_acumulada": "XX.X%",
  "url_informe": "https://www.indec.gob.ar/uploads/informesdeprensa/...",
  "url_indec": "https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31",
  "nota": "aclaración si los datos no son del último mes"
}`;

async function callClaude(prompt, systemPrompt, apiKey) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2500,
      system: systemPrompt || "Respondes SOLO con JSON válido, sin texto adicional, sin markdown, sin backticks.",
      messages: [{ role: "user", content: prompt }]
    })
  });

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data.content?.find(b => b.type === "text")?.text || "[]";
  return text.replace(/```json|```/g, "").trim();
}

export default async function handler(req) {
  const url = new URL(req.url);
  const category = url.searchParams.get("category") || "beneficios";
  const type = url.searchParams.get("type") || "news";
  const apiKey = process.env.ANTHROPIC_API_KEY;

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Cache-Control": "s-maxage=7200, stale-while-revalidate=14400"
  };

  const today = new Date().toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" });

  try {
    // IPC endpoint
    if (type === "ipc") {
      const raw = await callClaude(IPC_PROMPT, "Eres un experto en estadísticas económicas argentinas. Respondes SOLO con JSON válido.");
      const ipc = JSON.parse(raw);
      return new Response(JSON.stringify({ success: true, ipc, updatedAt: today }), { headers });
    }

    // Relaciones Laborales — prompt especial con 5 noticias
    if (category === "relaciones-laborales") {
      const raw = await callClaude(RELACIONES_LABORALES_PROMPT, "Eres un experto en derecho laboral argentino. Respondes SOLO con JSON válido.");
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
      return new Response(JSON.stringify({ success: true, news, category, updatedAt: today }), { headers });
    }

    // Standard categories
    const topic = CATEGORY_PROMPTS[category] || CATEGORY_PROMPTS["beneficios"];
    const label = CATEGORY_LABELS[category] || category;
    const prompt = `Eres un experto en Recursos Humanos. Hoy es ${today}.

Busca y selecciona 3 noticias o artículos REALES y RECIENTES (últimos 60 días) sobre: ${topic}.

REGLAS ESTRICTAS:
- Cada noticia DEBE tener un link real y específico al artículo (no a la home del sitio)
- Prioriza noticias en ESPAÑOL o de medios hispanohablantes
- Si la noticia es de un medio en inglés, traduce el título y resumen al español
- Fuentes válidas: SHRM, Harvard Business Review, MIT Sloan, Josh Bersin, AIHR, Gallup, McKinsey, Deloitte, LinkedIn Talent Blog, Forbes, Mercer, Gartner, ADRHA, IDEA Argentina, Infobae, La Nación, Cronista, universidades reconocidas
- El resumen debe tener al menos 3 oraciones
- Responde ÚNICAMENTE con JSON válido, sin texto adicional

Formato:
[
  {
    "titulo": "Título en español",
    "resumen": "Resumen detallado de al menos 3 oraciones en español.",
    "fuente": "Nombre del medio",
    "url": "https://url-real-especifica.com/articulo",
    "fecha": "YYYY-MM-DD",
    "idioma_original": "español o inglés"
  }
]`;

    const raw = await callClaude(prompt, "Eres un experto en Recursos Humanos. Respondes SOLO con JSON válido, sin texto adicional.");
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

    return new Response(JSON.stringify({ success: true, news, category, updatedAt: today }), { headers });

  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message, news: [], category }),
      { headers, status: 500 }
    );
  }
}
