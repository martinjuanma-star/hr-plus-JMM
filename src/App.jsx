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

const EVENTOS = [
  { id:"ev1", titulo:"Congreso ADRHA 2026", tipo:"Congreso", fecha:"2026-06-05", fechaFin:"2026-06-06", lugar:"Buenos Aires, Argentina", modalidad:"Presencial", destacado:true, descripcion:"El congreso anual de la Asociacion de Recursos Humanos de la Argentina. Agenda centrada en IA aplicada a HR, nuevos modelos de liderazgo y bienestar organizacional.", link:"https://www.adrha.org.ar" },
  { id:"ev2", titulo:"HR Day Buenos Aires 2026", tipo:"Conferencia", fecha:"2026-06-18", lugar:"Buenos Aires, Argentina", modalidad:"Presencial", destacado:false, descripcion:"Un dia intensivo dedicado a la tecnologia e innovacion en Recursos Humanos. Demos en vivo, casos de implementacion de IA y paneles con lideres de HR.", link:"https://www.adrha.org.ar" },
  { id:"ev3", titulo:"Foro de Compensaciones y Beneficios LATAM", tipo:"Foro", fecha:"2026-07-03", lugar:"Buenos Aires, Argentina", modalidad:"Presencial + Virtual", destacado:true, descripcion:"El foro de referencia regional para profesionales de compensaciones y beneficios. Transparencia salarial, pay equity y beneficios flexibles.", link:"https://www.worldatwork.org" },
  { id:"ev4", titulo:"Encuentro Nacional de Cultura Organizacional", tipo:"Encuentro", fecha:"2026-07-15", lugar:"Cordoba, Argentina", modalidad:"Presencial", destacado:false, descripcion:"Seguridad psicologica, DEI en el contexto latinoamericano y nuevas formas de construir cultura en organizaciones distribuidas.", link:"https://www.adrha.org.ar" },
  { id:"ev5", titulo:"Summit de Talent Acquisition Argentina 2026", tipo:"Summit", fecha:"2026-07-29", lugar:"Buenos Aires, Argentina", modalidad:"Presencial", destacado:false, descripcion:"IA en seleccion, employer branding, candidate experience y estrategias de movilidad interna en el mercado argentino.", link:"https://www.adrha.org.ar" },
  { id:"ev6", titulo:"Jornada de People Analytics Argentina", tipo:"Jornada", fecha:"2026-08-12", lugar:"Buenos Aires, Argentina", modalidad:"Presencial + Virtual", destacado:false, descripcion:"Casos reales de implementacion de analytics en empresas argentinas y los KPIs que los CEO piden a sus areas de RRHH.", link:"https://www.aihr.com" },
  { id:"ev7", titulo:"Congreso de Change Management Argentina", tipo:"Congreso", fecha:"2026-08-20", lugar:"Buenos Aires, Argentina", modalidad:"Presencial", destacado:true, descripcion:"Metodologias Prosci y ADKAR adaptadas al contexto local y el rol critico de HR como arquitecto del cambio.", link:"https://www.prosci.com" },
  { id:"ev8", titulo:"Expo Recursos Humanos Argentina 2026", tipo:"Exposicion", fecha:"2026-09-03", fechaFin:"2026-09-04", lugar:"La Rural, Buenos Aires", modalidad:"Presencial", destacado:false, descripcion:"La exposicion mas grande de soluciones de RRHH de Argentina. Mas de 80 expositores de tecnologia HR, capacitacion y payroll.", link:"https://www.adrha.org.ar" },
];

const RANK_LABELS = ["#1","#2","#3","#4","#5"];

function formatDate(d) {
  try { return new Date(d+"T12:00:00").toLocaleDateString("es-AR",{day:"numeric",month:"long",year:"numeric"}); }
  catch { return d; }
}
function formatEventDate(f,t) {
  const opts={day:"numeric",month:"long"};
  const s=new Date(f+"T12:00:00").toLocaleDateString("es-AR",opts);
  if(!t) return s+" · 2026";
  return s+" al "+new Date(t+"T12:00:00").toLocaleDateString("es-AR",opts)+" · 2026";
}

