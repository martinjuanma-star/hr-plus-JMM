import { useState, useEffect, useCallback } from "react";

const CATEGORIES = [
  { id:"beneficios",          label:"Beneficios",               icon:"🎁",  accent:"#0E7490", bg:"#E0F2FE" },
  { id:"marca-empleadora",    label:"Marca Empleadora",         icon:"📣",  accent:"#0369A1", bg:"#DBEAFE" },
  { id:"people-experience",   label:"People Experience",        icon:"🤝",  accent:"#0D9488", bg:"#CCFBF1" },
  { id:"compensaciones",      label:"Compensaciones",           icon:"💼",  accent:"#0284C7", bg:"#E0F2FE" },
  { id:"payroll",             label:"Payroll",                  icon:"📋",  accent:"#0891B2", bg:"#CFFAFE" },
  { id:"desarrollo",          label:"Desarrollo",               icon:"📚",  accent:"#059669", bg:"#D1FAE5" },
  { id:"cultura",             label:"Cultura",                  icon:"🏛️",  accent:"#0369A1", bg:"#EFF6FF" },
  { id:"talent",              label:"Talent & Acquisition",    icon:"🎯",  accent:"#0F766E", bg:"#F0FDFA" },
  { id:"indicadores",         label:"Indicadores y Dashboards", icon:"📊",  accent:"#1D4ED8", bg:"#EFF6FF" },
  { id:"hr-tech",             label:"HR Technology & IA",      icon:"⚙️",  accent:"#0369A1", bg:"#DBEAFE" },
  { id:"change-management",   label:"Change Management",        icon:"🔄",  accent:"#0F766E", bg:"#F0FDFA" },
  { id:"relaciones-laborales",label:"Relaciones Laborales",    icon:"⚖️",  accent:"#1E40AF", bg:"#EFF6FF" },
  { id:"prompts-hr",          label:"Prompts para HR",         icon:"💬",  accent:"#0E7490", bg:"#ECFEFF" },
];

const TEMA_LABELS = {
  "paritarias":    { label:"Paritarias",   bg:"#DBEAFE", color:"#1D4ED8" },
  "legislacion":   { label:"Legislación",  bg:"#D1FAE5", color:"#065F46" },
  "gremios":       { label:"Gremios",      bg:"#FEF3C7", color:"#92400E" },
  "jurisprudencia":{ label:"Jurisprudencia",bg:"#F3E8FF",color:"#7C3AED" },
  "empleo":        { label:"Empleo",       bg:"#CCFBF1", color:"#0F766E" },
  "arca":          { label:"ARCA",         bg:"#FFE4E6", color:"#BE123C" },
};

