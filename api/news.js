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
  "prompts-hr": "inteligencia artificial aplicada a recursos humanos, prompts para HR, ChatGPT en RRHH, automatización con IA en gestión de personas"
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
  "prompts-hr": "Prompts para HR"
};

export default async function handler(req) {
  const url = new URL(req.url);
  const category = url.searchParams.get("category") || "beneficios";
  const topic = CATEGORY_PROMPTS[category] || CATEGORY_PROMPTS["beneficios"];
  const label = CATEGORY_LABELS[category] || category;

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Cache-Control": "s-maxage=7200, stale-while-revalidate=14400"
  };

  const today = new Date().toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" });
  const monthYear = new Date().toLocaleDateString("es-AR", { month: "long", year: "numeric" });

  const prompt = `Eres un experto en Recursos Humanos. Hoy es ${today}.

Busca y selecciona 3 noticias o artículos REALES y RECIENTES (de los últimos 60 días) sobre: ${topic}.

REGLAS ESTRICTAS:
- Cada noticia DEBE tener un link real y específico al artículo (no a la home del sitio)
- Las noticias deben estar en ESPAÑOL o ser de medios hispanohablantes cuando sea posible
- Si la noticia es de un medio en inglés, traduce el título y resumen al español pero mantén el link original
- Usa fuentes como: SHRM (shrm.org), Harvard Business Review (hbr.org), MIT Sloan (sloanreview.mit.edu), Josh Bersin (joshbersin.com), AIHR (aihr.com), Gallup (gallup.com), McKinsey (mckinsey.com), Deloitte Insights (deloitte.com), LinkedIn Talent Blog, Forbes, Mercer, Gartner, ADRHA (adrha.org.ar), IDEA Argentina (idea.org.ar), Infobae, La Nación, Cronista, o cualquier universidad reconocida
- El resumen debe tener al menos 3 oraciones explicando el contenido real del artículo
- NO inventes URLs. Si no conoces el link exacto del artículo, usa la URL de la sección correspondiente del sitio (ej: https://hbr.org/topic/subject/employee-benefits)
- Responde ÚNICAMENTE con JSON válido, sin texto adicional, sin markdown, sin backticks

Formato exacto requerido:
[
  {
    "titulo": "Título en español",
    "resumen": "Resumen detallado de al menos 3 oraciones en español explicando los puntos principales del artículo.",
    "fuente": "Nombre del medio o publicación",
    "url": "https://url-real-y-especifica.com/articulo",
    "fecha": "fecha aproximada en formato YYYY-MM-DD",
    "idioma_original": "español o inglés"
  }
]`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 2000,
        messages: [{ role: "user", content: prompt }]
      })
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.content?.find(b => b.type === "text")?.text || "[]";
    const clean = text.replace(/```json|```/g, "").trim();
    const articles = JSON.parse(clean);

    if (!Array.isArray(articles) || articles.length === 0) {
      throw new Error("No articles returned");
    }

    const news = articles.map((item, i) => ({
      id: `claude-${category}-${i}-${Date.now()}`,
      rank: i + 1,
      title: item.titulo || item.title || "Sin título",
      summary: item.resumen || item.summary || "",
      source: item.fuente || item.source || "HR News",
      url: item.url || "#",
      date: item.fecha || new Date().toISOString().split("T")[0],
      isLive: true,
      idioma: item.idioma_original || "español"
    }));

    return new Response(
      JSON.stringify({ success: true, news, category, updatedAt: today }),
      { headers }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message, news: [], category }),
      { headers, status: 500 }
    );
  }
}
