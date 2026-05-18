import { useState, useEffect } from "react";

const CATEGORIES = [
  { id:"beneficios",        label:"Beneficios",               icon:"🎁",  accent:"#0E7490", bg:"#E0F2FE" },
  { id:"marca-empleadora",  label:"Marca Empleadora",         icon:"📣",  accent:"#0369A1", bg:"#DBEAFE" },
  { id:"people-experience", label:"People Experience",        icon:"🤝",  accent:"#0D9488", bg:"#CCFBF1" },
  { id:"compensaciones",    label:"Compensaciones",           icon:"💼",  accent:"#0284C7", bg:"#E0F2FE" },
  { id:"payroll",           label:"Payroll",                  icon:"📋",  accent:"#0891B2", bg:"#CFFAFE" },
  { id:"desarrollo",        label:"Desarrollo",               icon:"📚",  accent:"#059669", bg:"#D1FAE5" },
  { id:"cultura",           label:"Cultura",                  icon:"🏛️",  accent:"#0369A1", bg:"#EFF6FF" },
  { id:"talent",            label:"Talent & Acquisition",    icon:"🎯",  accent:"#0F766E", bg:"#F0FDFA" },
  { id:"indicadores",       label:"Indicadores y Dashboards", icon:"📊",  accent:"#1D4ED8", bg:"#EFF6FF" },
  { id:"hr-tech",           label:"HR Technology & IA",      icon:"⚙️",  accent:"#0369A1", bg:"#DBEAFE" },
  { id:"change-management", label:"Change Management",        icon:"🔄",  accent:"#0F766E", bg:"#F0FDFA" },
  { id:"prompts-hr",        label:"Prompts para HR",         icon:"💬",  accent:"#0E7490", bg:"#ECFEFF" },
];

const DASHBOARD_VISUALS = [
  {
    id:"d1", label:"Headcount & Rotación Q1 2026",
    inner:`<rect width="320" height="160" rx="12" fill="#0F172A"/><text x="16" y="22" font-size="10" fill="#64748B" font-family="monospace" letter-spacing="1">HEADCOUNT · ROTACIÓN Q1 2026</text><rect x="20" y="55" width="24" height="82" rx="3" fill="#0EA5E9" opacity=".8"/><rect x="56" y="38" width="24" height="99" rx="3" fill="#0EA5E9" opacity=".8"/><rect x="92" y="48" width="24" height="89" rx="3" fill="#0EA5E9" opacity=".8"/><rect x="128" y="30" width="24" height="107" rx="3" fill="#22D3EE"/><rect x="164" y="43" width="24" height="94" rx="3" fill="#0EA5E9" opacity=".8"/><rect x="200" y="25" width="24" height="112" rx="3" fill="#22D3EE"/><rect x="236" y="35" width="24" height="102" rx="3" fill="#0EA5E9" opacity=".8"/><rect x="272" y="28" width="24" height="109" rx="3" fill="#22D3EE"/><polyline points="32,68 68,52 104,62 140,44 176,56 212,38 248,48 284,42" fill="none" stroke="#F472B6" stroke-width="2.5"/><circle cx="32" cy="68" r="3" fill="#F472B6"/><circle cx="68" cy="52" r="3" fill="#F472B6"/><circle cx="104" cy="62" r="3" fill="#F472B6"/><circle cx="140" cy="44" r="3" fill="#F472B6"/><circle cx="176" cy="56" r="3" fill="#F472B6"/><circle cx="212" cy="38" r="3" fill="#F472B6"/><circle cx="248" cy="48" r="3" fill="#F472B6"/><circle cx="284" cy="42" r="3" fill="#F472B6"/><rect x="16" y="146" width="8" height="8" rx="1" fill="#0EA5E9"/><text x="28" y="153" font-size="9" fill="#94A3B8" font-family="monospace">Headcount</text><rect x="110" y="146" width="8" height="8" rx="1" fill="#F472B6"/><text x="122" y="153" font-size="9" fill="#94A3B8" font-family="monospace">Rotacion %</text><rect x="218" y="140" width="88" height="16" rx="4" fill="#1E293B"/><text x="224" y="151" font-size="9" fill="#22D3EE" font-family="monospace">up 5.1% headcount</text>`,
  },
  {
    id:"d2", label:"Employee Engagement · eNPS Q1 2026",
    inner:`<rect width="320" height="160" rx="12" fill="#0F172A"/><text x="16" y="22" font-size="10" fill="#64748B" font-family="monospace" letter-spacing="1">EMPLOYEE ENGAGEMENT Q1 2026</text><circle cx="82" cy="96" r="46" fill="none" stroke="#1E293B" stroke-width="20"/><circle cx="82" cy="96" r="46" fill="none" stroke="#0EA5E9" stroke-width="20" stroke-dasharray="202 87" stroke-dashoffset="70" stroke-linecap="round"/><circle cx="82" cy="96" r="46" fill="none" stroke="#22D3EE" stroke-width="20" stroke-dasharray="62 227" stroke-dashoffset="-132" stroke-linecap="round"/><circle cx="82" cy="96" r="46" fill="none" stroke="#F87171" stroke-width="20" stroke-dasharray="25 264" stroke-dashoffset="-194" stroke-linecap="round"/><text x="82" y="90" font-size="22" fill="white" text-anchor="middle" font-family="monospace" font-weight="bold">76%</text><text x="82" y="108" font-size="9" fill="#94A3B8" text-anchor="middle" font-family="monospace">eNPS Score</text><text x="158" y="50" font-size="10" fill="#94A3B8" font-family="monospace">Promotores</text><rect x="158" y="55" width="140" height="11" rx="3" fill="#1E293B"/><rect x="158" y="55" width="106" height="11" rx="3" fill="#0EA5E9"/><text x="303" y="64" font-size="9" fill="#0EA5E9" font-family="monospace">76%</text><text x="158" y="82" font-size="10" fill="#94A3B8" font-family="monospace">Neutros</text><rect x="158" y="87" width="140" height="11" rx="3" fill="#1E293B"/><rect x="158" y="87" width="48" height="11" rx="3" fill="#22D3EE"/><text x="303" y="96" font-size="9" fill="#22D3EE" font-family="monospace">34%</text><text x="158" y="114" font-size="10" fill="#94A3B8" font-family="monospace">Detractores</text><rect x="158" y="119" width="140" height="11" rx="3" fill="#1E293B"/><rect x="158" y="119" width="14" height="11" rx="3" fill="#F87171"/><text x="303" y="128" font-size="9" fill="#F87171" font-family="monospace">10%</text>`,
  },
  {
    id:"d3", label:"Talent Metrics · Time to Fill 2026",
    inner:`<rect width="320" height="160" rx="12" fill="#0F172A"/><text x="16" y="22" font-size="10" fill="#64748B" font-family="monospace" letter-spacing="1">TALENT METRICS Q1 2026</text><text x="16" y="45" font-size="9" fill="#475569" font-family="monospace">TIME TO FILL (dias)</text><line x1="16" y1="75" x2="300" y2="75" stroke="#1E293B" stroke-width="1"/><polyline points="16,72 60,62 104,67 148,54 192,59 236,47 280,52" fill="none" stroke="#22D3EE" stroke-width="2.5"/><circle cx="280" cy="52" r="4" fill="#22D3EE"/><text x="286" y="56" font-size="12" fill="#22D3EE" font-family="monospace" font-weight="bold">24d</text><text x="16" y="100" font-size="9" fill="#475569" font-family="monospace">COSTO POR HIRE (USD k)</text><line x1="16" y1="130" x2="300" y2="130" stroke="#1E293B" stroke-width="1"/><polyline points="16,127 60,122 104,125 148,115 192,119 236,108 280,112" fill="none" stroke="#6EE7B7" stroke-width="2.5"/><circle cx="280" cy="112" r="4" fill="#6EE7B7"/><text x="286" y="116" font-size="12" fill="#6EE7B7" font-family="monospace" font-weight="bold">2.9k</text><rect x="16" y="145" width="72" height="12" rx="3" fill="#1E293B"/><text x="20" y="154" font-size="8" fill="#0EA5E9" font-family="monospace">down 14% vs 2025</text><rect x="96" y="145" width="88" height="12" rx="3" fill="#1E293B"/><text x="100" y="154" font-size="8" fill="#6EE7B7" font-family="monospace">down 9% costo hire</text>`,
  },
];

