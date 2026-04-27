import { useState, useRef, useEffect } from "react";
import { minsSince } from "../utils/helpers";
import { Spinner } from "./ui/Atoms";

export function TokenBar({ settings, onUpdate, onSync, syncing }) {
  const factorMins = minsSince(settings.factorSetAt);
  const leaderMins = minsSince(settings.leaderSetAt);
  const [editMode, setEditMode] = useState(null);
  const [tempToken, setTempToken] = useState("");
  const inputRef = useRef(null);

  useEffect(()=>{ if(editMode&&inputRef.current) inputRef.current.focus(); },[editMode]);

  const saveToken = (provider) => {
    if (!tempToken.trim()) return;
    const key   = provider==="factor"?"factorToken":"leaderToken";
    const tsKey = provider==="factor"?"factorSetAt":"leaderSetAt";
    onUpdate({...settings,[key]:tempToken.trim(),[tsKey]:Date.now()});
    setEditMode(null); setTempToken("");
  };

  const getStatus = (token, mins) => {
    if (!token) return "none";
    if (mins > 60) return "expired";
    if (mins > 45) return "warning";
    return "ok";
  };

  const ageLabel = (mins) => {
    if (mins===999) return "Not set";
    if (mins<1) return "Just now";
    if (mins<60) return `${mins}m ago`;
    return `${Math.floor(mins/60)}h ${mins%60}m`;
  };

  const DOT = { none:"#3d3e40", ok:"#22C55E", warning:"#EAB308", expired:"#EF4444" };

  const TokenChip = ({ provider, label }) => {
    const token = settings[`${provider}Token`];
    const mins  = provider==="factor" ? factorMins : leaderMins;
    const st    = getStatus(token, mins);
    const isEditing = editMode===provider;

    return (
      <div style={{display:"flex",alignItems:"center",gap:6,
        padding:"3px 8px",borderRadius:6,
        background:st==="expired"?"rgba(239,68,68,.06)":st==="warning"?"rgba(234,179,8,.06)":"rgba(255,255,255,.03)",
        border:`1px solid ${st==="expired"?"rgba(239,68,68,.2)":st==="warning"?"rgba(234,179,8,.2)":"#2c2d2f"}`}}>

        <span style={{width:6,height:6,borderRadius:"50%",background:DOT[st],flexShrink:0,
          animation:st==="expired"?"pulse 1.4s infinite":"none"}}/>
        <span style={{fontSize:10,color:"#9d9ea3",fontWeight:700}}>{label}</span>

        {token && !isEditing && (
          <>
            <span style={{fontSize:10,color:"#3d3e40",fontFamily:"monospace"}}>···{token.slice(-5)}</span>
            <span style={{fontSize:10,color:st==="expired"?"#fca5a5":st==="warning"?"#fcd34d":"#5a5c61"}}>{ageLabel(mins)}</span>
          </>
        )}
        {!token && <span style={{fontSize:10,color:"#3d3e40"}}>No token</span>}

        {isEditing ? (
          <div style={{display:"flex",gap:4,alignItems:"center"}}>
            <input ref={inputRef} value={tempToken} onChange={e=>setTempToken(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter")saveToken(provider);if(e.key==="Escape"){setEditMode(null);setTempToken("");}}}
              placeholder="Paste token..."
              style={{background:"#09090B",border:"1px solid #4573d2",borderRadius:4,
                padding:"2px 7px",color:"#a78bfa",fontSize:10,fontFamily:"monospace",width:200}}/>
            <button onClick={()=>saveToken(provider)}
              style={{background:"#4573d2",border:"none",borderRadius:4,padding:"2px 9px",color:"#fff",fontSize:10,fontWeight:700}}>Save</button>
            <button onClick={()=>{setEditMode(null);setTempToken("");}}
              style={{background:"none",border:"none",color:"#5a5c61",fontSize:12,padding:"1px 3px"}}>✕</button>
          </div>
        ) : (
          <button onClick={()=>{setEditMode(provider);setTempToken("");}}
            style={{background:st==="expired"?"rgba(239,68,68,.15)":st==="warning"?"rgba(234,179,8,.12)":"rgba(255,255,255,.05)",
              border:"none",borderRadius:4,padding:"1px 7px",
              color:st==="expired"?"#fca5a5":st==="warning"?"#fcd34d":"#9d9ea3",
              fontSize:9,fontWeight:700,cursor:"pointer"}}>
            {st==="expired"||st==="warning" ? "⟳ Refresh" : token ? "Edit" : "Set"}
          </button>
        )}
      </div>
    );
  };

  return (
    <div style={{background:"#141516",borderBottom:"1px solid #2c2d2f",
      padding:"4px 16px",display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",minHeight:34}}>
      <span style={{fontSize:9,color:"#3d3e40",fontWeight:700,textTransform:"uppercase",letterSpacing:1,flexShrink:0}}>ELD</span>
      <TokenChip provider="factor" label="⚡ Factor"/>
      <TokenChip provider="leader" label="🔷 Leader"/>
      <button onClick={onSync} disabled={syncing}
        style={{marginLeft:"auto",background:"rgba(69,115,210,.12)",border:"1px solid rgba(69,115,210,.25)",
          color:"#6da3f8",borderRadius:6,padding:"3px 10px",fontSize:10,fontWeight:700,
          display:"flex",alignItems:"center",gap:4,flexShrink:0}}>
        {syncing?<><Spinner size={10}/>Syncing...</>:<>↻ Sync Now</>}
      </button>
    </div>
  );
}
