import { useState, useEffect, useCallback, useRef } from "react";

const INITIAL_DATA = {
  companies: [
    {
      id:"c1", name:"SABIR EXPRESS INC", color:"#3b82f6", eldProvider:"leader",
      drivers:[
        {id:"d1",  name:"Abbos Eshnazarov",                       truck:"#002",    responsible:"David", note:"Off",      date:"2025-04-23", paperLogbook:null, userManual:null, tabletMounted:null, eldTimes:"",         status:"yellow", connectHistory:[1,1,0,1,0,1,1,0], profileFormDate:"2025-04-01", active:true,  eldDriverId:""},
        {id:"d2",  name:"Afzal Abdullaev",                        truck:"#010",    responsible:"David", note:"New",      date:"2025-04-23", paperLogbook:null, userManual:null, tabletMounted:null, eldTimes:"",         status:"green",  connectHistory:[1,1,1,1,1,1,1,1], profileFormDate:"2025-04-10", active:true,  eldDriverId:""},
        {id:"d3",  name:"Golibjon Ravshanov | Elmurod Berdiev",   truck:"#009",    responsible:"David", note:"All good", date:"2025-04-23", paperLogbook:true, userManual:true, tabletMounted:true, eldTimes:"ALL GOOD", status:"green",  connectHistory:[1,1,1,1,1,1,1,1], profileFormDate:"2025-04-05", active:true,  eldDriverId:""},
        {id:"d4",  name:"Shukhrat Sharofidinov | Farrux Azizov",  truck:"#006",    responsible:"David", note:"All good", date:"2025-04-23", paperLogbook:true, userManual:true, tabletMounted:true, eldTimes:"ALL GOOD", status:"green",  connectHistory:[1,1,1,0,1,1,1,1], profileFormDate:"2025-04-08", active:true,  eldDriverId:""},
        {id:"d5",  name:"Gafur Normamatovich Yuldashev",          truck:"#110",    responsible:"David", note:"All good", date:"2025-04-23", paperLogbook:true, userManual:null, tabletMounted:true, eldTimes:"1st time", status:"yellow", connectHistory:[1,0,1,0,1,1,0,1], profileFormDate:"2025-03-20", active:true,  eldDriverId:""},
        {id:"d6",  name:"Lochinbek Abduvali Abduraupov",          truck:"#046",    responsible:"David", note:"All good", date:"2025-04-23", paperLogbook:true, userManual:true, tabletMounted:true, eldTimes:"ALL GOOD", status:"green",  connectHistory:[1,1,1,1,1,1,1,1], profileFormDate:"2025-04-12", active:true,  eldDriverId:""},
        {id:"d7",  name:"Mukhlis Jabborov",                       truck:"#009",    responsible:"David", note:"Off",      date:"2025-04-23", paperLogbook:null, userManual:null, tabletMounted:null, eldTimes:"",         status:"red",    connectHistory:[0,1,0,0,1,0,0,1], profileFormDate:"2025-03-15", active:true,  eldDriverId:""},
        {id:"d8",  name:"Nasiba Kholikova | Guli K Makhmudova",   truck:"#007",    responsible:"David", note:"All good", date:"2025-04-23", paperLogbook:true, userManual:true, tabletMounted:null, eldTimes:"ALL GOOD", status:"yellow", connectHistory:[1,1,0,1,1,1,0,1], profileFormDate:"2025-04-03", active:true,  eldDriverId:""},
        {id:"d9",  name:"Olim Abdusalomov",                       truck:"#003",    responsible:"David", note:"All good", date:"2025-04-23", paperLogbook:true, userManual:true, tabletMounted:true, eldTimes:"ALL GOOD", status:"green",  connectHistory:[1,1,1,1,1,1,1,1], profileFormDate:"2025-04-15", active:true,  eldDriverId:""},
        {id:"d10", name:"Rasulbek Davletov",                      truck:"#008",    responsible:"David", note:"New",      date:"2025-04-23", paperLogbook:null, userManual:null, tabletMounted:null, eldTimes:"",         status:"yellow", connectHistory:[1,1,1,0,1,1,0,0], profileFormDate:"2025-04-20", active:true,  eldDriverId:""},
        {id:"d11", name:"Shakhzod Choriev",                       truck:"#SAV571", responsible:"David", note:"All good", date:"2025-04-23", paperLogbook:true, userManual:true, tabletMounted:true, eldTimes:"ALL GOOD", status:"green",  connectHistory:[1,1,1,1,1,1,1,1], profileFormDate:"2025-04-18", active:true,  eldDriverId:""},
        {id:"d12", name:"Sherbek Pardaev | Murodjon Murodullaev", truck:"",        responsible:"David", note:"New",      date:"2025-04-23", paperLogbook:null, userManual:null, tabletMounted:null, eldTimes:"",         status:"red",    connectHistory:[0,0,1,0,0,1,0,0], profileFormDate:"2025-03-10", active:true,  eldDriverId:""},
        {id:"d13", name:"Jamshid Kuziev",                         truck:"#110",    responsible:"David", note:"New",      date:"2025-04-23", paperLogbook:null, userManual:null, tabletMounted:null, eldTimes:"",         status:"yellow", connectHistory:[1,0,1,1,0,1,1,0], profileFormDate:"2025-04-22", active:true,  eldDriverId:""},
        {id:"d14", name:"Nizom Miyliev",                          truck:"#77",     responsible:"",      note:"",         date:"2025-03-23", paperLogbook:null, userManual:null, tabletMounted:null, eldTimes:"",         status:"red",    connectHistory:[0,0,0,1,0,0,0,1], profileFormDate:"2025-03-01", active:false, eldDriverId:""},
      ]
    },
    {
      id:"c2", name:"BRIGHT STAR LOGISTICS", color:"#10b981", eldProvider:"factor",
      drivers:[
        {id:"d15", name:"Bobur Yusupov",    truck:"#201", responsible:"Habi", note:"All good", date:"2025-04-23", paperLogbook:true, userManual:true, tabletMounted:true, eldTimes:"ALL GOOD", status:"green",  connectHistory:[1,1,1,1,1,1,1,1], profileFormDate:"2025-04-10", active:true, eldDriverId:""},
        {id:"d16", name:"Sardor Toshmatov", truck:"#202", responsible:"Habi", note:"New",      date:"2025-04-22", paperLogbook:null, userManual:null, tabletMounted:null, eldTimes:"",         status:"red",    connectHistory:[0,1,0,0,0,1,0,0], profileFormDate:"2025-03-28", active:true, eldDriverId:""},
        {id:"d17", name:"Jasur Mirzayev",   truck:"#203", responsible:"Mike", note:"All good", date:"2025-04-23", paperLogbook:true, userManual:true, tabletMounted:null, eldTimes:"1st time", status:"yellow", connectHistory:[1,1,0,1,1,0,1,1], profileFormDate:"2025-04-15", active:true, eldDriverId:""},
      ]
    },
    {
      id:"c3", name:"GOLDEN ROAD TRANSPORT", color:"#f59e0b", eldProvider:"leader",
      drivers:[
        {id:"d18", name:"Akbar Nazarov",                     truck:"#301", responsible:"Nate", note:"All good", date:"2025-04-23", paperLogbook:true, userManual:true, tabletMounted:true, eldTimes:"ALL GOOD", status:"green", connectHistory:[1,1,1,1,1,1,1,1], profileFormDate:"2025-04-20", active:true, eldDriverId:""},
        {id:"d19", name:"Dilshod Karimov | Ulmas Xolmatov", truck:"#302", responsible:"Beck", note:"Off",      date:"2025-04-21", paperLogbook:null, userManual:null, tabletMounted:null, eldTimes:"",         status:"red",   connectHistory:[0,0,0,1,0,0,1,0], profileFormDate:"2025-03-05", active:true, eldDriverId:""},
      ]
    }
  ]
};

