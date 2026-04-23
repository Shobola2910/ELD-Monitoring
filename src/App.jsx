import { useState, useEffect, useCallback, useRef, useMemo } from "react";

// ═══════════════════════════════════════════════════
// USERS
// ═══════════════════════════════════════════════════
const USERS = [
  { id:"u1", name:"Shobola",  username:"shobola",  password:"algo2024",  role:"admin", initials:"SH", color:"#7C3AED" },
  { id:"u2", name:"David",    username:"david",    password:"david123",  role:"agent", initials:"DV", color:"#3B82F6" },
  { id:"u3", name:"Habi",     username:"habi",     password:"habi123",   role:"agent", initials:"HB", color:"#10B981" },
  { id:"u4", name:"Mike",     username:"mike",     password:"mike123",   role:"agent", initials:"MK", color:"#F59E0B" },
  { id:"u5", name:"Nate",     username:"nate",     password:"nate123",   role:"agent", initials:"NT", color:"#EF4444" },
  { id:"u6", name:"Beck",     username:"beck",     password:"beck123",   role:"agent", initials:"BK", color:"#8B5CF6" },
  { id:"u7", name:"Ismail",   username:"ismail",   password:"ismail123", role:"agent", initials:"IS", color:"#06B6D4" },
  { id:"u8", name:"Sue",      username:"sue",      password:"sue123",    role:"agent", initials:"SU", color:"#EC4899" },
  { id:"u9", name:"Arthur",   username:"arthur",   password:"arthur123", role:"agent", initials:"AR", color:"#84CC16" },
];

// ═══════════════════════════════════════════════════
// INITIAL DATA
// ═══════════════════════════════════════════════════
const INITIAL_DATA = {
  companies: [
    {
      id:"c1", name:"SABIR EXPRESS INC", color:"#3B82F6", eldProvider:"leader",
      drivers:[
        {id:"d1",  name:"Abbos Eshnazarov",                       truck:"#002",    responsible:"David", note:"Off",      date:"2025-04-23", paperLogbook:null, userManual:null, tabletMounted:null, eldTimes:"",         connectHistory:[1,1,0,1,0,1,1,0], profileFormDate:"2025-04-01", active:true,  eldDriverId:"", updatedBy:"David", updatedAt:"2025-04-23T10:00:00Z"},
        {id:"d2",  name:"Afzal Abdullaev",                        truck:"#010",    responsible:"David", note:"New",      date:"2025-04-23", paperLogbook:null, userManual:null, tabletMounted:null, eldTimes:"",         connectHistory:[1,1,1,1,1,1,1,1], profileFormDate:"2025-04-10", active:true,  eldDriverId:"", updatedBy:"David", updatedAt:"2025-04-23T09:30:00Z"},
        {id:"d3",  name:"Golibjon Ravshanov | Elmurod Berdiev",   truck:"#009",    responsible:"David", note:"All good", date:"2025-04-23", paperLogbook:true, userManual:true, tabletMounted:true, eldTimes:"ALL GOOD", connectHistory:[1,1,1,1,1,1,1,1], profileFormDate:"2025-04-05", active:true,  eldDriverId:"", updatedBy:"David", updatedAt:"2025-04-23T11:00:00Z"},
        {id:"d4",  name:"Shukhrat Sharofidinov | Farrux Azizov",  truck:"#006",    responsible:"David", note:"All good", date:"2025-04-23", paperLogbook:true, userManual:true, tabletMounted:true, eldTimes:"ALL GOOD", connectHistory:[1,1,1,0,1,1,1,1], profileFormDate:"2025-04-08", active:true,  eldDriverId:"", updatedBy:"David", updatedAt:"2025-04-22T15:00:00Z"},
        {id:"d5",  name:"Gafur Normamatovich Yuldashev",          truck:"#110",    responsible:"David", note:"All good", date:"2025-04-23", paperLogbook:true, userManual:null, tabletMounted:true, eldTimes:"1st time", connectHistory:[1,0,1,0,1,1,0,1], profileFormDate:"2025-03-20", active:true,  eldDriverId:"", updatedBy:"David", updatedAt:"2025-04-23T08:00:00Z"},
        {id:"d6",  name:"Lochinbek Abduvali Abduraupov",          truck:"#046",    responsible:"David", note:"All good", date:"2025-04-23", paperLogbook:true, userManual:true, tabletMounted:true, eldTimes:"ALL GOOD", connectHistory:[1,1,1,1,1,1,1,1], profileFormDate:"2025-04-12", active:true,  eldDriverId:"", updatedBy:"Habi",  updatedAt:"2025-04-23T12:00:00Z"},
        {id:"d7",  name:"Mukhlis Jabborov",                       truck:"#009",    responsible:"David", note:"Off",      date:"2025-04-23", paperLogbook:null, userManual:null, tabletMounted:null, eldTimes:"",         connectHistory:[0,1,0,0,1,0,0,1], profileFormDate:"2025-03-15", active:true,  eldDriverId:"", updatedBy:"David", updatedAt:"2025-04-21T16:00:00Z"},
        {id:"d8",  name:"Nasiba Kholikova | Guli K Makhmudova",   truck:"#007",    responsible:"David", note:"All good", date:"2025-04-23", paperLogbook:true, userManual:true, tabletMounted:null, eldTimes:"ALL GOOD", connectHistory:[1,1,0,1,1,1,0,1], profileFormDate:"2025-04-03", active:true,  eldDriverId:"", updatedBy:"David", updatedAt:"2025-04-23T07:30:00Z"},
        {id:"d9",  name:"Olim Abdusalomov",                       truck:"#003",    responsible:"David", note:"All good", date:"2025-04-23", paperLogbook:true, userManual:true, tabletMounted:true, eldTimes:"ALL GOOD", connectHistory:[1,1,1,1,1,1,1,1], profileFormDate:"2025-04-15", active:true,  eldDriverId:"", updatedBy:"David", updatedAt:"2025-04-23T10:45:00Z"},
        {id:"d10", name:"Rasulbek Davletov",                      truck:"#008",    responsible:"David", note:"New",      date:"2025-04-23", paperLogbook:null, userManual:null, tabletMounted:null, eldTimes:"",         connectHistory:[1,1,1,0,1,1,0,0], profileFormDate:"2025-04-20", active:true,  eldDriverId:"", updatedBy:"David", updatedAt:"2025-04-23T09:00:00Z"},
        {id:"d11", name:"Shakhzod Choriev",                       truck:"#SAV571", responsible:"David", note:"All good", date:"2025-04-23", paperLogbook:true, userManual:true, tabletMounted:true, eldTimes:"ALL GOOD", connectHistory:[1,1,1,1,1,1,1,1], profileFormDate:"2025-04-18", active:true,  eldDriverId:"", updatedBy:"David", updatedAt:"2025-04-23T11:30:00Z"},
        {id:"d12", name:"Sherbek Pardaev | Murodjon Murodullaev", truck:"",        responsible:"David", note:"New",      date:"2025-04-23", paperLogbook:null, userManual:null, tabletMounted:null, eldTimes:"",         connectHistory:[0,0,1,0,0,1,0,0], profileFormDate:"2025-03-10", active:true,  eldDriverId:"", updatedBy:"David", updatedAt:"2025-04-20T14:00:00Z"},
        {id:"d13", name:"Jamshid Kuziev",                         truck:"#110",    responsible:"David", note:"New",      date:"2025-04-23", paperLogbook:null, userManual:null, tabletMounted:null, eldTimes:"",         connectHistory:[1,0,1,1,0,1,1,0], profileFormDate:"2025-04-22", active:true,  eldDriverId:"", updatedBy:"David", updatedAt:"2025-04-23T08:45:00Z"},
        {id:"d14", name:"Nizom Miyliev",                          truck:"#77",     responsible:"",      note:"",         date:"2025-03-23", paperLogbook:null, userManual:null, tabletMounted:null, eldTimes:"",         connectHistory:[0,0,0,1,0,0,0,1], profileFormDate:"2025-03-01", active:false, eldDriverId:"", updatedBy:"",      updatedAt:"2025-03-23T00:00:00Z"},
      ]
    },
    {
      id:"c2", name:"BRIGHT STAR LOGISTICS", color:"#10B981", eldProvider:"factor",
      drivers:[
        {id:"d15", name:"Bobur Yusupov",    truck:"#201", responsible:"Habi", note:"All good", date:"2025-04-23", paperLogbook:true, userManual:true, tabletMounted:true, eldTimes:"ALL GOOD", connectHistory:[1,1,1,1,1,1,1,1], profileFormDate:"2025-04-10", active:true, eldDriverId:"", updatedBy:"Habi", updatedAt:"2025-04-23T09:00:00Z"},
        {id:"d16", name:"Sardor Toshmatov", truck:"#202", responsible:"Habi", note:"New",      date:"2025-04-22", paperLogbook:null, userManual:null, tabletMounted:null, eldTimes:"",         connectHistory:[0,1,0,0,0,1,0,0], profileFormDate:"2025-03-28", active:true, eldDriverId:"", updatedBy:"Habi", updatedAt:"2025-04-22T16:00:00Z"},
        {id:"d17", name:"Jasur Mirzayev",   truck:"#203", responsible:"Mike", note:"All good", date:"2025-04-23", paperLogbook:true, userManual:true, tabletMounted:null, eldTimes:"1st time", connectHistory:[1,1,0,1,1,0,1,1], profileFormDate:"2025-04-15", active:true, eldDriverId:"", updatedBy:"Mike", updatedAt:"2025-04-23T10:00:00Z"},
      ]
    },
    {
      id:"c3", name:"GOLDEN ROAD TRANSPORT", color:"#F59E0B", eldProvider:"leader",
      drivers:[
        {id:"d18", name:"Akbar Nazarov",                     truck:"#301", responsible:"Nate", note:"All good", date:"2025-04-23", paperLogbook:true, userManual:true, tabletMounted:true, eldTimes:"ALL GOOD", connectHistory:[1,1,1,1,1,1,1,1], profileFormDate:"2025-04-20", active:true, eldDriverId:"", updatedBy:"Nate", updatedAt:"2025-04-23T11:00:00Z"},
        {id:"d19", name:"Dilshod Karimov | Ulmas Xolmatov", truck:"#302", responsible:"Beck", note:"Off",      date:"2025-04-21", paperLogbook:null, userManual:null, tabletMounted:null, eldTimes:"",         connectHistory:[0,0,0,1,0,0,1,0], profileFormDate:"2025-03-05", active:true, eldDriverId:"", updatedBy:"Beck", updatedAt:"2025-04-21T15:00:00Z"},
      ]
    },
    {
      id:"c4", name:"SWIFT CARGO LLC", color:"#EC4899", eldProvider:"factor",
      drivers:[
        {id:"d20", name:"Temur Rashidov",   truck:"#401", responsible:"Ismail", note:"All good", date:"2025-04-23", paperLogbook:true, userManual:true, tabletMounted:true, eldTimes:"ALL GOOD", connectHistory:[1,1,1,1,1,1,0,1], profileFormDate:"2025-04-18", active:true, eldDriverId:"", updatedBy:"Ismail", updatedAt:"2025-04-23T10:30:00Z"},
        {id:"d21", name:"Behruz Xoliqov",   truck:"#402", responsible:"Sue",    note:"New",      date:"2025-04-23", paperLogbook:null, userManual:null, tabletMounted:null, eldTimes:"",         connectHistory:[1,1,0,1,1,1,0,1], profileFormDate:"2025-04-22", active:true, eldDriverId:"", updatedBy:"Sue",    updatedAt:"2025-04-23T09:15:00Z"},
      ]
    }
  ]
};

