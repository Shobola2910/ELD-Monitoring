import { useState } from "react";

export function SettingsModal({ settings, onSave, onClose }) {
  const [f, setF] = useState({...settings});
  const set = (k,v) => setF(p=>({...p,[k]:v}));

  const TokenField = ({ provider, label }) => {
    const tokenKey = `${provider}Token`;
    const urlKey   = `${provider}Url`;
    const tsKey    = `${provider}SetAt`;
    return (
      <div style={{background:"#1e1f21",border:"1px solid #3d3e40",borderRadius:10,padding:14,marginBottom:10}}>
        <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:10}}>
          <span style={{width:7,height:7,borderRadius:"50%",background:f[tokenKey]?"#22C55E":"#3d3e40",flexShrink:0}}/>
          <span style={{fontWeight:700,fontSize:13,color:"#f1f0ee"}}>{label}</span>
          {f[tokenKey] && <span style={{fontSize:10,background:"rgba(74,222,128,.1)",color:"#4ade80",padding:"1px 7px",borderRadius:99,border:"1px solid rgba(74,222,128,.2)"}}>Configured</span>}
        </div>
        <div style={{marginBottom:8}}>
          <label style={{display:"block",fontSize:10,color:"#9d9ea3",fontWeight:600,textTransform:"uppercase",letterSpacing:.7,marginBottom:4}}>Bearer Token</label>
          <input type="text" value={f[tokenKey]||""} onChange={e=>set(tokenKey,e.target.value)}
            placeholder="Paste Bearer token..."
            style={{width:"100%",background:"#2c2d2f",border:"1px solid #3d3e40",borderRadius:7,
              padding:"7px 10px",color:"#a78bfa",fontSize:11,fontFamily:"monospace"}}/>
        </div>
        <div>
          <label style={{display:"block",fontSize:10,color:"#9d9ea3",fontWeight:600,textTransform:"uppercase",letterSpacing:.7,marginBottom:4}}>API Base URL</label>
          <input value={f[urlKey]} onChange={e=>set(urlKey,e.target.value)}
            style={{width:"100%",background:"#2c2d2f",border:"1px solid #3d3e40",borderRadius:7,
              padding:"7px 10px",color:"#f1f0ee",fontSize:11}}/>
        </div>
      </div>
    );
  };

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.65)",zIndex:2000,
      display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={onClose}>
      <div className="fade-up" style={{background:"#2c2d2f",border:"1px solid #3d3e40",borderRadius:14,
        width:"100%",maxWidth:480,maxHeight:"88vh",overflowY:"auto",
        boxShadow:"0 32px 80px rgba(0,0,0,.6)"}} onClick={e=>e.stopPropagation()}>

        <div style={{padding:"16px 20px",borderBottom:"1px solid #3d3e40",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:15,fontWeight:700,color:"#f1f0ee"}}>⚙️ ELD Settings</div>
          <button onClick={onClose} className="btn-ghost" style={{fontSize:16}}>✕</button>
        </div>

        <div style={{padding:16}}>
          <div style={{fontSize:11,color:"#5a5c61",fontWeight:700,textTransform:"uppercase",letterSpacing:.8,marginBottom:8}}>ELD Connections</div>
          <TokenField provider="factor" label="⚡ Factor ELD"/>
          <TokenField provider="leader" label="🔷 Leader ELD"/>

          <div style={{marginTop:14}}>
            <label style={{display:"block",fontSize:11,color:"#9d9ea3",fontWeight:700,textTransform:"uppercase",letterSpacing:.8,marginBottom:8}}>Auto-sync interval</label>
            <div style={{display:"flex",gap:6}}>
              {[5,15,30,60].map(m=>(
                <button key={m} onClick={()=>set("syncIntervalMinutes",m)}
                  style={{flex:1,padding:"7px 0",borderRadius:7,border:`1px solid ${f.syncIntervalMinutes===m?"#4573d2":"#3d3e40"}`,
                    background:f.syncIntervalMinutes===m?"rgba(69,115,210,.15)":"transparent",
                    color:f.syncIntervalMinutes===m?"#6da3f8":"#9d9ea3",fontSize:12,fontWeight:600}}>
                  {m===60?"1h":`${m}m`}
                </button>
              ))}
            </div>
          </div>

          <div style={{marginTop:14,background:"#1e1f21",border:"1px solid #3d3e40",borderRadius:8,padding:11}}>
            <div style={{fontSize:11,color:"#9d9ea3",lineHeight:1.6}}>
              <b style={{color:"#60A5FA"}}>Factor ELD:</b> app.factorhq.com → Settings → API → Tokens<br/>
              <b style={{color:"#a78bfa"}}>Leader ELD:</b> app.leadereld.com → Account → API Key
            </div>
          </div>
        </div>

        <div style={{padding:"12px 16px",borderTop:"1px solid #3d3e40",display:"flex",gap:8,justifyContent:"flex-end"}}>
          <button onClick={onClose} style={{padding:"8px 18px",borderRadius:8,border:"1px solid #3d3e40",background:"transparent",color:"#9d9ea3",fontSize:13}}>Cancel</button>
          <button onClick={()=>onSave(f)} style={{padding:"8px 20px",borderRadius:8,border:"none",background:"#4573d2",color:"#fff",fontSize:13,fontWeight:700}}>Save & Connect</button>
        </div>
      </div>
    </div>
  );
}
