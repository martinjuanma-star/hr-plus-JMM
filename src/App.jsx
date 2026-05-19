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
    id:"d1", label:"Headcount & Rotacion Q1 2026",
    source:"Gartner HR Research", url:"https://www.gartner.com/en/human-resources",
    inner:`<rect width="320" height="160" rx="12" fill="#0F172A"/><text x="16" y="22" font-size="10" fill="#64748B" font-family="monospace" letter-spacing="1">HEADCOUNT · ROTACION Q1 2026</text><rect x="20" y="55" width="24" height="82" rx="3" fill="#0EA5E9" opacity=".8"/><rect x="56" y="38" width="24" height="99" rx="3" fill="#0EA5E9" opacity=".8"/><rect x="92" y="48" width="24" height="89" rx="3" fill="#0EA5E9" opacity=".8"/><rect x="128" y="30" width="24" height="107" rx="3" fill="#22D3EE"/><rect x="164" y="43" width="24" height="94" rx="3" fill="#0EA5E9" opacity=".8"/><rect x="200" y="25" width="24" height="112" rx="3" fill="#22D3EE"/><rect x="236" y="35" width="24" height="102" rx="3" fill="#0EA5E9" opacity=".8"/><rect x="272" y="28" width="24" height="109" rx="3" fill="#22D3EE"/><polyline points="32,68 68,52 104,62 140,44 176,56 212,38 248,48 284,42" fill="none" stroke="#F472B6" stroke-width="2.5"/><circle cx="32" cy="68" r="3" fill="#F472B6"/><circle cx="68" cy="52" r="3" fill="#F472B6"/><circle cx="104" cy="62" r="3" fill="#F472B6"/><circle cx="140" cy="44" r="3" fill="#F472B6"/><circle cx="176" cy="56" r="3" fill="#F472B6"/><circle cx="212" cy="38" r="3" fill="#F472B6"/><circle cx="248" cy="48" r="3" fill="#F472B6"/><circle cx="284" cy="42" r="3" fill="#F472B6"/><rect x="16" y="146" width="8" height="8" rx="1" fill="#0EA5E9"/><text x="28" y="153" font-size="9" fill="#94A3B8" font-family="monospace">Headcount</text><rect x="110" y="146" width="8" height="8" rx="1" fill="#F472B6"/><text x="122" y="153" font-size="9" fill="#94A3B8" font-family="monospace">Rotacion %</text><rect x="218" y="140" width="88" height="16" rx="4" fill="#1E293B"/><text x="224" y="151" font-size="9" fill="#22D3EE" font-family="monospace">up 5.1% headcount</text>`,
  },
  {
    id:"d2", label:"Employee Engagement eNPS Q1 2026",
    source:"AIHR People Analytics", url:"https://www.aihr.com",
    inner:`<rect width="320" height="160" rx="12" fill="#0F172A"/><text x="16" y="22" font-size="10" fill="#64748B" font-family="monospace" letter-spacing="1">EMPLOYEE ENGAGEMENT Q1 2026</text><circle cx="82" cy="96" r="46" fill="none" stroke="#1E293B" stroke-width="20"/><circle cx="82" cy="96" r="46" fill="none" stroke="#0EA5E9" stroke-width="20" stroke-dasharray="202 87" stroke-dashoffset="70" stroke-linecap="round"/><circle cx="82" cy="96" r="46" fill="none" stroke="#22D3EE" stroke-width="20" stroke-dasharray="62 227" stroke-dashoffset="-132" stroke-linecap="round"/><circle cx="82" cy="96" r="46" fill="none" stroke="#F87171" stroke-width="20" stroke-dasharray="25 264" stroke-dashoffset="-194" stroke-linecap="round"/><text x="82" y="90" font-size="22" fill="white" text-anchor="middle" font-family="monospace" font-weight="bold">76%</text><text x="82" y="108" font-size="9" fill="#94A3B8" text-anchor="middle" font-family="monospace">eNPS Score</text><text x="158" y="50" font-size="10" fill="#94A3B8" font-family="monospace">Promotores</text><rect x="158" y="55" width="140" height="11" rx="3" fill="#1E293B"/><rect x="158" y="55" width="106" height="11" rx="3" fill="#0EA5E9"/><text x="303" y="64" font-size="9" fill="#0EA5E9" font-family="monospace">76%</text><text x="158" y="82" font-size="10" fill="#94A3B8" font-family="monospace">Neutros</text><rect x="158" y="87" width="140" height="11" rx="3" fill="#1E293B"/><rect x="158" y="87" width="48" height="11" rx="3" fill="#22D3EE"/><text x="303" y="96" font-size="9" fill="#22D3EE" font-family="monospace">34%</text><text x="158" y="114" font-size="10" fill="#94A3B8" font-family="monospace">Detractores</text><rect x="158" y="119" width="140" height="11" rx="3" fill="#1E293B"/><rect x="158" y="119" width="14" height="11" rx="3" fill="#F87171"/><text x="303" y="128" font-size="9" fill="#F87171" font-family="monospace">10%</text>`,
  },
  {
    id:"d3", label:"Talent Metrics Time to Fill 2026",
    source:"Gallup Workplace Report", url:"https://www.gallup.com/workplace",
    inner:`<rect width="320" height="160" rx="12" fill="#0F172A"/><text x="16" y="22" font-size="10" fill="#64748B" font-family="monospace" letter-spacing="1">TALENT METRICS Q1 2026</text><text x="16" y="45" font-size="9" fill="#475569" font-family="monospace">TIME TO FILL (dias)</text><line x1="16" y1="75" x2="300" y2="75" stroke="#1E293B" stroke-width="1"/><polyline points="16,72 60,62 104,67 148,54 192,59 236,47 280,52" fill="none" stroke="#22D3EE" stroke-width="2.5"/><circle cx="280" cy="52" r="4" fill="#22D3EE"/><text x="286" y="56" font-size="12" fill="#22D3EE" font-family="monospace" font-weight="bold">24d</text><text x="16" y="100" font-size="9" fill="#475569" font-family="monospace">COSTO POR HIRE (USD k)</text><line x1="16" y1="130" x2="300" y2="130" stroke="#1E293B" stroke-width="1"/><polyline points="16,127 60,122 104,125 148,115 192,119 236,108 280,112" fill="none" stroke="#6EE7B7" stroke-width="2.5"/><circle cx="280" cy="112" r="4" fill="#6EE7B7"/><text x="286" y="116" font-size="12" fill="#6EE7B7" font-family="monospace" font-weight="bold">2.9k</text><rect x="16" y="145" width="72" height="12" rx="3" fill="#1E293B"/><text x="20" y="154" font-size="8" fill="#0EA5E9" font-family="monospace">down 14% vs 2025</text><rect x="96" y="145" width="88" height="12" rx="3" fill="#1E293B"/><text x="100" y="154" font-size="8" fill="#6EE7B7" font-family="monospace">down 9% costo hire</text>`,
  },
];