const DASHBOARD_VISUALS = [
  { id:"d1", label:"Headcount & Rotacion Q1 2026", source:"Gartner HR Research", url:"https://www.gartner.com/en/human-resources",
    inner:`<rect width="320" height="160" rx="12" fill="#0F172A"/><text x="16" y="22" font-size="10" fill="#64748B" font-family="monospace" letter-spacing="1">HEADCOUNT · ROTACION Q1 2026</text><rect x="20" y="55" width="24" height="82" rx="3" fill="#0EA5E9" opacity=".8"/><rect x="56" y="38" width="24" height="99" rx="3" fill="#0EA5E9" opacity=".8"/><rect x="92" y="48" width="24" height="89" rx="3" fill="#0EA5E9" opacity=".8"/><rect x="128" y="30" width="24" height="107" rx="3" fill="#22D3EE"/><rect x="164" y="43" width="24" height="94" rx="3" fill="#0EA5E9" opacity=".8"/><rect x="200" y="25" width="24" height="112" rx="3" fill="#22D3EE"/><rect x="236" y="35" width="24" height="102" rx="3" fill="#0EA5E9" opacity=".8"/><rect x="272" y="28" width="24" height="109" rx="3" fill="#22D3EE"/><polyline points="32,68 68,52 104,62 140,44 176,56 212,38 248,48 284,42" fill="none" stroke="#F472B6" stroke-width="2.5"/><circle cx="32" cy="68" r="3" fill="#F472B6"/><circle cx="68" cy="52" r="3" fill="#F472B6"/><circle cx="104" cy="62" r="3" fill="#F472B6"/><circle cx="140" cy="44" r="3" fill="#F472B6"/><circle cx="176" cy="56" r="3" fill="#F472B6"/><circle cx="212" cy="38" r="3" fill="#F472B6"/><circle cx="248" cy="48" r="3" fill="#F472B6"/><circle cx="284" cy="42" r="3" fill="#F472B6"/><rect x="16" y="146" width="8" height="8" rx="1" fill="#0EA5E9"/><text x="28" y="153" font-size="9" fill="#94A3B8" font-family="monospace">Headcount</text><rect x="110" y="146" width="8" height="8" rx="1" fill="#F472B6"/><text x="122" y="153" font-size="9" fill="#94A3B8" font-family="monospace">Rotacion %</text><rect x="218" y="140" width="88" height="16" rx="4" fill="#1E293B"/><text x="224" y="151" font-size="9" fill="#22D3EE" font-family="monospace">up 5.1% headcount</text>` },
  { id:"d2", label:"Employee Engagement eNPS Q1 2026", source:"AIHR People Analytics", url:"https://www.aihr.com",
    inner:`<rect width="320" height="160" rx="12" fill="#0F172A"/><text x="16" y="22" font-size="10" fill="#64748B" font-family="monospace" letter-spacing="1">EMPLOYEE ENGAGEMENT Q1 2026</text><circle cx="82" cy="96" r="46" fill="none" stroke="#1E293B" stroke-width="20"/><circle cx="82" cy="96" r="46" fill="none" stroke="#0EA5E9" stroke-width="20" stroke-dasharray="202 87" stroke-dashoffset="70" stroke-linecap="round"/><circle cx="82" cy="96" r="46" fill="none" stroke="#22D3EE" stroke-width="20" stroke-dasharray="62 227" stroke-dashoffset="-132" stroke-linecap="round"/><circle cx="82" cy="96" r="46" fill="none" stroke="#F87171" stroke-width="20" stroke-dasharray="25 264" stroke-dashoffset="-194" stroke-linecap="round"/><text x="82" y="90" font-size="22" fill="white" text-anchor="middle" font-family="monospace" font-weight="bold">76%</text><text x="82" y="108" font-size="9" fill="#94A3B8" text-anchor="middle" font-family="monospace">eNPS Score</text><text x="158" y="50" font-size="10" fill="#94A3B8" font-family="monospace">Promotores</text><rect x="158" y="55" width="140" height="11" rx="3" fill="#1E293B"/><rect x="158" y="55" width="106" height="11" rx="3" fill="#0EA5E9"/><text x="303" y="64" font-size="9" fill="#0EA5E9" font-family="monospace">76%</text><text x="158" y="82" font-size="10" fill="#94A3B8" font-family="monospace">Neutros</text><rect x="158" y="87" width="140" height="11" rx="3" fill="#1E293B"/><rect x="158" y="87" width="48" height="11" rx="3" fill="#22D3EE"/><text x="303" y="96" font-size="9" fill="#22D3EE" font-family="monospace">34%</text><text x="158" y="114" font-size="10" fill="#94A3B8" font-family="monospace">Detractores</text><rect x="158" y="119" width="140" height="11" rx="3" fill="#1E293B"/><rect x="158" y="119" width="14" height="11" rx="3" fill="#F87171"/><text x="303" y="128" font-size="9" fill="#F87171" font-family="monospace">10%</text>` },
  { id:"d3", label:"Talent Metrics Time to Fill 2026", source:"Gallup Workplace Report", url:"https://www.gallup.com/workplace",
    inner:`<rect width="320" height="160" rx="12" fill="#0F172A"/><text x="16" y="22" font-size="10" fill="#64748B" font-family="monospace" letter-spacing="1">TALENT METRICS Q1 2026</text><text x="16" y="45" font-size="9" fill="#475569" font-family="monospace">TIME TO FILL (dias)</text><line x1="16" y1="75" x2="300" y2="75" stroke="#1E293B" stroke-width="1"/><polyline points="16,72 60,62 104,67 148,54 192,59 236,47 280,52" fill="none" stroke="#22D3EE" stroke-width="2.5"/><circle cx="280" cy="52" r="4" fill="#22D3EE"/><text x="286" y="56" font-size="12" fill="#22D3EE" font-family="monospace" font-weight="bold">24d</text><text x="16" y="100" font-size="9" fill="#475569" font-family="monospace">COSTO POR HIRE (USD k)</text><line x1="16" y1="130" x2="300" y2="130" stroke="#1E293B" stroke-width="1"/><polyline points="16,127 60,122 104,125 148,115 192,119 236,108 280,112" fill="none" stroke="#6EE7B7" stroke-width="2.5"/><circle cx="280" cy="112" r="4" fill="#6EE7B7"/><text x="286" y="116" font-size="12" fill="#6EE7B7" font-family="monospace" font-weight="bold">2.9k</text><rect x="16" y="145" width="72" height="12" rx="3" fill="#1E293B"/><text x="20" y="154" font-size="8" fill="#0EA5E9" font-family="monospace">down 14% vs 2025</text><rect x="96" y="145" width="88" height="12" rx="3" fill="#1E293B"/><text x="100" y="154" font-size="8" fill="#6EE7B7" font-family="monospace">down 9% costo hire</text>` },
];

