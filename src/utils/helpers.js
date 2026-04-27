// ─── Date helpers ─────────────────────────────────────────
export const today = () => new Date().toISOString().split("T")[0];
export const now   = () => new Date().toISOString();

export const fmtDate = (d) => {
  if (!d) return "—";
  const date = new Date(d);
  const todayDate = new Date();
  if (date.toDateString() === todayDate.toDateString()) return "Today";
  const diff = Math.floor((todayDate - date) / 86400000);
  if (diff === 1) return "Yesterday";
  if (diff < 7) return `${diff}d ago`;
  return date.toLocaleDateString("en-US", { month:"short", day:"numeric" });
};

export const fmtDateTime = (d) => {
  if (!d) return "—";
  return new Date(d).toLocaleString("en-US", { month:"short", day:"numeric", hour:"2-digit", minute:"2-digit" });
};

export const daysSince = (d) => d ? Math.floor((Date.now() - new Date(d)) / 86400000) : 999;
export const minsSince = (ts) => ts ? Math.floor((Date.now() - ts) / 60000) : 999;
export const secsSince = (ts) => ts ? Math.floor((Date.now() - ts) / 1000) : 999;

// ─── ELD connection status ────────────────────────────────
// Based on actual ELD API data (not manual history)
export const getELDStatus = (driver) => {
  const { eldStatus, eldLastSeen } = driver;
  if (!eldStatus || eldStatus === "unknown") return "unknown";
  if (eldStatus === "connected") return "connected";
  if (eldStatus === "disconnected") return "disconnected";
  // Fallback: check last seen time
  if (eldLastSeen) {
    const secs = secsSince(new Date(eldLastSeen).getTime());
    if (secs < 300)  return "connected";     // < 5 min
    if (secs < 1800) return "poor";          // 5–30 min
    return "disconnected";
  }
  return "unknown";
};

export const ELD_STATUS_CFG = {
  connected:    { label:"Connected",    color:"#4ADE80", bg:"rgba(74,222,128,.12)",  border:"rgba(74,222,128,.25)",  dot:"#22C55E" },
  poor:         { label:"Poor signal",  color:"#FCD34D", bg:"rgba(252,211,77,.12)",  border:"rgba(252,211,77,.25)",  dot:"#EAB308" },
  disconnected: { label:"Disconnected", color:"#FCA5A5", bg:"rgba(252,165,165,.12)", border:"rgba(252,165,165,.25)", dot:"#EF4444" },
  unknown:      { label:"Unknown",      color:"#9D9EA3", bg:"rgba(157,158,163,.08)", border:"rgba(157,158,163,.15)", dot:"#6B7280" },
};

// ─── ID generator ──────────────────────────────────────────
export const genId = (prefix="id") => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2,6)}`;

// ─── Local storage helpers ─────────────────────────────────
export const lsGet = (key, fallback) => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
};
export const lsSet = (key, val) => {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
};