const NEWS_DATA = {
  "beneficios": [
    { id:"b1", rank:1, title:"Beneficios personalizados con IA: cada empleado recibe su propuesta unica",
      summary:`En 2026, las plataformas de beneficios que usan inteligencia artificial para analizar el perfil, ciclo de vida y preferencias de cada empleado estan reemplazando los catalogos estaticos. El sistema aprende de los patrones de uso, los momentos vitales de cada persona y las senales de bienestar para sugerir activamente que beneficio activar y cuando.\n\nLas organizaciones que implementaron este modelo reportan un aumento del 46% en la utilizacion efectiva de beneficios y una caida del 22% en la rotacion voluntaria. Los beneficios dejan de ser un catalogo que el empleado debe explorar y se convierten en una propuesta proactiva que la empresa hace en el momento justo.`,
      source:"ADRHA & SHRM", url:"https://www.adrha.org.ar", date:"2026-05-12" },
    { id:"b2", rank:2, title:"El beneficio mas solicitado en 2026: semanas de trabajo comprimidas",
      summary:`La semana de cuatro dias o la semana comprimida se instalo como el beneficio mas demandado por los candidatos en 2026, superando por primera vez al home office. Los pilotos extendidos durante 2024 y 2025 generaron datos suficientes para que las organizaciones mas conservadoras comenzaran a adoptarlo como politica permanente.\n\nLos resultados son consistentes: productividad equivalente o superior, reduccion del 31% en el ausentismo y mejora significativa en los indicadores de bienestar mental. Las empresas que todavia no lo adoptaron enfrentan una desventaja competitiva real en la atraccion de talento calificado, especialmente entre los 28 y 42 anos.`,
      source:"IAE Business School & HBR", url:"https://www.iae.edu.ar", date:"2026-05-07" },
    { id:"b3", rank:3, title:"Cuidado de mayores: el beneficio olvidado que toma protagonismo",
      summary:`El 34% de los trabajadores entre 40 y 58 anos reporta responsabilidades de cuidado de un familiar mayor, lo que impacta directamente en su concentracion, ausentismo y deseo de permanecer en el empleo. Las organizaciones estan incorporando beneficios de apoyo al cuidado de adultos mayores dependientes.\n\nDesde plataformas de coordinacion de cuidadores hasta dias adicionales por cuidado, las empresas que actuan reportan una mejora notable en la percepcion como empleadora que entiende la vida real de sus colaboradores. Es el nicho de beneficios con mayor crecimiento proyectado para el periodo 2026-2028.`,
      source:"Universidad Austral & Forbes", url:"https://www.austral.edu.ar", date:"2026-04-28" },
  ],
  "marca-empleadora": [
    { id:"me1", rank:1, title:"Employer branding generacional: la Gen Z obliga a reescribir el manual",
      summary:`La Generacion Z ya representa el 27% de la fuerza laboral global y su relacion con las marcas empleadoras rompe todos los esquemas previos. No les interesan las promesas de crecimiento sin evidencia concreta, ni los valores corporativos que no se reflejan en las decisiones reales. Investigan en TikTok, Reddit y Glassdoor antes de leer la descripcion del puesto.\n\nLas organizaciones que lideran la atraccion de este segmento tienen tres cosas en comun: radical transparencia sobre la cultura interna, lideres accesibles que hablan en primera persona en redes sociales, y evidencia medible de impacto social. El employer branding para Gen Z no se construye en comunicaciones: se construye en cada decision del liderazgo.`,
      source:"ADRHA & LinkedIn Talent", url:"https://www.adrha.org.ar", date:"2026-05-14" },
    { id:"me2", rank:2, title:"Las empresas mejor calificadas en LATAM 2026: que las diferencia",
      summary:`El ranking de Glassdoor para America Latina 2026 muestra un patron que se consolida: las empresas mejor calificadas no son necesariamente las que mas pagan, sino las que generan mayor claridad sobre el futuro profesional y mayor coherencia entre lo que prometen y lo que entregan.\n\nLos tres atributos con mayor correlacion con la calificacion son: calidad percibida del liderazgo directo, posibilidades reales de movilidad interna, y honestidad en momentos dificiles. Las empresas con puntaje mayor a 4.3 tienen un costo de reclutamiento 40% menor y una tasa de aceptacion de ofertas del 78%, versus el 52% del promedio de mercado.`,
      source:"Mercer Argentina & Glassdoor", url:"https://www.mercer.com/ar", date:"2026-05-05" },
    { id:"me3", rank:3, title:"El video corto como formato dominante en employer branding",
      summary:`En 2026, el contenido de employer branding en video corto (menos de 90 segundos) genera 4.7 veces mas interaccion que cualquier otro formato. TikTok, Instagram Reels y YouTube Shorts son los canales prioritarios para llegar a candidatos menores de 35 anos.\n\nLas organizaciones que mejor aprovechan este formato no producen piezas de marketing profesional: le dan el celular a sus empleados y les piden que compartan un minuto de su dia real. La autenticidad no se puede fingir en video corto, y los candidatos lo detectan en segundos.`,
      source:"Univ. de San Andres & EBI", url:"https://www.udesa.edu.ar", date:"2026-04-22" },
  ],
  "people-experience": [
    { id:"pe1", rank:1, title:"Employee Journey 2026: los seis momentos que definen la experiencia completa",
      summary:`La investigacion mas reciente identifica seis momentos con capacidad desproporcionada de impacto en la experiencia total: la primera semana, la primera evaluacion, la primera oportunidad de ascenso (ganada o perdida), el primer momento de crisis personal, el momento en que el empleado considera irse y decide quedarse, y la salida de la organizacion.\n\nLas organizaciones que disenan intervenciones especificas para cada uno de estos seis momentos tienen un Net Promoter Score interno 38 puntos superior al promedio. La clave es que el diseno no puede delegarse solo a HR: requiere co-diseno con managers de linea, quienes realmente ejecutan la experiencia en el dia a dia.`,
      source:"Deloitte Argentina & Insights", url:"https://www2.deloitte.com/ar", date:"2026-05-10" },
    { id:"pe2", rank:2, title:"Feedback continuo: herramientas, cadencias y el rol del manager",
      summary:`El ciclo anual de evaluacion de desempeno esta practicamente extinto en las organizaciones de mayor madurez. Los modelos de feedback continuo con check-ins cada dos o cuatro semanas se consolidaron como el nuevo estandar. La tecnologia resolvio la parte operativa; el desafio en 2026 es humano.\n\nSolo el 38% de los managers reporta sentirse preparado para conversaciones de feedback de calidad. El entrenamiento en estas habilidades se convirtio en la prioridad numero uno de desarrollo de liderazgo en las organizaciones que mas invierten en people experience este ano.`,
      source:"McKinsey LATAM & Univ. de los Andes", url:"https://www.mckinsey.com/americas", date:"2026-05-03" },
    { id:"pe3", rank:3, title:"Offboarding: el momento mas descuidado y el mas recordado",
      summary:`Las organizaciones gastan en promedio 14 veces mas en el proceso de incorporacion que en el de salida. Sin embargo, la forma en que una persona vive su ultimo mes tiene un impacto determinante en su comportamiento como alumni: si recomienda la empresa a candidatos, si vuelve como cliente, si comparte su experiencia en redes.\n\nLos empleados que viven un buen proceso de salida tienen un 67% mas de probabilidad de recomendar la empresa como empleadora despues de haberse ido. Disenar el offboarding con la misma intencion que el onboarding es una de las oportunidades mas desaprovechadas en gestion de personas.`,
      source:"ADRHA & SHRM", url:"https://www.adrha.org.ar", date:"2026-04-25" },
  ],
  "compensaciones": [
    { id:"c1", rank:1, title:"Directiva de Transparencia Salarial UE 2026: que cambia y como prepararse",
      summary:`La Directiva Europea de Transparencia Salarial entro en vigor en su fase mas exigente en 2026. Las organizaciones con mas de 100 empleados deben publicar rangos salariales en todas las ofertas, reportar la brecha de genero y responder en 30 dias a consultas de empleados sobre su posicionamiento salarial relativo.\n\nEl impacto va mas alla del cumplimiento: las organizaciones estan descubriendo inequidades internas que nunca habian cuantificado. Las empresas que se prepararon anticipadamente invierten en correccion de inequidades; las que llegaron tarde gestionan la crisis de confianza interna que genera descubrir las brechas sin haberlas comunicado.`,
      source:"WorldatWork & UCEMA", url:"https://www.ucema.edu.ar", date:"2026-05-13" },
    { id:"c2", rank:2, title:"Pay equity analytics: como las organizaciones miden y corrigen la brecha salarial",
      summary:`Mas alla del cumplimiento normativo, las organizaciones lideres implementan modelos de pay equity analytics que identifican proactivamente brechas injustificadas por genero, origen etnico, edad y trayectoria. Estos modelos ajustan por rol, nivel, desempeno y antiguedad para aislar el efecto de caracteristicas no relacionadas con el trabajo.\n\nEl dato mas revelador: en el 78% de los casos donde se encontraron brechas injustificadas, los managers directos no eran conscientes de haberlas generado. La intencion no es suficiente sin sistemas de revision estructurados y periodicos.`,
      source:"Mercer Argentina", url:"https://www.mercer.com/ar", date:"2026-05-06" },
    { id:"c3", rank:3, title:"Variable pay en 2026: disenar incentivos que realmente motiven",
      summary:`Los planes de compensacion variable de hace diez anos fueron creados para un contexto completamente diferente. Las organizaciones los estan revisando con tres preguntas clave: el indicador que se mide, si el empleado tiene control real sobre ese indicador, y si el periodo de medicion tiene sentido dado el tipo de trabajo.\n\nLos planes que no superan estas tres preguntas generan frustracion y sensacion de arbitrariedad, no motivacion. Las organizaciones mas avanzadas migran hacia estructuras de pago variable mas frecuentes, con metricas mas simples y directas vinculadas al impacto real del rol.`,
      source:"Aon Argentina & FGV Brasil", url:"https://www.aon.com/argentina", date:"2026-04-29" },
  ],
  "payroll": [
    { id:"py1", rank:1, title:"Payroll en tiempo real: el nuevo estandar que llego para quedarse",
      summary:`Lo que en 2023 era una promesa de startups fintech, en 2026 se consolido como expectativa de mercado en multiples sectores. El pago en tiempo real o semanal dejo de ser un diferenciador y empieza a ser una condicion de entrada en ciertos mercados de talento.\n\nLas plataformas de Earned Wage Access maduraron significativamente: integracion nativa con los principales HRIS, modelos de costo asumido por el empleador, y cumplimiento regulatorio en 28 paises. Las organizaciones que lideraron la adopcion temprana reportan ventaja medible en retencion de personal operativo y velocidad de cobertura de posiciones en temporadas de alta demanda.`,
      source:"ADP LATAM & Univ. Austral", url:"https://www.adp.com/latam", date:"2026-05-09" },
    { id:"py2", rank:2, title:"IA en la liquidacion de sueldos: precision, auditoria y nuevas responsabilidades",
      summary:`Los motores de calculo de nomina basados en IA estan siendo adoptados por organizaciones de todos los tamanios en 2026. Los resultados son reales: reduccion de errores, velocidad de procesamiento y capacidad de manejar complejidad regulatoria multi-pais. Pero tambien lo son los nuevos desafios.\n\nCuando un algoritmo comete un error de liquidacion a escala, el impacto es masivo y la trazabilidad puede ser dificil de auditar. Las organizaciones mas maduras invierten tanto en las herramientas de IA como en los procesos de gobernanza que las acompanan: quien puede cambiar parametros, como se registran las modificaciones, y quien tiene responsabilidad final.`,
      source:"Payroll.org & IDEA Argentina", url:"https://www.idea.org.ar", date:"2026-05-02" },
    { id:"py3", rank:3, title:"Cumplimiento fiscal en equipos nomades: el dolor de cabeza del payroll global",
      summary:`Con el trabajo remoto plenamente establecido, las organizaciones enfrentan en 2026 empleados que trabajaron desde tres paises distintos en el mismo ano fiscal sin que nadie lo supiera con certeza. Los riesgos de establecimiento permanente, doble tributacion y penalidades por incumplimiento son reales y crecientes.\n\nLas organizaciones que mejor resuelven esto combinan tres elementos: una politica clara de trabajo remoto internacional, una herramienta de tracking de ubicacion consensuada, y un socio de Employer of Record con presencia en los paises de mayor frecuencia. Sin los tres, la complejidad crece exponencialmente.`,
      source:"IDEA Argentina & Forbes", url:"https://www.idea.org.ar", date:"2026-04-20" },
  ],
  "desarrollo": [
    { id:"d1", rank:1, title:"Skills-based learning en 2026: el fin de los planes de carrera rigidos",
      summary:`Los planes de carrera lineales y basados en el tiempo en el puesto estan siendo reemplazados por arquitecturas de habilidades dinamicas donde el crecimiento se mide por competencias adquiridas. En 2026, el 58% de las organizaciones del Fortune 1000 ya tiene implementado algun modelo de skills-based career development.\n\nLa tecnologia que habilita este modelo son los skill graphs: mapas dinamicos de las competencias de cada empleado, actualizados continuamente con datos de proyectos, evaluaciones, cursos y feedback de pares. Permiten identificar quien esta preparado para que oportunidad interna antes de que la posicion se abra.`,
      source:"MIT Sloan & IAE Business School", url:"https://sloanreview.mit.edu", date:"2026-05-15" },
    { id:"d2", rank:2, title:"Learning en el flujo de trabajo: cuando la capacitacion deja de ser un evento",
      summary:`El modelo tradicional de capacitacion tiene una tasa de transferencia al puesto de apenas el 12%. En 2026, el paradigma dominante es el learning in the flow of work: el contenido de aprendizaje se integra en las herramientas que el empleado ya usa en su dia a dia.\n\nAsistentes de IA que sugieren contenido relevante cuando el empleado enfrenta un desafio nuevo, micro-lessons de tres minutos integradas en Slack o Teams, y simulaciones contextualizadas al rol especifico. La clave es redisenar la cultura de aprendizaje para que el tiempo de reflexion sea percibido como parte del trabajo, no como una interrupcion.`,
      source:"HBR & Univ. de San Andres", url:"https://www.udesa.edu.ar", date:"2026-05-08" },
    { id:"d3", rank:3, title:"Liderazgo en la era de la IA: las habilidades que no pueden automatizarse",
      summary:`A medida que la IA asume mas tareas cognitivas, la pregunta sobre que habilidades de liderazgo permanecen exclusivamente humanas se volvio urgente. La investigacion de 2026 es clara: las competencias que la IA no puede replicar son precisamente las mas dificiles de desarrollar.\n\nCapacidad de generar confianza en contextos de incertidumbre, habilidad para facilitar conversaciones emocionalmente complejas, juicio etico en situaciones sin respuesta unica correcta, y capacidad de dar sentido y proposito en momentos de cambio disruptivo. Los programas de desarrollo de liderazgo 2026 se redisenan para priorizar exactamente estas competencias.`,
      source:"Korn Ferry & ESADE", url:"https://www.esade.edu", date:"2026-04-30" },
  ],
  "cultura": [
    { id:"cu1", rank:1, title:"Cultura en 2026: como medir lo que siempre fue intangible",
      summary:`Durante decadas, la cultura organizacional fue el activo mas influyente y el menos medido. En 2026, eso esta cambiando con metodologias que combinan analisis de lenguaje natural en comunicaciones internas, encuestas de valores observados versus declarados, y analisis de patrones de comportamiento en herramientas colaborativas.\n\nLas organizaciones que implementaron dashboards de cultura en tiempo real reportan que la brecha entre la cultura deseada y la real es, en promedio, mas grande de lo que sus lideres creian. Esa brecha no es un problema: es informacion valiosa. Actuar sobre ella es la ventaja competitiva real.`,
      source:"Gallup & UADE Argentina", url:"https://www.uade.edu.ar", date:"2026-05-11" },
    { id:"cu2", rank:2, title:"El manager de primera linea: el mayor factor de cultura en 2026",
      summary:`Toda la inversion en valores corporativos y comunicaciones de liderazgo senior tiene impacto limitado si el manager directo no encarna esos valores en sus comportamientos cotidianos. La investigacion confirma que el 70% de la varianza en el nivel de engagement de un equipo se explica por la calidad del manager inmediato.\n\nEste dato convierte el desarrollo de managers de primera linea en la inversion cultural de mayor retorno. Sin embargo, solo el 29% de las organizaciones tiene programas estructurados para este nivel. La mayoria invierte en liderazgo senior y asume que ese aprendizaje se filtra hacia abajo — los datos de 2026 muestran que esa filtracion rara vez ocurre sin intervencion intencional.`,
      source:"Google re:Work & Univ. Austral", url:"https://www.austral.edu.ar", date:"2026-05-04" },
    { id:"cu3", rank:3, title:"DEI con datos: como las organizaciones mas avanzadas miden el progreso real",
      summary:`Las declaraciones de compromiso con DEI sin datos de respaldo perdieron credibilidad en 2026. Los candidatos y empleados exigen evidencia concreta, y las organizaciones que no pueden proveerla enfrentan consecuencias reputacionales reales.\n\nLas metricas que definen el liderazgo en DEI ya no son solo de representacion sino de experiencia diferenciada y de movilidad (si las tasas de promocion y acceso a desarrollo son equitativas entre grupos). Las organizaciones mas avanzadas publican estos datos anualmente con la misma naturalidad con que publican sus resultados financieros.`,
      source:"McKinsey LATAM & FGV Brasil", url:"https://portal.fgv.br", date:"2026-04-27" },
  ],
  "talent": [
    { id:"t1", rank:1, title:"Reclutamiento con IA en 2026: que funciona, que falla y que es ilegal",
      summary:`La adopcion de IA en los procesos de seleccion alcanzo en 2026 un punto de inflexion regulatoria. La Union Europea y varios estados de EE.UU. tienen normativas que exigen auditabilidad, explicabilidad y ausencia de sesgo discriminatorio en los algoritmos usados en decisiones de contratacion.\n\nLos casos de uso que si funcionan estan bien documentados: screening inicial de CVs por competencias, scheduling automatizado de entrevistas, analisis de sentimiento en feedback post-entrevista, y prediccion de exito en el puesto basada en datos historicos. El limite es claro: la IA puede informar, no decidir. La decision de contratar siempre debe tener un ser humano responsable.`,
      source:"ADRHA & LinkedIn Talent", url:"https://www.adrha.org.ar", date:"2026-05-14" },
    { id:"t2", rank:2, title:"Mercados internos de talento: la tecnologia que transforma la movilidad interna",
      summary:`Las plataformas de Talent Marketplace crecieron un 280% en adopcion corporativa entre 2024 y 2026. Conectan oportunidades internas (posiciones abiertas, proyectos, mentoring, asignaciones temporales) con el perfil de habilidades de cada empleado.\n\nEl impacto es multiple: mayor velocidad de cobertura de posiciones internas, reduccion del costo de reclutamiento externo, y una mejora sustancial en la percepcion de oportunidades de desarrollo. Las organizaciones que implementaron estas plataformas reportan una reduccion del 34% en la rotacion de empleados con mas de tres anos de antiguedad.`,
      source:"Talent Board & Univ. de los Andes", url:"https://www.uniandes.edu.co", date:"2026-05-07" },
    { id:"t3", rank:3, title:"Candidate experience 2026: las expectativas que el mercado ya no perdona",
      summary:`El mercado de talento en 2026 tiene memoria institucional. Las plataformas de reviews acumulan anos de experiencias de candidatos, y los postulantes investigan antes de aplicar con una profundidad que las organizaciones aun subestiman. Una experiencia de seleccion negativa se amplifica en redes y afecta el pipeline futuro.\n\nLas expectativas minimas que el mercado ya no perdona son tres: respuesta en menos de cinco dias al CV enviado, feedback especifico post-entrevista aunque el resultado sea negativo, y procesos de no mas de cuatro semanas desde la primera entrevista hasta la oferta.`,
      source:"Gartner & UCEMA Argentina", url:"https://www.ucema.edu.ar", date:"2026-04-24" },
  ],
  "indicadores": [
    { id:"i1", rank:1, title:"Los 8 KPIs de HR que el Board exige ver en 2026",
      summary:`La funcion de HR completo su transicion de area administrativa a socio estrategico del negocio. Los KPIs mas solicitados: costo de la rotacion voluntaria como porcentaje del EBITDA, revenue por empleado con evolucion trimestral, tiempo hasta productividad plena de nuevos ingresos, ROI de los programas de capacitacion, indice de salud cultural, tasa de movilidad interna vs externa, brecha salarial ajustada por rol, y prediccion de rotacion en los proximos 90 dias.\n\nLas areas de HR que reportan con estos indicadores reciben en promedio un 43% mas de presupuesto que las que reportan metricas operativas tradicionales. El lenguaje de negocio no reemplaza la esencia de HR: amplifica su influencia.`,
      source:"Gartner & IAE Business School", url:"https://www.iae.edu.ar", date:"2026-05-15" },
    { id:"i2", rank:2, title:"People analytics en 2026: de los dashboards a la inteligencia predictiva",
      summary:`La primera ola de people analytics se centro en describir lo que paso. La segunda ola avanzo hacia explicar por que paso. En 2026, las organizaciones mas maduras estan en la tercera ola: anticipar lo que va a pasar y prescribir que hacer al respecto.\n\nLos modelos predictivos de rotacion con ventanas de 60 a 90 dias tienen tasas de precision del 84-89% en organizaciones con datos historicos suficientes. El desafio ya no es tecnico: es etico. Como usar esta informacion sin violar la privacidad o generar comportamientos manipuladores es la pregunta que define a las organizaciones mas responsables.`,
      source:"AIHR & Univ. de San Andres", url:"https://www.udesa.edu.ar", date:"2026-05-09" },
    { id:"i3", rank:3, title:"Dashboards de HR: del dato al insight que genera accion en 2026",
      summary:`La proliferacion de herramientas de visualizacion genero un problema paradojico: mas datos disponibles, pero no necesariamente mas decisiones informadas. En 2026, las organizaciones mas avanzadas estan simplificando sus dashboards, con foco en la pregunta: que decision concreta habilita esta visualizacion.\n\nEl modelo con mas traccion es el de dashboard por pregunta de negocio: en lugar de un tablero con 40 metricas, tres tableros de seis metricas cada uno, disenados para responder preguntas especificas que un lider de negocio necesita contestar. La clave del exito esta en que el diseno empiece siempre por la decision, nunca por el dato disponible.`,
      source:"HR Tech Weekly & IDEA Argentina", url:"https://www.idea.org.ar", date:"2026-05-01" },
  ],
  "hr-tech": [
    { id:"ht1", rank:1, title:"Agentes de IA en HR: de los chatbots a los sistemas que toman decisiones",
      summary:`En 2026, la conversacion dejo de ser sobre chatbots que responden preguntas y avanzo hacia agentes de IA que ejecutan flujos completos de trabajo de forma autonoma: agentes que procesan solicitudes de vacaciones con todas sus validaciones, que completan el 80% del onboarding administrativo sin intervencion humana, y que analizan el pipeline de reclutamiento y recomiendan acciones de priorizacion.\n\nLas organizaciones con agentes de IA bien disenados en HR reportan que cada profesional del area gestiona en promedio 2.3 veces mas empleados que hace tres anos, sin perdida de calidad percibida en el servicio interno.`,
      source:"Josh Bersin & ADRHA", url:"https://www.adrha.org.ar", date:"2026-05-15" },
    { id:"ht2", rank:2, title:"Privacidad de datos de empleados en la era de la IA: el marco regulatorio de 2026",
      summary:`El uso intensivo de datos de empleados para alimentar modelos de IA esta generando un marco regulatorio que las organizaciones no pueden ignorar. El RGPD en Europa, la AI Act y normativas similares en Brasil, Mexico y varios paises de Asia exigen consentimiento informado, explicabilidad de las decisiones algoritmicas y derecho a revision humana de decisiones automatizadas que afecten condiciones laborales.\n\nLas organizaciones que implementaron sus sistemas sin considerar estos requisitos enfrentan revisiones costosas. Las que lo hicieron bien desde el principio tienen la confianza de sus empleados en el uso etico de sus datos, un activo que tiene impacto directo en los indicadores de retencion.`,
      source:"Workday & UNAM Mexico", url:"https://www.unam.mx", date:"2026-05-08" },
    { id:"ht3", rank:3, title:"El stack tecnologico de HR en 2026: consolidacion vs especializacion",
      summary:`Despues de anos de proliferacion de herramientas especializadas, el mercado de HR Tech en 2026 muestra una dinamica dual: los grandes players incorporan funcionalidades que antes requerian soluciones puntuales, mientras siguen emergiendo especialistas con profundidad de nicho que las plataformas grandes no pueden igualar.\n\nLa decision estrategica no es entre un solo sistema o muchos: es entre que capacidades son criticas para el core del negocio y que capacidades son de soporte. Las organizaciones con mayor madurez tecnologica tienen entre 3 y 6 herramientas de HR, no 15 ni 1.`,
      source:"HR Tech Conf & FGV Brasil", url:"https://portal.fgv.br", date:"2026-04-28" },
  ],
  "change-management": [
    { id:"cm1", rank:1, title:"Change Management en 2026: por que el 70% de las transformaciones siguen fallando",
      summary:`La estadistica publicada por McKinsey sigue siendo valida en 2026: el 70% de los programas de cambio organizacional no alcanzan sus objetivos. La investigacion mas reciente senala tres factores que sistematicamente se subestiman.\n\nEl tiempo real que toma cambiar comportamientos arraigados (entre 3 y 5 veces mas de lo que los planes contemplan), la resistencia de los managers de nivel medio como principal obstaculo, y la falta de una narrativa del cambio que conecte el que y el como con un para que genuinamente significativo para las personas que tienen que cambiar.`,
      source:"McKinsey LATAM & ADRHA", url:"https://www.adrha.org.ar", date:"2026-05-14" },
    { id:"cm2", rank:2, title:"El rol de HR en las transformaciones: de ejecutor a arquitecto del cambio",
      summary:`Durante decadas, HR fue convocado a las transformaciones para gestionar la comunicacion y administrar la parte blanda. En 2026, las organizaciones con mejores resultados en transformacion son las que involucran a HR desde el diseno estrategico, no desde la implementacion.\n\nEl area de HR que actua como arquitecto del cambio contribuye en tres dimensiones: diseno de la narrativa del cambio y la estrategia de influencia, identificacion y activacion de los agentes de cambio en la organizacion, y diseno de los sistemas de reconocimiento que refuerzan los nuevos comportamientos deseados. Sin estas tres piezas, el cambio se anuncia pero no se instala.`,
      source:"Prosci & IAE Business School", url:"https://www.iae.edu.ar", date:"2026-05-10" },
    { id:"cm3", rank:3, title:"Comunicacion en el cambio: los errores que destruyen la confianza en 72 horas",
      summary:`En una organizacion conectada digitalmente, una comunicacion de cambio mal gestionada puede generar una crisis de confianza en menos de tres dias. Los rumores viajan por WhatsApp mas rapido que los comunicados oficiales, y el silencio de la direccion se interpreta como confirmacion de los peores escenarios.\n\nLos cinco patrones que mas danan la confianza durante un proceso de cambio: anunciar sin explicar el porque de fondo, comunicar en cascada sin asegurar la calidad del mensaje en cada nivel, prometer plazos que no se pueden cumplir, no actualizar cuando hay novedades aunque sean negativas, y usar lenguaje corporativo vacio que los empleados perciben como ocultamiento.`,
      source:"Prosci & Univ. Austral Argentina", url:"https://www.austral.edu.ar", date:"2026-05-05" },
  ],
  "prompts-hr": [
    { id:"pr1", rank:1, title:"Prompt para analizar encuestas de clima y generar insights accionables",
      summary:`Usa este prompt en Claude o ChatGPT para transformar respuestas abiertas de encuestas en insights estructurados:\n\n"Analiza las siguientes respuestas de nuestra encuesta de clima. Identifica: 1) los 3 temas mas recurrentes con citas textuales representativas, 2) el tono emocional predominante por area, 3) senales de riesgo que requieren atencion urgente, y 4) tres recomendaciones concretas priorizadas por impacto. Responde en formato ejecutivo apto para el Comite de Direccion. [Pegar respuestas aqui]"\n\nFunciona mejor con al menos 20 respuestas. Tip: pidele que diferencie lo urgente de lo importante pero no urgente.`,
      source:"AIHR & ADRHA Argentina", url:"https://www.adrha.org.ar", date:"2026-05-13" },
    { id:"pr2", rank:2, title:"Prompt para redactar descripciones de puesto inclusivas y sin sesgos",
      summary:`Las JD tradicionales contienen en promedio 7 terminos con sesgo que reducen el pool de candidatos antes de que el proceso empiece:\n\n"Reescribe esta descripcion de puesto eliminando lenguaje con sesgo de genero, edad o credencialismo innecesario. Usa verbos de accion inclusivos. Reemplaza los requisitos de 'x anos de experiencia' por competencias observables. Asegurate de que el tono invite a postularse a personas de distintos perfiles. Agrega una linea de compromiso con diversidad al final. [Pegar JD original]"\n\nTip: pidele que evalue tambien el nivel de seniority del lenguaje y lo ajuste al rango real del rol.`,
      source:"LinkedIn & Univ. de los Andes", url:"https://www.uniandes.edu.co", date:"2026-05-08" },
    { id:"pr3", rank:3, title:"Prompt para disenar un Plan de Desarrollo Individual personalizado",
      summary:`Este prompt convierte la informacion de una evaluacion de desempeno en un PDI estructurado y listo para usar:\n\n"A partir de la siguiente evaluacion, crea un Plan de Desarrollo Individual para los proximos 6 meses. Incluye: 1) 3 fortalezas a potenciar con acciones y recursos concretos, 2) 2 areas de mejora con indicadores medibles, 3) hitos mensuales de seguimiento con responsable, y 4) como se medira el exito al finalizar los 6 meses. El plan debe ser realista para alguien con agenda de gestion de equipo. [Pegar evaluacion]"\n\nPersonaliza con el rol, la industria y el horizonte de crecimiento esperado.`,
      source:"Josh Bersin & UCEMA Argentina", url:"https://www.ucema.edu.ar", date:"2026-05-04" },
    { id:"pr4", rank:4, title:"Prompt para generar guias de entrevista por competencias",
      summary:`Elimina la improvisacion en las entrevistas y asegurate de evaluar las mismas dimensiones en todos los candidatos:\n\n"Disena una guia de entrevista por competencias para el puesto de [nombre]. Para cada competencia [listar 4-5], genera: 2 preguntas de incidente critico en formato STAR, 1 pregunta situacional hipotetica, y los indicadores conductuales que distinguen una respuesta excelente de una promedio. Tono conversacional. Al final, agrega una seccion de preguntas prohibidas por ser potencialmente discriminatorias."\n\nAgregar el contexto del equipo y la cultura de la empresa mejora significativamente la pertinencia.`,
      source:"SHRM & ADRHA Argentina", url:"https://www.adrha.org.ar", date:"2026-04-28" },
    { id:"pr5", rank:5, title:"Prompt para comunicaciones de cambio organizacional",
      summary:`Este prompt ayuda a redactar mensajes que informan, contienen emocionalmente y movilizan a la accion:\n\n"Redacta una comunicacion interna para anunciar [describir el cambio] a los empleados del area [especificar]. El tono debe ser: honesto sobre el motivo, empatico con el impacto en las personas, claro sobre los proximos pasos y fechas, y confiado sin ser condescendiente. Incluye: por que este cambio es necesario, que cambia y que no cambia, como se acompanara a las personas, y como pueden hacer preguntas. Evita lenguaje corporativo vacio. [Canal: email / Slack / reunion]"`,
      source:"McKinsey LATAM & Univ. Austral", url:"https://www.austral.edu.ar", date:"2026-04-21" },
  ],
};