const EVENTOS = [
  { id:"ev1", titulo:"Congreso ADRHA 2026", tipo:"Congreso", fecha:"2026-06-05", fechaFin:"2026-06-06", lugar:"Buenos Aires, Argentina", modalidad:"Presencial", categoria:"people-experience", destacado:true, descripcion:"El congreso anual de la Asociacion de Recursos Humanos de la Argentina reune a los principales referentes de la profesion. En 2026, la agenda se centra en el futuro del trabajo, la gestion de personas en entornos hibridos, la inteligencia artificial aplicada a HR y el bienestar organizacional.", link:"https://www.adrha.org.ar" },
  { id:"ev2", titulo:"HR Day Buenos Aires 2026", tipo:"Conferencia", fecha:"2026-06-18", lugar:"Buenos Aires, Argentina", modalidad:"Presencial", categoria:"hr-tech", destacado:false, descripcion:"Un dia intensivo dedicado a la tecnologia y la innovacion en Recursos Humanos. Demos en vivo de las principales plataformas de HR Tech disponibles en el mercado argentino, casos de implementacion de IA en seleccion y onboarding, y paneles con lideres de HR de las empresas mas grandes del pais.", link:"https://www.adrha.org.ar" },
  { id:"ev3", titulo:"Foro de Compensaciones y Beneficios LATAM", tipo:"Foro", fecha:"2026-07-03", lugar:"Buenos Aires, Argentina", modalidad:"Presencial + Virtual", categoria:"compensaciones", destacado:true, descripcion:"El foro de referencia regional para profesionales de compensaciones y beneficios, con sede en Buenos Aires. Temas centrales: transparencia salarial en el contexto argentino, gestion de compensaciones en contextos de alta inflacion, pay equity y nuevas tendencias en beneficios flexibles.", link:"https://www.worldatwork.org" },
  { id:"ev4", titulo:"Encuentro Nacional de Cultura Organizacional", tipo:"Encuentro", fecha:"2026-07-15", lugar:"Cordoba, Argentina", modalidad:"Presencial", categoria:"cultura", destacado:false, descripcion:"El encuentro anual de referentes de cultura organizacional de Argentina y la region. Casos de transformacion cultural de empresas argentinas, seguridad psicologica en equipos locales y DEI en el contexto latinoamericano.", link:"https://www.adrha.org.ar" },
  { id:"ev5", titulo:"Summit de Talent Acquisition Argentina 2026", tipo:"Summit", fecha:"2026-07-29", lugar:"Buenos Aires, Argentina", modalidad:"Presencial", categoria:"talent", destacado:false, descripcion:"El evento especializado en reclutamiento y adquisicion de talento mas importante de Argentina. Agenda centrada en el uso de IA en seleccion, employer branding en el mercado local, candidate experience y estrategias de movilidad interna.", link:"https://www.adrha.org.ar" },
  { id:"ev6", titulo:"Jornada de People Analytics Argentina", tipo:"Jornada", fecha:"2026-08-12", lugar:"Buenos Aires, Argentina", modalidad:"Presencial + Virtual", categoria:"indicadores", destacado:false, descripcion:"La jornada anual de people analytics mas relevante del pais. Casos reales de implementacion en empresas argentinas y los KPIs que los CEO argentinos estan pidiendo a sus areas de RRHH en 2026.", link:"https://www.aihr.com" },
  { id:"ev7", titulo:"Congreso de Change Management Argentina", tipo:"Congreso", fecha:"2026-08-20", lugar:"Buenos Aires, Argentina", modalidad:"Presencial", categoria:"change-management", destacado:true, descripcion:"El primer congreso dedicado exclusivamente a la gestion del cambio organizacional en Argentina. Metodologias Prosci y ADKAR adaptadas al contexto local y el rol critico de HR como arquitecto del cambio.", link:"https://www.prosci.com" },
  { id:"ev8", titulo:"Expo Recursos Humanos Argentina 2026", tipo:"Exposicion", fecha:"2026-09-03", fechaFin:"2026-09-04", lugar:"La Rural, Buenos Aires", modalidad:"Presencial", categoria:"hr-tech", destacado:false, descripcion:"La exposicion mas grande de soluciones de Recursos Humanos de Argentina. Mas de 80 expositores de tecnologia HR, consultoras de capacitacion, beneficios corporativos y servicios de payroll.", link:"https://www.adrha.org.ar" },
];