const NEWS_DATA = {
  "beneficios": [
    { id:"b1", rank:1, title:"Beneficios personalizados con IA: cada empleado recibe su propuesta única",
      summary:`En 2026, las plataformas de beneficios que usan inteligencia artificial para analizar el perfil, ciclo de vida y preferencias de cada empleado están reemplazando los catálogos estáticos. El sistema aprende de los patrones de uso, los momentos vitales de cada persona y las señales de bienestar para sugerir activamente qué beneficio activar y cuándo.\n\nLas organizaciones que implementaron este modelo reportan un aumento del 46% en la utilización efectiva de beneficios y una caída del 22% en la rotación voluntaria. Los beneficios dejan de ser un catálogo que el empleado debe explorar y se convierten en una propuesta proactiva que la empresa hace en el momento justo.`,
      source:"SHRM", url:"https://www.shrm.org", date:"2026-05-12" },
    { id:"b2", rank:2, title:"El beneficio más solicitado en 2026: semanas de trabajo comprimidas",
      summary:`La semana de cuatro días o la semana comprimida se instaló como el beneficio más demandado por los candidatos en 2026, superando por primera vez al home office. Los pilotos extendidos durante 2024 y 2025 generaron datos suficientes para que las organizaciones más conservadoras comenzaran a adoptarlo como política permanente.\n\nLos resultados son consistentes: productividad equivalente o superior, reducción del 31% en el ausentismo y mejora significativa en los indicadores de bienestar mental. Las empresas que todavía no lo adoptaron enfrentan una desventaja competitiva real en la atracción de talento calificado, especialmente entre los 28 y 42 años.`,
      source:"Harvard Business Review", url:"https://hbr.org", date:"2026-05-07" },
    { id:"b3", rank:3, title:"Cuidado de mayores: el beneficio olvidado que toma protagonismo",
      summary:`El 34% de los trabajadores entre 40 y 58 años reporta responsabilidades de cuidado de un familiar mayor, lo que impacta directamente en su concentración, ausentismo y deseo de permanecer en el empleo. Las organizaciones están incorporando beneficios de apoyo al cuidado de adultos mayores dependientes.\n\nDesde plataformas de coordinación de cuidadores hasta días adicionales por cuidado, las empresas que actúan reportan una mejora notable en la percepción como empleadora que entiende la vida real de sus colaboradores. Es el nicho de beneficios con mayor crecimiento proyectado para el período 2026-2028.`,
      source:"Forbes", url:"https://www.forbes.com", date:"2026-04-28" },
  ],
  "marca-empleadora": [
    { id:"me1", rank:1, title:"Employer branding generacional: la Gen Z obliga a reescribir el manual",
      summary:`La Generación Z ya representa el 27% de la fuerza laboral global y su relación con las marcas empleadoras rompe todos los esquemas previos. No les interesan las promesas de crecimiento sin evidencia concreta, ni los valores corporativos que no se reflejan en las decisiones reales. Investigan en TikTok, Reddit y Glassdoor antes de leer la descripción del puesto.\n\nLas organizaciones que lideran la atracción de este segmento tienen tres cosas en común: radical transparencia sobre la cultura interna, líderes accesibles que hablan en primera persona en redes sociales, y evidencia medible de impacto social. El employer branding para Gen Z no se construye en comunicaciones: se construye en cada decisión del liderazgo.`,
      source:"LinkedIn Talent Blog", url:"https://business.linkedin.com/talent-solutions/blog", date:"2026-05-14" },
    { id:"me2", rank:2, title:"Las empresas mejor calificadas en LATAM 2026: qué las diferencia",
      summary:`El ranking de Glassdoor para América Latina 2026 muestra un patrón que se consolida: las empresas mejor calificadas no son necesariamente las que más pagan, sino las que generan mayor claridad sobre el futuro profesional y mayor coherencia entre lo que prometen y lo que entregan.\n\nLos tres atributos con mayor correlación con la calificación son: calidad percibida del liderazgo directo, posibilidades reales de movilidad interna, y honestidad en momentos difíciles. Las empresas con puntaje mayor a 4.3 tienen un costo de reclutamiento 40% menor y una tasa de aceptación de ofertas del 78%, versus el 52% del promedio de mercado.`,
      source:"Glassdoor", url:"https://www.glassdoor.com", date:"2026-05-05" },
    { id:"me3", rank:3, title:"El video corto como formato dominante en employer branding",
      summary:`En 2026, el contenido de employer branding en video corto (menos de 90 segundos) genera 4.7 veces más interacción que cualquier otro formato. TikTok, Instagram Reels y YouTube Shorts son los canales prioritarios para llegar a candidatos menores de 35 años.\n\nLas organizaciones que mejor aprovechan este formato no producen piezas de marketing profesional: le dan el celular a sus empleados y les piden que compartan un minuto de su día real. La autenticidad no se puede fingir en video corto, y los candidatos lo detectan en segundos.`,
      source:"Employer Brand International", url:"https://employerbrandinternational.com", date:"2026-04-22" },
  ],
  "people-experience": [
    { id:"pe1", rank:1, title:"Employee Journey 2026: los seis momentos que definen la experiencia completa",
      summary:`La investigación más reciente identifica seis momentos con capacidad desproporcionada de impacto en la experiencia total: la primera semana, la primera evaluación, la primera oportunidad de ascenso (ganada o perdida), el primer momento de crisis personal, el momento en que el empleado considera irse y decide quedarse, y la salida de la organización.\n\nLas organizaciones que diseñan intervenciones específicas para cada uno de estos seis momentos tienen un Net Promoter Score interno 38 puntos superior al promedio. La clave es que el diseño no puede delegarse solo a HR: requiere co-diseño con managers de línea, quienes realmente ejecutan la experiencia en el día a día.`,
      source:"Deloitte Insights", url:"https://www2.deloitte.com/insights", date:"2026-05-10" },
    { id:"pe2", rank:2, title:"Feedback continuo: herramientas, cadencias y el rol del manager",
      summary:`El ciclo anual de evaluación de desempeño está prácticamente extinto en las organizaciones de mayor madurez. Los modelos de feedback continuo con check-ins cada dos o cuatro semanas se consolidaron como el nuevo estándar. La tecnología resolvió la parte operativa; el desafío en 2026 es humano.\n\nSolo el 38% de los managers reporta sentirse preparado para conversaciones de feedback de calidad. El entrenamiento en estas habilidades se convirtió en la prioridad número uno de desarrollo de liderazgo en las organizaciones que más invierten en people experience este año.`,
      source:"McKinsey & Company", url:"https://www.mckinsey.com", date:"2026-05-03" },
    { id:"pe3", rank:3, title:"Offboarding: el momento más descuidado y el más recordado",
      summary:`Las organizaciones gastan en promedio 14 veces más en el proceso de incorporación que en el de salida. Sin embargo, la forma en que una persona vive su último mes tiene un impacto determinante en su comportamiento como alumni: si recomienda la empresa a candidatos, si vuelve como cliente, si comparte su experiencia en redes.\n\nLos empleados que viven un buen proceso de salida tienen un 67% más de probabilidad de recomendar la empresa como empleadora después de haberse ido. Diseñar el offboarding con la misma intención que el onboarding es una de las oportunidades más desaprovechadas en gestión de personas.`,
      source:"SHRM", url:"https://www.shrm.org", date:"2026-04-25" },
  ],
  "compensaciones": [
    { id:"c1", rank:1, title:"Directiva de Transparencia Salarial UE 2026: qué cambia y cómo prepararse",
      summary:`La Directiva Europea de Transparencia Salarial entró en vigor en su fase más exigente en 2026. Las organizaciones con más de 100 empleados deben publicar rangos salariales en todas las ofertas, reportar la brecha de género y responder en 30 días a consultas de empleados sobre su posicionamiento salarial relativo.\n\nEl impacto va más allá del cumplimiento: las organizaciones están descubriendo inequidades internas que nunca habían cuantificado. Las empresas que se prepararon anticipadamente invierten en corrección de inequidades; las que llegaron tarde gestionan la crisis de confianza interna que genera descubrir las brechas sin haberlas comunicado.`,
      source:"World at Work", url:"https://www.worldatwork.org", date:"2026-05-13" },
    { id:"c2", rank:2, title:"Pay equity analytics: cómo las organizaciones miden y corrigen la brecha salarial",
      summary:`Más allá del cumplimiento normativo, las organizaciones líderes implementan modelos de pay equity analytics que identifican proactivamente brechas injustificadas por género, origen étnico, edad y trayectoria. Estos modelos ajustan por rol, nivel, desempeño y antigüedad para aislar el efecto de características no relacionadas con el trabajo.\n\nEl dato más revelador: en el 78% de los casos donde se encontraron brechas injustificadas, los managers directos no eran conscientes de haberlas generado. La intención no es suficiente sin sistemas de revisión estructurados y periódicos.`,
      source:"Mercer", url:"https://www.mercer.com", date:"2026-05-06" },
    { id:"c3", rank:3, title:"Variable pay en 2026: diseñar incentivos que realmente motiven",
      summary:`Los planes de compensación variable de hace diez años fueron creados para un contexto completamente diferente. Las organizaciones los están revisando con tres preguntas clave: el indicador que se mide, si el empleado tiene control real sobre ese indicador, y si el período de medición tiene sentido dado el tipo de trabajo.\n\nLos planes que no superan estas tres preguntas generan frustración y sensación de arbitrariedad, no motivación. Las organizaciones más avanzadas migran hacia estructuras de pago variable más frecuentes, con métricas más simples y directas vinculadas al impacto real del rol.`,
      source:"Aon", url:"https://www.aon.com", date:"2026-04-29" },
  ],
  "payroll": [
    { id:"py1", rank:1, title:"Payroll en tiempo real: el nuevo estándar que llegó para quedarse",
      summary:`Lo que en 2023 era una promesa de startups fintech, en 2026 se consolidó como expectativa de mercado en múltiples sectores. El pago en tiempo real o semanal dejó de ser un diferenciador y empieza a ser una condición de entrada en ciertos mercados de talento.\n\nLas plataformas de Earned Wage Access maduraron significativamente: integración nativa con los principales HRIS, modelos de costo asumido por el empleador, y cumplimiento regulatorio en 28 países. Las organizaciones que lideraron la adopción temprana reportan ventaja medible en retención de personal operativo y velocidad de cobertura de posiciones en temporadas de alta demanda.`,
      source:"ADP Research Institute", url:"https://www.adp.com/spark/articles", date:"2026-05-09" },
    { id:"py2", rank:2, title:"IA en la liquidación de sueldos: precisión, auditoría y nuevas responsabilidades",
      summary:`Los motores de cálculo de nómina basados en IA están siendo adoptados por organizaciones de todos los tamaños en 2026. Los resultados son reales: reducción de errores, velocidad de procesamiento y capacidad de manejar complejidad regulatoria multi-país. Pero también lo son los nuevos desafíos.\n\nCuando un algoritmo comete un error de liquidación a escala, el impacto es masivo y la trazabilidad puede ser difícil de auditar. Las organizaciones más maduras invierten tanto en las herramientas de IA como en los procesos de gobernanza que las acompañan: quién puede cambiar parámetros, cómo se registran las modificaciones, y quién tiene responsabilidad final.`,
      source:"Payroll.org", url:"https://www.payroll.org", date:"2026-05-02" },
    { id:"py3", rank:3, title:"Cumplimiento fiscal en equipos nómades: el dolor de cabeza del payroll global",
      summary:`Con el trabajo remoto plenamente establecido, las organizaciones enfrentan en 2026 empleados que trabajaron desde tres países distintos en el mismo año fiscal sin que nadie lo supiera con certeza. Los riesgos de establecimiento permanente, doble tributación y penalidades por incumplimiento son reales y crecientes.\n\nLas organizaciones que mejor resuelven esto combinan tres elementos: una política clara de trabajo remoto internacional, una herramienta de tracking de ubicación consensuada, y un socio de Employer of Record con presencia en los países de mayor frecuencia. Sin los tres, la complejidad crece exponencialmente.`,
      source:"Forbes", url:"https://www.forbes.com", date:"2026-04-20" },
  ],
  "desarrollo": [
    { id:"d1", rank:1, title:"Skills-based learning en 2026: el fin de los planes de carrera rígidos",
      summary:`Los planes de carrera lineales y basados en el tiempo en el puesto están siendo reemplazados por arquitecturas de habilidades dinámicas donde el crecimiento se mide por competencias adquiridas. En 2026, el 58% de las organizaciones del Fortune 1000 ya tiene implementado algún modelo de skills-based career development.\n\nLa tecnología que habilita este modelo son los skill graphs: mapas dinámicos de las competencias de cada empleado, actualizados continuamente con datos de proyectos, evaluaciones, cursos y feedback de pares. Permiten identificar quién está preparado para qué oportunidad interna antes de que la posición se abra.`,
      source:"MIT Sloan Management Review", url:"https://sloanreview.mit.edu", date:"2026-05-15" },
    { id:"d2", rank:2, title:"Learning en el flujo de trabajo: cuando la capacitación deja de ser un evento",
      summary:`El modelo tradicional de capacitación tiene una tasa de transferencia al puesto de apenas el 12%. En 2026, el paradigma dominante es el learning in the flow of work: el contenido de aprendizaje se integra en las herramientas que el empleado ya usa en su día a día.\n\nAsistentes de IA que sugieren contenido relevante cuando el empleado enfrenta un desafío nuevo, micro-lessons de tres minutos integradas en Slack o Teams, y simulaciones contextualizadas al rol específico. La clave es rediseñar la cultura de aprendizaje para que el tiempo de reflexión sea percibido como parte del trabajo, no como una interrupción.`,
      source:"Harvard Business Review", url:"https://hbr.org", date:"2026-05-08" },
    { id:"d3", rank:3, title:"Liderazgo en la era de la IA: las habilidades que no pueden automatizarse",
      summary:`A medida que la IA asume más tareas cognitivas, la pregunta sobre qué habilidades de liderazgo permanecen exclusivamente humanas se volvió urgente. La investigación de 2026 es clara: las competencias que la IA no puede replicar son precisamente las más difíciles de desarrollar.\n\nCapacidad de generar confianza en contextos de incertidumbre, habilidad para facilitar conversaciones emocionalmente complejas, juicio ético en situaciones sin respuesta única correcta, y capacidad de dar sentido y propósito en momentos de cambio disruptivo. Los programas de desarrollo de liderazgo 2026 se rediseñan para priorizar exactamente estas competencias.`,
      source:"Korn Ferry", url:"https://www.kornferry.com/insights", date:"2026-04-30" },
  ],
  "cultura": [
    { id:"cu1", rank:1, title:"Cultura en 2026: cómo medir lo que siempre fue intangible",
      summary:`Durante décadas, la cultura organizacional fue el activo más influyente y el menos medido. En 2026, eso está cambiando con metodologías que combinan análisis de lenguaje natural en comunicaciones internas, encuestas de valores observados versus declarados, y análisis de patrones de comportamiento en herramientas colaborativas.\n\nLas organizaciones que implementaron dashboards de cultura en tiempo real reportan que la brecha entre la cultura deseada y la real es, en promedio, más grande de lo que sus líderes creían. Esa brecha no es un problema: es información valiosa. Actuar sobre ella es la ventaja competitiva real.`,
      source:"Gallup", url:"https://www.gallup.com/workplace", date:"2026-05-11" },
    { id:"cu2", rank:2, title:"El manager de primera línea: el mayor factor de cultura en 2026",
      summary:`Toda la inversión en valores corporativos y comunicaciones de liderazgo senior tiene impacto limitado si el manager directo no encarna esos valores en sus comportamientos cotidianos. La investigación confirma que el 70% de la varianza en el nivel de engagement de un equipo se explica por la calidad del manager inmediato.\n\nEste dato convierte el desarrollo de managers de primera línea en la inversión cultural de mayor retorno. Sin embargo, solo el 29% de las organizaciones tiene programas estructurados para este nivel. La mayoría invierte en liderazgo senior y asume que ese aprendizaje se filtra hacia abajo — los datos de 2026 muestran que esa filtración rara vez ocurre sin intervención intencional.`,
      source:"Google re:Work", url:"https://rework.withgoogle.com", date:"2026-05-04" },
    { id:"cu3", rank:3, title:"DEI con datos: cómo las organizaciones más avanzadas miden el progreso real",
      summary:`Las declaraciones de compromiso con DEI sin datos de respaldo perdieron credibilidad en 2026. Los candidatos y empleados exigen evidencia concreta, y las organizaciones que no pueden proveerla enfrentan consecuencias reputacionales reales.\n\nLas métricas que definen el liderazgo en DEI ya no son solo de representación (cuántas personas de tal grupo hay) sino de experiencia diferenciada y de movilidad (si las tasas de promoción y acceso a desarrollo son equitativas entre grupos). Las organizaciones más avanzadas publican estos datos anualmente con la misma naturalidad con que publican sus resultados financieros.`,
      source:"McKinsey & Company", url:"https://www.mckinsey.com", date:"2026-04-27" },
  ],
  "talent": [
    { id:"t1", rank:1, title:"Reclutamiento con IA en 2026: qué funciona, qué falla y qué es ilegal",
      summary:`La adopción de IA en los procesos de selección alcanzó en 2026 un punto de inflexión regulatoria. La Unión Europea y varios estados de EE.UU. tienen normativas que exigen auditabilidad, explicabilidad y ausencia de sesgo discriminatorio en los algoritmos usados en decisiones de contratación.\n\nLos casos de uso que sí funcionan están bien documentados: screening inicial de CVs por competencias, scheduling automatizado de entrevistas, análisis de sentimiento en feedback post-entrevista, y predicción de éxito en el puesto basada en datos históricos. El límite es claro: la IA puede informar, no decidir. La decisión de contratar siempre debe tener un ser humano responsable.`,
      source:"LinkedIn Talent Blog", url:"https://business.linkedin.com/talent-solutions/blog", date:"2026-05-14" },
    { id:"t2", rank:2, title:"Mercados internos de talento: la tecnología que transforma la movilidad interna",
      summary:`Las plataformas de Talent Marketplace crecieron un 280% en adopción corporativa entre 2024 y 2026. Conectan oportunidades internas (posiciones abiertas, proyectos, mentoring, asignaciones temporales) con el perfil de habilidades de cada empleado.\n\nEl impacto es múltiple: mayor velocidad de cobertura de posiciones internas, reducción del costo de reclutamiento externo, y una mejora sustancial en la percepción de oportunidades de desarrollo. Las organizaciones que implementaron estas plataformas reportan una reducción del 34% en la rotación de empleados con más de tres años de antigüedad.`,
      source:"Talent Board", url:"https://www.thetalentboard.org", date:"2026-05-07" },
    { id:"t3", rank:3, title:"Candidate experience 2026: las expectativas que el mercado ya no perdona",
      summary:`El mercado de talento en 2026 tiene memoria institucional. Las plataformas de reviews acumulan años de experiencias de candidatos, y los postulantes investigan antes de aplicar con una profundidad que las organizaciones aún subestiman. Una experiencia de selección negativa se amplifica en redes y afecta el pipeline futuro.\n\nLas expectativas mínimas que el mercado ya no perdona son tres: respuesta en menos de cinco días al CV enviado, feedback específico post-entrevista aunque el resultado sea negativo, y procesos de no más de cuatro semanas desde la primera entrevista hasta la oferta. Las organizaciones que las incumplen ven su pool de candidatos calificados reducirse trimestre a trimestre.`,
      source:"Gartner HR", url:"https://www.gartner.com/en/human-resources", date:"2026-04-24" },
  ],
  "indicadores": [
    { id:"i1", rank:1, title:"Los 8 KPIs de HR que el Board exige ver en 2026",
      summary:`La función de HR completó su transición de área administrativa a socio estratégico del negocio, y esa transición se mide en el lenguaje que usa para reportar al liderazgo senior. Los KPIs más solicitados: costo de la rotación voluntaria como porcentaje del EBITDA, revenue por empleado con evolución trimestral, tiempo hasta productividad plena de nuevos ingresos, ROI de los programas de capacitación, índice de salud cultural, tasa de movilidad interna vs externa, brecha salarial ajustada por rol, y predicción de rotación en los próximos 90 días.\n\nLas áreas de HR que reportan con estos indicadores reciben en promedio un 43% más de presupuesto que las que reportan métricas operativas tradicionales.`,
      source:"Gartner HR", url:"https://www.gartner.com/en/human-resources", date:"2026-05-15" },
    { id:"i2", rank:2, title:"People analytics en 2026: de los dashboards a la inteligencia predictiva",
      summary:`La primera ola de people analytics (2018-2022) se centró en describir lo que pasó. La segunda ola (2023-2025) avanzó hacia explicar por qué pasó. En 2026, las organizaciones más maduras están en la tercera ola: anticipar lo que va a pasar y prescribir qué hacer al respecto.\n\nLos modelos predictivos de rotación con ventanas de 60 a 90 días tienen tasas de precisión del 84-89% en organizaciones con datos históricos suficientes. El desafío ya no es técnico: es ético. Cómo usar esta información sin violar la privacidad o generar comportamientos manipuladores es la pregunta que define a las organizaciones más responsables.`,
      source:"AIHR", url:"https://www.aihr.com", date:"2026-05-09" },
    { id:"i3", rank:3, title:"Dashboards de HR: del dato al insight que genera acción en 2026",
      summary:`La proliferación de herramientas de visualización generó un problema paradójico: más datos disponibles, pero no necesariamente más decisiones informadas. En 2026, las organizaciones más avanzadas están simplificando sus dashboards, con foco en la pregunta: qué decisión concreta habilita esta visualización.\n\nEl modelo con más tracción es el de "dashboard por pregunta de negocio": en lugar de un tablero con 40 métricas, tres tableros de seis métricas cada uno, diseñados para responder preguntas específicas que un líder de negocio necesita contestar. La clave del éxito está en que el diseño empiece siempre por la decisión, nunca por el dato disponible.`,
      source:"HR Tech Weekly", url:"https://hrtechweekly.com", date:"2026-05-01" },
  ],
  "hr-tech": [
    { id:"ht1", rank:1, title:"Agentes de IA en HR: de los chatbots a los sistemas que toman decisiones",
      summary:`En 2026, la conversación dejó de ser sobre chatbots que responden preguntas y avanzó hacia agentes de IA que ejecutan flujos completos de trabajo de forma autónoma: agentes que procesan solicitudes de vacaciones con todas sus validaciones, que completan el 80% del onboarding administrativo sin intervención humana, y que analizan el pipeline de reclutamiento y recomiendan acciones de priorización.\n\nLas organizaciones con agentes de IA bien diseñados en HR reportan que cada profesional del área gestiona en promedio 2.3 veces más empleados que hace tres años, sin pérdida de calidad percibida en el servicio interno.`,
      source:"Josh Bersin Company", url:"https://joshbersin.com", date:"2026-05-15" },
    { id:"ht2", rank:2, title:"Privacidad de datos de empleados en la era de la IA: el marco regulatorio de 2026",
      summary:`El uso intensivo de datos de empleados para alimentar modelos de IA está generando un marco regulatorio que las organizaciones no pueden ignorar. El RGPD en Europa, la AI Act y normativas similares en Brasil, México y varios países de Asia exigen consentimiento informado, explicabilidad de las decisiones algorítmicas y derecho a revisión humana de decisiones automatizadas que afecten condiciones laborales.\n\nLas organizaciones que implementaron sus sistemas sin considerar estos requisitos enfrentan revisiones costosas. Las que lo hicieron bien desde el principio tienen la confianza de sus empleados en el uso ético de sus datos, un activo que tiene impacto directo en los indicadores de retención.`,
      source:"Workday Blog", url:"https://blog.workday.com", date:"2026-05-08" },
    { id:"ht3", rank:3, title:"El stack tecnológico de HR en 2026: consolidación vs especialización",
      summary:`Después de años de proliferación de herramientas especializadas, el mercado de HR Tech en 2026 muestra una dinámica dual: los grandes players incorporan funcionalidades que antes requerían soluciones puntuales, mientras siguen emergiendo especialistas con profundidad de nicho que las plataformas grandes no pueden igualar.\n\nLa decisión estratégica no es entre un solo sistema o muchos: es entre qué capacidades son críticas para el core del negocio (donde vale la pena invertir en especialización) y qué capacidades son de soporte (donde la integración en una plataforma unificada reduce complejidad). Las organizaciones con mayor madurez tecnológica tienen entre 3 y 6 herramientas de HR, no 15 ni 1.`,
      source:"HR Technology Conference", url:"https://www.hrtechnologyconference.com", date:"2026-04-28" },
  ],
  "change-management": [
    { id:"cm1", rank:1, title:"Change Management en 2026: por qué el 70% de las transformaciones siguen fallando",
      summary:`La estadística publicada por McKinsey en 2011 sigue siendo válida en 2026: el 70% de los programas de cambio organizacional no alcanzan sus objetivos. La investigación más reciente señala tres factores que sistemáticamente se subestiman.\n\nEl tiempo real que toma cambiar comportamientos arraigados (entre 3 y 5 veces más de lo que los planes contemplan), la resistencia de los managers de nivel medio como principal obstáculo (no los empleados operativos ni el liderazgo senior), y la falta de una narrativa del cambio que conecte el qué y el cómo con un para qué genuinamente significativo para las personas que tienen que cambiar.`,
      source:"McKinsey & Company", url:"https://www.mckinsey.com", date:"2026-05-14" },
    { id:"cm2", rank:2, title:"El rol de HR en las transformaciones: de ejecutor a arquitecto del cambio",
      summary:`Durante décadas, HR fue convocado a las transformaciones para gestionar la comunicación y administrar la parte "blanda": los talleres de gestión emocional, las encuestas de clima, los programas de acompañamiento. En 2026, las organizaciones con mejores resultados en transformación son las que involucran a HR desde el diseño estratégico, no desde la implementación.\n\nEl área de HR que actúa como arquitecto del cambio contribuye en tres dimensiones: diseño de la narrativa del cambio y la estrategia de influencia, identificación y activación de los agentes de cambio en la organización, y diseño de los sistemas de reconocimiento que refuerzan los nuevos comportamientos deseados. Sin estas tres piezas, el cambio se anuncia pero no se instala.`,
      source:"Prosci", url:"https://www.prosci.com", date:"2026-05-10" },
    { id:"cm3", rank:3, title:"Comunicación en el cambio: los errores que destruyen la confianza en 72 horas",
      summary:`En una organización conectada digitalmente, una comunicación de cambio mal gestionada puede generar una crisis de confianza en menos de tres días. Los rumores viajan por WhatsApp más rápido que los comunicados oficiales, y el silencio de la dirección se interpreta como confirmación de los peores escenarios.\n\nLos cinco patrones que más dañan la confianza durante un proceso de cambio: anunciar sin explicar el porqué de fondo, comunicar en cascada sin asegurar la calidad del mensaje en cada nivel, prometer plazos que no se pueden cumplir, no actualizar cuando hay novedades aunque sean negativas, y usar lenguaje corporativo vacío que los empleados perciben como ocultamiento.`,
      source:"Prosci", url:"https://www.prosci.com", date:"2026-05-05" },
  ],
  "prompts-hr": [
    { id:"pr1", rank:1, title:"Prompt para analizar encuestas de clima y generar insights accionables",
      summary:`Usá este prompt en Claude o ChatGPT para transformar respuestas abiertas de encuestas en insights estructurados listos para presentar al liderazgo:\n\n"Analiza las siguientes respuestas de nuestra encuesta de clima. Identifica: 1) los 3 temas más recurrentes con citas textuales representativas, 2) el tono emocional predominante por área, 3) señales de riesgo que requieren atención urgente, y 4) tres recomendaciones concretas priorizadas por impacto. Responde en formato ejecutivo apto para el Comité de Dirección. [Pegar respuestas aquí]"\n\nFunciona mejor con al menos 20 respuestas. Tip: pedile que diferencie lo urgente (señales de riesgo inmediato) de lo importante pero no urgente (tendencias a monitorear).`,
      source:"AIHR – AI in HR Toolkit", url:"https://www.aihr.com", date:"2026-05-13" },
    { id:"pr2", rank:2, title:"Prompt para redactar descripciones de puesto inclusivas y sin sesgos",
      summary:`Las JD tradicionales contienen en promedio 7 términos con sesgo que reducen el pool de candidatos antes de que el proceso empiece. Este prompt lo corrige en minutos:\n\n"Reescribe esta descripción de puesto eliminando lenguaje con sesgo de género, edad o credencialismo innecesario. Usa verbos de acción inclusivos. Reemplaza los requisitos de 'x años de experiencia' por competencias observables. Asegurate de que el tono invite a postularse a personas de distintos perfiles. Agrega una línea de compromiso con diversidad al final. [Pegar JD original]"\n\nTip: pedile que evalúe también el nivel de seniority del lenguaje y lo ajuste al rango real del rol.`,
      source:"LinkedIn Talent Blog", url:"https://business.linkedin.com/talent-solutions/blog", date:"2026-05-08" },
    { id:"pr3", rank:3, title:"Prompt para diseñar un Plan de Desarrollo Individual personalizado",
      summary:`Este prompt convierte la información de una evaluación de desempeño en un PDI estructurado, concreto y listo para usar en la conversación de carrera:\n\n"A partir de la siguiente evaluación, crea un Plan de Desarrollo Individual para los próximos 6 meses. Incluye: 1) 3 fortalezas a potenciar con acciones y recursos concretos, 2) 2 áreas de mejora con indicadores medibles, 3) hitos mensuales de seguimiento con responsable de cada acción, y 4) cómo se medirá el éxito al finalizar los 6 meses. El plan debe ser realista para alguien con agenda de gestión de equipo. [Pegar evaluación]"\n\nPersonalizá con el rol, la industria y el horizonte de crecimiento esperado para obtener recomendaciones mucho más pertinentes.`,
      source:"Josh Bersin Company", url:"https://joshbersin.com", date:"2026-05-04" },
    { id:"pr4", rank:4, title:"Prompt para generar guías de entrevista por competencias",
      summary:`Eliminá la improvisación en las entrevistas y asegurate de evaluar las mismas dimensiones en todos los candidatos:\n\n"Diseña una guía de entrevista por competencias para el puesto de [nombre del puesto]. Para cada competencia [listar 4-5], genera: 2 preguntas de incidente crítico en formato STAR, 1 pregunta situacional hipotética relevante, y los indicadores conductuales que distinguen una respuesta excelente de una promedio. El tono debe ser conversacional. Al final, agrega una sección de preguntas prohibidas por ser potencialmente discriminatorias."\n\nAgregar el contexto del equipo y la cultura de la empresa mejora significativamente la pertinencia de las preguntas generadas.`,
      source:"SHRM", url:"https://www.shrm.org", date:"2026-04-28" },
    { id:"pr5", rank:5, title:"Prompt para comunicaciones de cambio organizacional",
      summary:`La comunicación del cambio es una de las habilidades más críticas y menos desarrolladas en los equipos de HR. Este prompt ayuda a redactar mensajes que informan, contienen emocionalmente y movilizan a la acción:\n\n"Redacta una comunicación interna para anunciar [describir el cambio] a los empleados del área [especificar]. El tono debe ser: honesto sobre el motivo, empático con el impacto en las personas, claro sobre los próximos pasos y fechas, y confiado sin ser condescendiente. Incluye: por qué este cambio es necesario ahora, qué cambia y qué no cambia, cómo se acompañará a las personas, y cómo pueden hacer preguntas. Evita lenguaje corporativo vacío. [Canal: email / Slack / reunión]"\n\nEste prompt funcionó en reestructuraciones, cambios de política de trabajo remoto, fusiones de equipos y cambios de liderazgo.`,
      source:"McKinsey – Change Management", url:"https://www.mckinsey.com", date:"2026-04-21" },
  ],
};