const RANK_LABELS = ["#1 Mas relevante","#2 Destacada","#3 Importante","#4 Relevante","#5 A tener en cuenta"];

// EVENTOS ARGENTINA
const EVENTOS = [
  { id:"ev1", titulo:"Congreso ADRHA 2026", tipo:"Congreso", fecha:"2026-06-05", fechaFin:"2026-06-06",
    lugar:"Buenos Aires, Argentina", modalidad:"Presencial",
    categoria:"people-experience", destacado:true,
    descripcion:"El congreso anual de la Asociacion de Recursos Humanos de la Argentina reune a los principales referentes de la profesion. En 2026, la agenda se centra en el futuro del trabajo, la gestion de personas en entornos hibridos, la inteligencia artificial aplicada a HR y el bienestar organizacional. El evento mas importante del calendario de RRHH en Argentina.",
    link:"https://www.adrha.org.ar" },
  { id:"ev2", titulo:"HR Day Buenos Aires 2026", tipo:"Conferencia", fecha:"2026-06-18",
    lugar:"Buenos Aires, Argentina", modalidad:"Presencial",
    categoria:"hr-tech", destacado:false,
    descripcion:"Un dia intensivo dedicado a la tecnologia y la innovacion en Recursos Humanos. Demos en vivo de las principales plataformas de HR Tech disponibles en el mercado argentino, casos de implementacion de IA en seleccion y onboarding, y paneles con lideres de HR de las empresas mas grandes del pais.",
    link:"https://www.adrha.org.ar" },
  { id:"ev3", titulo:"Foro de Compensaciones y Beneficios LATAM", tipo:"Foro", fecha:"2026-07-03",
    lugar:"Buenos Aires, Argentina", modalidad:"Presencial + Virtual",
    categoria:"compensaciones", destacado:true,
    descripcion:"El foro de referencia regional para profesionales de compensaciones y beneficios, con sede en Buenos Aires. Temas centrales: transparencia salarial en el contexto argentino, gestion de compensaciones en contextos de alta inflacion, pay equity y nuevas tendencias en beneficios flexibles para el mercado local.",
    link:"https://www.worldatwork.org" },
  { id:"ev4", titulo:"Encuentro Nacional de Cultura Organizacional", tipo:"Encuentro", fecha:"2026-07-15",
    lugar:"Cordoba, Argentina", modalidad:"Presencial",
    categoria:"cultura", destacado:false,
    descripcion:"El encuentro anual de referentes de cultura organizacional de Argentina y la region. Casos de transformacion cultural de empresas argentinas, seguridad psicologica en equipos locales, DEI en el contexto latinoamericano y las nuevas formas de construir cultura en organizaciones distribuidas con equipos remotos.",
    link:"https://www.adrha.org.ar" },
  { id:"ev5", titulo:"Summit de Talent Acquisition Argentina 2026", tipo:"Summit", fecha:"2026-07-29",
    lugar:"Buenos Aires, Argentina", modalidad:"Presencial",
    categoria:"talent", destacado:false,
    descripcion:"El evento especializado en reclutamiento y adquisicion de talento mas importante de Argentina. Agenda centrada en el uso de IA en seleccion dentro del marco legal argentino, employer branding en el mercado local, candidate experience y estrategias de movilidad interna adaptadas al contexto de las empresas argentinas.",
    link:"https://www.adrha.org.ar" },
  { id:"ev6", titulo:"Jornada de People Analytics Argentina", tipo:"Jornada", fecha:"2026-08-12",
    lugar:"Buenos Aires, Argentina", modalidad:"Presencial + Virtual",
    categoria:"indicadores", destacado:false,
    descripcion:"La jornada anual de people analytics mas relevante del pais. Casos reales de implementacion de analytics de personas en empresas argentinas, herramientas accesibles para equipos de HR sin equipo de data science, y los KPIs que los CEO argentinos estan pidiendo a sus areas de RRHH en 2026.",
    link:"https://www.aihr.com" },
  { id:"ev7", titulo:"Congreso de Change Management Argentina", tipo:"Congreso", fecha:"2026-08-20",
    lugar:"Buenos Aires, Argentina", modalidad:"Presencial",
    categoria:"change-management", destacado:true,
    descripcion:"El primer congreso dedicado exclusivamente a la gestion del cambio organizacional en Argentina. Metodologias Prosci y ADKAR adaptadas al contexto local, casos de transformacion en empresas argentinas de distintos sectores, y el rol critico de HR como arquitecto del cambio en organizaciones que atraviesan procesos de transformacion digital y cultural.",
    link:"https://www.prosci.com" },
  { id:"ev8", titulo:"Expo Recursos Humanos Argentina 2026", tipo:"Exposicion", fecha:"2026-09-03", fechaFin:"2026-09-04",
    lugar:"La Rural, Buenos Aires", modalidad:"Presencial",
    categoria:"hr-tech", destacado:false,
    descripcion:"La exposicion mas grande de soluciones de Recursos Humanos de Argentina. Mas de 80 expositores de tecnologia HR, consultoras de capacitacion, beneficios corporativos y servicios de payroll. Ideal para profesionales de HR que buscan actualizar su stack tecnologico o conocer las ultimas tendencias del mercado argentino.",
    link:"https://www.adrha.org.ar" },
];