const RESPONSIBLE = ["Ismail","Mike","Nate","Beck","David","Habi","Sue","Arthur"];
const NOTES       = ["All good","New","Off","Pending","Issue"];
const ELD_TIMES   = ["","ALL GOOD","1st time","2nd time","3rd time","Not set up"];
const DEFAULT_SETTINGS = {factorToken:"",factorUrl:"https://api.factorhq.com/v1",leaderToken:"",leaderUrl:"https://app.leadereld.com/api/v1",syncInterval:0};

const calcStatus = h => { if(!h?.length) return "yellow"; const p=h.filter(Boolean).length/h.length; return p>=0.85?"green":p>=0.5?"yellow":"red"; };
const fmt = d => d?new Date(d).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}):"—";
const daysSince = d => d?Math.floor((Date.now()-new Date(d))/86400000):999;

const STATUS = {
  green:  {label:"Connected",    bg:"#052e16",text:"#4ade80",dot:"#22c55e"},
  yellow: {label:"Intermittent", bg:"#422006",text:"#fbbf24",dot:"#f59e0b"},
  red:    {label:"Disconnected", bg:"#450a0a",text:"#f87171",dot:"#ef4444"},
};

const Badge = ({v}) => v===true?<span style={{background:"#052e16",color:"#4ade80",padding:"2px 10px",borderRadius:999,fontSize:11,fontWeight:700}}>YES</span>:v===false?<span style={{background:"#450a0a",color:"#f87171",padding:"2px 10px",borderRadius:999,fontSize:11,fontWeight:700}}>NO</span>:<span style={{color:"#374151",fontSize:12}}>—</span>;
const Pill = ({status}) => { const c=STATUS[status]||STATUS.yellow; return <span style={{display:"inline-flex",alignItems:"center",gap:5,background:c.bg,color:c.text,padding:"3px 10px",borderRadius:999,fontSize:11,fontWeight:700}}><span style={{width:6,height:6,borderRadius:"50%",background:c.dot,boxShadow:`0 0 6px ${c.dot}`}}/>{c.label}</span>; };
const Bar = ({h}) => <div style={{display:"flex",gap:2}}>{(h||[]).map((v,i)=><div key={i} style={{width:6,height:18,borderRadius:2,background:v?"#22c55e":"#ef4444",opacity:0.8}}/>)}</div>;