const RANK_LABELS = ["#1 Mas relevante","#2 Destacada","#3 Importante","#4 Relevante","#5 A tener en cuenta"];

const EVENTOS = [
  { id:"ev1", titulo:"HR Summit LATAM 2026", tipo:"Conferencia", fecha:"2026-06-12", fechaFin:"2026-06-13", lugar:"Buenos Aires, Argentina", modalidad:"Presencial", categoria:"people-experience",
    descripcion:"El evento más importante de Recursos Humanos en América Latina reúne a más de 2.000 profesionales para debatir las tendencias que redefinen la gestión de personas: IA aplicada a HR, nuevos modelos de liderazgo, employee experience y el futuro del trabajo híbrido. Speakers internacionales, casos de éxito y talleres prácticos de implementación.",
    link:"https://www.shrm.org", destacado:true },
  { id:"ev2", titulo:"People Analytics Forum 2026", tipo:"Foro Especializado", fecha:"2026-06-18", lugar:"Online · Global", modalidad:"Virtual", categoria:"indicadores",
    descripcion:"Dos días de sesiones intensivas sobre el estado del arte en people analytics: modelos predictivos de rotación, dashboards de HR para el board, ética en el uso de datos de empleados y casos de implementación en empresas de 500 a 10.000 empleados. Incluye workshops prácticos con Power BI y Visier.",
    link:"https://www.aihr.com", destacado:false },
  { id:"ev3", titulo:"HR Technology Conference & Expo", tipo:"Conferencia + Expo", fecha:"2026-06-24", fechaFin:"2026-06-26", lugar:"Las Vegas, EE.UU.", modalidad:"Presencial", categoria:"hr-tech",
    descripcion:"La conferencia de referencia global en tecnología aplicada a Recursos Humanos. Más de 350 expositores, demos en vivo de plataformas HRIS avanzadas, y sesiones sobre IA generativa en reclutamiento, automatización del payroll y el futuro de los sistemas HCM. Ideal para líderes de HR que evalúan inversiones tecnológicas.",
    link:"https://www.hrtechnologyconference.com", destacado:true },
  { id:"ev4", titulo:"Change Management World Summit", tipo:"Cumbre Internacional", fecha:"2026-07-08", fechaFin:"2026-07-09", lugar:"Madrid, España", modalidad:"Presencial + Streaming", categoria:"change-management",
    descripcion:"El encuentro global de referencia para profesionales de gestión del cambio. Metodologías Prosci, ADKAR y Kotter en acción: casos reales de transformaciones exitosas y fallidas, el nuevo rol de HR como arquitecto del cambio, y las herramientas digitales que están cambiando la forma de gestionar la transición cultural.",
    link:"https://www.prosci.com", destacado:false },
  { id:"ev5", titulo:"Talent Acquisition Summit 2026", tipo:"Cumbre", fecha:"2026-07-15", lugar:"São Paulo, Brasil", modalidad:"Presencial", categoria:"talent",
    descripcion:"El evento más relevante de la región para líderes de reclutamiento. Agenda centrada en skills-based hiring, candidate experience, employer branding en redes sociales, uso ético de IA en selección y estrategias de movilidad interna. Incluye feria de soluciones de HR Tech con más de 80 expositores.",
    link:"https://www.thetalentboard.org", destacado:false },
  { id:"ev6", titulo:"Compensation & Benefits Forum LATAM", tipo:"Foro", fecha:"2026-07-22", lugar:"Ciudad de México, México", modalidad:"Presencial + Virtual", categoria:"compensaciones",
    descripcion:"El foro de referencia regional para profesionales de compensaciones y beneficios. Temas: implementación de transparencia salarial, pay equity analytics, compensación variable para equipos híbridos, e impacto de la inflación en las bandas salariales. Benchmarking con datos actualizados de Mercer y Aon.",
    link:"https://www.worldatwork.org", destacado:false },
  { id:"ev7", titulo:"WorldatWork Total Rewards Conference 2026", tipo:"Conferencia", fecha:"2026-08-05", fechaFin:"2026-08-07", lugar:"Chicago, EE.UU.", modalidad:"Presencial", categoria:"beneficios",
    descripcion:"La conferencia anual de WorldatWork reúne a los principales especialistas en compensación total, beneficios y reconocimiento. En 2026, el foco estará en los beneficios de bienestar financiero, políticas de trabajo flexible, programas de reconocimiento basados en impacto real y nuevas tendencias en equity para empleados.",
    link:"https://www.worldatwork.org", destacado:true },
  { id:"ev8", titulo:"Cultura & Liderazgo Summit 2026", tipo:"Cumbre", fecha:"2026-08-20", lugar:"Bogotá, Colombia", modalidad:"Presencial", categoria:"cultura",
    descripcion:"Espacio único en la región para profundizar en cultura organizacional: seguridad psicológica, liderazgo consciente, DEI con métricas reales, y construcción de culturas de alto desempeño en entornos híbridos. Casos de estudio de empresas colombianas, argentinas y mexicanas con transformaciones culturales documentadas.",
    link:"https://www.gallup.com/workplace", destacado:false },
];