const RESPONSIBLE = ["Ismail","Mike","Nate","Beck","David","Habi","Sue","Arthur"];
const NOTE_OPTS   = ["All good","New","Off","Pending","Issue"];
const ELD_OPTS    = ["","ALL GOOD","1st time","2nd time","3rd time","Not set up"];
const DEFAULT_SETTINGS = { factorToken:"", factorUrl:"https://api.factorhq.com/v1", factorSetAt:null, leaderToken:"", leaderUrl:"https://app.leadereld.com/api/v1", leaderSetAt:null, syncInterval:0 };

// ═══════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════
const calcStatus = h => { if(!h?.length) return "yellow"; const p=h.filter(Boolean).length/h.length; return p>=0.85?"green":p>=0.5?"yellow":"red"; };
const fmtDate = d => d ? new Date(d).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}) : "—";
const fmtTime = d => d ? new Date(d).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}) : "—";
const daysSince = d => d ? Math.floor((Date.now()-new Date(d))/86400000) : 999;
const minsSince = ts => ts ? Math.floor((Date.now()-ts)/60000) : 999;

const STATUS_CFG = {
  green:  { label:"Connected",    bg:"rgba(34,197,94,0.1)",  border:"rgba(34,197,94,0.25)",  text:"#4ADE80", dot:"#22C55E" },
  yellow: { label:"Intermittent", bg:"rgba(234,179,8,0.1)",  border:"rgba(234,179,8,0.25)",  text:"#FCD34D", dot:"#EAB308" },
  red:    { label:"Disconnected", bg:"rgba(239,68,68,0.1)",  border:"rgba(239,68,68,0.25)",  text:"#FCA5A5", dot:"#EF4444" },
};