function FldInput({label,...p}){return <div><label style={{display:"block",fontSize:11,color:"#6b7280",textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>{label}</label><input style={{width:"100%",background:"#1f2937",border:"1px solid #374151",borderRadius:8,padding:"8px 12px",color:"#f9fafb",fontSize:13,boxSizing:"border-box"}} {...p}/></div>}
function FldSelect({label,children,...p}){return <div><label style={{display:"block",fontSize:11,color:"#6b7280",textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>{label}</label><select style={{width:"100%",background:"#1f2937",border:"1px solid #374151",borderRadius:8,padding:"8px 12px",color:"#f9fafb",fontSize:13}} {...p}>{children}</select></div>}

// ── Settings Modal ────────────────────────────────────────────────────────────
function SettingsModal({settings,onSave,onClose,syncResults}){
  const [f,setF]=useState(settings);
  const set=(k,v)=>setF(p=>({...p,[k]:v}));

  const TokenBox = ({label,tokenKey,urlKey,color,placeholder})=>(
    <div style={{background:"#0d1117",border:"1px solid #1f2937",borderRadius:12,padding:16,marginBottom:14}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
        <div style={{width:8,height:8,borderRadius:"50%",background:f[tokenKey]?"#22c55e":"#374151"}}/>
        <span style={{fontWeight:700,fontSize:13,color:"#f9fafb"}}>{label}</span>
        {f[tokenKey]&&<span style={{fontSize:10,background:"#052e16",color:"#4ade80",padding:"2px 8px",borderRadius:999}}>Token saved</span>}
      </div>
      <div style={{marginBottom:10}}>
        <label style={{display:"block",fontSize:11,color:"#6b7280",textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>Bearer Token</label>
        <input type="text" value={f[tokenKey]||""} onChange={e=>set(tokenKey,e.target.value)} placeholder={placeholder}
          style={{width:"100%",background:"#1f2937",border:"1px solid #374151",borderRadius:8,padding:"8px 12px",color,fontSize:11,boxSizing:"border-box",fontFamily:"monospace"}}/>
      </div>
      <div>
        <label style={{display:"block",fontSize:11,color:"#6b7280",textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>API Base URL</label>
        <input type="text" value={f[urlKey]} onChange={e=>set(urlKey,e.target.value)}
          style={{width:"100%",background:"#1f2937",border:"1px solid #374151",borderRadius:8,padding:"8px 12px",color:"#f9fafb",fontSize:12,boxSizing:"border-box"}}/>
      </div>
      {syncResults?.[tokenKey==="factorToken"?"factor":"leader"]&&(
        <div style={{marginTop:10,padding:8,background:syncResults[tokenKey==="factorToken"?"factor":"leader"].ok?"#052e16":"#450a0a",borderRadius:8,fontSize:11,color:syncResults[tokenKey==="factorToken"?"factor":"leader"].ok?"#4ade80":"#f87171"}}>
          {syncResults[tokenKey==="factorToken"?"factor":"leader"].ok?`✅ Connected — ${syncResults[tokenKey==="factorToken"?"factor":"leader"].count||0} drivers`:`❌ ${syncResults[tokenKey==="factorToken"?"factor":"leader"].error}`}
        </div>
      )}
    </div>
  );

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={onClose}>
      <div style={{background:"#111827",border:"1px solid #1f2937",borderRadius:16,padding:28,width:"100%",maxWidth:500,maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
          <h2 style={{margin:0,color:"#f9fafb",fontSize:17}}>⚙️ ELD Connection Settings</h2>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#6b7280",fontSize:20,cursor:"pointer"}}>✕</button>
        </div>

        <TokenBox label="⚡ Factor ELD" tokenKey="factorToken" urlKey="factorUrl" color="#60a5fa" placeholder="Paste your Factor ELD Bearer token here..."/>
        <TokenBox label="🔷 Leader ELD" tokenKey="leaderToken" urlKey="leaderUrl" color="#a78bfa" placeholder="Paste your Leader ELD Bearer token here..."/>

        <div style={{marginBottom:20}}>
          <label style={{display:"block",fontSize:11,color:"#6b7280",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Auto-sync interval</label>
          <div style={{display:"flex",gap:8}}>
            {[{v:0,l:"Off"},{v:5,l:"5 min"},{v:15,l:"15 min"},{v:30,l:"30 min"},{v:60,l:"1h"}].map(o=>(
              <button key={o.v} onClick={()=>set("syncInterval",o.v)}
                style={{flex:1,padding:"7px 0",borderRadius:8,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,
                  background:f.syncInterval===o.v?"#1d4ed8":"#1f2937",color:f.syncInterval===o.v?"white":"#6b7280"}}>
                {o.l}
              </button>
            ))}
          </div>
        </div>

        <div style={{background:"#0d1117",border:"1px solid #1f2937",borderRadius:10,padding:12,marginBottom:20}}>
          <div style={{fontSize:11,color:"#6b7280",marginBottom:6}}>ℹ️ How to get tokens</div>
          <div style={{fontSize:12,color:"#9ca3af",lineHeight:1.6}}>
            <b style={{color:"#60a5fa"}}>Factor ELD:</b> app.factorhq.com → Settings → API Tokens → Generate<br/>
            <b style={{color:"#a78bfa"}}>Leader ELD:</b> app.leadereld.com → Account → Developer → API Key
          </div>
        </div>

        <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
          <button onClick={onClose} style={{padding:"8px 20px",borderRadius:8,border:"1px solid #374151",background:"none",color:"#9ca3af",cursor:"pointer",fontSize:13}}>Cancel</button>
          <button onClick={()=>onSave(f)} style={{padding:"8px 20px",borderRadius:8,border:"none",background:"#2563eb",color:"white",cursor:"pointer",fontSize:13,fontWeight:600}}>Save & Connect</button>
        </div>
      </div>
    </div>
  );
}

// ── Driver Modal ──────────────────────────────────────────────────────────────
function DriverModal({driver,companyId,onSave,onClose}){
  const blank={id:`d${Date.now()}`,name:"",truck:"",responsible:"David",note:"New",date:new Date().toISOString().split("T")[0],paperLogbook:null,userManual:null,tabletMounted:null,eldTimes:"",status:"yellow",connectHistory:[1,1,1,1,1,1,1,1],profileFormDate:new Date().toISOString().split("T")[0],active:true,eldDriverId:""};
  const [f,setF]=useState(driver||blank);
  const set=(k,v)=>setF(p=>({...p,[k]:v}));
  const T3=({label,field})=>(
    <div style={{display:"flex",flexDirection:"column",gap:6}}>
      <label style={{fontSize:11,color:"#6b7280",textTransform:"uppercase",letterSpacing:1}}>{label}</label>
      <div style={{display:"flex",gap:5}}>
        {[true,false,null].map(v=>(
          <button key={String(v)} onClick={()=>set(field,v)}
            style={{padding:"4px 10px",borderRadius:6,border:"none",cursor:"pointer",fontSize:11,fontWeight:700,
              background:f[field]===v?(v===true?"#052e16":v===false?"#450a0a":"#1f2937"):"#111827",
              color:f[field]===v?(v===true?"#4ade80":v===false?"#f87171":"#9ca3af"):"#4b5563",
              outline:f[field]===v?`1px solid ${v===true?"#22c55e":v===false?"#ef4444":"#374151"}`:"none"}}>
            {v===true?"YES":v===false?"NO":"—"}
          </button>
        ))}
      </div>
    </div>
  );
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={onClose}>
      <div style={{background:"#111827",border:"1px solid #1f2937",borderRadius:16,padding:26,width:"100%",maxWidth:540,maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h2 style={{margin:0,color:"#f9fafb",fontSize:16}}>{driver?"Edit Driver":"Add Driver"}</h2>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#6b7280",fontSize:20,cursor:"pointer"}}>✕</button>
        </div>
        <div style={{display:"grid",gap:13}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}><FldInput label="Driver Name" value={f.name} onChange={e=>set("name",e.target.value)}/><FldInput label="Truck #" value={f.truck} onChange={e=>set("truck",e.target.value)}/></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <FldSelect label="Responsible" value={f.responsible} onChange={e=>set("responsible",e.target.value)}>{RESPONSIBLE.map(r=><option key={r}>{r}</option>)}</FldSelect>
            <FldSelect label="Note" value={f.note} onChange={e=>set("note",e.target.value)}>{NOTES.map(n=><option key={n}>{n}</option>)}</FldSelect>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <FldInput label="Check Date" type="date" value={f.date} onChange={e=>set("date",e.target.value)}/>
            <FldSelect label="ELD Times" value={f.eldTimes} onChange={e=>set("eldTimes",e.target.value)}>{ELD_TIMES.map(o=><option key={o} value={o}>{o||"—"}</option>)}</FldSelect>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}><T3 label="Paper Logbook" field="paperLogbook"/><T3 label="User's Manual" field="userManual"/><T3 label="Tablet Mounted" field="tabletMounted"/></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <FldInput label="Profile Form Date" type="date" value={f.profileFormDate} onChange={e=>set("profileFormDate",e.target.value)}/>
            <FldInput label="ELD Driver ID" value={f.eldDriverId||""} onChange={e=>set("eldDriverId",e.target.value)} placeholder="From ELD system"/>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:12,color:"#6b7280"}}>Active</span>
            <div onClick={()=>set("active",!f.active)} style={{width:42,height:22,borderRadius:999,background:f.active?"#1d4ed8":"#374151",cursor:"pointer",position:"relative"}}>
              <div style={{width:16,height:16,borderRadius:"50%",background:"white",position:"absolute",top:3,left:f.active?23:3,transition:"left 0.2s"}}/>
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:10,marginTop:20,justifyContent:"flex-end"}}>
          <button onClick={onClose} style={{padding:"8px 20px",borderRadius:8,border:"1px solid #374151",background:"none",color:"#9ca3af",cursor:"pointer",fontSize:13}}>Cancel</button>
          <button onClick={()=>onSave({...f,status:calcStatus(f.connectHistory)})} style={{padding:"8px 20px",borderRadius:8,border:"none",background:"#2563eb",color:"white",cursor:"pointer",fontSize:13,fontWeight:600}}>Save</button>
        </div>
      </div>
    </div>
  );
}

function Toasts({items,onDismiss}){
  return <div style={{position:"fixed",bottom:24,right:24,zIndex:9999,display:"flex",flexDirection:"column",gap:8,maxWidth:320}}>
    {items.map(t=>(
      <div key={t.id} style={{background:"#1f2937",border:`1px solid ${t.type==="warn"?"#f59e0b":t.type==="error"?"#ef4444":"#3b82f6"}`,borderRadius:10,padding:"11px 14px",display:"flex",alignItems:"flex-start",gap:9}}>
        <span style={{fontSize:14}}>{t.type==="warn"?"⚠️":t.type==="error"?"🔴":"✅"}</span>
        <div style={{flex:1}}><div style={{color:"#f9fafb",fontSize:13,fontWeight:600}}>{t.title}</div><div style={{color:"#9ca3af",fontSize:12,marginTop:1}}>{t.msg}</div></div>
        <button onClick={()=>onDismiss(t.id)} style={{background:"none",border:"none",color:"#6b7280",cursor:"pointer"}}>✕</button>
      </div>
    ))}
  </div>;
}

async function fetchEldDrivers(provider, token, baseUrl){
  const path = provider==="factor" ? "/api/factor?endpoint=drivers" : "/api/leader?endpoint=drivers";
  try{
    const res = await fetch(path,{headers:{"x-eld-token":token,"x-eld-url":baseUrl}});
    const json = await res.json();
    if(!json.ok) throw new Error(json.data?.message||`HTTP ${json.status}`);
    const drivers = Array.isArray(json.data)?json.data:Array.isArray(json.data?.data)?json.data.data:[];
    return {ok:true,drivers,count:drivers.length};
  }catch(e){ return {ok:false,error:e.message,drivers:[]}; }
}

export default function App(){
  const [data,setData]=useState(()=>{try{const s=localStorage.getItem("eld_data");return s?JSON.parse(s):INITIAL_DATA;}catch{return INITIAL_DATA;}});
  const [settings,setSettings]=useState(()=>{try{const s=localStorage.getItem("eld_settings");return s?JSON.parse(s):DEFAULT_SETTINGS;}catch{return DEFAULT_SETTINGS;}});
  const [activeCompany,setActiveCompany]=useState("all");
  const [filterResp,setFilterResp]=useState("all");
  const [filterStatus,setFilterStatus]=useState("all");
  const [search,setSearch]=useState("");
  const [view,setView]=useState("table");
  const [sidebar,setSidebar]=useState(true);
  const [showSettings,setShowSettings]=useState(false);
  const [modalDriver,setModalDriver]=useState(null);
  const [modalCid,setModalCid]=useState(null);
  const [toasts,setToasts]=useState([]);
  const [syncing,setSyncing]=useState(false);
  const [lastSync,setLastSync]=useState(null);
  const [syncResults,setSyncResults]=useState(null);
  const syncRef=useRef(null);

  useEffect(()=>{localStorage.setItem("eld_data",JSON.stringify(data));},[data]);
  useEffect(()=>{localStorage.setItem("eld_settings",JSON.stringify(settings));},[settings]);

  const toast=(title,msg,type="info")=>{const id=Date.now();setToasts(t=>[...t,{id,title,msg,type}]);setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),5000);};

  const runSync=useCallback(async()=>{
    const hF=settings.factorToken?.trim(),hL=settings.leaderToken?.trim();
    if(!hF&&!hL){toast("No tokens","Add tokens in ⚙️ Settings","warn");return;}
    setSyncing(true);
    const r={};
    if(hF){const res=await fetchEldDrivers("factor",settings.factorToken,settings.factorUrl);r.factor=res;toast(res.ok?"Factor ELD ✅":"Factor ELD ❌",res.ok?`${res.count} drivers synced`:res.error,res.ok?"info":"error");}
    if(hL){const res=await fetchEldDrivers("leader",settings.leaderToken,settings.leaderUrl);r.leader=res;toast(res.ok?"Leader ELD ✅":"Leader ELD ❌",res.ok?`${res.count} drivers synced`:res.error,res.ok?"info":"error");}
    setSyncResults(r);setLastSync(new Date());setSyncing(false);
  },[settings]);

  useEffect(()=>{
    if(syncRef.current)clearInterval(syncRef.current);
    if(settings.syncInterval>0)syncRef.current=setInterval(runSync,settings.syncInterval*60000);
    return()=>{if(syncRef.current)clearInterval(syncRef.current);};
  },[settings.syncInterval,runSync]);

  useEffect(()=>{
    const a=[];
    data.companies.forEach(c=>c.drivers.forEach(d=>{
      if(d.active&&d.status==="red")a.push({id:`r_${d.id}`,type:"error",title:d.name,msg:`Frequent disconnects — ${c.name}`});
      if(d.active&&daysSince(d.profileFormDate)>30)a.push({id:`p_${d.id}`,type:"warn",title:"Profile form overdue",msg:`${d.name} — ${daysSince(d.profileFormDate)}d ago`});
    }));
    if(a.length)setToasts(a.slice(0,4));
  },[]);

  const saveDriver=useCallback((cid,driver)=>{
    setData(d=>({...d,companies:d.companies.map(c=>c.id!==cid?c:{...c,drivers:c.drivers.find(x=>x.id===driver.id)?c.drivers.map(x=>x.id===driver.id?driver:x):[...c.drivers,driver]})}));
    setModalDriver(null);setModalCid(null);toast("Saved",`${driver.name} updated`);
  },[]);

  const allD=data.companies.flatMap(c=>c.drivers.map(d=>({...d,companyName:c.name,companyColor:c.color,companyId:c.id,eldProvider:c.eldProvider})));
  const visible=allD.filter(d=>{
    if(activeCompany!=="all"&&d.companyId!==activeCompany)return false;
    if(filterResp!=="all"&&d.responsible!==filterResp)return false;
    if(filterStatus!=="all"&&d.status!==filterStatus)return false;
    if(search&&!d.name.toLowerCase().includes(search.toLowerCase())&&!d.truck.toLowerCase().includes(search.toLowerCase()))return false;
    return true;
  });
  const S={total:allD.length,active:allD.filter(d=>d.active).length,green:allD.filter(d=>d.status==="green").length,yellow:allD.filter(d=>d.status==="yellow").length,red:allD.filter(d=>d.status==="red").length,noLog:allD.filter(d=>d.active&&!d.paperLogbook).length,noTab:allD.filter(d=>d.active&&!d.tabletMounted).length};
  const hasT=settings.factorToken||settings.leaderToken;
  const cGroups=activeCompany==="all"?data.companies:data.companies.filter(c=>c.id===activeCompany);

  return(
    <div style={{display:"flex",height:"100vh",background:"#030712",color:"#f9fafb",fontFamily:"'DM Sans',system-ui,sans-serif",overflow:"hidden"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');*{box-sizing:border-box}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#0d1117}::-webkit-scrollbar-thumb{background:#374151;border-radius:3px}input,select{outline:none}input:focus,select:focus{border-color:#2563eb!important}tr:hover td{background:#0d1117!important}@keyframes spin{to{transform:rotate(360deg)}}`}</style>

      {/* SIDEBAR */}
      <div style={{width:sidebar?218:56,minWidth:sidebar?218:56,background:"#0d1117",borderRight:"1px solid #161b22",display:"flex",flexDirection:"column",transition:"all 0.2s",overflow:"hidden"}}>
        <div style={{padding:"13px 11px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid #161b22"}}>
          {sidebar&&<span style={{color:"#60a5fa",fontWeight:700,fontSize:12,letterSpacing:0.5}}>ELD MANAGER</span>}
          <button onClick={()=>setSidebar(o=>!o)} style={{background:"none",border:"none",color:"#6b7280",cursor:"pointer",fontSize:13,padding:4,marginLeft:sidebar?0:"auto"}}>{sidebar?"◀":"▶"}</button>
        </div>
        <nav style={{padding:"5px 0",flex:1,overflowY:"auto"}}>
          {[{id:"all",name:"All Companies",color:"#6b7280"},...data.companies].map(c=>(
            <div key={c.id} onClick={()=>setActiveCompany(c.id)}
              style={{padding:"8px 11px",cursor:"pointer",display:"flex",alignItems:"center",gap:8,background:activeCompany===c.id?"#161b22":"transparent",borderLeft:`3px solid ${activeCompany===c.id?(c.color||"#2563eb"):"transparent"}`}}>
              <span style={{width:8,height:8,borderRadius:"50%",background:c.color||"#6b7280",flexShrink:0}}/>
              {sidebar&&<span style={{fontSize:11,fontWeight:500,color:activeCompany===c.id?"#f9fafb":"#9ca3af",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{c.name}</span>}
            </div>
          ))}
        </nav>
        {sidebar&&(
          <div style={{padding:11,borderTop:"1px solid #161b22"}}>
            <div style={{fontSize:10,color:"#374151",marginBottom:5,textTransform:"uppercase",letterSpacing:1}}>ELD Connections</div>
            {[["⚡ Factor ELD","factorToken","#60a5fa"],["🔷 Leader ELD","leaderToken","#a78bfa"]].map(([lbl,k,c])=>(
              <div key={k} style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                <span style={{width:5,height:5,borderRadius:"50%",background:settings[k]?"#22c55e":"#374151"}}/>
                <span style={{fontSize:10,color:settings[k]?c:"#4b5563"}}>{lbl}</span>
              </div>
            ))}
            {lastSync&&<div style={{fontSize:9,color:"#374151",marginTop:5}}>Last sync: {lastSync.toLocaleTimeString()}</div>}
          </div>
        )}
      </div>

      {/* MAIN */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        {/* TOPBAR */}
        <div style={{padding:"11px 16px",borderBottom:"1px solid #161b22",display:"flex",alignItems:"center",gap:8,background:"#0d1117",flexWrap:"wrap"}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Driver or truck..."
            style={{background:"#161b22",border:"1px solid #374151",borderRadius:8,padding:"7px 11px",color:"#f9fafb",fontSize:13,width:190}}/>
          <select value={filterResp} onChange={e=>setFilterResp(e.target.value)} style={{background:"#161b22",border:"1px solid #374151",borderRadius:8,padding:"7px 9px",color:"#9ca3af",fontSize:12}}>
            <option value="all">All Responsible</option>{RESPONSIBLE.map(r=><option key={r}>{r}</option>)}
          </select>
          <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} style={{background:"#161b22",border:"1px solid #374151",borderRadius:8,padding:"7px 9px",color:"#9ca3af",fontSize:12}}>
            <option value="all">All Statuses</option><option value="green">🟢 Connected</option><option value="yellow">🟡 Intermittent</option><option value="red">🔴 Disconnected</option>
          </select>
          <div style={{marginLeft:"auto",display:"flex",gap:7,alignItems:"center"}}>
            <button onClick={runSync} disabled={syncing}
              style={{padding:"7px 13px",borderRadius:8,border:"none",cursor:syncing?"wait":"pointer",fontSize:12,fontWeight:600,
                background:hasT?"#064e3b":"#1f2937",color:hasT?"#34d399":"#4b5563",display:"flex",alignItems:"center",gap:5}}>
              <span style={{display:"inline-block",animation:syncing?"spin 1s linear infinite":"none",fontSize:13}}>🔄</span>
              {syncing?"Syncing...":"Sync ELD"}
            </button>
            <button onClick={()=>setShowSettings(true)} style={{padding:"7px 13px",borderRadius:8,border:"1px solid #374151",background:"#161b22",color:"#9ca3af",cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",gap:5}}>
              ⚙️{!hasT&&<span style={{color:"#f59e0b",fontSize:10}}>Setup</span>}
            </button>
            {["table","analytics"].map(v=>(
              <button key={v} onClick={()=>setView(v)} style={{padding:"7px 13px",borderRadius:8,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:view===v?"#1d4ed8":"#161b22",color:view===v?"white":"#6b7280"}}>
                {v==="table"?"📋":"📊"}
              </button>
            ))}
          </div>
        </div>

        {!hasT&&(
          <div style={{background:"#422006",borderBottom:"1px solid #92400e",padding:"9px 16px",display:"flex",alignItems:"center",gap:9}}>
            <span>⚡</span><span style={{fontSize:13,color:"#fcd34d"}}>ELD not connected — statuses are manual only.</span>
            <button onClick={()=>setShowSettings(true)} style={{marginLeft:"auto",background:"#92400e",border:"none",color:"#fcd34d",borderRadius:6,padding:"4px 12px",fontSize:12,cursor:"pointer",fontWeight:600}}>Connect ELD →</button>
          </div>
        )}

        {/* STATS */}
        <div style={{display:"flex",gap:8,padding:"10px 16px",borderBottom:"1px solid #161b22",background:"#0d1117",overflowX:"auto"}}>
          {[{l:"Total",v:S.total,c:"#60a5fa"},{l:"Active",v:S.active,c:"#34d399"},{l:"🟢 OK",v:S.green,c:"#4ade80"},{l:"🟡 Mid",v:S.yellow,c:"#fbbf24"},{l:"🔴 Off",v:S.red,c:"#f87171"},{l:"No Log",v:S.noLog,c:"#c084fc"},{l:"No Tab",v:S.noTab,c:"#fb923c"}].map(s=>(
            <div key={s.l} onClick={()=>{if(s.l==="🟢 OK")setFilterStatus("green");else if(s.l==="🟡 Mid")setFilterStatus("yellow");else if(s.l==="🔴 Off")setFilterStatus("red");else setFilterStatus("all");}}
              style={{background:"#161b22",borderRadius:9,padding:"7px 13px",display:"flex",flexDirection:"column",gap:1,minWidth:68,cursor:"pointer",flexShrink:0}}>
              <span style={{fontSize:17,fontWeight:700,color:s.c}}>{s.v}</span>
              <span style={{fontSize:10,color:"#4b5563"}}>{s.l}</span>
            </div>
          ))}
        </div>

        {/* CONTENT */}
        <div style={{flex:1,overflowY:"auto",paddingBottom:40}}>
          {view==="table"?cGroups.map(company=>{
            const drivers=visible.filter(d=>d.companyId===company.id);
            if(!drivers.length)return null;
            return(
              <div key={company.id}>
                <div style={{display:"flex",alignItems:"center",gap:9,padding:"9px 16px",background:"#0d1117",position:"sticky",top:0,zIndex:10,borderBottom:"1px solid #161b22"}}>
                  <div style={{width:3,height:17,borderRadius:2,background:company.color}}/>
                  <span style={{fontWeight:700,fontSize:11,color:company.color,letterSpacing:1,textTransform:"uppercase"}}>{company.name}</span>
                  <span style={{fontSize:10,background:"#161b22",color:"#6b7280",padding:"2px 7px",borderRadius:999}}>{drivers.length}</span>
                  <span style={{fontSize:10,background:"#052e16",color:"#4ade80",padding:"2px 7px",borderRadius:999}}>{drivers.filter(d=>d.status==="green").length} connected</span>
                  <span style={{fontSize:10,color:"#374151"}}>{company.eldProvider==="factor"?"⚡ Factor":"🔷 Leader"}</span>
                  <button onClick={()=>{setModalCid(company.id);setModalDriver(null);}} style={{marginLeft:"auto",background:"#1d4ed8",border:"none",color:"white",borderRadius:6,padding:"4px 11px",fontSize:11,cursor:"pointer",fontWeight:600}}>+ Add</button>
                </div>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                  <thead><tr style={{borderBottom:"1px solid #161b22"}}>{["Driver","Truck","Responsible","Note","Date","Logbook","Manual","Tablet","ELD","History","Status",""].map(h=><th key={h} style={{padding:"7px 9px",textAlign:"left",color:"#374151",fontWeight:600,fontSize:10,textTransform:"uppercase",letterSpacing:0.8,whiteSpace:"nowrap",background:"#030712"}}>{h}</th>)}</tr></thead>
                  <tbody>
                    {drivers.map(d=>(
                      <tr key={d.id} style={{borderBottom:"1px solid #0d1117",cursor:"pointer"}} onClick={()=>{setModalDriver(d);setModalCid(d.companyId);}}>
                        <td style={{padding:"9px 9px",background:"#030712"}}><div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:6,height:6,borderRadius:"50%",background:STATUS[d.status]?.dot,boxShadow:`0 0 5px ${STATUS[d.status]?.dot}`,flexShrink:0}}/><span style={{color:d.active?"#e5e7eb":"#4b5563",fontWeight:500}}>{d.name}</span>{!d.active&&<span style={{fontSize:10,background:"#1f2937",color:"#6b7280",padding:"1px 5px",borderRadius:4}}>off</span>}</div></td>
                        <td style={{padding:"9px 9px",color:"#60a5fa",fontFamily:"monospace",fontWeight:700,background:"#030712"}}>{d.truck||"—"}</td>
                        <td style={{padding:"9px 9px",background:"#030712"}}>{d.responsible?<span style={{background:"#1d4ed815",color:"#60a5fa",padding:"2px 8px",borderRadius:999,fontSize:11,fontWeight:600,border:"1px solid #1d4ed830"}}>{d.responsible}</span>:<span style={{color:"#374151"}}>—</span>}</td>
                        <td style={{padding:"9px 9px",color:d.note==="All good"?"#4ade80":d.note==="Off"?"#f87171":"#fbbf24",fontWeight:500,background:"#030712"}}>{d.note||"—"}</td>
                        <td style={{padding:"9px 9px",background:"#030712"}}><div style={{fontSize:11,color:"#4b5563"}}>{fmt(d.date)}</div>{daysSince(d.date)>7&&<div style={{fontSize:10,color:"#f87171"}}>⚠{daysSince(d.date)}d</div>}</td>
                        <td style={{padding:"9px 9px",background:"#030712"}}><Badge v={d.paperLogbook}/></td>
                        <td style={{padding:"9px 9px",background:"#030712"}}><Badge v={d.userManual}/></td>
                        <td style={{padding:"9px 9px",background:"#030712"}}><Badge v={d.tabletMounted}/></td>
                        <td style={{padding:"9px 9px",color:d.eldTimes==="ALL GOOD"?"#4ade80":"#4b5563",fontSize:11,fontWeight:600,background:"#030712"}}>{d.eldTimes||"—"}</td>
                        <td style={{padding:"9px 9px",background:"#030712"}}><Bar h={d.connectHistory}/></td>
                        <td style={{padding:"9px 9px",background:"#030712"}}><Pill status={d.status}/></td>
                        <td style={{padding:"9px 9px",background:"#030712"}}><button onClick={e=>{e.stopPropagation();setModalDriver(d);setModalCid(d.companyId);}} style={{background:"#1f2937",border:"1px solid #374151",color:"#9ca3af",borderRadius:6,padding:"3px 9px",fontSize:11,cursor:"pointer"}}>Edit</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }):(
            <div style={{padding:22}}>
              <h2 style={{color:"#f9fafb",marginBottom:18,fontSize:18}}>Driver Analytics</h2>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:18}}>
                {data.companies.map(c=>{
                  const dr=c.drivers,g=dr.filter(d=>d.status==="green").length,y=dr.filter(d=>d.status==="yellow").length,r=dr.filter(d=>d.status==="red").length,t=dr.length||1;
                  return(
                    <div key={c.id} style={{background:"#0d1117",border:"1px solid #161b22",borderRadius:13,padding:18}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
                        <div style={{width:4,height:18,borderRadius:2,background:c.color}}/>
                        <span style={{fontWeight:700,fontSize:12,color:c.color}}>{c.name}</span>
                        <span style={{fontSize:10,color:"#4b5563",marginLeft:"auto"}}>{c.eldProvider==="factor"?"⚡ Factor":"🔷 Leader"}</span>
                      </div>
                      {[[g,"Connected","#22c55e","#4ade80"],[y,"Intermittent","#f59e0b","#fbbf24"],[r,"Disconnected","#ef4444","#f87171"]].map(([n,lbl,bg,tc])=>(
                        <div key={lbl} style={{marginBottom:9}}>
                          <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:11,color:tc}}>{lbl}</span><span style={{fontSize:11,color:tc}}>{n}/{t}</span></div>
                          <div style={{background:"#161b22",borderRadius:999,height:5}}><div style={{background:bg,height:5,borderRadius:999,width:`${(n/t)*100}%`}}/></div>
                        </div>
                      ))}
                      {r>0&&<div style={{background:"#450a0a20",border:"1px solid #450a0a",borderRadius:8,padding:10,marginTop:10}}>
                        <div style={{fontSize:11,color:"#f87171",fontWeight:700,marginBottom:4}}>⚠ Disconnected</div>
                        {dr.filter(d=>d.status==="red").map(d=><div key={d.id} style={{fontSize:11,color:"#fca5a5",padding:"1px 0"}}>{d.name} — {d.truck||"—"}</div>)}
                      </div>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {showSettings&&<SettingsModal settings={settings} onSave={s=>{setSettings(s);setShowSettings(false);toast("Saved","ELD tokens updated");}} onClose={()=>setShowSettings(false)} syncResults={syncResults}/>}
      {(modalDriver!==null||modalCid)&&<DriverModal driver={modalDriver} companyId={modalCid} onSave={d=>saveDriver(modalCid,d)} onClose={()=>{setModalDriver(null);setModalCid(null);}}/>}
      <Toasts items={toasts} onDismiss={id=>setToasts(t=>t.filter(x=>x.id!==id))}/>
    </div>
  );
}