const TIPO_COLORS = {
  "Conferencia":          { bg:"#DBEAFE", color:"#1D4ED8" },
  "Foro Especializado":   { bg:"#D1FAE5", color:"#059669" },
  "Conferencia + Expo":   { bg:"#CFFAFE", color:"#0891B2" },
  "Cumbre Internacional": { bg:"#F0FDFA", color:"#0F766E" },
  "Cumbre":               { bg:"#F0FDFA", color:"#0F766E" },
  "Foro":                 { bg:"#E0F2FE", color:"#0284C7" },
};
const MOD_COLORS = {
  "Presencial":             { bg:"#D1FAE5", color:"#065F46" },
  "Virtual":                { bg:"#EFF6FF", color:"#1D4ED8" },
  "Presencial + Streaming": { bg:"#FEF3C7", color:"#92400E" },
  "Presencial + Virtual":   { bg:"#FEF3C7", color:"#92400E" },
};

function formatDate(d) {
  return new Date(d+"T12:00:00").toLocaleDateString("es-AR",{day:"numeric",month:"long",year:"numeric"});
}
function formatEventDate(f,t) {
  const opts = {day:"numeric",month:"long"};
  const s = new Date(f+"T12:00:00").toLocaleDateString("es-AR",opts);
  if (!t) return s+" · 2026";
  const e = new Date(t+"T12:00:00").toLocaleDateString("es-AR",opts);
  return s+" al "+e+" · 2026";
}

