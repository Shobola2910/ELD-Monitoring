import { useState } from "react";
import { Avatar } from "./ui/Atoms";

function NavItem({ icon, label, active, onClick, count, color }) {
  return (
    <div className={`sidebar-item ${active?"active":""}`}
      onClick={onClick}
      style={{display:"flex",alignItems:"center",gap:8,padding:"5px 10px",cursor:"pointer",marginBottom:1}}>
      <span style={{fontSize:14,flexShrink:0}}>{icon}</span>
      <span style={{fontSize:13,color:active?"#f1f0ee":"#9d9ea3",flex:1,fontWeight:active?500:400}}>{label}</span>
      {count!=null && <span style={{fontSize:11,color:"#5a5c61",background:"rgba(255,255,255,.06)",padding:"1px 6px",borderRadius:99}}>{count}</span>}
      {color && <span style={{width:8,height:8,borderRadius:"50%",background:color,flexShrink:0}}/>}
    </div>
  );
}

function SectionLabel({ label, onAdd }) {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 10px 4px",marginTop:4}}>
      <span style={{fontSize:11,color:"#5a5c61",fontWeight:700,textTransform:"uppercase",letterSpacing:.8}}>{label}</span>
      {onAdd && <button onClick={onAdd} className="btn-ghost" style={{fontSize:14,padding:"1px 4px"}}>+</button>}
    </div>
  );
}

export function Sidebar({
  companies, activeCompany, onSelectCompany,
  user, onLogout, onAddCompany, onSettings,
  syncing, lastSync,
}) {
  const [collapsed, setCollapsed] = useState(false);

  const starred   = companies.filter(c=>c.starred);
  const notStarred = companies.filter(c=>!c.starred);

  if (collapsed) return (
    <div style={{width:44,minWidth:44,background:"#1b1c1e",borderRight:"1px solid #2c2d2f",
      display:"flex",flexDirection:"column",alignItems:"center",padding:"10px 0",gap:10}}>
      <button onClick={()=>setCollapsed(false)} className="btn-ghost" style={{fontSize:14}}>▶</button>
      <div style={{width:24,height:24,borderRadius:6,background:"#4573d2",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:"#fff"}}>A</div>
    </div>
  );

  return (
    <div style={{width:220,minWidth:220,background:"#1b1c1e",borderRight:"1px solid #2c2d2f",
      display:"flex",flexDirection:"column",height:"100%",overflow:"hidden"}}>

      {/* Header */}
      <div style={{padding:"10px 12px 6px",display:"flex",alignItems:"center",gap:8,borderBottom:"1px solid #2c2d2f"}}>
        <div style={{width:26,height:26,borderRadius:7,background:"#4573d2",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:"#fff",letterSpacing:.5}}>A</div>
        <span style={{fontSize:13,fontWeight:700,color:"#f1f0ee",flex:1}}>ALGO Workspace</span>
        <button onClick={()=>setCollapsed(true)} className="btn-ghost" style={{fontSize:12}}>◀</button>
      </div>

      {/* Nav */}
      <div style={{flex:1,overflowY:"auto",padding:"6px 8px"}}>

        {/* Home / My tasks */}
        <NavItem icon="🏠" label="Home" active={activeCompany==="all"} onClick={()=>onSelectCompany("all")}/>
        <NavItem icon="☑️" label="My tasks" onClick={()=>onSelectCompany("all")}/>

        {/* Insights */}
        <SectionLabel label="Insights"/>
        <NavItem icon="📊" label="Reporting" onClick={()=>{}}/>
        <NavItem icon="📁" label="Portfolios" onClick={()=>{}}/>
        <NavItem icon="🎯" label="Goals" onClick={()=>{}}/>

        {/* Starred */}
        {starred.length > 0 && (
          <>
            <SectionLabel label="Starred"/>
            {starred.map(c=>(
              <NavItem key={c.id} icon="⭐" label={c.name} color={c.color}
                active={activeCompany===c.id} onClick={()=>onSelectCompany(c.id)}
                count={c.drivers?.length}/>
            ))}
          </>
        )}

        {/* Projects */}
        <SectionLabel label="Projects" onAdd={onAddCompany}/>
        {notStarred.map(c=>(
          <NavItem key={c.id} label={c.name} color={c.color}
            icon={c.eldProvider==="factor"?"⚡":"🔷"}
            active={activeCompany===c.id} onClick={()=>onSelectCompany(c.id)}
            count={c.drivers?.length}/>
        ))}
        {companies.length === 0 && (
          <div style={{padding:"8px 10px",fontSize:12,color:"#5a5c61"}}>No companies yet</div>
        )}

      </div>

      {/* ELD Sync status */}
      <div style={{padding:"8px 12px",borderTop:"1px solid #2c2d2f",fontSize:11,color:"#5a5c61"}}>
        <div style={{display:"flex",alignItems:"center",gap:5}}>
          <span style={{animation:syncing?"spin .7s linear infinite":"none",display:"inline-block"}}>🔄</span>
          <span>{syncing?"Syncing...":lastSync?`Synced ${lastSync.toLocaleTimeString()}`:"Not synced"}</span>
        </div>
      </div>

      {/* User */}
      <div style={{padding:"10px 12px",borderTop:"1px solid #2c2d2f",display:"flex",alignItems:"center",gap:8}}>
        <Avatar user={user} size={26}/>
        <div style={{flex:1,overflow:"hidden"}}>
          <div style={{fontSize:12,fontWeight:600,color:"#d9d8d5",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{user?.name}</div>
          <div style={{fontSize:10,color:"#5a5c61",textTransform:"capitalize"}}>{user?.role}</div>
        </div>
        <button onClick={onSettings} className="btn-ghost" style={{fontSize:13,padding:"2px 5px"}} title="Settings">⚙</button>
        <button onClick={onLogout} className="btn-ghost" style={{fontSize:13,padding:"2px 5px",color:"#5a5c61"}} title="Logout">⏻</button>
      </div>
    </div>
  );
}
