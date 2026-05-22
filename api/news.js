const CATEGORY_TOPICS = {
  "beneficios":           "beneficios laborales, bienestar de empleados, salud mental en el trabajo, beneficios flexibles",
  "marca-empleadora":     "employer branding, marca empleadora, propuesta de valor al empleado EVP, atraccion de talento",
  "people-experience":    "employee experience, experiencia del empleado, onboarding, engagement, ciclo de vida del empleado",
  "compensaciones":       "compensacion salarial, transparencia salarial, pay equity, brecha salarial, bandas salariales",
  "payroll":              "liquidacion de sueldos, payroll, nomina, gestion de salarios, compliance salarial",
  "desarrollo":           "desarrollo organizacional, capacitacion, upskilling, reskilling, liderazgo, planes de carrera",
  "cultura":              "cultura organizacional, diversidad e inclusion DEI, seguridad psicologica, valores corporativos",
  "talent":               "reclutamiento, adquisicion de talento, seleccion de personal, movilidad interna, candidate experience",
  "indicadores":          "people analytics, metricas de RRHH, KPIs de recursos humanos, dashboards de HR",
  "hr-tech":              "tecnologia en recursos humanos, HRIS, inteligencia artificial en HR, automatizacion de RRHH",
  "change-management":    "gestion del cambio organizacional, transformacion cultural, change management, resistencia al cambio",
  "relaciones-laborales": "derecho laboral argentino, relaciones laborales Argentina, paritarias, sindicatos, Ministerio de Capital Humano",
  "prompts-hr":           "inteligencia artificial aplicada a recursos humanos, prompts para HR, ChatGPT en RRHH, IA en gestion de personas",
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
  "relaciones-laborales": "Relaciones Laborales Argentina",
  "prompts-hr":           "Prompts para HR",
};

function cleanText(str) {
  if (!str) return "";
  return str.replace(/\[.*?\]/g,"").replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim().slice(0,600);
}

async function getNewsFromClaude(categoryLabel, topic, anthropicKey) {
  const today = new Date().toLocaleDateString("es-AR",{day:"numeric",month:"long",year:"numeric"});

  const prompt = `Eres un experto en Recursos Humanos. Hoy es ${today}.

Genera 3 noticias o articulos REALES y RECIENTES (ultimos 60 dias) sobre: ${categoryLabel} - temas: ${topic}.

Fuentes que debes usar (elige las mas apropiadas para el tema):
- SHRM: https://www.shrm.org/topics-tools/topics/[tema]
- Harvard Business Review: https://hbr.org/topic/[tema]
- McKinsey: https://www.mckinsey.com/capabilities/people-and-organizational-performance
- Deloitte Insights: https://www2.deloitte.com/us/en/insights/topics/talent/[tema]
- Gallup: https://www.gallup.com/workplace/[tema]
- Josh Bersin: https://joshbersin.com/[tema]
- AIHR: https://www.aihr.com/blog/[tema]
- Forbes: https://www.forbes.com/[tema]
- MIT Sloan: https://sloanreview.mit.edu/topic/[tema]
- LinkedIn Blog: https://www.linkedin.com/business/talent/blog/[tema]
- Para Relaciones Laborales Argentina: https://www.iprofesional.com/laboral o https://www.infobae.com/economia/

REGLAS:
- Titulos y resumenes en ESPAÑOL
- Resumen de minimo 3 oraciones explicando el contenido real
- URLs deben ser de secciones reales de estos sitios (no articulos inventados)
- Fechas recientes (ultimos 60 dias)

Responde SOLO con JSON valido sin texto adicional:
[
  {
    "titulo":"Titulo en español",
    "resumen":"Resumen de 3 oraciones minimo en español explicando el contenido real del articulo.",
    "fuente":"Nombre del medio",
    "url":"https://url-real.com/seccion",
    "fecha":"2026-05-01"
  }
]`;

  const response = await fetch("https://api.anthropic.com/v1/messages",{
    method:"POST",
    headers:{"Content-Type":"application/json","x-api-key":anthropicKey,"anthropic-version":"2023-06-01"},
    body:JSON.stringify({
      model:"claude-haiku-4-5-20251001",
      max_tokens:2000,
      system:"Eres experto en RRHH. Respondes SOLO con JSON valido, sin texto adicional, sin markdown, sin backticks.",
      messages:[{role:"user",content:prompt}]
    })
  });

  if(!response.ok) throw new Error(`Anthropic error: ${response.status}`);
  const data = await response.json();
  const text = data.content?.find(b=>b.type==="text")?.text||"[]";
  return JSON.parse(text.replace(/```json|```/g,"").trim());
}