function SkeletonCard() {
  return (
    <div style={{background:"white",borderRadius:16,padding:"24px 28px",boxShadow:"0 1px 12px rgba(15,23,42,0.06)",border:"1px solid #E2E8F0",animation:"pulse 1.5s infinite"}}>
      <div style={{height:14,background:"#E2E8F0",borderRadius:6,width:"25%",marginBottom:14}}/>
      <div style={{height:22,background:"#E2E8F0",borderRadius:6,width:"80%",marginBottom:10}}/>
      <div style={{height:15,background:"#E2E8F0",borderRadius:6,width:"100%",marginBottom:6}}/>
      <div style={{height:15,background:"#E2E8F0",borderRadius:6,width:"90%",marginBottom:6}}/>
      <div style={{height:15,background:"#E2E8F0",borderRadius:6,width:"70%",marginBottom:20}}/>
      <div style={{display:"flex",gap:10}}>
        <div style={{height:40,background:"#E2E8F0",borderRadius:8,width:"45%"}}/>
        <div style={{height:40,background:"#E2E8F0",borderRadius:8,width:"30%"}}/>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}`}</style>
    </div>
  );
}

function IPCWidget() {
  const [ipc,setIpc]=useState(null);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    fetch("/api/news?type=ipc")
      .then(r=>r.json())
      .then(d=>{ if(d.success) setIpc(d.ipc); })
      .catch(()=>{})
      .finally(()=>setLoading(false));
  },[]);

  if(loading) return <div style={{background:"#1E3A5F",borderRadius:14,padding:"20px 24px",marginBottom:24,height:100}}/>;
  if(!ipc) return null;

  const items=[
    {label:"Mensual",    value:ipc.variacion_mensual,    color:"#38BDF8"},
    {label:"Interanual", value:ipc.variacion_interanual, color:"#F87171"},
    {label:"Acumulado",  value:ipc.variacion_acumulada,  color:"#34D399"},
  ];

  return (
    <div style={{background:"linear-gradient(135deg,#1E3A5F,#1E40AF)",borderRadius:14,padding:"18px 20px",marginBottom:24,boxShadow:"0 4px 20px rgba(30,64,175,0.2)"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,flexWrap:"wrap",gap:8}}>
        <div>
          <p style={{margin:0,fontSize:14,fontWeight:700,color:"white"}}>IPC · Indice de Precios al Consumidor</p>
          <p style={{margin:"2px 0 0",fontSize:11,color:"#93C5FD"}}>INDEC · {ipc.mes} · Argentina</p>
        </div>
        <a href={ipc.url_indec||"https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31"} target="_blank" rel="noopener noreferrer"
          style={{fontSize:12,fontWeight:700,color:"white",textDecoration:"none",background:"rgba(255,255,255,0.15)",padding:"6px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.25)"}}>
          Ver INDEC →
        </a>
      </div>
      <div style={{display:"flex",gap:8}}>
        {items.map(ind=>(
          <div key={ind.label} style={{flex:1,background:"white",borderRadius:10,padding:"10px 8px",textAlign:"center"}}>
            <div style={{fontSize:20,fontWeight:700,color:ind.color}}>{ind.value}</div>
            <div style={{fontSize:11,color:"#64748B",fontWeight:600,marginTop:2}}>{ind.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NewsCard({news,rank,accent,bg,isLiked,onToggleLike,compact}) {
  const [expanded,setExpanded]=useState(false);
  const [shared,setShared]=useState(false);
  const summary=news.summary||"";
  const isLong=summary.length>300;
  const shown=(!isLong||expanded||compact)?summary:summary.slice(0,300)+"…";

  const handleShare=async()=>{
    const text=`${news.title}\n\n${news.summary?.slice(0,200)}...\n\nFuente: ${news.source}\n${news.url}`;
    try {
      if(navigator.share) await navigator.share({title:news.title,url:news.url});
      else await navigator.clipboard.writeText(text);
      setShared(true); setTimeout(()=>setShared(false),2000);
    } catch{}
  };

  return (
    <div style={{background:"white",borderRadius:16,padding:compact?"16px 20px":"24px 28px",boxShadow:"0 1px 12px rgba(15,23,42,0.06)",border:"1px solid #E2E8F0",position:"relative",overflow:"hidden",transition:"box-shadow 0.2s"}}>
      <div style={{position:"absolute",left:0,top:0,bottom:0,width:4,background:accent||"#0369A1",borderRadius:"16px 0 0 16px"}}/>
      <div style={{paddingLeft:12}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,flexWrap:"wrap"}}>
          <span style={{background:bg||"#DBEAFE",color:accent||"#0369A1",padding:"3px 12px",borderRadius:20,fontSize:12,fontWeight:700}}>
            {RANK_LABELS[rank]||`#${rank+1}`} Relevante
          </span>
          {news.isLive&&(
            <span style={{background:"#D1FAE5",color:"#065F46",padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:700}}>EN VIVO</span>
          )}
          <span style={{fontSize:12,color:"#94A3B8",marginLeft:"auto"}}>{formatDate(news.date)}</span>
        </div>

        <h3 style={{margin:"0 0 10px",fontSize:compact?15:18,fontWeight:700,color:"#0F172A",lineHeight:1.4}}>{news.title}</h3>

        <p style={{margin:"0 0 16px",fontSize:compact?13:15,color:"#334155",lineHeight:1.75}}>
          {shown}
          {isLong&&!compact&&(
            <button onClick={()=>setExpanded(e=>!e)} style={{background:"none",border:"none",color:accent||"#0369A1",fontSize:13,fontWeight:700,cursor:"pointer",padding:"0 0 0 4px"}}>
              {expanded?" Ver menos":" Leer mas"}
            </button>
          )}
        </p>

        <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",borderTop:"1px solid #F1F5F9",paddingTop:14}}>
          <a href={news.url} target="_blank" rel="noopener noreferrer"
            style={{display:"inline-flex",alignItems:"center",gap:7,padding:"10px 18px",background:bg||"#DBEAFE",border:`1.5px solid ${accent||"#0369A1"}33`,borderRadius:9,color:accent||"#0369A1",fontSize:14,fontWeight:700,textDecoration:"none"}}>
            🔗 {news.source}
          </a>
          <div style={{display:"flex",gap:6,marginLeft:"auto"}}>
            {!compact&&(
              <button onClick={handleShare} style={{padding:"10px 14px",borderRadius:9,border:"1.5px solid #E2E8F0",background:shared?"#F0FDFA":"white",color:shared?"#0D9488":"#64748B",fontSize:13,fontWeight:600,cursor:"pointer"}}>
                {shared?"✓":"↗"} {compact?"":shared?"Copiado":"Compartir"}
              </button>
            )}
            <button onClick={onToggleLike} style={{padding:"10px 16px",borderRadius:9,border:"1.5px solid",borderColor:isLiked?"#0EA5E9":"#E2E8F0",background:isLiked?"#EFF6FF":"white",color:isLiked?"#0369A1":"#64748B",fontSize:13,fontWeight:700,cursor:"pointer"}}>
              {isLiked?"♥":"♡"} {compact?"":isLiked?"Guardado":"Me gusta"}
            </button>
          </div>
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

  const TIPO_BG={"Congreso":"#DBEAFE","Conferencia":"#CFFAFE","Foro":"#D1FAE5","Encuentro":"#F0FDFA","Summit":"#F0FDFA","Jornada":"#EFF6FF","Exposicion":"#FEF3C7"};
  const TIPO_C={"Congreso":"#1D4ED8","Conferencia":"#0891B2","Foro":"#059669","Encuentro":"#0F766E","Summit":"#0F766E","Jornada":"#0369A1","Exposicion":"#92400E"};
  const MOD_BG={"Presencial":"#D1FAE5","Virtual":"#EFF6FF","Presencial + Virtual":"#FEF3C7"};
  const MOD_C={"Presencial":"#065F46","Virtual":"#1D4ED8","Presencial + Virtual":"#92400E"};

  return (
    <>
      <div style={{background:"linear-gradient(135deg,#0F766E,#0369A1)",borderRadius:14,padding:"20px 24px",marginBottom:24,display:"flex",alignItems:"center",gap:14,boxShadow:"0 4px 20px rgba(15,118,110,0.3)"}}>
        <span style={{fontSize:36}}>📅</span>
        <div>
          <h2 style={{margin:0,fontSize:20,color:"white",fontWeight:700}}>Eventos HR · Argentina 2026</h2>
          <p style={{margin:"3px 0 0",color:"rgba(255,255,255,0.78)",fontSize:13}}>{EVENTOS.length} eventos · junio — septiembre</p>
        </div>
      </div>

      <p style={{fontSize:13,color:"#0369A1",fontWeight:700,marginBottom:12}}>Destacados</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14,marginBottom:24}}>
        {destacados.map(ev=>(
          <div key={ev.id} style={{background:"white",borderRadius:14,padding:"20px",boxShadow:"0 2px 16px rgba(15,118,110,0.1)",border:"1.5px solid #99F6E4",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:0,right:0,background:"linear-gradient(135deg,#0F766E,#0369A1)",padding:"4px 12px",borderRadius:"0 14px 0 10px"}}>
              <span style={{fontSize:10,color:"white",fontWeight:700}}>DESTACADO</span>
            </div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
              <span style={{background:TIPO_BG[ev.tipo]||"#E0F2FE",color:TIPO_C[ev.tipo]||"#0284C7",padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:700}}>{ev.tipo}</span>
              <span style={{background:MOD_BG[ev.modalidad]||"#E0F2FE",color:MOD_C[ev.modalidad]||"#0284C7",padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600}}>{ev.modalidad}</span>
            </div>
            <h3 style={{margin:"0 0 6px",fontSize:15,fontWeight:700,color:"#0F172A",lineHeight:1.3}}>{ev.titulo}</h3>
            <p style={{margin:"0 0 4px",fontSize:12,color:"#0369A1",fontWeight:600}}>📅 {formatEventDate(ev.fecha,ev.fechaFin)}</p>
            <p style={{margin:"0 0 12px",fontSize:12,color:"#475569"}}>📍 {ev.lugar}</p>
            <a href={ev.link} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:6,padding:"8px 16px",background:"linear-gradient(135deg,#0F766E,#0369A1)",borderRadius:8,color:"white",fontSize:12,fontWeight:700,textDecoration:"none"}}>
              Mas informacion
            </a>
          </div>
        ))}
      </div>

      <div style={{display:"flex",gap:6,marginBottom:20,flexWrap:"wrap"}}>
        {["todos",...meses].map(m=>(
          <button key={m} onClick={()=>setFiltro(m)} style={{padding:"7px 14px",borderRadius:20,border:"1.5px solid",borderColor:filtro===m?"#0369A1":"#E2E8F0",background:filtro===m?"#DBEAFE":"white",color:filtro===m?"#0369A1":"#374151",fontSize:13,fontWeight:filtro===m?700:400,cursor:"pointer"}}>
            {m==="todos"?"Todos":m}
          </button>
        ))}
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        {filtrados.map(ev=>(
          <div key={ev.id} style={{background:"white",borderRadius:14,padding:"20px 24px",boxShadow:"0 1px 10px rgba(15,23,42,0.06)",border:"1px solid #E2E8F0"}}>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10,alignItems:"center"}}>
              <span style={{background:TIPO_BG[ev.tipo]||"#E0F2FE",color:TIPO_C[ev.tipo]||"#0284C7",padding:"3px 12px",borderRadius:20,fontSize:12,fontWeight:700}}>{ev.tipo}</span>
              <span style={{background:MOD_BG[ev.modalidad]||"#E0F2FE",color:MOD_C[ev.modalidad]||"#0284C7",padding:"3px 12px",borderRadius:20,fontSize:12,fontWeight:600}}>{ev.modalidad}</span>
            </div>
            <h3 style={{margin:"0 0 8px",fontSize:17,fontWeight:700,color:"#0F172A",lineHeight:1.3}}>{ev.titulo}</h3>
            <div style={{display:"flex",gap:16,flexWrap:"wrap",marginBottom:10}}>
              <span style={{fontSize:13,color:"#0369A1",fontWeight:600}}>📅 {formatEventDate(ev.fecha,ev.fechaFin)}</span>
              <span style={{fontSize:13,color:"#475569"}}>📍 {ev.lugar}</span>
            </div>
            <p style={{margin:"0 0 14px",fontSize:14,color:"#334155",lineHeight:1.7}}>{ev.descripcion}</p>
            <a href={ev.link} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:7,padding:"10px 20px",background:"#EFF6FF",border:"1.5px solid #BFDBFE",borderRadius:9,color:"#1D4ED8",fontSize:13,fontWeight:700,textDecoration:"none"}}>
              Mas informacion sobre el evento
            </a>
          </div>
        ))}
      </div>
    </>
  );
}