const TIPO_COLORS = { "Congreso":{bg:"#DBEAFE",color:"#1D4ED8"}, "Conferencia":{bg:"#CFFAFE",color:"#0891B2"}, "Foro":{bg:"#D1FAE5",color:"#059669"}, "Encuentro":{bg:"#F0FDFA",color:"#0F766E"}, "Summit":{bg:"#F0FDFA",color:"#0F766E"}, "Jornada":{bg:"#EFF6FF",color:"#0369A1"}, "Exposicion":{bg:"#FEF3C7",color:"#92400E"} };
const MOD_COLORS = { "Presencial":{bg:"#D1FAE5",color:"#065F46"}, "Virtual":{bg:"#EFF6FF",color:"#1D4ED8"}, "Presencial + Virtual":{bg:"#FEF3C7",color:"#92400E"} };
const RANK_LABELS = ["#1 Mas relevante","#2 Destacada","#3 Importante","#4 Relevante","#5 A tener en cuenta"];

function formatDate(d) {
  try { return new Date(d+"T12:00:00").toLocaleDateString("es-AR",{day:"numeric",month:"long",year:"numeric"}); } catch { return d; }
}
function formatEventDate(f,t) {
  const opts={day:"numeric",month:"long"};
  const s=new Date(f+"T12:00:00").toLocaleDateString("es-AR",opts);
  if(!t) return s+" · 2026";
  return s+" al "+new Date(t+"T12:00:00").toLocaleDateString("es-AR",opts)+" · 2026";
}