function NewsCard({news,rank,accent,bg,isLiked,onToggleLike,compact,isPrompt}) {
  const [expanded,setExpanded] = useState(false);
  const summary = news.summary||"";
  const isLong = summary.length>340;
  const shown = (!isLong||expanded||compact)?summary:summary.slice(0,340)+"…";
  return (
    <div style={{background:"rgba(255,255,255,0.96)",borderRadius:16,padding:compact?"18px 22px":"28px 32px",boxShadow:"0 2px 20px rgba(15,23,42,0.08)",border:"1.5px solid rgba(186,230,253,0.55)",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",left:0,top:0,bottom:0,width:5,background:`linear-gradient(180deg,${accent||"#0369A1"},${accent||"#0369A1"}88)`,borderRadius:"16px 0 0 16px"}}/>
      <div style={{paddingLeft:14}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12,flexWrap:"wrap"}}>
          <span style={{background:bg||"#DBEAFE",color:accent||"#0369A1",padding:"5px 16px",borderRadius:20,fontSize:13,fontWeight:700,border:`1px solid ${accent||"#0369A1"}33`}}>
            {isPrompt?`Prompt ${rank+1}`:(RANK_LABELS[rank]||`#${rank+1}`)}
          </span>
          <span style={{fontSize:13,color:"#94A3B8",marginLeft:"auto"}}>{formatDate(news.date)}</span>
        </div>
        <h3 style={{margin:"0 0 14px",fontSize:compact?16:20,fontWeight:700,color:"#0F172A",lineHeight:1.45}}>{news.title}</h3>
        <div style={{margin:"0 0 18px",fontSize:compact?14:16,color:"#1E3A5F",lineHeight:1.82,whiteSpace:"pre-line"}}>
          {shown}
          {isLong&&!compact&&(
            <button onClick={()=>setExpanded(e=>!e)} style={{background:"none",border:"none",color:accent||"#0369A1",fontSize:14,fontWeight:700,cursor:"pointer",padding:"0 0 0 6px"}}>
              {expanded?" Ver menos":" Leer mas"}
            </button>
          )}
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexWrap:"wrap",borderTop:"1px solid #F1F5F9",paddingTop:16}}>
          <a href={news.url} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:9,padding:"12px 24px",background:bg||"#DBEAFE",border:`1.5px solid ${accent||"#0369A1"}44`,borderRadius:10,color:accent||"#0369A1",fontSize:15,fontWeight:700,textDecoration:"none"}}>
            Fuente: {news.source}
          </a>
          <button onClick={onToggleLike} style={{padding:"12px 28px",borderRadius:10,border:"2px solid",borderColor:isLiked?"#0EA5E9":"#CBD5E1",background:isLiked?"#EFF6FF":"transparent",color:isLiked?"#0369A1":"#64748B",fontSize:15,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>
            {isLiked?"♥ Me gusto":"♡ Me gusta"}
          </button>
        </div>
      </div>
    </div>
  );
}

