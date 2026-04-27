import { ELD_STATUS_CFG, getELDStatus } from "../../utils/helpers";

// ─── Avatar ──────────────────────────────────────────────
export function Avatar({ user, size = 28 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: user?.color || "#3d3e40",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.36, fontWeight: 700, color: "#fff",
      flexShrink: 0, letterSpacing: 0.3,
    }}>
      {user?.initials || user?.name?.[0] || "?"}
    </div>
  );
}

// ─── Spinner ──────────────────────────────────────────────
export function Spinner({ size = 14 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      border: `2px solid rgba(255,255,255,.1)`,
      borderTopColor: "#4573d2",
      animation: "spin .7s linear infinite", flexShrink: 0,
    }} />
  );
}

// ─── Yes/No Badge ─────────────────────────────────────────
export function YesNoBadge({ v }) {
  if (v === true)  return <span style={{background:"rgba(74,222,128,.12)",color:"#4ade80",padding:"2px 9px",borderRadius:99,fontSize:11,fontWeight:600,border:"1px solid rgba(74,222,128,.2)"}}>YES</span>;
  if (v === false) return <span style={{background:"rgba(252,165,165,.12)",color:"#fca5a5",padding:"2px 9px",borderRadius:99,fontSize:11,fontWeight:600,border:"1px solid rgba(252,165,165,.2)"}}>NO</span>;
  return <span style={{color:"#3d3e40",fontSize:12}}>—</span>;
}

// ─── ELD Connection Status Pill ───────────────────────────
export function ELDStatusPill({ driver, small = false }) {
  const status = getELDStatus(driver);
  const cfg = ELD_STATUS_CFG[status] || ELD_STATUS_CFG.unknown;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: cfg.bg, border: `1px solid ${cfg.border}`,
      color: cfg.color, padding: small ? "2px 8px" : "3px 10px",
      borderRadius: 99, fontSize: small ? 10 : 11, fontWeight: 600, whiteSpace: "nowrap",
    }}>
      <span style={{
        width: 5, height: 5, borderRadius: "50%", background: cfg.dot,
        boxShadow: status === "connected" ? `0 0 6px ${cfg.dot}` : "none",
        animation: status === "connected" ? "none" : status === "disconnected" ? "pulse 2s infinite" : "none",
        flexShrink: 0,
      }} />
      {cfg.label}
    </span>
  );
}

// ─── Responsible Pill ─────────────────────────────────────
export function ResponsiblePill({ name, color, size = "sm" }) {
  if (!name) return <span style={{color:"#5a5c61",fontSize:12}}>—</span>;
  const pad = size === "sm" ? "2px 9px" : "3px 12px";
  const fs  = size === "sm" ? 11 : 12;
  return (
    <span style={{
      display: "inline-block",
      background: color ? `${color}22` : "rgba(255,255,255,.06)",
      color: color || "#d9d8d5",
      padding: pad, borderRadius: 99, fontSize: fs, fontWeight: 600,
      border: `1px solid ${color ? `${color}44` : "rgba(255,255,255,.1)"}`,
      whiteSpace: "nowrap",
    }}>
      {name}
    </span>
  );
}

// ─── Toast Container ──────────────────────────────────────
export function ToastContainer({ items, onDismiss }) {
  return (
    <div style={{position:"fixed",bottom:20,right:20,zIndex:9999,display:"flex",flexDirection:"column",gap:8,maxWidth:320}}>
      {items.map(t => (
        <div key={t.id} className="slide-right" style={{
          background: "#2c2d2f",
          border: `1px solid ${t.type==="error"?"rgba(239,68,68,.35)":t.type==="warn"?"rgba(234,179,8,.35)":t.type==="success"?"rgba(74,222,128,.3)":"rgba(255,255,255,.1)"}`,
          borderRadius: 10, padding: "11px 14px",
          display: "flex", alignItems: "flex-start", gap: 9,
          boxShadow: "0 8px 24px rgba(0,0,0,.5)",
        }}>
          <span style={{fontSize:15,flexShrink:0}}>
            {t.type==="error"?"🔴":t.type==="warn"?"⚠️":t.type==="success"?"✅":"ℹ️"}
          </span>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:600,color:"#f1f0ee"}}>{t.title}</div>
            {t.msg && <div style={{fontSize:12,color:"#9d9ea3",marginTop:2}}>{t.msg}</div>}
          </div>
          <button onClick={()=>onDismiss(t.id)} style={{background:"none",border:"none",color:"#5a5c61",fontSize:14,padding:2,flexShrink:0}}>✕</button>
        </div>
      ))}
    </div>
  );
}

// ─── Modal Backdrop ───────────────────────────────────────
export function ModalBackdrop({ children, onClose, maxWidth = 520 }) {
  return (
    <div style={{
      position:"fixed",inset:0,background:"rgba(0,0,0,.65)",
      zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16,
    }} onClick={onClose}>
      <div className="fade-up" style={{
        background:"#2c2d2f",border:"1px solid #3d3e40",borderRadius:14,
        width:"100%",maxWidth,maxHeight:"90vh",overflowY:"auto",
        boxShadow:"0 32px 80px rgba(0,0,0,.6)",
      }} onClick={e=>e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
