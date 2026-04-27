import { useState } from "react";

export function TokenExpiryModal({ provider, onSave, onSnooze }) {
  const [token, setToken] = useState("");
  const label = provider==="factor" ? "⚡ Factor ELD" : "🔷 Leader ELD";
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",zIndex:3000,
      display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div className="fade-up" style={{background:"#2c2d2f",border:"1px solid rgba(239,68,68,.3)",
        borderRadius:14,padding:24,maxWidth:420,width:"100%",boxShadow:"0 32px 80px rgba(0,0,0,.6)"}}>

        <div style={{display:"flex",gap:12,marginBottom:16,alignItems:"flex-start"}}>
          <div style={{width:38,height:38,borderRadius:10,background:"rgba(239,68,68,.1)",
            border:"1px solid rgba(239,68,68,.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>⏰</div>
          <div>
            <div style={{fontSize:15,fontWeight:700,color:"#f1f0ee",marginBottom:3}}>ELD Token Expired</div>
            <div style={{fontSize:12,color:"#9d9ea3"}}>{label} · Token is over 1 hour old</div>
          </div>
        </div>

        <p style={{fontSize:13,color:"#9d9ea3",lineHeight:1.6,marginBottom:14}}>
          Your ELD token may have expired. Paste the new token below to continue syncing connection data automatically.
        </p>

        <textarea value={token} onChange={e=>setToken(e.target.value)}
          placeholder="Paste new Bearer token here..."
          rows={3} style={{width:"100%",background:"#1e1f21",border:"1px solid #3d3e40",
            borderRadius:8,padding:"10px 12px",color:"#a78bfa",fontSize:12,
            fontFamily:"monospace",resize:"vertical",marginBottom:14}}/>

        <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
          <button onClick={onSnooze} style={{padding:"8px 16px",borderRadius:8,border:"1px solid #3d3e40",
            background:"transparent",color:"#9d9ea3",fontSize:13,fontWeight:500}}>Remind in 15 min</button>
          <button onClick={()=>token.trim()&&onSave(token.trim())}
            disabled={!token.trim()}
            style={{padding:"8px 20px",borderRadius:8,border:"none",background:"#4573d2",
              color:"#fff",fontSize:13,fontWeight:600,opacity:token.trim()?1:.5}}>Save Token</button>
        </div>
      </div>
    </div>
  );
}