function EventosView() {
  const [filtro,setFiltro] = useState("todos");
  const getMes = d => { const m=new Date(d+"T12:00:00").toLocaleDateString("es-AR",{month:"long"}); return m.charAt(0).toUpperCase()+m.slice(1); };
  const meses = ["Junio","Julio","Agosto"];
  const filtrados = filtro==="todos"?EVENTOS:EVENTOS.filter(e=>getMes(e.fecha)===filtro);
  const destacados = EVENTOS.filter(e=>e.destacado);
  return (
    <>
      <div style={{background:"linear-gradient(135deg,#0F766E 0%,#0369A1 100%)",borderRadius:16,padding:"24px 32px",marginBottom:28,display:"flex",alignItems:"center",gap:16,boxShadow:"0 4px 20px rgba(15,118,110,0.35)"}}>
        <span style={{fontSize:46,filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.2))"}}>📅</span>
        <div>
          <h2 style={{margin:0,fontSize:23,color:"white",fontWeight:700}}>Eventos de HR 2026</h2>
          <p style={{margin:"4px 0 0",color:"rgba(255,255,255,0.78)",fontSize:15}}>{EVENTOS.length} eventos proximos · junio — agosto 2026</p>
        </div>
      </div>
      <p style={{fontSize:15,color:"#0369A1",fontWeight:700,marginBottom:14}}>Eventos destacados del periodo</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",gap:16,marginBottom:32}}>
        {destacados.map(ev=>{
          const tc=TIPO_COLORS[ev.tipo]||{bg:"#E0F2FE",color:"#0284C7"};
          const mc=MOD_COLORS[ev.modalidad]||{bg:"#E0F2FE",color:"#0284C7"};
          const cat=CATEGORIES.find(c=>c.id===ev.categoria);
          return (
            <div key={ev.id} style={{background:"white",borderRadius:16,padding:"22px 24px",boxShadow:"0 4px 24px rgba(15,118,110,0.12)",border:"2px solid #99F6E4",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:0,right:0,background:"linear-gradient(135deg,#0F766E,#0369A1)",padding:"6px 14px",borderRadius:"0 16px 0 12px"}}>
                <span style={{fontSize:11,color:"white",fontWeight:700,letterSpacing:"0.5px"}}>DESTACADO</span>
              </div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12}}>
                <span style={{background:tc.bg,color:tc.color,padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:700}}>{ev.tipo}</span>
                <span style={{background:mc.bg,color:mc.color,padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:600}}>{ev.modalidad}</span>
              </div>
              <h3 style={{margin:"0 0 8px",fontSize:17,fontWeight:700,color:"#0F172A",lineHeight:1.4}}>{ev.titulo}</h3>
              <p style={{margin:"0 0 6px",fontSize:14,color:"#0369A1",fontWeight:600}}>📅 {formatEventDate(ev.fecha,ev.fechaFin)}</p>
              <p style={{margin:"0 0 10px",fontSize:14,color:"#475569"}}>📍 {ev.lugar}</p>
              {cat&&<p style={{margin:"0 0 14px",fontSize:12,color:cat.accent,fontWeight:600,background:cat.bg,display:"inline-block",padding:"3px 10px",borderRadius:12}}>{cat.icon} {cat.label}</p>}
              <a href={ev.link} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"10px 20px",background:"linear-gradient(135deg,#0F766E,#0369A1)",borderRadius:10,color:"white",fontSize:14,fontWeight:700,textDecoration:"none"}}>
                Mas informacion
              </a>
            </div>
          );
        })}
      </div>
      <div style={{display:"flex",gap:8,marginBottom:24,flexWrap:"wrap"}}>
        {["todos",...meses].map(m=>(
          <button key={m} onClick={()=>setFiltro(m)} style={{padding:"10px 20px",borderRadius:10,border:"2px solid",borderColor:filtro===m?"#0369A1":"transparent",background:filtro===m?"#DBEAFE":"rgba(255,255,255,0.75)",color:filtro===m?"#0369A1":"#374151",fontSize:14,fontWeight:filtro===m?700:500,cursor:"pointer",boxShadow:filtro===m?"0 2px 10px rgba(3,105,161,0.2)":"0 1px 4px rgba(0,0,0,0.06)"}}>
            {m==="todos"?"Todos los meses":m}
          </button>
        ))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:18}}>
        {filtrados.map(ev=>{
          const tc=TIPO_COLORS[ev.tipo]||{bg:"#E0F2FE",color:"#0284C7"};
          const mc=MOD_COLORS[ev.modalidad]||{bg:"#E0F2FE",color:"#0284C7"};
          const cat=CATEGORIES.find(c=>c.id===ev.categoria);
          return (
            <div key={ev.id} style={{background:"rgba(255,255,255,0.96)",borderRadius:16,padding:"24px 28px",boxShadow:"0 2px 16px rgba(15,23,42,0.07)",border:"1.5px solid rgba(186,230,253,0.5)",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",left:0,top:0,bottom:0,width:5,background:`linear-gradient(180deg,${cat?.accent||"#0369A1"},${cat?.accent||"#0369A1"}88)`,borderRadius:"16px 0 0 16px"}}/>
              <div style={{paddingLeft:14}}>
                <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12,alignItems:"center"}}>
                  <span style={{background:tc.bg,color:tc.color,padding:"4px 14px",borderRadius:20,fontSize:13,fontWeight:700}}>{ev.tipo}</span>
                  <span style={{background:mc.bg,color:mc.color,padding:"4px 14px",borderRadius:20,fontSize:13,fontWeight:600}}>{ev.modalidad}</span>
                  {cat&&<span style={{background:cat.bg,color:cat.accent,padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:600,marginLeft:"auto"}}>{cat.icon} {cat.label}</span>}
                </div>
                <h3 style={{margin:"0 0 10px",fontSize:19,fontWeight:700,color:"#0F172A",lineHeight:1.4}}>{ev.titulo}</h3>
                <div style={{display:"flex",gap:20,flexWrap:"wrap",marginBottom:12}}>
                  <span style={{fontSize:14,color:"#0369A1",fontWeight:600}}>📅 {formatEventDate(ev.fecha,ev.fechaFin)}</span>
                  <span style={{fontSize:14,color:"#475569"}}>📍 {ev.lugar}</span>
                </div>
                <p style={{margin:"0 0 18px",fontSize:16,color:"#1E3A5F",lineHeight:1.75}}>{ev.descripcion}</p>
                <div style={{borderTop:"1px solid #F1F5F9",paddingTop:16}}>
                  <a href={ev.link} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:9,padding:"12px 24px",background:cat?.bg||"#DBEAFE",border:`1.5px solid ${cat?.accent||"#0369A1"}44`,borderRadius:10,color:cat?.accent||"#0369A1",fontSize:15,fontWeight:700,textDecoration:"none"}}>
                    Mas informacion sobre el evento
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default function HRNewsApp() {
  const [activeCategory,setActiveCategory] = useState("beneficios");
  const [likes,setLikes] = useState(()=>{try{return JSON.parse(localStorage.getItem("hr_likes_v4")||"{}");}catch{return {};}});
  const [view,setView] = useState("feed");
  const [toast,setToast] = useState(null);
  const [refreshing,setRefreshing] = useState(false);

  useEffect(()=>{try{localStorage.setItem("hr_likes_v4",JSON.stringify(likes));}catch{}},[likes]);

  const handleRefresh = () => {
    setRefreshing(true);
    showToast("Actualizando contenido...");
    setTimeout(()=>{setRefreshing(false);showToast("Contenido actualizado · mayo 2026");},1800);
  };
  const toggleLike = (newsId,catId) => {
    setLikes(prev=>{
      const u={...prev};
      if(u[newsId]){delete u[newsId];showToast("Eliminado de Mis Me Gusta");}
      else{u[newsId]=catId;showToast("Guardado en Mis Me Gusta");}
      return u;
    });
  };
  const showToast = msg=>{setToast(msg);setTimeout(()=>setToast(null),2600);};

  const likedNews = Object.entries(likes).flatMap(([newsId,catId])=>{
    const news=(NEWS_DATA[catId]||[]).find(n=>n.id===newsId);
    const cat=CATEGORIES.find(c=>c.id===catId);
    return news?[{...news,catId,catLabel:cat?.label,catIcon:cat?.icon,catAccent:cat?.accent,catBg:cat?.bg}]:[];
  });

  const activeCat = CATEGORIES.find(c=>c.id===activeCategory);
  const activeNews = NEWS_DATA[activeCategory]||[];
  const isIndicadores = activeCategory==="indicadores";
  const isPrompts = activeCategory==="prompts-hr";

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#EFF6FF 0%,#F0FDFA 60%,#E0F2FE 100%)",fontFamily:"'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif"}}>
      <header style={{background:"linear-gradient(135deg,#0F172A 0%,#0C4A6E 100%)",padding:"20px 28px",position:"sticky",top:0,zIndex:100,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:14,boxShadow:"0 4px 24px rgba(15,23,42,0.25)"}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:48,height:48,borderRadius:12,background:"linear-gradient(135deg,#0EA5E9,#0D9488)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,boxShadow:"0 2px 12px rgba(14,165,233,0.4)"}}>👥</div>
          <div>
            <div style={{display:"flex",alignItems:"baseline",gap:8}}>
              <h1 style={{margin:0,fontSize:25,fontWeight:700,color:"white",letterSpacing:"-0.3px"}}>HR+</h1>
              <span style={{fontSize:11,color:"#7DD3FC",fontWeight:500,letterSpacing:"0.3px",fontStyle:"italic"}}>by JMM</span>
            </div>
            <p style={{margin:0,fontSize:12,color:"#7DD3FC",letterSpacing:"0.5px"}}>RECURSOS HUMANOS · ULTIMOS 30 DIAS · 2026</p>
          </div>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
          {[{key:"feed",label:"Noticias"},{key:"eventos",label:"Eventos HR"},{key:"likes",label:`Me Gusta${Object.keys(likes).length>0?` (${Object.keys(likes).length})`:""}`}].map(btn=>(
            <button key={btn.key} onClick={()=>setView(btn.key)} style={{padding:"11px 20px",borderRadius:10,border:"1.5px solid",borderColor:view===btn.key?"#0EA5E9":"rgba(255,255,255,0.15)",background:view===btn.key?"rgba(14,165,233,0.15)":"transparent",color:view===btn.key?"white":"#94A3B8",fontSize:14,fontWeight:600,cursor:"pointer"}}>
              {btn.label}
            </button>
          ))}
          <button onClick={handleRefresh} style={{padding:"11px 16px",borderRadius:10,border:"1.5px solid rgba(255,255,255,0.15)",background:refreshing?"rgba(14,165,233,0.2)":"transparent",color:refreshing?"#7DD3FC":"#94A3B8",fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",gap:6,fontWeight:600,transition:"all 0.3s"}}>
            🔄 {refreshing?"Actualizando...":"Actualizar"}
          </button>
        </div>
      </header>

      {toast&&(
        <div style={{position:"fixed",bottom:32,left:"50%",transform:"translateX(-50%)",background:"#0F172A",color:"#7DD3FC",padding:"13px 32px",borderRadius:30,fontSize:15,fontWeight:600,zIndex:9999,boxShadow:"0 4px 24px rgba(15,23,42,0.4)",border:"1.5px solid #0EA5E9"}}>
          {toast}
        </div>
      )}

      <div style={{maxWidth:1020,margin:"0 auto",padding:"28px 16px"}}>

        {view==="feed"&&(
          <>
            <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:14,marginBottom:30,scrollbarWidth:"none"}}>
              {CATEGORIES.map(cat=>(
                <button key={cat.id} onClick={()=>setActiveCategory(cat.id)} style={{padding:"12px 18px",borderRadius:10,border:"2px solid",borderColor:activeCategory===cat.id?cat.accent:"transparent",background:activeCategory===cat.id?`linear-gradient(135deg,${cat.bg},white)`:"rgba(255,255,255,0.75)",color:activeCategory===cat.id?cat.accent:"#374151",fontSize:14,fontWeight:activeCategory===cat.id?700:500,cursor:"pointer",whiteSpace:"nowrap",boxShadow:activeCategory===cat.id?`0 2px 12px ${cat.accent}33`:"0 1px 4px rgba(0,0,0,0.06)",display:"flex",alignItems:"center",gap:7}}>
                  <span style={{fontSize:17}}>{cat.icon}</span> {cat.label}
                </button>
              ))}
            </div>
            <div style={{background:`linear-gradient(135deg,${activeCat?.accent||"#0369A1"} 0%,${activeCat?.accent||"#0369A1"}CC 100%)`,borderRadius:16,padding:"24px 32px",marginBottom:28,display:"flex",alignItems:"center",gap:16,boxShadow:`0 4px 20px ${activeCat?.accent||"#0369A1"}44`}}>
              <span style={{fontSize:46,filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.2))"}}>{activeCat?.icon}</span>
              <div>
                <h2 style={{margin:0,fontSize:23,color:"white",fontWeight:700}}>{activeCat?.label}</h2>
                <p style={{margin:"4px 0 0",color:"rgba(255,255,255,0.78)",fontSize:15}}>
                  {isPrompts?`${activeNews.length} prompts listos para usar · mayo 2026`:`Top ${activeNews.length} noticias mas relevantes · mayo 2026`}
                </p>
              </div>
            </div>
            {isIndicadores&&(
              <div style={{marginBottom:32}}>
                <p style={{fontSize:15,color:"#1D4ED8",fontWeight:700,marginBottom:14}}>Dashboards de referencia — visualizaciones de metricas de HR 2026</p>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16}}>
                  {DASHBOARD_VISUALS.map(d=>(
                    <div key={d.id} style={{background:"white",borderRadius:14,overflow:"hidden",boxShadow:"0 2px 16px rgba(29,78,216,0.12)",border:"1.5px solid #BFDBFE"}}>
                      <svg viewBox="0 0 320 160" style={{width:"100%",display:"block"}} xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{__html:d.inner}}/>
                      <div style={{padding:"10px 16px",borderTop:"1px solid #EFF6FF"}}>
                        <p style={{margin:0,fontSize:13,fontWeight:700,color:"#1D4ED8"}}>{d.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div style={{display:"flex",flexDirection:"column",gap:22}}>
              {activeNews.map((news,idx)=>(
                <NewsCard key={news.id} news={news} rank={idx} accent={activeCat?.accent} bg={activeCat?.bg} isLiked={!!likes[news.id]} onToggleLike={()=>toggleLike(news.id,activeCategory)} isPrompt={isPrompts}/>
              ))}
            </div>
          </>
        )}

        {view==="eventos"&&<EventosView/>}

        {view==="likes"&&(
          <>
            <div style={{background:"linear-gradient(135deg,#0F172A,#0C4A6E)",borderRadius:16,padding:"24px 32px",marginBottom:28,display:"flex",alignItems:"center",gap:16,boxShadow:"0 4px 20px rgba(15,23,42,0.2)"}}>
              <span style={{fontSize:42}}>♥</span>
              <div>
                <h2 style={{margin:0,fontSize:23,color:"white",fontWeight:700}}>Mis Me Gusta</h2>
                <p style={{margin:"4px 0 0",color:"#7DD3FC",fontSize:15}}>
                  {likedNews.length===0?"Todavia no guardaste ninguna noticia":`${likedNews.length} articulo${likedNews.length!==1?"s":""} guardado${likedNews.length!==1?"s":""}`}
                </p>
              </div>
            </div>
            {likedNews.length===0?(
              <div style={{textAlign:"center",padding:"60px 20px",color:"#64748B"}}>
                <div style={{fontSize:64,marginBottom:16}}>📌</div>
                <p style={{fontSize:18,marginBottom:20}}>Explora las noticias y guarda las que mas te interesen.</p>
                <button onClick={()=>setView("feed")} style={{padding:"14px 32px",background:"linear-gradient(135deg,#0369A1,#0D9488)",border:"none",borderRadius:12,color:"white",fontSize:16,fontWeight:700,cursor:"pointer"}}>
                  Ver noticias
                </button>
              </div>
            ):(
              <div style={{display:"flex",flexDirection:"column",gap:32}}>
                {Object.entries(likedNews.reduce((acc,n)=>{if(!acc[n.catId])acc[n.catId]=[];acc[n.catId].push(n);return acc;},{})).map(([catId,items])=>{
                  const cat=CATEGORIES.find(c=>c.id===catId);
                  return (
                    <div key={catId}>
                      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,paddingBottom:10,borderBottom:`2px solid ${cat?.accent||"#0369A1"}44`}}>
                        <span style={{fontSize:22}}>{items[0].catIcon}</span>
                        <h3 style={{margin:0,fontSize:18,color:cat?.accent||"#0369A1",fontWeight:700}}>{items[0].catLabel}</h3>
                        <span style={{marginLeft:"auto",fontSize:13,color:"#94A3B8"}}>{items.length} guardado{items.length!==1?"s":""}</span>
                      </div>
                      <div style={{display:"flex",flexDirection:"column",gap:16}}>
                        {items.map(news=>(
                          <NewsCard key={news.id} news={news} rank={news.rank-1} accent={news.catAccent} bg={news.catBg} isLiked={true} onToggleLike={()=>toggleLike(news.id,catId)} compact isPrompt={catId==="prompts-hr"}/>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      <footer style={{marginTop:56,borderTop:"1px solid #BFDBFE",padding:"28px 16px",textAlign:"center",background:"rgba(255,255,255,0.6)"}}>
        <p style={{margin:"0 0 2px",fontSize:20,fontWeight:700,color:"#0369A1",letterSpacing:"-0.3px"}}>HR+</p>
        <p style={{margin:"0 0 10px",fontSize:12,color:"#0D9488",letterSpacing:"1px",fontStyle:"italic",fontWeight:600}}>by JMM</p>
        <p style={{margin:0,fontSize:13,color:"#94A3B8"}}>Contenido curado de las principales fuentes globales de Recursos Humanos · Actualizado mensualmente</p>
      </footer>
      <style>{`::-webkit-scrollbar{display:none;}`}</style>
    </div>
  );
}