const TIPO_COLORS = {
  "Congreso":             { bg:"#DBEAFE", color:"#1D4ED8" },
  "Conferencia":          { bg:"#CFFAFE", color:"#0891B2" },
  "Foro":                 { bg:"#D1FAE5", color:"#059669" },
  "Encuentro":            { bg:"#F0FDFA", color:"#0F766E" },
  "Summit":               { bg:"#F0FDFA", color:"#0F766E" },
  "Jornada":              { bg:"#EFF6FF", color:"#0369A1" },
  "Exposicion":           { bg:"#FEF3C7", color:"#92400E" },
};
const MOD_COLORS = {
  "Presencial":             { bg:"#D1FAE5", color:"#065F46" },
  "Virtual":                { bg:"#EFF6FF", color:"#1D4ED8" },
  "Presencial + Virtual":   { bg:"#FEF3C7", color:"#92400E" },
  "Presencial + Streaming": { bg:"#FEF3C7", color:"#92400E" },
};

function formatDate(d) {
  return new Date(d+"T12:00:00").toLocaleDateString("es-AR",{day:"numeric",month:"long",year:"numeric"});
}
function formatEventDate(f,t) {
  const opts={day:"numeric",month:"long"};
  const s=new Date(f+"T12:00:00").toLocaleDateString("es-AR",opts);
  if(!t) return s+" · 2026";
  const e=new Date(t+"T12:00:00").toLocaleDateString("es-AR",opts);
  return s+" al "+e+" · 2026";
}