// ═══════════════════════════════════════════════════
// CSS GLOBAL
// ═══════════════════════════════════════════════════
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { height: 100%; }
  body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; background: #09090B; color: #F4F4F5; -webkit-font-smoothing: antialiased; }
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: #09090B; }
  ::-webkit-scrollbar-thumb { background: #27272A; border-radius: 99px; }
  ::-webkit-scrollbar-thumb:hover { background: #3F3F46; }
  input, select, textarea, button { font-family: inherit; }
  input::placeholder { color: #52525B; }
  input:focus, select:focus { outline: none; border-color: #6D28D9 !important; box-shadow: 0 0 0 3px rgba(109,40,217,0.15); }
  button { cursor: pointer; }
  @keyframes fadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
  @keyframes slideIn { from { opacity:0; transform:translateX(12px); } to { opacity:1; transform:translateX(0); } }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
  .fade-in { animation: fadeIn 0.2s ease; }
  .slide-in { animation: slideIn 0.25s ease; }
  .row-hover:hover { background: #111117 !important; }
  .btn-hover:hover { opacity: 0.85; transform: translateY(-1px); }
  .company-row:hover { background: rgba(255,255,255,0.02) !important; }
`;

// ═══════════════════════════════════════════════════
// ATOMS
// ═══════════════════════════════════════════════════
const Avatar = ({ user, size=32 }) => (
  <div style={{ width:size, height:size, borderRadius:"50%", background: user?.color||"#27272A",
    display:"flex", alignItems:"center", justifyContent:"center",
    fontSize: size*0.34, fontWeight:700, color:"white", flexShrink:0, letterSpacing:0.5 }}>
    {user?.initials || user?.name?.[0] || "?"}
  </div>
);

const Badge = ({ v }) =>
  v===true  ? <span style={{background:"rgba(34,197,94,0.12)",color:"#4ADE80",padding:"2px 9px",borderRadius:999,fontSize:11,fontWeight:600,border:"1px solid rgba(34,197,94,0.2)"}}>YES</span>
  : v===false ? <span style={{background:"rgba(239,68,68,0.12)",color:"#FCA5A5",padding:"2px 9px",borderRadius:999,fontSize:11,fontWeight:600,border:"1px solid rgba(239,68,68,0.2)"}}>NO</span>
  : <span style={{color:"#3F3F46",fontSize:12}}>—</span>;

const StatusPill = ({ status }) => {
  const c = STATUS_CFG[status] || STATUS_CFG.yellow;
  return (
    <span style={{display:"inline-flex",alignItems:"center",gap:5,background:c.bg,border:`1px solid ${c.border}`,
      color:c.text,padding:"3px 10px",borderRadius:999,fontSize:11,fontWeight:600,whiteSpace:"nowrap"}}>
      <span style={{width:5,height:5,borderRadius:"50%",background:c.dot,boxShadow:`0 0 6px ${c.dot}`}} />
      {c.label}
    </span>
  );
};

const ConnectBar = ({ h }) => (
  <div style={{display:"flex",gap:2,alignItems:"center"}}>
    {(h||[]).map((v,i) => <div key={i} style={{width:5,height:16,borderRadius:2,background:v?"#22C55E":"#EF4444",opacity:v?0.9:0.6}} />)}
  </div>
);

const Spinner = ({ size=16 }) => (
  <div style={{width:size,height:size,borderRadius:"50%",border:`2px solid rgba(255,255,255,0.1)`,
    borderTopColor:"#7C3AED",animation:"spin 0.7s linear infinite",flexShrink:0}} />
);

const Input = ({label,hint,...p}) => (
  <div>
    <label style={{display:"block",fontSize:11,color:"#71717A",textTransform:"uppercase",letterSpacing:0.8,marginBottom:5,fontWeight:600}}>{label}</label>
    <input style={{width:"100%",background:"#18181B",border:"1px solid #27272A",borderRadius:8,
      padding:"9px 12px",color:"#F4F4F5",fontSize:13}} {...p} />
    {hint && <div style={{fontSize:11,color:"#52525B",marginTop:4}}>{hint}</div>}
  </div>
);

const Sel = ({label,children,...p}) => (
  <div>
    <label style={{display:"block",fontSize:11,color:"#71717A",textTransform:"uppercase",letterSpacing:0.8,marginBottom:5,fontWeight:600}}>{label}</label>
    <select style={{width:"100%",background:"#18181B",border:"1px solid #27272A",borderRadius:8,
      padding:"9px 12px",color:"#F4F4F5",fontSize:13}} {...p}>{children}</select>
  </div>
);

// ═══════════════════════════════════════════════════
// LOGIN PAGE
// ═══════════════════════════════════════════════════
function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ username:"", password:"" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const submit = async () => {
    if (!form.username || !form.password) { setError("Please enter username and password"); return; }
    setLoading(true); setError("");
    await new Promise(r => setTimeout(r, 600));
    const user = USERS.find(u => u.username.toLowerCase() === form.username.toLowerCase() && u.password === form.password);
    if (user) { onLogin(user); }
    else { setError("Invalid username or password"); setLoading(false); }
  };

  return (
    <div style={{minHeight:"100vh",background:"#09090B",display:"flex",alignItems:"center",justifyContent:"center",padding:20,position:"relative",overflow:"hidden"}}>
      {/* BG grid */}
      <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)",backgroundSize:"40px 40px",pointerEvents:"none"}} />
      <div style={{position:"absolute",top:"20%",left:"50%",transform:"translateX(-50%)",width:600,height:600,background:"radial-gradient(circle,rgba(124,58,237,0.08) 0%,transparent 70%)",pointerEvents:"none"}} />

      <div className="fade-in" style={{width:"100%",maxWidth:400,position:"relative"}}>
        {/* Logo */}
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{width:52,height:52,borderRadius:14,background:"linear-gradient(135deg,#7C3AED,#4F46E5)",
            display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:14,
            boxShadow:"0 8px 24px rgba(124,58,237,0.35)"}}>
            <span style={{fontSize:24}}>⚡</span>
          </div>
          <div style={{fontSize:22,fontWeight:800,color:"#F4F4F5",letterSpacing:-0.5}}>Algo ELD Manager</div>
          <div style={{fontSize:13,color:"#52525B",marginTop:5}}>Sign in to your account</div>
        </div>

        {/* Card */}
        <div style={{background:"#111117",border:"1px solid #1C1C24",borderRadius:16,padding:28,boxShadow:"0 24px 64px rgba(0,0,0,0.5)"}}>
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            <div>
              <label style={{display:"block",fontSize:12,color:"#71717A",fontWeight:600,marginBottom:6}}>USERNAME</label>
              <input value={form.username} onChange={e=>setForm(f=>({...f,username:e.target.value}))}
                onKeyDown={e=>e.key==="Enter"&&submit()}
                placeholder="e.g. david"
                style={{width:"100%",background:"#18181B",border:"1px solid #27272A",borderRadius:9,
                  padding:"11px 14px",color:"#F4F4F5",fontSize:14,transition:"all 0.15s"}} />
            </div>
            <div>
              <label style={{display:"block",fontSize:12,color:"#71717A",fontWeight:600,marginBottom:6}}>PASSWORD</label>
              <div style={{position:"relative"}}>
                <input type={showPass?"text":"password"} value={form.password}
                  onChange={e=>setForm(f=>({...f,password:e.target.value}))}
                  onKeyDown={e=>e.key==="Enter"&&submit()}
                  placeholder="••••••••"
                  style={{width:"100%",background:"#18181B",border:"1px solid #27272A",borderRadius:9,
                    padding:"11px 44px 11px 14px",color:"#F4F4F5",fontSize:14}} />
                <button onClick={()=>setShowPass(s=>!s)}
                  style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#52525B",fontSize:16,padding:4}}>
                  {showPass?"🙈":"👁"}
                </button>
              </div>
            </div>

            {error && (
              <div style={{background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.2)",borderRadius:8,padding:"9px 12px",fontSize:13,color:"#FCA5A5",display:"flex",alignItems:"center",gap:8}}>
                <span>⚠</span>{error}
              </div>
            )}

            <button onClick={submit} disabled={loading}
              style={{width:"100%",background:"linear-gradient(135deg,#7C3AED,#6D28D9)",border:"none",borderRadius:9,
                padding:"12px",color:"white",fontSize:14,fontWeight:700,letterSpacing:0.3,
                opacity:loading?0.7:1,display:"flex",alignItems:"center",justifyContent:"center",gap:8,
                boxShadow:"0 4px 14px rgba(124,58,237,0.35)",transition:"all 0.15s"}}>
              {loading ? <><Spinner size={16}/> Signing in...</> : "Sign In →"}
            </button>
          </div>
        </div>

        {/* Accounts hint */}
        <div style={{marginTop:20,background:"#0D0D12",border:"1px solid #1C1C24",borderRadius:10,padding:14}}>
          <div style={{fontSize:11,color:"#52525B",fontWeight:600,marginBottom:8,textTransform:"uppercase",letterSpacing:0.8}}>Demo Accounts</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
            {USERS.slice(0,6).map(u=>(
              <button key={u.id} onClick={()=>setForm({username:u.username,password:u.password})}
                style={{background:"transparent",border:"1px solid #1C1C24",borderRadius:6,padding:"5px 8px",
                  display:"flex",alignItems:"center",gap:6,transition:"all 0.1s",color:"#71717A",fontSize:12}}>
                <span style={{width:18,height:18,borderRadius:"50%",background:u.color,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:700,color:"white"}}>{u.initials}</span>
                {u.username}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// TOKEN REFRESH BAR
// ═══════════════════════════════════════════════════
function TokenRefreshBar({ settings, onUpdateSettings, onSync, syncing }) {
  const factorMins = minsSince(settings.factorSetAt);
  const leaderMins = minsSince(settings.leaderSetAt);
  const [editMode, setEditMode] = useState(null); // "factor" | "leader"
  const [tempToken, setTempToken] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (editMode && inputRef.current) inputRef.current.focus();
  }, [editMode]);

  const saveToken = (provider) => {
    if (!tempToken.trim()) return;
    const key = provider === "factor" ? "factorToken" : "leaderToken";
    const tsKey = provider === "factor" ? "factorSetAt" : "leaderSetAt";
    onUpdateSettings({ ...settings, [key]: tempToken.trim(), [tsKey]: Date.now() });
    setEditMode(null); setTempToken("");
  };

  const fmtAge = (mins) => {
    if (mins === 999) return "Not set";
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    return `${Math.floor(mins/60)}h ${mins%60}m ago`;
  };

  const getTokenStatus = (token, mins) => {
    if (!token) return "none";
    if (mins > 60) return "expired";
    if (mins > 45) return "warning";
    return "ok";
  };

  const TOKEN_COLORS = { none:"#52525B", ok:"#22C55E", warning:"#EAB308", expired:"#EF4444" };

  const TokenItem = ({ provider, label, token, mins }) => {
    const status = getTokenStatus(token, mins);
    const color = TOKEN_COLORS[status];
    const isEditing = editMode === provider;
    return (
      <div style={{display:"flex",alignItems:"center",gap:8,padding:"4px 10px",borderRadius:7,
        background: status==="expired" ? "rgba(239,68,68,0.06)" : status==="warning" ? "rgba(234,179,8,0.06)" : "rgba(255,255,255,0.03)",
        border:`1px solid ${status==="expired"?"rgba(239,68,68,0.2)":status==="warning"?"rgba(234,179,8,0.2)":"#1C1C24"}`}}>
        <div style={{width:6,height:6,borderRadius:"50%",background:color,boxShadow:`0 0 6px ${color}`,flexShrink:0,
          animation: status==="expired"?"pulse 1.5s infinite":"none"}} />
        <span style={{fontSize:11,fontWeight:600,color:"#71717A"}}>{label}</span>
        {token ? (
          <>
            <span style={{fontSize:11,color:"#3F3F46",fontFamily:"monospace"}}>
              ···{token.slice(-6)}
            </span>
            <span style={{fontSize:11,color: status==="expired"?"#FCA5A5":status==="warning"?"#FCD34D":"#52525B"}}>
              {status==="expired"?"⚠ Expired":fmtAge(mins)}
            </span>
          </>
        ) : (
          <span style={{fontSize:11,color:"#3F3F46"}}>Not configured</span>
        )}

        {isEditing ? (
          <div style={{display:"flex",alignItems:"center",gap:4}}>
            <input ref={inputRef} value={tempToken} onChange={e=>setTempToken(e.target.value)}
              onKeyDown={e=>{ if(e.key==="Enter")saveToken(provider); if(e.key==="Escape"){setEditMode(null);setTempToken("");} }}
              placeholder="Paste new token..."
              style={{background:"#09090B",border:"1px solid #6D28D9",borderRadius:5,padding:"3px 8px",
                color:"#F4F4F5",fontSize:11,fontFamily:"monospace",width:220}} />
            <button onClick={()=>saveToken(provider)}
              style={{background:"#6D28D9",border:"none",borderRadius:5,padding:"3px 10px",color:"white",fontSize:11,fontWeight:600}}>Save</button>
            <button onClick={()=>{setEditMode(null);setTempToken("");}}
              style={{background:"transparent",border:"none",color:"#52525B",fontSize:13,padding:"2px 4px"}}>✕</button>
          </div>
        ) : (
          <button onClick={()=>{setEditMode(provider);setTempToken("");}}
            style={{background: status==="expired"?"rgba(239,68,68,0.15)":status==="warning"?"rgba(234,179,8,0.12)":"rgba(255,255,255,0.05)",
              border:"none",borderRadius:5,padding:"2px 8px",
              color: status==="expired"?"#FCA5A5":status==="warning"?"#FCD34D":"#71717A",
              fontSize:10,fontWeight:600}}>
            {status==="expired"||status==="warning" ? "⟳ Refresh" : "Edit"}
          </button>
        )}
      </div>
    );
  };

  return (
    <div style={{background:"#0D0D12",borderBottom:"1px solid #1C1C24",padding:"6px 16px",display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
      <span style={{fontSize:10,fontWeight:700,color:"#52525B",textTransform:"uppercase",letterSpacing:1,flexShrink:0}}>ELD Tokens</span>
      <TokenItem provider="factor" label="⚡ Factor" token={settings.factorToken} mins={factorMins} />
      <TokenItem provider="leader" label="🔷 Leader" token={settings.leaderToken} mins={leaderMins} />
      <button onClick={onSync} disabled={syncing}
        style={{marginLeft:"auto",background:"rgba(109,40,217,0.15)",border:"1px solid rgba(109,40,217,0.3)",
          borderRadius:7,padding:"4px 12px",color:"#A78BFA",fontSize:11,fontWeight:600,
          display:"flex",alignItems:"center",gap:5,flexShrink:0}}>
        {syncing ? <><Spinner size={11}/> Syncing...</> : <>↻ Sync Now</>}
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// TOKEN EXPIRY MODAL
// ═══════════════════════════════════════════════════
function TokenExpiryModal({ provider, onSave, onSnooze }) {
  const [token, setToken] = useState("");
  const label = provider === "factor" ? "⚡ Factor ELD" : "🔷 Leader ELD";
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",zIndex:3000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div className="fade-in" style={{background:"#111117",border:"1px solid #27272A",borderRadius:16,padding:28,maxWidth:440,width:"100%",boxShadow:"0 32px 80px rgba(0,0,0,0.6)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
          <div style={{width:36,height:36,borderRadius:10,background:"rgba(239,68,68,0.12)",border:"1px solid rgba(239,68,68,0.2)",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>⏰</div>
          <div>
            <div style={{fontSize:15,fontWeight:700,color:"#F4F4F5"}}>Token may have expired</div>
            <div style={{fontSize:12,color:"#52525B"}}>{label} · 1 hour has passed</div>
          </div>
        </div>
        <p style={{fontSize:13,color:"#71717A",lineHeight:1.6,marginBottom:16}}>
          Please paste the new token to continue syncing ELD data without interruption.
        </p>
        <textarea value={token} onChange={e=>setToken(e.target.value)}
          placeholder="Paste new Bearer token here..."
          rows={3}
          style={{width:"100%",background:"#0D0D12",border:"1px solid #27272A",borderRadius:8,
            padding:"10px 12px",color:"#A78BFA",fontSize:12,fontFamily:"monospace",resize:"vertical",marginBottom:14}} />
        <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
          <button onClick={onSnooze}
            style={{padding:"8px 16px",borderRadius:8,border:"1px solid #27272A",background:"transparent",color:"#71717A",fontSize:13,fontWeight:500}}>
            Remind in 15 min
          </button>
          <button onClick={()=>token.trim()&&onSave(token.trim())}
            disabled={!token.trim()}
            style={{padding:"8px 20px",borderRadius:8,border:"none",background:"#6D28D9",color:"white",fontSize:13,fontWeight:600,opacity:token.trim()?1:0.5}}>
            Save Token
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// DRIVER MODAL
// ═══════════════════════════════════════════════════
function DriverModal({ driver, companyId, companies, currentUser, onSave, onClose }) {
  const blank = {
    id:`d${Date.now()}`, name:"", truck:"", responsible: currentUser?.name||"David",
    note:"New", date:new Date().toISOString().split("T")[0],
    paperLogbook:null, userManual:null, tabletMounted:null, eldTimes:"",
    connectHistory:[1,1,1,1,1,1,1,1], profileFormDate:new Date().toISOString().split("T")[0],
    active:true, eldDriverId:"", updatedBy:currentUser?.name||"", updatedAt:new Date().toISOString()
  };
  const [f, setF] = useState(driver || blank);
  const [tab, setTab] = useState("info"); // info | status | history
  const set = (k,v) => setF(p => ({...p, [k]:v}));

  const company = companies.find(c=>c.id===companyId);
  const status = calcStatus(f.connectHistory);

  const Toggle3 = ({ label, field }) => (
    <div>
      <label style={{display:"block",fontSize:11,color:"#71717A",fontWeight:600,textTransform:"uppercase",letterSpacing:0.8,marginBottom:6}}>{label}</label>
      <div style={{display:"flex",gap:5}}>
        {[{v:true,l:"YES",c:"#22C55E",bg:"rgba(34,197,94,0.12)"},{v:false,l:"NO",c:"#EF4444",bg:"rgba(239,68,68,0.12)"},{v:null,l:"—",c:"#52525B",bg:"rgba(255,255,255,0.04)"}].map(o=>(
          <button key={String(o.v)} onClick={()=>set(field,o.v)}
            style={{flex:1,padding:"7px 0",borderRadius:7,border:`1px solid ${f[field]===o.v ? o.c+"55" : "#27272A"}`,
              background: f[field]===o.v ? o.bg : "transparent",
              color: f[field]===o.v ? o.c : "#52525B",fontSize:12,fontWeight:700,transition:"all 0.1s"}}>
            {o.l}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={onClose}>
      <div className="fade-in" style={{background:"#111117",border:"1px solid #1C1C24",borderRadius:18,width:"100%",maxWidth:560,maxHeight:"92vh",overflowY:"auto",boxShadow:"0 32px 80px rgba(0,0,0,0.6)"}} onClick={e=>e.stopPropagation()}>

        {/* Header */}
        <div style={{padding:"20px 24px 0",display:"flex",alignItems:"flex-start",gap:12}}>
          <div style={{flex:1}}>
            <div style={{fontSize:11,color:company?.color,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:3}}>{company?.name}</div>
            <input value={f.name} onChange={e=>set("name",e.target.value)}
              placeholder="Driver name..."
              style={{background:"transparent",border:"none",color:"#F4F4F5",fontSize:18,fontWeight:700,width:"100%",padding:0,outline:"none"}} />
            <div style={{display:"flex",alignItems:"center",gap:8,marginTop:6}}>
              <StatusPill status={status} />
              {f.updatedBy && <span style={{fontSize:11,color:"#3F3F46"}}>Last updated by <span style={{color:"#71717A"}}>{f.updatedBy}</span></span>}
            </div>
          </div>
          <button onClick={onClose} style={{background:"rgba(255,255,255,0.05)",border:"none",borderRadius:8,width:32,height:32,color:"#52525B",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>

        {/* Tabs */}
        <div style={{display:"flex",gap:0,padding:"16px 24px 0",borderBottom:"1px solid #1C1C24",marginTop:16}}>
          {[["info","Info"],["status","Checklist"],["history","History"]].map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)}
              style={{padding:"7px 16px",background:"transparent",border:"none",color:tab===k?"#F4F4F5":"#52525B",
                fontSize:13,fontWeight:tab===k?600:400,borderBottom:`2px solid ${tab===k?"#7C3AED":"transparent"}`,marginBottom:-1}}>
              {l}
            </button>
          ))}
        </div>

        <div style={{padding:24,display:"flex",flexDirection:"column",gap:16}}>
          {tab === "info" && <>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <Input label="Truck #" value={f.truck} onChange={e=>set("truck",e.target.value)} placeholder="#001" />
              <Input label="ELD Driver ID" value={f.eldDriverId||""} onChange={e=>set("eldDriverId",e.target.value)} placeholder="From ELD system" />
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <Sel label="Responsible" value={f.responsible} onChange={e=>set("responsible",e.target.value)}>
                {RESPONSIBLE.map(r=><option key={r}>{r}</option>)}
              </Sel>
              <Sel label="Note / Status" value={f.note} onChange={e=>set("note",e.target.value)}>
                {NOTE_OPTS.map(n=><option key={n}>{n}</option>)}
              </Sel>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <Input label="Check Date" type="date" value={f.date} onChange={e=>set("date",e.target.value)} />
              <Input label="Profile Form Date" type="date" value={f.profileFormDate} onChange={e=>set("profileFormDate",e.target.value)} />
            </div>
            <Sel label="ELD Times" value={f.eldTimes} onChange={e=>set("eldTimes",e.target.value)}>
              {ELD_OPTS.map(o=><option key={o} value={o}>{o||"— Not set"}</option>)}
            </Sel>
            <div style={{display:"flex",alignItems:"center",gap:10,padding:"12px 14px",background:"rgba(255,255,255,0.02)",borderRadius:8,border:"1px solid #1C1C24"}}>
              <div onClick={()=>set("active",!f.active)}
                style={{width:40,height:22,borderRadius:999,background:f.active?"#6D28D9":"#27272A",cursor:"pointer",position:"relative",transition:"all 0.2s",flexShrink:0}}>
                <div style={{width:16,height:16,borderRadius:"50%",background:"white",position:"absolute",top:3,left:f.active?21:3,transition:"all 0.2s"}} />
              </div>
              <div>
                <div style={{fontSize:13,fontWeight:600,color:"#F4F4F5"}}>{f.active?"Active Driver":"Inactive Driver"}</div>
                <div style={{fontSize:11,color:"#52525B"}}>{f.active?"Appears in all views":"Hidden from main view"}</div>
              </div>
            </div>
          </>}

          {tab === "status" && <>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
              <Toggle3 label="Paper Logbook" field="paperLogbook" />
              <Toggle3 label="User's Manual" field="userManual" />
              <Toggle3 label="Tablet Mounted" field="tabletMounted" />
            </div>
            <div style={{padding:"14px",background:"rgba(255,255,255,0.02)",borderRadius:10,border:"1px solid #1C1C24"}}>
              <div style={{fontSize:12,fontWeight:600,color:"#71717A",marginBottom:10}}>ELD CONNECTION STATUS</div>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
                <ConnectBar h={f.connectHistory} />
                <StatusPill status={status} />
              </div>
              <div style={{fontSize:11,color:"#52525B"}}>Last 8 checks. Click to toggle:</div>
              <div style={{display:"flex",gap:6,marginTop:8}}>
                {f.connectHistory.map((v,i)=>(
                  <button key={i} onClick={()=>{ const h=[...f.connectHistory]; h[i]=h[i]?0:1; set("connectHistory",h); }}
                    style={{flex:1,height:32,borderRadius:6,border:`1px solid ${v?"rgba(34,197,94,0.3)":"rgba(239,68,68,0.3)"}`,
                      background:v?"rgba(34,197,94,0.1)":"rgba(239,68,68,0.1)",
                      color:v?"#4ADE80":"#FCA5A5",fontSize:11,fontWeight:700}}>
                    {v?"✓":"✗"}
                  </button>
                ))}
              </div>
            </div>
          </>}

          {tab === "history" && (
            <div style={{padding:14,background:"rgba(255,255,255,0.02)",borderRadius:10,border:"1px solid #1C1C24"}}>
              <div style={{fontSize:12,fontWeight:600,color:"#71717A",marginBottom:12}}>ACTIVITY LOG</div>
              {[
                { time: f.updatedAt, user: f.updatedBy||"System", action:"Updated driver info" },
                { time: f.profileFormDate+"T00:00:00Z", user:"System", action:"Profile form submitted" },
                { time: f.date+"T00:00:00Z", user: f.responsible||"System", action:"Last check performed" },
              ].filter(l=>l.time).map((log,i)=>(
                <div key={i} style={{display:"flex",gap:10,padding:"8px 0",borderBottom:"1px solid #1C1C24"}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:"#27272A",marginTop:4,flexShrink:0}} />
                  <div style={{flex:1}}>
                    <div style={{fontSize:12,color:"#A1A1AA"}}>{log.action}</div>
                    <div style={{fontSize:11,color:"#3F3F46",marginTop:2}}>{log.user} · {fmtDate(log.time)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{padding:"0 24px 20px",display:"flex",gap:8,justifyContent:"flex-end"}}>
          <button onClick={onClose} style={{padding:"9px 20px",borderRadius:9,border:"1px solid #27272A",background:"transparent",color:"#71717A",fontSize:13,fontWeight:500}}>Cancel</button>
          <button onClick={()=>onSave({...f,status:calcStatus(f.connectHistory),updatedBy:currentUser?.name||"",updatedAt:new Date().toISOString()})}
            style={{padding:"9px 22px",borderRadius:9,border:"none",background:"#6D28D9",color:"white",fontSize:13,fontWeight:700,
              boxShadow:"0 4px 12px rgba(109,40,217,0.3)"}}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// TOASTS
// ═══════════════════════════════════════════════════
function ToastContainer({ items, onDismiss }) {
  return (
    <div style={{position:"fixed",bottom:20,right:20,zIndex:9999,display:"flex",flexDirection:"column",gap:8,maxWidth:320}}>
      {items.map(t=>(
        <div key={t.id} className="slide-in"
          style={{background:"#18181B",border:`1px solid ${t.type==="error"?"rgba(239,68,68,0.3)":t.type==="warn"?"rgba(234,179,8,0.3)":"rgba(109,40,217,0.3)"}`,
            borderRadius:11,padding:"11px 14px",display:"flex",gap:10,alignItems:"flex-start",
            boxShadow:"0 8px 24px rgba(0,0,0,0.4)"}}>
          <span style={{fontSize:15,flexShrink:0}}>{t.type==="error"?"🔴":t.type==="warn"?"⚠️":"✅"}</span>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:600,color:"#F4F4F5"}}>{t.title}</div>
            {t.msg&&<div style={{fontSize:12,color:"#71717A",marginTop:2}}>{t.msg}</div>}
          </div>
          <button onClick={()=>onDismiss(t.id)} style={{background:"none",border:"none",color:"#3F3F46",fontSize:14,padding:2,flexShrink:0}}>✕</button>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════
export default function App() {
  // ── Auth
  const [user, setUser] = useState(() => { try { const s=localStorage.getItem("eld_user"); return s?JSON.parse(s):null; } catch { return null; } });
  // ── Data
  const [data, setData] = useState(() => { try { const s=localStorage.getItem("eld_data_v2"); return s?JSON.parse(s):INITIAL_DATA; } catch { return INITIAL_DATA; } });
  // ── Settings (ELD tokens)
  const [settings, setSettings] = useState(() => { try { const s=localStorage.getItem("eld_settings_v2"); return s?JSON.parse(s):DEFAULT_SETTINGS; } catch { return DEFAULT_SETTINGS; } });
  // ── UI
  const [activeCompany, setActiveCompany] = useState("all");
  const [filterResp, setFilterResp] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [view, setView] = useState("table");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [driverModal, setDriverModal] = useState(null); // {driver:null|obj, companyId}
  const [toasts, setToasts] = useState([]);
  const [syncing, setSyncing] = useState(false);
  const [tokenExpiry, setTokenExpiry] = useState(null); // "factor"|"leader"
  const [snoozedUntil, setSnoozedUntil] = useState({});

  // ── Persist
  useEffect(() => { localStorage.setItem("eld_data_v2", JSON.stringify(data)); }, [data]);
  useEffect(() => { localStorage.setItem("eld_settings_v2", JSON.stringify(settings)); }, [settings]);
  useEffect(() => { if(user) localStorage.setItem("eld_user", JSON.stringify(user)); else localStorage.removeItem("eld_user"); }, [user]);

  // ── Toast helper
  const toast = useCallback((title, msg, type="info") => {
    const id = Date.now();
    setToasts(t => [...t, {id,title,msg,type}]);
    setTimeout(() => setToasts(t => t.filter(x=>x.id!==id)), 5000);
  }, []);

  // ── Token expiry check (every 2 min)
  useEffect(() => {
    const check = () => {
      const now = Date.now();
      for (const p of ["factor","leader"]) {
        const setAt = settings[`${p}SetAt`];
        const token = settings[`${p}Token`];
        if (!token || !setAt) continue;
        const snooze = snoozedUntil[p];
        if (snooze && now < snooze) continue;
        if (now - setAt > 60 * 60 * 1000) { setTokenExpiry(p); return; }
      }
    };
    check();
    const id = setInterval(check, 2 * 60 * 1000);
    return () => clearInterval(id);
  }, [settings, snoozedUntil]);

  // ── Initial alerts on load
  useEffect(() => {
    if (!user) return;
    const allDrivers = data.companies.flatMap(c=>c.drivers);
    const reds = allDrivers.filter(d=>d.active&&calcStatus(d.connectHistory)==="red");
    const overdue = allDrivers.filter(d=>d.active&&daysSince(d.profileFormDate)>30);
    if (reds.length) toast(`${reds.length} driver(s) disconnected`, reds.slice(0,2).map(d=>d.name).join(", "), "error");
    if (overdue.length) toast(`${overdue.length} profile form(s) overdue`, "Last updated 30+ days ago", "warn");
  }, [user]);

  // ── Save driver
  const saveDriver = useCallback((companyId, driver) => {
    setData(d => ({
      ...d,
      companies: d.companies.map(c => c.id !== companyId ? c : {
        ...c,
        drivers: c.drivers.find(x => x.id===driver.id)
          ? c.drivers.map(x => x.id===driver.id ? driver : x)
          : [...c.drivers, driver]
      })
    }));
    setDriverModal(null);
    toast("Saved", `${driver.name} updated`);
  }, [toast]);

  // ── ELD Sync
  const runSync = useCallback(async () => {
    const hF = settings.factorToken?.trim();
    const hL = settings.leaderToken?.trim();
    if (!hF && !hL) { toast("No tokens", "Add ELD tokens in the token bar above", "warn"); return; }
    setSyncing(true);
    await new Promise(r => setTimeout(r, 1200)); // simulate
    setSyncing(false);
    toast("Sync complete", "ELD data refreshed");
  }, [settings, toast]);

  // ── Derived data
  const allDrivers = useMemo(() =>
    data.companies.flatMap(c => c.drivers.map(d => ({...d, companyName:c.name, companyColor:c.color, companyId:c.id, eldProvider:c.eldProvider, status:calcStatus(d.connectHistory)}))),
    [data]
  );

  const filtered = useMemo(() => allDrivers.filter(d => {
    if (activeCompany !== "all" && d.companyId !== activeCompany) return false;
    if (filterResp !== "all" && d.responsible !== filterResp) return false;
    if (filterStatus !== "all" && d.status !== filterStatus) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!d.name.toLowerCase().includes(q) && !d.truck.toLowerCase().includes(q) && !d.responsible.toLowerCase().includes(q)) return false;
    }
    // Non-admin sees only their assigned drivers
    if (user?.role !== "admin" && d.responsible !== user?.name) return false;
    return true;
  }), [allDrivers, activeCompany, filterResp, filterStatus, search, user]);

  const stats = useMemo(() => ({
    total: allDrivers.length,
    active: allDrivers.filter(d=>d.active).length,
    green: allDrivers.filter(d=>d.status==="green").length,
    yellow: allDrivers.filter(d=>d.status==="yellow").length,
    red: allDrivers.filter(d=>d.status==="red").length,
    noLog: allDrivers.filter(d=>d.active&&!d.paperLogbook).length,
    noTab: allDrivers.filter(d=>d.active&&!d.tabletMounted).length,
  }), [allDrivers]);

  if (!user) return (
    <>
      <style>{GLOBAL_CSS}</style>
      <LoginPage onLogin={u => setUser(u)} />
    </>
  );

  const companyGroups = activeCompany === "all" ? data.companies : data.companies.filter(c=>c.id===activeCompany);

  // ── RENDER
  return (
    <>
      <style>{GLOBAL_CSS}</style>

      <div style={{display:"flex",flexDirection:"column",height:"100vh",background:"#09090B",overflow:"hidden"}}>
        {/* TOKEN BAR */}
        <TokenRefreshBar settings={settings} onUpdateSettings={s=>{setSettings(s);toast("Token saved","ELD token updated");}} onSync={runSync} syncing={syncing} />

        <div style={{display:"flex",flex:1,overflow:"hidden"}}>
          {/* SIDEBAR */}
          <div style={{width:sidebarOpen?220:52,minWidth:sidebarOpen?220:52,background:"#0C0C10",borderRight:"1px solid #1C1C24",display:"flex",flexDirection:"column",transition:"all 0.2s",overflow:"hidden"}}>

            {/* Sidebar header */}
            <div style={{padding:"14px 12px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid #1C1C24"}}>
              {sidebarOpen && <span style={{fontSize:12,fontWeight:800,color:"#7C3AED",letterSpacing:0.5}}>ALGO ELD</span>}
              <button onClick={()=>setSidebarOpen(o=>!o)} style={{background:"rgba(255,255,255,0.04)",border:"1px solid #1C1C24",borderRadius:6,width:26,height:26,color:"#52525B",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",marginLeft:sidebarOpen?0:"auto"}}>
                {sidebarOpen?"←":"→"}
              </button>
            </div>

            {/* Nav */}
            <nav style={{padding:"8px 0",flex:1,overflowY:"auto"}}>
              {[{id:"all",name:"All Companies",color:"#52525B"}, ...data.companies].map(c=>(
                <button key={c.id} onClick={()=>setActiveCompany(c.id)}
                  style={{width:"100%",padding:`9px ${sidebarOpen?14:0}px`,display:"flex",alignItems:"center",gap:9,background:activeCompany===c.id?"rgba(124,58,237,0.08)":"transparent",border:"none",
                    borderRight:`2px solid ${activeCompany===c.id?"#7C3AED":"transparent"}`,cursor:"pointer",
                    color:activeCompany===c.id?"#F4F4F5":"#52525B",textAlign:"left",justifyContent:sidebarOpen?"flex-start":"center"}}>
                  <span style={{width:8,height:8,borderRadius:"50%",background:c.color,flexShrink:0,boxShadow:activeCompany===c.id?`0 0 8px ${c.color}`:"none"}} />
                  {sidebarOpen && <span style={{fontSize:12,fontWeight:activeCompany===c.id?600:400,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{c.name}</span>}
                </button>
              ))}
            </nav>

            {/* User */}
            <div style={{padding:"12px",borderTop:"1px solid #1C1C24",display:"flex",alignItems:"center",gap:9}}>
              <Avatar user={user} size={28} />
              {sidebarOpen && (
                <div style={{flex:1,overflow:"hidden"}}>
                  <div style={{fontSize:12,fontWeight:600,color:"#F4F4F5",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{user.name}</div>
                  <div style={{fontSize:10,color:"#52525B",textTransform:"capitalize"}}>{user.role}</div>
                </div>
              )}
              {sidebarOpen && (
                <button onClick={()=>{setUser(null);toast("Signed out","");}}
                  style={{background:"rgba(255,255,255,0.04)",border:"1px solid #1C1C24",borderRadius:6,width:24,height:24,color:"#52525B",fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  ⏻
                </button>
              )}
            </div>
          </div>

          {/* MAIN */}
          <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
            {/* TOOLBAR */}
            <div style={{padding:"10px 16px",background:"#0C0C10",borderBottom:"1px solid #1C1C24",display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
              {/* Search */}
              <div style={{position:"relative"}}>
                <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#3F3F46",fontSize:13}}>⌕</span>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search driver, truck..."
                  style={{background:"#18181B",border:"1px solid #27272A",borderRadius:8,padding:"7px 12px 7px 30px",
                    color:"#F4F4F5",fontSize:13,width:200}} />
              </div>

              {/* Filters */}
              <select value={filterResp} onChange={e=>setFilterResp(e.target.value)}
                style={{background:"#18181B",border:"1px solid #27272A",borderRadius:8,padding:"7px 10px",color:"#71717A",fontSize:12}}>
                <option value="all">All responsible</option>
                {RESPONSIBLE.map(r=><option key={r}>{r}</option>)}
              </select>

              <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}
                style={{background:"#18181B",border:"1px solid #27272A",borderRadius:8,padding:"7px 10px",color:"#71717A",fontSize:12}}>
                <option value="all">All statuses</option>
                <option value="green">🟢 Connected</option>
                <option value="yellow">🟡 Intermittent</option>
                <option value="red">🔴 Disconnected</option>
              </select>

              <div style={{marginLeft:"auto",display:"flex",gap:6,alignItems:"center"}}>
                {/* View toggle */}
                <div style={{display:"flex",background:"#18181B",border:"1px solid #27272A",borderRadius:8,overflow:"hidden"}}>
                  {[["table","≡"],["analytics","◫"]].map(([v,icon])=>(
                    <button key={v} onClick={()=>setView(v)}
                      style={{padding:"7px 14px",background:view===v?"#27272A":"transparent",border:"none",
                        color:view===v?"#F4F4F5":"#52525B",fontSize:14,transition:"all 0.1s"}}>
                      {icon}
                    </button>
                  ))}
                </div>
                {/* Add driver */}
                {activeCompany !== "all" && (
                  <button onClick={()=>setDriverModal({driver:null,companyId:activeCompany})}
                    style={{background:"#6D28D9",border:"none",borderRadius:8,padding:"7px 14px",color:"white",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",gap:5,boxShadow:"0 2px 8px rgba(109,40,217,0.3)"}}>
                    + Add Driver
                  </button>
                )}
              </div>
            </div>

            {/* STATS BAR */}
            <div style={{display:"flex",gap:6,padding:"8px 16px",background:"#09090B",borderBottom:"1px solid #1C1C24",overflowX:"auto",flexShrink:0}}>
              {[
                {l:"Total",    v:stats.total,  c:"#7C3AED", f:"all"},
                {l:"Active",   v:stats.active, c:"#52525B", f:"all"},
                {l:"🟢 OK",    v:stats.green,  c:"#22C55E", f:"green"},
                {l:"🟡 Mid",   v:stats.yellow, c:"#EAB308", f:"yellow"},
                {l:"🔴 Off",   v:stats.red,    c:"#EF4444", f:"red"},
                {l:"No Log",   v:stats.noLog,  c:"#A78BFA", f:"all"},
                {l:"No Tablet",v:stats.noTab,  c:"#F97316", f:"all"},
              ].map(s=>(
                <button key={s.l} onClick={()=>setFilterStatus(s.f)}
                  style={{background: filterStatus===s.f&&s.f!=="all" ? "rgba(109,40,217,0.08)" : "#111117",
                    border:`1px solid ${filterStatus===s.f&&s.f!=="all" ? "rgba(109,40,217,0.2)" : "#1C1C24"}`,
                    borderRadius:9,padding:"6px 12px",display:"flex",flexDirection:"column",gap:1,minWidth:68,cursor:"pointer",flexShrink:0,textAlign:"left"}}>
                  <span style={{fontSize:16,fontWeight:800,color:s.c,lineHeight:1}}>{s.v}</span>
                  <span style={{fontSize:10,color:"#3F3F46",whiteSpace:"nowrap"}}>{s.l}</span>
                </button>
              ))}
              <div style={{marginLeft:"auto",display:"flex",alignItems:"center",flexShrink:0}}>
                <span style={{fontSize:11,color:"#3F3F46"}}>{filtered.length} result{filtered.length!==1?"s":""}</span>
              </div>
            </div>

            {/* CONTENT */}
            <div style={{flex:1,overflowY:"auto"}}>
              {view === "table" ? (
                companyGroups.map(company => {
                  const drivers = filtered.filter(d => d.companyId === company.id);
                  if (!drivers.length) return null;
                  const connected = drivers.filter(d=>d.status==="green").length;
                  const pct = Math.round((connected/drivers.length)*100);
                  return (
                    <div key={company.id} style={{marginBottom:0}}>
                      {/* Company header */}
                      <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 16px",
                        background:"#09090B",position:"sticky",top:0,zIndex:10,borderBottom:"1px solid #1C1C24"}}>
                        <div style={{width:3,height:18,borderRadius:99,background:company.color}} />
                        <span style={{fontWeight:700,fontSize:11,color:company.color,letterSpacing:1.2,textTransform:"uppercase"}}>{company.name}</span>
                        <span style={{fontSize:10,background:"rgba(255,255,255,0.04)",color:"#52525B",padding:"2px 8px",borderRadius:99,border:"1px solid #27272A"}}>{drivers.length}</span>
                        {/* Mini progress */}
                        <div style={{display:"flex",alignItems:"center",gap:5}}>
                          <div style={{width:60,height:4,background:"#1C1C24",borderRadius:99}}>
                            <div style={{width:`${pct}%`,height:"100%",background:company.color,borderRadius:99,transition:"width 0.5s"}} />
                          </div>
                          <span style={{fontSize:10,color:"#52525B"}}>{pct}%</span>
                        </div>
                        <span style={{fontSize:10,color:"#3F3F46"}}>{company.eldProvider==="factor"?"⚡ Factor":"🔷 Leader"}</span>
                        <button onClick={()=>setDriverModal({driver:null,companyId:company.id})}
                          style={{marginLeft:"auto",background:"rgba(109,40,217,0.1)",border:"1px solid rgba(109,40,217,0.25)",color:"#A78BFA",borderRadius:7,padding:"4px 12px",fontSize:11,fontWeight:600}}>
                          + Add
                        </button>
                      </div>

                      {/* Table */}
                      <table style={{width:"100%",borderCollapse:"collapse"}}>
                        <thead>
                          <tr style={{borderBottom:"1px solid #1C1C24"}}>
                            {[
                              {l:"Driver Name",   w:"auto"},
                              {l:"Truck",         w:80},
                              {l:"Responsible",   w:110},
                              {l:"Note",          w:90},
                              {l:"Date",          w:100},
                              {l:"Logbook",       w:80},
                              {l:"Manual",        w:70},
                              {l:"Tablet",        w:70},
                              {l:"ELD",           w:90},
                              {l:"History",       w:80},
                              {l:"Status",        w:120},
                              {l:"Updated by",    w:90},
                            ].map(h=>(
                              <th key={h.l} style={{padding:"7px 12px",textAlign:"left",color:"#3F3F46",fontWeight:600,
                                fontSize:10,textTransform:"uppercase",letterSpacing:0.8,whiteSpace:"nowrap",
                                background:"#0A0A0F",width:h.w||"auto",borderBottom:"1px solid #1C1C24"}}>
                                {h.l}
                              </th>
                            ))}
                            <th style={{background:"#0A0A0F",width:40,borderBottom:"1px solid #1C1C24"}}/>
                          </tr>
                        </thead>
                        <tbody>
                          {drivers.map(driver => {
                            const old = daysSince(driver.date) > 7;
                            return (
                              <tr key={driver.id} className="row-hover"
                                style={{borderBottom:"1px solid #111117",cursor:"pointer",transition:"background 0.1s"}}
                                onClick={()=>setDriverModal({driver, companyId:driver.companyId})}>

                                <td style={{padding:"10px 12px",background:"#09090B"}}>
                                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                                    <div style={{width:7,height:7,borderRadius:"50%",background:STATUS_CFG[driver.status]?.dot,
                                      boxShadow:`0 0 6px ${STATUS_CFG[driver.status]?.dot}`,flexShrink:0}} />
                                    <span style={{color:driver.active?"#E4E4E7":"#3F3F46",fontWeight:500,fontSize:13}}>
                                      {driver.name}
                                    </span>
                                    {!driver.active && (
                                      <span style={{fontSize:10,background:"rgba(255,255,255,0.04)",color:"#52525B",
                                        padding:"1px 6px",borderRadius:4,border:"1px solid #27272A"}}>inactive</span>
                                    )}
                                  </div>
                                </td>

                                <td style={{padding:"10px 12px",background:"#09090B"}}>
                                  <span style={{color:"#60A5FA",fontFamily:"monospace",fontWeight:600,fontSize:12}}>
                                    {driver.truck||"—"}
                                  </span>
                                </td>

                                <td style={{padding:"10px 12px",background:"#09090B"}}>
                                  {driver.responsible ? (
                                    <span style={{fontSize:11,fontWeight:600,padding:"2px 8px",borderRadius:99,
                                      background:"rgba(255,255,255,0.04)",border:"1px solid #27272A",color:"#A1A1AA"}}>
                                      {driver.responsible}
                                    </span>
                                  ) : <span style={{color:"#27272A"}}>—</span>}
                                </td>

                                <td style={{padding:"10px 12px",background:"#09090B"}}>
                                  <span style={{fontSize:12,fontWeight:600,
                                    color:driver.note==="All good"?"#4ADE80":driver.note==="Off"?"#FCA5A5":driver.note==="Issue"?"#EF4444":"#FCD34D"}}>
                                    {driver.note||"—"}
                                  </span>
                                </td>

                                <td style={{padding:"10px 12px",background:"#09090B"}}>
                                  <div style={{fontSize:11,color: old?"#FCA5A5":"#71717A"}}>{fmtDate(driver.date)}</div>
                                  {old && <div style={{fontSize:10,color:"#EF4444"}}>⚠ {daysSince(driver.date)}d ago</div>}
                                </td>

                                <td style={{padding:"10px 12px",background:"#09090B"}}><Badge v={driver.paperLogbook}/></td>
                                <td style={{padding:"10px 12px",background:"#09090B"}}><Badge v={driver.userManual}/></td>
                                <td style={{padding:"10px 12px",background:"#09090B"}}><Badge v={driver.tabletMounted}/></td>

                                <td style={{padding:"10px 12px",background:"#09090B"}}>
                                  <span style={{fontSize:11,fontWeight:600,
                                    color:driver.eldTimes==="ALL GOOD"?"#4ADE80":driver.eldTimes?"#FCD34D":"#3F3F46"}}>
                                    {driver.eldTimes||"—"}
                                  </span>
                                </td>

                                <td style={{padding:"10px 12px",background:"#09090B"}}>
                                  <ConnectBar h={driver.connectHistory}/>
                                </td>

                                <td style={{padding:"10px 12px",background:"#09090B"}}>
                                  <StatusPill status={driver.status}/>
                                </td>

                                <td style={{padding:"10px 12px",background:"#09090B"}}>
                                  {driver.updatedBy ? (
                                    <div style={{display:"flex",alignItems:"center",gap:5}}>
                                      <div style={{width:18,height:18,borderRadius:"50%",
                                        background:USERS.find(u=>u.name===driver.updatedBy)?.color||"#27272A",
                                        display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:700,color:"white"}}>
                                        {driver.updatedBy?.[0]}
                                      </div>
                                      <span style={{fontSize:11,color:"#52525B"}}>{driver.updatedBy}</span>
                                    </div>
                                  ) : <span style={{color:"#27272A",fontSize:12}}>—</span>}
                                </td>

                                <td style={{padding:"10px 8px",background:"#09090B"}}>
                                  <button onClick={e=>{e.stopPropagation();setDriverModal({driver,companyId:driver.companyId});}}
                                    style={{background:"rgba(255,255,255,0.04)",border:"1px solid #27272A",color:"#52525B",
                                      borderRadius:6,padding:"4px 8px",fontSize:11}}>
                                    Edit
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  );
                })
              ) : (
                /* ANALYTICS VIEW */
                <div style={{padding:20}}>
                  <h2 style={{fontSize:18,fontWeight:700,color:"#F4F4F5",marginBottom:20}}>Analytics Overview</h2>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16}}>
                    {data.companies.map(c => {
                      const dr = c.drivers;
                      const g=dr.filter(d=>calcStatus(d.connectHistory)==="green").length;
                      const y=dr.filter(d=>calcStatus(d.connectHistory)==="yellow").length;
                      const r=dr.filter(d=>calcStatus(d.connectHistory)==="red").length;
                      const t=dr.length||1;
                      return (
                        <div key={c.id} className="fade-in"
                          style={{background:"#111117",border:"1px solid #1C1C24",borderRadius:14,padding:18,
                            boxShadow:"0 4px 16px rgba(0,0,0,0.3)"}}>
                          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
                            <div style={{width:4,height:20,borderRadius:99,background:c.color}} />
                            <div style={{flex:1}}>
                              <div style={{fontSize:12,fontWeight:700,color:c.color,textTransform:"uppercase",letterSpacing:0.8}}>{c.name}</div>
                              <div style={{fontSize:11,color:"#3F3F46"}}>{c.eldProvider==="factor"?"⚡ Factor ELD":"🔷 Leader ELD"}</div>
                            </div>
                            <div style={{fontSize:20,fontWeight:800,color:"#F4F4F5"}}>{dr.length}</div>
                          </div>

                          {[[g,"Connected","#22C55E","#4ADE80"],[y,"Intermittent","#EAB308","#FCD34D"],[r,"Disconnected","#EF4444","#FCA5A5"]].map(([n,lbl,bg,tc])=>(
                            <div key={lbl} style={{marginBottom:10}}>
                              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                                <span style={{fontSize:11,color:tc,fontWeight:600}}>{lbl}</span>
                                <span style={{fontSize:11,color:tc}}>{n} / {t}</span>
                              </div>
                              <div style={{background:"#1C1C24",borderRadius:99,height:5}}>
                                <div style={{background:bg,height:5,borderRadius:99,width:`${(n/t)*100}%`,transition:"width 0.6s ease"}} />
                              </div>
                            </div>
                          ))}

                          {r > 0 && (
                            <div style={{background:"rgba(239,68,68,0.06)",border:"1px solid rgba(239,68,68,0.15)",borderRadius:8,padding:10,marginTop:12}}>
                              <div style={{fontSize:11,color:"#FCA5A5",fontWeight:700,marginBottom:5}}>⚠ Needs attention</div>
                              {dr.filter(d=>calcStatus(d.connectHistory)==="red").map(d=>(
                                <div key={d.id} style={{fontSize:11,color:"#EF4444",padding:"2px 0",display:"flex",alignItems:"center",gap:5}}>
                                  <span>→</span>{d.name} {d.truck && <span style={{color:"#52525B"}}>({d.truck})</span>}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Checklist completion */}
                          <div style={{marginTop:12,paddingTop:12,borderTop:"1px solid #1C1C24"}}>
                            <div style={{fontSize:10,color:"#3F3F46",fontWeight:600,letterSpacing:0.8,marginBottom:6}}>CHECKLIST COMPLETION</div>
                            {[["Logbook","paperLogbook"],["Manual","userManual"],["Tablet","tabletMounted"]].map(([lbl,key])=>{
                              const done=dr.filter(d=>d[key]===true).length;
                              return (
                                <div key={key} style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                                  <span style={{fontSize:11,color:"#52525B",width:52,flexShrink:0}}>{lbl}</span>
                                  <div style={{flex:1,background:"#1C1C24",borderRadius:99,height:3}}>
                                    <div style={{background:"#7C3AED",height:3,borderRadius:99,width:`${(done/t)*100}%`}} />
                                  </div>
                                  <span style={{fontSize:10,color:"#52525B",width:28,textAlign:"right"}}>{done}/{t}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {filtered.length === 0 && (
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:60,color:"#3F3F46"}}>
                  <div style={{fontSize:36,marginBottom:12}}>🔍</div>
                  <div style={{fontSize:16,fontWeight:600,color:"#52525B",marginBottom:6}}>No drivers found</div>
                  <div style={{fontSize:13}}>Try adjusting your filters or search query</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* DRIVER MODAL */}
      {driverModal && (
        <DriverModal
          driver={driverModal.driver}
          companyId={driverModal.companyId}
          companies={data.companies}
          currentUser={user}
          onSave={d => saveDriver(driverModal.companyId, d)}
          onClose={() => setDriverModal(null)}
        />
      )}

      {/* TOKEN EXPIRY MODAL */}
      {tokenExpiry && (
        <TokenExpiryModal
          provider={tokenExpiry}
          onSave={token => {
            const key = tokenExpiry === "factor" ? "factorToken" : "leaderToken";
            const tsKey = tokenExpiry === "factor" ? "factorSetAt" : "leaderSetAt";
            setSettings(s => ({...s, [key]:token, [tsKey]:Date.now()}));
            setTokenExpiry(null);
            toast("Token updated", `${tokenExpiry} ELD token refreshed`);
          }}
          onSnooze={() => {
            setSnoozedUntil(s => ({...s, [tokenExpiry]: Date.now() + 15*60*1000}));
            setTokenExpiry(null);
          }}
        />
      )}

      {/* TOASTS */}
      <ToastContainer items={toasts} onDismiss={id => setToasts(t=>t.filter(x=>x.id!==id))} />
    </>
  );
}