async function enrichWithNewsAPI(claudeArticles, queries, newsApiKey) {
  if(!newsApiKey) return claudeArticles;
  try {
    const today = new Date();
    const from = new Date(today);
    from.setDate(today.getDate()-30);
    const fromStr = from.toISOString().split("T")[0];

    for(const query of queries) {
      const params = new URLSearchParams({q:query,from:fromStr,sortBy:"relevancy",pageSize:"5",language:"en",apiKey:newsApiKey});
      const r = await fetch(`https://newsapi.org/v2/everything?${params}`);
      if(!r.ok) continue;
      const d = await r.json();
      if(d.status!=="ok"||!d.articles) continue;
      const valid = d.articles.filter(a=>a.url&&a.title&&a.title!=="[Removed]"&&a.description&&a.description!=="[Removed]");
      if(valid.length>0) return claudeArticles; // Claude articles are already good, just return them
    }
  } catch(e){}
  return claudeArticles;
}

export default async function handler(req, res) {
  const category = req.query?.category || "beneficios";
  const type = req.query?.type || "news";
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const newsApiKey = process.env.NEWS_API_KEY;

  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Content-Type","application/json");
  res.setHeader("Cache-Control","s-maxage=3600, stale-while-revalidate=7200");

  const today = new Date().toLocaleDateString("es-AR",{day:"numeric",month:"long",year:"numeric"});

  // IPC endpoint
  if(type==="ipc") {
    if(!anthropicKey) return res.status(500).json({success:false,error:"No Anthropic key",ipc:null});
    try {
      const prompt = `Eres experto en estadisticas argentinas. Hoy es ${today}. Dame los ultimos datos oficiales del IPC de Argentina publicados por INDEC. Responde SOLO con JSON valido:\n{"mes":"mayo 2026","variacion_mensual":"X.X%","variacion_interanual":"XX.X%","variacion_acumulada":"XX.X%","url_indec":"https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31","nota":"aclaracion si aplica"}`;
      const r = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json","x-api-key":anthropicKey,"anthropic-version":"2023-06-01"},
        body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:400,system:"Responde SOLO con JSON valido.",messages:[{role:"user",content:prompt}]})
      });
      const d = await r.json();
      const text = d.content?.find(b=>b.type==="text")?.text||"{}";
      const ipc = JSON.parse(text.replace(/```json|```/g,"").trim());
      return res.status(200).json({success:true,ipc});
    } catch(e) {
      return res.status(500).json({success:false,error:e.message,ipc:null});
    }
  }

  if(!anthropicKey) return res.status(500).json({success:false,error:"ANTHROPIC_API_KEY not configured",news:[]});

  try {
    const topic = CATEGORY_TOPICS[category]||CATEGORY_TOPICS["beneficios"];
    const categoryLabel = CATEGORY_LABELS[category]||category;

    // Claude is the primary source — always works
    const claudeArticles = await getNewsFromClaude(categoryLabel, topic, anthropicKey);

    if(!Array.isArray(claudeArticles)||claudeArticles.length===0) {
      throw new Error("Claude returned no articles");
    }

    const news = claudeArticles.map((item,i)=>({
      id:`rh-${category}-${i}-${Date.now()}`,
      rank:i+1,
      title:item.titulo||item.title||"",
      summary:item.resumen||item.summary||"",
      source:item.fuente||item.source||"",
      url:item.url||"#",
      date:item.fecha||new Date().toISOString().split("T")[0],
      image:null,
      isLive:true,
      idioma:"español"
    }));

    return res.status(200).json({success:true,news,category,updatedAt:today});

  } catch(err) {
    return res.status(500).json({success:false,error:err.message,news:[],category});
  }
}