function SkeletonCard() {
  return (
    <div style={{background:"rgba(255,255,255,0.96)",borderRadius:16,padding:"28px 32px",boxShadow:"0 2px 20px rgba(15,23,42,0.08)",border:"1.5px solid rgba(186,230,253,0.55)"}}>
      <div style={{height:20,background:"#E2E8F0",borderRadius:8,width:"30%",marginBottom:16}}/>
      <div style={{height:28,background:"#E2E8F0",borderRadius:8,width:"85%",marginBottom:12}}/>
      <div style={{height:16,background:"#E2E8F0",borderRadius:8,width:"100%",marginBottom:8}}/>
      <div style={{height:16,background:"#E2E8F0",borderRadius:8,width:"90%",marginBottom:8}}/>
      <div style={{height:16,background:"#E2E8F0",borderRadius:8,width:"70%",marginBottom:20}}/>
      <div style={{height:44,background:"#E2E8F0",borderRadius:10,width:"40%"}}/>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}`}</style>
    </div>
  );
}

function IPCWidget() {
  const [ipc, setIpc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/news?type=ipc")
      .then(r => r.json())
      .then(data => { if (data.success) setIpc(data.ipc); else setError(true); })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{background:"white",borderRadius:16,padding:"24px 28px",marginBottom:28,boxShadow:"0 2px 16px rgba(30,64,175,0.1)",border:"1.5px solid #BFDBFE"}}>
      <div style={{height:20,background:"#E2E8F0",borderRadius:8,width:"40%",marginBottom:16}}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
        {[1,2,3].map(i=><div key={i} style={{height:80,background:"#E2E8F0",borderRadius:12}}/>)}
      </div>
    </div>
  );

  if (error || !ipc) return null;

  const indicators = [
    { label:"Variación Mensual", value:ipc.variacion_mensual, icon:"📅", color:"#0369A1", bg:"#DBEAFE" },
    { label:"Variación Interanual", value:ipc.variacion_interanual, icon:"📈", color:"#DC2626", bg:"#FEE2E2" },
    { label:"Acumulado del Año", value:ipc.variacion_acumulada, icon:"📊", color:"#059669", bg:"#D1FAE5" },
  ];

  return (
    <div style={{background:"linear-gradient(135deg,#1E3A5F,#1E40AF)",borderRadius:16,padding:"24px 28px",marginBottom:28,boxShadow:"0 4px 24px rgba(30,64,175,0.25)"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:10}}>
        <div>
          <h3 style={{margin:0,fontSize:18,color:"white",fontWeight:700}}>Indice de Precios al Consumidor (IPC)</h3>
          <p style={{margin:"4px 0 0",fontSize:13,color:"#93C5FD"}}>INDEC · {ipc.mes} · Datos oficiales</p>
        </div>
        <a href={ipc.url_indec||"https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31"} target="_blank" rel="noopener noreferrer"
          style={{display:"inline-flex",alignItems:"center",gap:8,padding:"10px 18px",background:"rgba(255,255,255,0.15)",border:"1.5px solid rgba(255,255,255,0.3)",borderRadius:10,color:"white",fontSize:13,fontWeight:700,textDecoration:"none"}}>
          🔗 Ver informe INDEC
        </a>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:14}}>
        {indicators.map(ind=>(
          <div key={ind.label} style={{background:"rgba(255,255,255,0.95)",borderRadius:14,padding:"18px 20px",textAlign:"center"}}>
            <div style={{fontSize:28,marginBottom:6}}>{ind.icon}</div>
            <div style={{fontSize:26,fontWeight:700,color:ind.color,marginBottom:4}}>{ind.value}</div>
            <div style={{fontSize:12,color:"#64748B",fontWeight:600}}>{ind.label}</div>
          </div>
        ))}
      </div>
      {ipc.nota&&(
        <p style={{margin:"14px 0 0",fontSize:12,color:"#93C5FD",fontStyle:"italic"}}>* {ipc.nota}</p>
      )}
    </div>
  );
}

function NewsCard({news,rank,accent,bg,isLiked,onToggleLike,compact,isRelLaboral}) {
  const [expanded,setExpanded]=useState(false);
  const summary=news.summary||"";
  const isLong=summary.length>340;
  const shown=(!isLong||expanded||compact)?summary:summary.slice(0,340)+"…";
  const tema = isRelLaboral && news.tema ? TEMA_LABELS[news.tema] : null;

  return (
    <div style={{background:"rgba(255,255,255,0.96)",borderRadius:16,padding:compact?"18px 22px":"28px 32px",boxShadow:"0 2px 20px rgba(15,23,42,0.08)",border:"1.5px solid rgba(186,230,253,0.55)",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",left:0,top:0,bottom:0,width:5,background:`linear-gradient(180deg,${accent||"#0369A1"},${accent||"#0369A1"}88)`,borderRadius:"16px 0 0 16px"}}/>
      <div style={{paddingLeft:14}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12,flexWrap:"wrap"}}>
          <span style={{background:bg||"#DBEAFE",color:accent||"#0369A1",padding:"5px 16px",borderRadius:20,fontSize:13,fontWeight:700,border:`1px solid ${accent||"#0369A1"}33`}}>
            {RANK_LABELS[rank]||`#${rank+1}`}
          </span>
          {news.isLive&&<span style={{background:"#D1FAE5",color:"#065F46",padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:700}}>EN VIVO</span>}
          {tema&&<span style={{background:tema.bg,color:tema.color,padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:700}}>{tema.label}</span>}
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
          <a href={news.url} target="_blank" rel="noopener noreferrer"
            style={{display:"inline-flex",alignItems:"center",gap:9,padding:"12px 24px",background:bg||"#DBEAFE",border:`1.5px solid ${accent||"#0369A1"}44`,borderRadius:10,color:accent||"#0369A1",fontSize:15,fontWeight:700,textDecoration:"none"}}>
            🔗 Ver noticia completa · {news.source}
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
  const [likes,setLikes]=useState(()=>{try{return JSON.parse(localStorage.getItem("hr_likes_v5")||"{}");}catch{return {};}});
  const [view,setView]=useState("feed");
  const [toast,setToast]=useState(null);
  const [newsCache,setNewsCache]=useState({});
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);

  useEffect(()=>{try{localStorage.setItem("hr_likes_v5",JSON.stringify(likes));}catch{}},[likes]);

  const fetchNews=useCallback(async(category,force=false)=>{
    if(newsCache[category]&&!force) return;
    setLoading(true); setError(null);
    try {
      const res=await fetch(`/api/news?category=${category}`);
      if(!res.ok) throw new Error("Error al cargar");
      const data=await res.json();
      if(data.success&&data.news?.length>0) setNewsCache(prev=>({...prev,[category]:data.news}));
      else throw new Error("Sin resultados");
    } catch(e){ setError("No se pudieron cargar las noticias. Intenta de nuevo."); }
    setLoading(false);
  },[newsCache]);

  useEffect(()=>{ fetchNews(activeCategory); },[activeCategory]);

  const handleRefresh=()=>{
    setNewsCache(prev=>{const n={...prev};delete n[activeCategory];return n;});
    fetchNews(activeCategory,true);
    showToast("Actualizando noticias...");
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

  const currentNews=newsCache[activeCategory]||[];
  const likedNews=Object.entries(likes).flatMap(([newsId,catId])=>{
    const catNews=newsCache[catId]||[];
    const news=catNews.find(n=>n.id===newsId);
    const cat=CATEGORIES.find(c=>c.id===catId);
    return news?[{...news,catId,catLabel:cat?.label,catIcon:cat?.icon,catAccent:cat?.accent,catBg:cat?.bg}]:[];
  });

  const activeCat=CATEGORIES.find(c=>c.id===activeCategory);
  const isIndicadores=activeCategory==="indicadores";
  const isRelLaboral=activeCategory==="relaciones-laborales";

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
            <p style={{margin:0,fontSize:12,color:"#7DD3FC",letterSpacing:"0.5px"}}>RECURSOS HUMANOS · NOTICIAS EN TIEMPO REAL · 2026</p>
          </div>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
          {[{key:"feed",label:"Noticias"},{key:"ipc",label:"IPC"},{key:"eventos",label:"Eventos HR"},{key:"likes",label:`Me Gusta${Object.keys(likes).length>0?` (${Object.keys(likes).length})`:""}`}].map(btn=>(
            <button key={btn.key} onClick={()=>setView(btn.key)} style={{padding:"11px 20px",borderRadius:10,border:"1.5px solid",borderColor:view===btn.key?"#0EA5E9":"rgba(255,255,255,0.15)",background:view===btn.key?"rgba(14,165,233,0.15)":"transparent",color:view===btn.key?"white":"#94A3B8",fontSize:14,fontWeight:600,cursor:"pointer"}}>
              {btn.label}
            </button>
          ))}
          <button onClick={handleRefresh} disabled={loading} style={{padding:"11px 16px",borderRadius:10,border:"1.5px solid rgba(255,255,255,0.15)",background:loading?"rgba(14,165,233,0.2)":"transparent",color:loading?"#7DD3FC":"#94A3B8",fontSize:14,cursor:loading?"not-allowed":"pointer",display:"flex",alignItems:"center",gap:6,fontWeight:600}}>
            {loading?"⏳ Cargando...":"🔄 Actualizar"}
          </button>
        </div>
      </header>

      {toast&&(
        <div style={{position:"fixed",bottom:32,left:"50%",transform:"translateX(-50%)",background:"#0F172A",color:"#7DD3FC",padding:"13px 32px",borderRadius:30,fontSize:15,fontWeight:600,zIndex:9999,boxShadow:"0 4px 24px rgba(15,23,42,0.4)",border:"1.5px solid #0EA5E9"}}>
          {toast}
        </div>
      )}

      <div style={{maxWidth:1020,margin:"0 auto",padding:"28px 16px"}}>

        {view==="ipc"&&(
          <>
            <div style={{background:"linear-gradient(135deg,#1E3A5F,#1E40AF)",borderRadius:16,padding:"24px 32px",marginBottom:28,display:"flex",alignItems:"center",gap:16,boxShadow:"0 4px 20px rgba(30,64,175,0.3)"}}>
              <span style={{fontSize:46}}>📉</span>
              <div>
                <h2 style={{margin:0,fontSize:23,color:"white",fontWeight:700}}>IPC · Indice de Precios al Consumidor</h2>
                <p style={{margin:"4px 0 0",color:"rgba(255,255,255,0.78)",fontSize:15}}>Datos oficiales del INDEC · actualizados mensualmente</p>
              </div>
            </div>
            <IPCWidget/>
            <div style={{background:"rgba(255,255,255,0.8)",borderRadius:14,padding:"20px 24px",border:"1.5px solid #BFDBFE"}}>
              <h3 style={{margin:"0 0 12px",fontSize:17,color:"#1E40AF",fontWeight:700}}>Acerca de este indicador</h3>
              <p style={{margin:"0 0 10px",fontSize:15,color:"#334155",lineHeight:1.75}}>
                El Indice de Precios al Consumidor (IPC) mide la evolucion de los precios de bienes y servicios que consumen los hogares argentinos. Es publicado mensualmente por el INDEC (Instituto Nacional de Estadistica y Censos) y es el indicador de referencia para negociaciones paritarias, actualizacion de contratos y politica economica.
              </p>
              <p style={{margin:0,fontSize:15,color:"#334155",lineHeight:1.75}}>
                Para profesionales de RRHH, el IPC es clave para: actualizar escalas salariales, negociar paritarias con sindicatos, calcular actualizaciones de beneficios, y planificar presupuestos de compensaciones.
              </p>
              <div style={{marginTop:16}}>
                <a href="https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31" target="_blank" rel="noopener noreferrer"
                  style={{display:"inline-flex",alignItems:"center",gap:8,padding:"12px 24px",background:"linear-gradient(135deg,#1E3A5F,#1E40AF)",borderRadius:10,color:"white",fontSize:15,fontWeight:700,textDecoration:"none"}}>
                  🔗 Ver todos los informes del INDEC
                </a>
              </div>
            </div>
          </>
        )}

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
                  {isRelLaboral?"Top 5 novedades laborales · Argentina · tiempo real":"Noticias en tiempo real · fuentes globales verificadas · "+new Date().toLocaleDateString("es-AR",{month:"long",year:"numeric"})}
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
                          🔗 {d.source}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {error&&(
              <div style={{background:"#FEF2F2",border:"1.5px solid #FECACA",borderRadius:12,padding:"20px 24px",marginBottom:24,color:"#DC2626",fontSize:15}}>
                {error}
                <button onClick={handleRefresh} style={{marginLeft:16,background:"#DC2626",color:"white",border:"none",borderRadius:8,padding:"8px 16px",fontSize:14,fontWeight:700,cursor:"pointer"}}>Reintentar</button>
              </div>
            )}

            <div style={{display:"flex",flexDirection:"column",gap:22}}>
              {loading&&currentNews.length===0
                ?[1,2,3].map(i=><SkeletonCard key={i}/>)
                :currentNews.map((news,idx)=>(
                  <NewsCard key={news.id} news={news} rank={idx}
                    accent={activeCat?.accent} bg={activeCat?.bg}
                    isLiked={!!likes[news.id]}
                    onToggleLike={()=>toggleLike(news.id,activeCategory)}
                    isRelLaboral={isRelLaboral}
                  />
                ))
              }
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
                          <NewsCard key={news.id} news={news} rank={news.rank-1}
                            accent={news.catAccent} bg={news.catBg}
                            isLiked={true} onToggleLike={()=>toggleLike(news.id,catId)} compact
                          />
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
        <p style={{margin:0,fontSize:13,color:"#94A3B8"}}>Noticias en tiempo real · SHRM · HBR · MIT Sloan · Gallup · Josh Bersin · AIHR · iProfesional · INDEC · Boletin Oficial</p>
      </footer>
      <style>{`::-webkit-scrollbar{display:none;}`}</style>
    </div>
  );
}