export default function RHPlusApp() {
  const [activeCategory,setActiveCategory]=useState("beneficios");
  const [likes,setLikes]=useState(()=>{try{return JSON.parse(localStorage.getItem("rh_likes_v2")||"{}");}catch{return {};}});
  const [view,setView]=useState("feed");
  const [toast,setToast]=useState(null);
  const [newsCache,setNewsCache]=useState({});
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);

  useEffect(()=>{try{localStorage.setItem("rh_likes_v2",JSON.stringify(likes));}catch{}},[likes]);

  const fetchNews=useCallback(async(category,force=false)=>{
    if(newsCache[category]&&!force) return;
    setLoading(true); setError(null);
    try {
      const res=await fetch(`/api/news?category=${category}`);
      if(!res.ok) throw new Error("Error");
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
    showToast("Actualizando...");
  };

  const toggleLike=(newsId,catId)=>{
    setLikes(prev=>{
      const u={...prev};
      if(u[newsId]){delete u[newsId];showToast("Eliminado de Mis Guardados");}
      else{u[newsId]=catId;showToast("Guardado ✓");}
      return u;
    });
  };
  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(null),2500);};

  const currentNews=newsCache[activeCategory]||[];
  const likedNews=Object.entries(likes).flatMap(([newsId,catId])=>{
    const catNews=newsCache[catId]||[];
    const news=catNews.find(n=>n.id===newsId);
    const cat=CATEGORIES.find(c=>c.id===catId);
    return news?[{...news,catId,catLabel:cat?.label,catIcon:cat?.icon,catAccent:cat?.accent,catBg:cat?.bg}]:[];
  });

  const activeCat=CATEGORIES.find(c=>c.id===activeCategory);
  const likesCount=Object.keys(likes).length;

  return (
    <div style={{minHeight:"100vh",background:"#F8FAFC",fontFamily:"'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif"}}>

      {/* Header */}
      <header style={{background:"linear-gradient(135deg,#0F172A,#0C4A6E)",padding:"16px 24px",position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 20px rgba(15,23,42,0.2)"}}>
        <div style={{maxWidth:1020,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{display:"flex",alignItems:"baseline",gap:6}}>
              <h1 style={{margin:0,fontSize:24,fontWeight:700,color:"white",letterSpacing:"-0.3px"}}>RH+</h1>
              <span style={{fontSize:11,color:"#7DD3FC",fontStyle:"italic"}}>by JMM</span>
            </div>
            <p style={{margin:0,fontSize:11,color:"#7DD3FC",letterSpacing:"0.5px"}}>RECURSOS HUMANOS · NOTICIAS EN TIEMPO REAL · 2026</p>
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
            {[
              {key:"feed",   label:"Noticias"},
              {key:"ipc",    label:"IPC"},
              {key:"eventos",label:"Eventos"},
              {key:"likes",  label:`Guardados${likesCount>0?` (${likesCount})`:""}`},
            ].map(btn=>(
              <button key={btn.key} onClick={()=>setView(btn.key)} style={{padding:"9px 16px",borderRadius:20,border:"1.5px solid",borderColor:view===btn.key?"#0EA5E9":"rgba(255,255,255,0.15)",background:view===btn.key?"rgba(14,165,233,0.2)":"transparent",color:view===btn.key?"white":"#94A3B8",fontSize:13,fontWeight:600,cursor:"pointer"}}>
                {btn.label}
              </button>
            ))}
            <button onClick={handleRefresh} disabled={loading} style={{padding:"9px 14px",borderRadius:20,border:"1.5px solid rgba(255,255,255,0.15)",background:"transparent",color:loading?"#7DD3FC":"#94A3B8",fontSize:13,cursor:"pointer",fontWeight:600}}>
              {loading?"...":"🔄"}
            </button>
          </div>
        </div>
      </header>

      {toast&&(
        <div style={{position:"fixed",bottom:28,left:"50%",transform:"translateX(-50%)",background:"#0F172A",color:"#7DD3FC",padding:"11px 28px",borderRadius:24,fontSize:14,fontWeight:600,zIndex:9999,boxShadow:"0 4px 20px rgba(15,23,42,0.3)",border:"1px solid #0EA5E9"}}>
          {toast}
        </div>
      )}

      <div style={{maxWidth:1020,margin:"0 auto",padding:"24px 16px"}}>

        {/* IPC VIEW */}
        {view==="ipc"&&(
          <>
            <div style={{background:"linear-gradient(135deg,#1E3A5F,#1E40AF)",borderRadius:14,padding:"20px 24px",marginBottom:24,display:"flex",alignItems:"center",gap:14,boxShadow:"0 4px 20px rgba(30,64,175,0.25)"}}>
              <span style={{fontSize:36}}>📉</span>
              <div>
                <h2 style={{margin:0,fontSize:20,color:"white",fontWeight:700}}>IPC · Indice de Precios al Consumidor</h2>
                <p style={{margin:"3px 0 0",color:"rgba(255,255,255,0.75)",fontSize:13}}>Datos oficiales INDEC · actualizados mensualmente</p>
              </div>
            </div>
            <IPCWidget/>
            <div style={{background:"white",borderRadius:14,padding:"20px 24px",border:"1px solid #E2E8F0",boxShadow:"0 1px 10px rgba(15,23,42,0.05)"}}>
              <h3 style={{margin:"0 0 10px",fontSize:16,color:"#1E40AF",fontWeight:700}}>Por que es clave para RH+</h3>
              <p style={{margin:"0 0 14px",fontSize:14,color:"#334155",lineHeight:1.75}}>El IPC es el indicador de referencia para negociaciones paritarias, actualizacion de escalas salariales, ajuste de beneficios y planificacion de presupuestos de compensaciones en Argentina. Se publica entre el 12 y 15 de cada mes.</p>
              <a href="https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31" target="_blank" rel="noopener noreferrer"
                style={{display:"inline-flex",alignItems:"center",gap:7,padding:"11px 20px",background:"linear-gradient(135deg,#1E3A5F,#1E40AF)",borderRadius:9,color:"white",fontSize:14,fontWeight:700,textDecoration:"none"}}>
                🔗 Ver todos los informes INDEC
              </a>
            </div>
          </>
        )}

        {/* FEED VIEW */}
        {view==="feed"&&(
          <>
            {/* Category tabs */}
            <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:12,marginBottom:20,scrollbarWidth:"none"}}>
              {CATEGORIES.map(cat=>(
                <button key={cat.id} onClick={()=>setActiveCategory(cat.id)} style={{padding:"7px 13px",borderRadius:20,border:"1.5px solid",borderColor:activeCategory===cat.id?cat.accent:"#E2E8F0",background:activeCategory===cat.id?cat.bg:"white",color:activeCategory===cat.id?cat.accent:"#64748B",fontSize:12,fontWeight:activeCategory===cat.id?700:400,cursor:"pointer",whiteSpace:"nowrap",boxShadow:activeCategory===cat.id?`0 1px 8px ${cat.accent}22`:"none",display:"flex",alignItems:"center",gap:5,transition:"all 0.15s"}}>
                  <span style={{fontSize:13}}>{cat.icon}</span>{cat.label}
                </button>
              ))}
            </div>

            {/* Category header */}
            <div style={{background:`linear-gradient(135deg,${activeCat?.accent||"#0369A1"},${activeCat?.accent||"#0369A1"}DD)`,borderRadius:14,padding:"18px 24px",marginBottom:20,display:"flex",alignItems:"center",gap:14,boxShadow:`0 3px 16px ${activeCat?.accent||"#0369A1"}33`}}>
              <span style={{fontSize:36}}>{activeCat?.icon}</span>
              <div>
                <h2 style={{margin:0,fontSize:20,color:"white",fontWeight:700}}>{activeCat?.label}</h2>
                <p style={{margin:"3px 0 0",color:"rgba(255,255,255,0.75)",fontSize:13}}>
                  Noticias reales · SHRM · HR Dive · AIHR · Josh Bersin · Gallup · {new Date().toLocaleDateString("es-AR",{month:"long",year:"numeric"})}
                </p>
              </div>
            </div>

            {error&&(
              <div style={{background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:12,padding:"16px 20px",marginBottom:20,display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
                <span style={{fontSize:14,color:"#DC2626"}}>{error}</span>
                <button onClick={handleRefresh} style={{background:"#DC2626",color:"white",border:"none",borderRadius:8,padding:"8px 16px",fontSize:13,fontWeight:700,cursor:"pointer"}}>Reintentar</button>
              </div>
            )}

            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              {loading&&currentNews.length===0
                ?[1,2,3].map(i=><SkeletonCard key={i}/>)
                :currentNews.map((news,idx)=>(
                  <NewsCard key={news.id} news={news} rank={idx}
                    accent={activeCat?.accent} bg={activeCat?.bg}
                    isLiked={!!likes[news.id]}
                    onToggleLike={()=>toggleLike(news.id,activeCategory)}
                  />
                ))
              }
            </div>
          </>
        )}

        {/* EVENTOS VIEW */}
        {view==="eventos"&&<EventosView/>}

        {/* LIKES VIEW */}
        {view==="likes"&&(
          <>
            <div style={{background:"linear-gradient(135deg,#0F172A,#0C4A6E)",borderRadius:14,padding:"20px 24px",marginBottom:24,display:"flex",alignItems:"center",gap:14,boxShadow:"0 4px 20px rgba(15,23,42,0.15)"}}>
              <span style={{fontSize:36}}>♥</span>
              <div>
                <h2 style={{margin:0,fontSize:20,color:"white",fontWeight:700}}>Mis Guardados</h2>
                <p style={{margin:"3px 0 0",color:"#7DD3FC",fontSize:13}}>
                  {likedNews.length===0?"Todavia no guardaste nada":`${likedNews.length} articulo${likedNews.length!==1?"s":""} guardado${likedNews.length!==1?"s":""}`}
                </p>
              </div>
            </div>

            {likedNews.length===0?(
              <div style={{textAlign:"center",padding:"48px 20px",color:"#64748B"}}>
                <div style={{fontSize:56,marginBottom:14}}>📌</div>
                <p style={{fontSize:16,marginBottom:18}}>Explora las noticias y guarda las que mas te interesen.</p>
                <button onClick={()=>setView("feed")} style={{padding:"12px 28px",background:"linear-gradient(135deg,#0369A1,#0D9488)",border:"none",borderRadius:10,color:"white",fontSize:15,fontWeight:700,cursor:"pointer"}}>Ver noticias</button>
              </div>
            ):(
              <div style={{display:"flex",flexDirection:"column",gap:28}}>
                {Object.entries(likedNews.reduce((acc,n)=>{if(!acc[n.catId])acc[n.catId]=[];acc[n.catId].push(n);return acc;},{})).map(([catId,items])=>{
                  const cat=CATEGORIES.find(c=>c.id===catId);
                  return (
                    <div key={catId}>
                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12,paddingBottom:8,borderBottom:`2px solid ${cat?.accent||"#0369A1"}33`}}>
                        <span style={{fontSize:18}}>{items[0].catIcon}</span>
                        <h3 style={{margin:0,fontSize:16,color:cat?.accent||"#0369A1",fontWeight:700}}>{items[0].catLabel}</h3>
                        <span style={{marginLeft:"auto",fontSize:12,color:"#94A3B8"}}>{items.length} guardado{items.length!==1?"s":""}</span>
                      </div>
                      <div style={{display:"flex",flexDirection:"column",gap:12}}>
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

      <footer style={{marginTop:48,borderTop:"1px solid #E2E8F0",padding:"24px 16px",textAlign:"center",background:"white"}}>
        <p style={{margin:"0 0 2px",fontSize:18,fontWeight:700,color:"#0369A1"}}>RH+</p>
        <p style={{margin:"0 0 8px",fontSize:11,color:"#0D9488",letterSpacing:"1px",fontStyle:"italic",fontWeight:600}}>by JMM</p>
        <p style={{margin:0,fontSize:12,color:"#94A3B8"}}>Fuentes: SHRM · HR Dive · AIHR · Josh Bersin · Gallup · MIT Sloan · HR Morning · INDEC</p>
      </footer>
      <style>{`::-webkit-scrollbar{display:none;}`}</style>
    </div>
  );
}