function NewsCard({news,rank,accent,bg,isLiked,onToggleLike,compact,isPrompt}) {
  const [expanded,setExpanded]=useState(false);
  const summary=news.summary||"";
  const isLong=summary.length>340;
  const shown=(!isLong||expanded||compact)?summary:summary.slice(0,340)+"…";
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
  const [filtro,setFiltro]=useState("todos");
  const getMes=d=>{const m=new Date(d+"T12:00:00").toLocaleDateString("es-AR",{month:"long"});return m.charAt(0).toUpperCase()+m.slice(1);};
  const meses=["Junio","Julio","Agosto","Septiembre"];
  const filtrados=filtro==="todos"?EVENTOS:EVENTOS.filter(e=>getMes(e.fecha)===filtro);
  const destacados=EVENTOS.filter(e=>e.destacado);
  return (
    <>
      <div style={{background:"linear-gradient(135deg,#0F766E 0%,#0369A1 100%)",borderRadius:16,padding:"24px 32px",marginBottom:28,display:"flex",alignItems:"center",gap:16,boxShadow:"0 4px 20px rgba(15,118,110,0.35)"}}>
        <span style={{fontSize:46}}>📅</span>
        <div>
          <h2 style={{margin:0,fontSize:23,color:"white",fontWeight:700}}>Eventos de HR · Argentina 2026</h2>
          <p style={{margin:"4px 0 0",color:"rgba(255,255,255,0.78)",fontSize:15}}>{EVENTOS.length} eventos proximos · junio — septiembre 2026</p>
        </div>
      </div>
      <p style={{fontSize:15,color:"#0369A1",fontWeight:700,marginBottom:14}}>Eventos destacados</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",gap:16,marginBottom:32}}>
        {destacados.map(ev=>{
          const tc=TIPO_COLORS[ev.tipo]||{bg:"#E0F2FE",color:"#0284C7"};
          const mc=MOD_COLORS[ev.modalidad]||{bg:"#E0F2FE",color:"#0284C7"};
          const cat=CATEGORIES.find(c=>c.id===ev.categoria);
          return (
            <div key={ev.id} style={{background:"white",borderRadius:16,padding:"22px 24px",boxShadow:"0 4px 24px rgba(15,118,110,0.12)",border:"2px solid #99F6E4",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:0,right:0,background:"linear-gradient(135deg,#0F766E,#0369A1)",padding:"6px 14px",borderRadius:"0 16px 0 12px"}}>
                <span style={{fontSize:11,color:"white",fontWeight:700}}>DESTACADO</span>
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
          <button key={m} onClick={()=>setFiltro(m)} style={{padding:"10px 20px",borderRadius:10,border:"2px solid",borderColor:filtro===m?"#0369A1":"transparent",background:filtro===m?"#DBEAFE":"rgba(255,255,255,0.75)",color:filtro===m?"#0369A1":"#374151",fontSize:14,fontWeight:filtro===m?700:500,cursor:"pointer"}}>
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
  const [activeCategory,setActiveCategory]=useState("beneficios");
  const [likes,setLikes]=useState(()=>{try{return JSON.parse(localStorage.getItem("hr_likes_v4")||"{}");}catch{return {};}});
  const [view,setView]=useState("feed");
  const [toast,setToast]=useState(null);
  const [refreshing,setRefreshing]=useState(false);
  const [aiNews,setAiNews]=useState(null);
  const [loadingAI,setLoadingAI]=useState(false);

  useEffect(()=>{try{localStorage.setItem("hr_likes_v4",JSON.stringify(likes));}catch{}},[likes]);

  const handleRefresh = async () => {
    setRefreshing(true);
    setLoadingAI(true);
    showToast("Buscando noticias actuales con IA...");
    try {
      const mes = new Date().toLocaleDateString("es-AR",{month:"long",year:"numeric"});
      const response = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          messages:[{
            role:"user",
            content:`Genera 3 noticias reales y actuales de Recursos Humanos para ${mes}. Cada noticia debe ser relevante para profesionales de HR en Argentina y LATAM. Responde SOLO con JSON valido, sin texto adicional, con este formato exacto:
[
  {"titulo":"titulo de la noticia","resumen":"resumen de 2 parrafos separados por doble salto de linea","fuente":"nombre de la fuente","url":"https://url-real.com","categoria":"una de: beneficios/marca-empleadora/people-experience/compensaciones/payroll/desarrollo/cultura/talent/indicadores/hr-tech/change-management"},
  {"titulo":"...","resumen":"...","fuente":"...","url":"...","categoria":"..."},
  {"titulo":"...","resumen":"...","fuente":"...","url":"...","categoria":"..."}
]`
          }]
        })
      });
      const data = await response.json();
      const text = data.content?.find(b=>b.type==="text")?.text||"";
      const clean = text.replace(/```json|```/g,"").trim();
      const parsed = JSON.parse(clean);
      setAiNews(parsed);
      showToast("Noticias actualizadas con IA!");
    } catch(e) {
      showToast("Error al obtener noticias. Intenta de nuevo.");
    }
    setRefreshing(false);
    setLoadingAI(false);
  };

  const toggleLike=(newsId,catId)=>{
    setLikes(prev=>{
      const u={...prev};
      if(u[newsId]){delete u[newsId];showToast("Eliminado de Mis Me Gusta");}
      else{u[newsId]=catId;showToast("Guardado en Mis Me Gusta");}
      return u;
    });
  };
  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(null),2800);};

  const likedNews=Object.entries(likes).flatMap(([newsId,catId])=>{
    const news=(NEWS_DATA[catId]||[]).find(n=>n.id===newsId);
    const cat=CATEGORIES.find(c=>c.id===catId);
    return news?[{...news,catId,catLabel:cat?.label,catIcon:cat?.icon,catAccent:cat?.accent,catBg:cat?.bg}]:[];
  });

  const activeCat=CATEGORIES.find(c=>c.id===activeCategory);
  const activeNews=NEWS_DATA[activeCategory]||[];
  const isIndicadores=activeCategory==="indicadores";
  const isPrompts=activeCategory==="prompts-hr";

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
          <button onClick={handleRefresh} disabled={loadingAI} style={{padding:"11px 16px",borderRadius:10,border:"1.5px solid rgba(255,255,255,0.15)",background:loadingAI?"rgba(14,165,233,0.2)":"transparent",color:loadingAI?"#7DD3FC":"#94A3B8",fontSize:14,cursor:loadingAI?"not-allowed":"pointer",display:"flex",alignItems:"center",gap:6,fontWeight:600}}>
            {loadingAI?"⏳ Actualizando...":"🔄 Actualizar"}
          </button>
        </div>
      </header>

      {toast&&(
        <div style={{position:"fixed",bottom:32,left:"50%",transform:"translateX(-50%)",background:"#0F172A",color:"#7DD3FC",padding:"13px 32px",borderRadius:30,fontSize:15,fontWeight:600,zIndex:9999,boxShadow:"0 4px 24px rgba(15,23,42,0.4)",border:"1.5px solid #0EA5E9"}}>
          {toast}
        </div>
      )}

      {aiNews&&(
        <div style={{background:"linear-gradient(135deg,#0F766E,#0369A1)",margin:"0",padding:"16px 28px",display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
          <span style={{color:"white",fontSize:14,fontWeight:700}}>Noticias actualizadas con IA · {new Date().toLocaleDateString("es-AR",{month:"long",year:"numeric"})}</span>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {aiNews.map((n,i)=>(
              <div key={i} style={{background:"rgba(255,255,255,0.15)",borderRadius:10,padding:"8px 14px",maxWidth:280}}>
                <p style={{margin:0,fontSize:13,color:"white",fontWeight:600}}>{n.titulo}</p>
                <p style={{margin:"2px 0 0",fontSize:11,color:"rgba(255,255,255,0.7)"}}>{n.fuente}</p>
              </div>
            ))}
          </div>
          <button onClick={()=>setAiNews(null)} style={{marginLeft:"auto",background:"rgba(255,255,255,0.2)",border:"none",borderRadius:8,color:"white",padding:"6px 12px",cursor:"pointer",fontSize:13}}>Cerrar</button>
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
              <span style={{fontSize:46}}>{activeCat?.icon}</span>
              <div>
                <h2 style={{margin:0,fontSize:23,color:"white",fontWeight:700}}>{activeCat?.label}</h2>
                <p style={{margin:"4px 0 0",color:"rgba(255,255,255,0.78)",fontSize:15}}>
                  {isPrompts?`${activeNews.length} prompts listos para usar · mayo 2026`:`Top ${activeNews.length} noticias mas relevantes · mayo 2026`}
                </p>
              </div>
            </div>
            {isIndicadores&&(
              <div style={{marginBottom:32}}>
                <p style={{fontSize:15,color:"#1D4ED8",fontWeight:700,marginBottom:14}}>Dashboards de referencia · metricas de HR 2026</p>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16}}>
                  {DASHBOARD_VISUALS.map(d=>(
                    <div key={d.id} style={{background:"white",borderRadius:14,overflow:"hidden",boxShadow:"0 2px 16px rgba(29,78,216,0.12)",border:"1.5px solid #BFDBFE"}}>
                      <svg viewBox="0 0 320 160" style={{width:"100%",display:"block"}} xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{__html:d.inner}}/>
                      <div style={{padding:"12px 16px",borderTop:"1px solid #EFF6FF",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
                        <p style={{margin:0,fontSize:13,fontWeight:700,color:"#1D4ED8"}}>{d.label}</p>
                        <a href={d.url} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:6,padding:"7px 14px",background:"#EFF6FF",border:"1.5px solid #BFDBFE",borderRadius:8,color:"#1D4ED8",fontSize:12,fontWeight:700,textDecoration:"none"}}>
                          Ver fuente: {d.source}
                        </a>
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
                <button onClick={()=>setView("feed")} style={{padding:"14px 32px",background:"linear-gradient(135deg,#0369A1,#0D9488)",border:"none",borderRadius:12,color:"white",fontSize:16,fontWeight:700,cursor:"pointer"}}>Ver noticias</button>
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
        <p style={{margin:"0 0 2px",fontSize:20,fontWeight:700,color:"#0369A1"}}>HR+</p>
        <p style={{margin:"0 0 10px",fontSize:12,color:"#0D9488",letterSpacing:"1px",fontStyle:"italic",fontWeight:600}}>by JMM</p>
        <p style={{margin:0,fontSize:13,color:"#94A3B8"}}>Contenido curado de las principales fuentes globales de Recursos Humanos · Actualizado mensualmente</p>
      </footer>
      <style>{`::-webkit-scrollbar{display:none;}`}</style>
    </div>
  );
}
