import { useState } from "react";
import { USERS } from "../data";
import { Spinner } from "./ui/Atoms";

export function Login({ onLogin }) {
  const [form, setForm]   = useState({ username:"", password:"" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const submit = async () => {
    if (!form.username||!form.password) { setError("Please fill in all fields"); return; }
    setLoading(true); setError("");
    await new Promise(r=>setTimeout(r,500));
    const user = USERS.find(u=>u.username.toLowerCase()===form.username.toLowerCase()&&u.password===form.password);
    if (user) onLogin(user);
    else { setError("Invalid username or password"); setLoading(false); }
  };

  return (
    <div style={{minHeight:"100vh",background:"#1e1f21",display:"flex",alignItems:"center",justifyContent:"center",padding:20,position:"relative",overflow:"hidden"}}>
      {/* BG grid */}
      <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px)",backgroundSize:"40px 40px",pointerEvents:"none"}}/>

      <div className="fade-up" style={{width:"100%",maxWidth:380,position:"relative"}}>
        {/* Logo */}
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{width:48,height:48,borderRadius:12,background:"linear-gradient(135deg,#4573d2,#2563eb)",
            display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:12,
            boxShadow:"0 8px 24px rgba(69,115,210,.35)"}}>
            <span style={{fontSize:22,fontWeight:800,color:"#fff"}}>A</span>
          </div>
          <div style={{fontSize:20,fontWeight:800,color:"#f1f0ee",letterSpacing:-.3}}>Algo ELD Manager</div>
          <div style={{fontSize:12,color:"#5a5c61",marginTop:4}}>Sign in to continue</div>
        </div>

        <div style={{background:"#2c2d2f",border:"1px solid #3d3e40",borderRadius:14,padding:24,boxShadow:"0 24px 64px rgba(0,0,0,.4)"}}>
          <div style={{display:"flex",flexDirection:"column",gap:13}}>
            <div>
              <label style={{display:"block",fontSize:11,color:"#9d9ea3",fontWeight:700,marginBottom:5,textTransform:"uppercase",letterSpacing:.7}}>Username</label>
              <input value={form.username} onChange={e=>setForm(f=>({...f,username:e.target.value}))}
                onKeyDown={e=>e.key==="Enter"&&submit()} placeholder="e.g. david"
                className="field-input" style={{fontSize:14}}/>
            </div>
            <div>
              <label style={{display:"block",fontSize:11,color:"#9d9ea3",fontWeight:700,marginBottom:5,textTransform:"uppercase",letterSpacing:.7}}>Password</label>
              <div style={{position:"relative"}}>
                <input type={showPass?"text":"password"} value={form.password}
                  onChange={e=>setForm(f=>({...f,password:e.target.value}))}
                  onKeyDown={e=>e.key==="Enter"&&submit()} placeholder="••••••"
                  className="field-input" style={{paddingRight:38,fontSize:14}}/>
                <button onClick={()=>setShowPass(s=>!s)}
                  style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#5a5c61",fontSize:15}}>
                  {showPass?"🙈":"👁"}
                </button>
              </div>
            </div>
            {error && <div style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.2)",borderRadius:7,padding:"8px 11px",fontSize:12,color:"#fca5a5",display:"flex",gap:7}}>⚠ {error}</div>}
            <button onClick={submit} disabled={loading}
              style={{width:"100%",background:"#4573d2",border:"none",borderRadius:8,padding:"11px",
                color:"#fff",fontSize:14,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:7,
                boxShadow:"0 4px 14px rgba(69,115,210,.3)",opacity:loading?.7:1}}>
              {loading?<><Spinner size={14}/>Signing in...</>:"Sign In →"}
            </button>
          </div>
        </div>

        {/* Demo accounts */}
        <div style={{marginTop:16,background:"#232425",border:"1px solid #2c2d2f",borderRadius:10,padding:12}}>
          <div style={{fontSize:10,color:"#3d3e40",fontWeight:700,textTransform:"uppercase",letterSpacing:.8,marginBottom:7}}>Quick Login</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
            {USERS.slice(0,6).map(u=>(
              <button key={u.id} onClick={()=>setForm({username:u.username,password:u.password})}
                style={{background:"transparent",border:"1px solid #2c2d2f",borderRadius:6,padding:"4px 7px",
                  display:"flex",alignItems:"center",gap:5,cursor:"pointer",transition:"background .08s",color:"#9d9ea3",fontSize:11}}
                onMouseEnter={e=>e.currentTarget.style.background="#2c2d2f"}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <span style={{width:16,height:16,borderRadius:"50%",background:u.color,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:7,fontWeight:700,color:"#fff"}}>{u.initials}</span>
                {u.username}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
