import { useState, useEffect, useCallback, useMemo } from "react";
import { GLOBAL_CSS } from "./styles/global";
import { INITIAL_DATA, DEFAULT_SETTINGS, DEFAULT_RESPONSIBLE, USERS } from "./data";
import { lsGet, lsSet, genId, getELDStatus, today } from "./utils/helpers";
import { requestNotifPermission } from "./utils/eld";
import { useELDSync } from "./hooks/useELDSync";
import { useToasts } from "./hooks/useToasts";

import { Login }           from "./components/Login";
import { Sidebar }         from "./components/Sidebar";
import { TokenBar }        from "./components/TokenBar";
import { CompanySection }  from "./components/CompanySection";
import { ToastContainer }  from "./components/ui/Atoms";

import { CompanyModal }    from "./components/modals/CompanyModal";
import { SyncLog }         from "./components/modals/SyncLog";
import { TokenExpiryModal }from "./components/modals/TokenExpiry";
import { SettingsModal }   from "./components/modals/SettingsModal";
import { ManageResponsibleModal } from "./components/ResponsiblePicker";

export default function App() {
  // ── Persistent state ────────────────────────────────────
  const [user,          setUser]         = useState(()=>lsGet("eld_user",null));
  const [data,          setData]         = useState(()=>lsGet("eld_data_v3",INITIAL_DATA));
  const [settings,      setSettings]     = useState(()=>lsGet("eld_settings_v3",DEFAULT_SETTINGS));
  const [responsibles,  setResponsibles] = useState(()=>lsGet("eld_responsibles",DEFAULT_RESPONSIBLE));

  // ── UI state ────────────────────────────────────────────
  const [activeCompany, setActiveCompany] = useState("all");
  const [filterResp,    setFilterResp]    = useState("all");
  const [filterStatus,  setFilterStatus]  = useState("all");
  const [search,        setSearch]        = useState("");
  const [view,          setView]          = useState("table"); // table | analytics

  // ── Modal state ─────────────────────────────────────────
  const [companyModal,       setCompanyModal]       = useState(null); // null | company obj (null name = new)
  const [showSettings,       setShowSettings]       = useState(false);
  const [showResponsibleMgr, setShowResponsibleMgr] = useState(false);
  const [tokenExpiry,        setTokenExpiry]        = useState(null); // "factor"|"leader"

  // ── Toasts ───────────────────────────────────────────────
  const { toasts, toast, dismiss } = useToasts();

  // ── Persist ──────────────────────────────────────────────
  useEffect(()=>lsSet("eld_user",user),[user]);
  useEffect(()=>lsSet("eld_data_v3",data),[data]);
  useEffect(()=>lsSet("eld_settings_v3",settings),[settings]);
  useEffect(()=>lsSet("eld_responsibles",responsibles),[responsibles]);

  // ── Request browser notification permission on load ──────
  useEffect(()=>{ if(user) requestNotifPermission(); },[user]);

  // ── ELD sync hook ─────────────────────────────────────────
  const { syncing, lastSync, syncLog, setSyncLog, runSync, snoozeExpiry } = useELDSync({
    settings, data, setData,
    onSyncDone: ({ total, logs }) => {
      const ok = logs.filter(l=>l.ok).length;
      if (ok > 0) toast("ELD Sync Complete", `${total} vehicle${total!==1?"s":""} updated`, "success");
      else        toast("ELD Sync Failed", "Check your tokens and connection", "error");
    },
    onTokenExpired: (provider) => {
      setTokenExpiry(provider);
    },
  });

  // ── Auto-sync when token is set ───────────────────────────
  const handleSettingsSave = useCallback((newSettings) => {
    const fChanged = newSettings.factorToken !== settings.factorToken && newSettings.factorToken?.trim();
    const lChanged = newSettings.leaderToken !== settings.leaderToken && newSettings.leaderToken?.trim();
    setSettings(newSettings);
    setShowSettings(false);
    if (fChanged || lChanged) {
      toast("Token saved", "Auto-syncing ELD data…");
      setTimeout(() => runSync(newSettings), 400);
    } else {
      toast("Settings saved", "", "success");
    }
  }, [settings, runSync, toast]);

  // ── Token bar quick-save also auto-syncs ─────────────────
  const handleTokenBarUpdate = useCallback((newSettings) => {
    const fChanged = newSettings.factorToken !== settings.factorToken && newSettings.factorToken?.trim();
    const lChanged = newSettings.leaderToken !== settings.leaderToken && newSettings.leaderToken?.trim();
    setSettings(newSettings);
    if (fChanged || lChanged) {
      toast("Token saved", "Connecting to ELD…");
      setTimeout(() => runSync(newSettings), 300);
    }
  }, [settings, runSync, toast]);

  // ── Company CRUD ─────────────────────────────────────────
  const saveCompany = useCallback((company) => {
    setData(d => {
      const exists = d.companies.find(c=>c.id===company.id);
      return {
        ...d,
        companies: exists
          ? d.companies.map(c=>c.id===company.id?{...c,...company}:c)
          : [...d.companies, { ...company, drivers:[] }],
      };
    });
    setCompanyModal(null);
    toast(company.name, "Company saved", "success");
  }, [toast]);

  const deleteCompany = useCallback((id) => {
    if (!window.confirm("Delete this company and all its drivers?")) return;
    setData(d=>({...d,companies:d.companies.filter(c=>c.id!==id)}));
    if (activeCompany===id) setActiveCompany("all");
    toast("Deleted","Company removed");
  }, [activeCompany, toast]);

  const updateCompany = useCallback((company) => {
    setData(d=>({...d,companies:d.companies.map(c=>c.id===company.id?company:c)}));
  }, []);

  // ── Driver CRUD ──────────────────────────────────────────
  const updateDriver = useCallback((companyId, driver) => {
    setData(d=>({
      ...d,
      companies: d.companies.map(c=>c.id!==companyId?c:{
        ...c,
        drivers: c.drivers.find(x=>x.id===driver.id)
          ? c.drivers.map(x=>x.id===driver.id?driver:x)
          : [...c.drivers, driver],
      }),
    }));
  }, []);

  const deleteDriver = useCallback((companyId, driverId) => {
    setData(d=>({
      ...d,
      companies: d.companies.map(c=>c.id!==companyId?c:{
        ...c, drivers:c.drivers.filter(x=>x.id!==driverId),
      }),
    }));
  }, []);

  // ── Derived stats ────────────────────────────────────────
  const allDrivers = useMemo(()=>
    data.companies.flatMap(c=>c.drivers.map(d=>({...d,companyId:c.id,companyName:c.name,eldStatus:getELDStatus(d)}))),
    [data]);

  const stats = useMemo(()=>({
    total:       allDrivers.length,
    connected:   allDrivers.filter(d=>d.eldStatus==="connected").length,
    disconnected:allDrivers.filter(d=>d.eldStatus==="disconnected").length,
    poor:        allDrivers.filter(d=>d.eldStatus==="poor").length,
    unknown:     allDrivers.filter(d=>d.eldStatus==="unknown").length,
  }),[allDrivers]);

  const filters = { resp:filterResp, status:filterStatus, search };

  const companyGroups = activeCompany==="all"
    ? data.companies
    : data.companies.filter(c=>c.id===activeCompany);

  // ── Login gate ───────────────────────────────────────────
  if (!user) return (
    <>
      <style>{GLOBAL_CSS}</style>
      <Login onLogin={u=>setUser(u)}/>
    </>
  );

  // ── MAIN UI ──────────────────────────────────────────────
  return (
    <>
      <style>{GLOBAL_CSS}</style>

      <div style={{display:"flex",height:"100vh",overflow:"hidden",background:"#1e1f21"}}>
        {/* SIDEBAR */}
        <Sidebar
          companies={data.companies}
          activeCompany={activeCompany}
          onSelectCompany={setActiveCompany}
          user={user}
          onLogout={()=>setUser(null)}
          onAddCompany={()=>setCompanyModal({id:genId("c"),name:"",color:"#3B82F6",eldProvider:"leader",starred:false,collapsed:false,drivers:[]})}
          onSettings={()=>setShowSettings(true)}
          syncing={syncing}
          lastSync={lastSync}
        />

        {/* MAIN */}
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          {/* TOKEN BAR */}
          <TokenBar
            settings={settings}
            onUpdate={handleTokenBarUpdate}
            onSync={()=>runSync()}
            syncing={syncing}
          />

          {/* TOOLBAR */}
          <div style={{padding:"8px 16px",background:"#1e1f21",borderBottom:"1px solid #2c2d2f",
            display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>

            {/* Add task button (Asana style) */}
            <button onClick={()=>setCompanyModal({id:genId("c"),name:"",color:"#3B82F6",eldProvider:"leader",starred:false,collapsed:false,drivers:[]})}
              style={{background:"#4573d2",border:"none",borderRadius:7,padding:"6px 14px",
                color:"#fff",fontSize:13,fontWeight:600,display:"flex",alignItems:"center",gap:5}}>
              + Add task
            </button>

            <div style={{width:1,height:20,background:"#3d3e40"}}/>

            {/* Search */}
            <div style={{position:"relative"}}>
              <span style={{position:"absolute",left:9,top:"50%",transform:"translateY(-50%)",color:"#5a5c61",fontSize:13}}>⌕</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search…"
                style={{background:"rgba(255,255,255,.05)",border:"1px solid #2c2d2f",borderRadius:7,
                  padding:"6px 10px 6px 28px",color:"#f1f0ee",fontSize:13,width:180}}/>
            </div>

            {/* Filter by responsible */}
            <select value={filterResp} onChange={e=>setFilterResp(e.target.value)}
              style={{background:"rgba(255,255,255,.05)",border:"1px solid #2c2d2f",borderRadius:7,
                padding:"6px 9px",color:"#9d9ea3",fontSize:12}}>
              <option value="all">All responsible</option>
              {responsibles.map(r=><option key={r.id}>{r.name}</option>)}
            </select>

            {/* Filter by connection */}
            <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}
              style={{background:"rgba(255,255,255,.05)",border:"1px solid #2c2d2f",borderRadius:7,
                padding:"6px 9px",color:"#9d9ea3",fontSize:12}}>
              <option value="all">All connections</option>
              <option value="connected">🟢 Connected</option>
              <option value="poor">🟡 Poor</option>
              <option value="disconnected">🔴 Disconnected</option>
              <option value="unknown">● Unknown</option>
            </select>

            {/* Manage responsible */}
            <button onClick={()=>setShowResponsibleMgr(true)} className="btn-ghost" style={{fontSize:12}}>
              👥 Manage
            </button>

            {/* Stats */}
            <div style={{marginLeft:"auto",display:"flex",gap:6,alignItems:"center"}}>
              {[
                {l:"All",     v:stats.total,        f:"all",          c:"#9d9ea3"},
                {l:"🟢",     v:stats.connected,    f:"connected",    c:"#4ade80"},
                {l:"🟡",     v:stats.poor,         f:"poor",         c:"#fcd34d"},
                {l:"🔴",     v:stats.disconnected, f:"disconnected", c:"#fca5a5"},
                {l:"●",      v:stats.unknown,      f:"unknown",      c:"#5a5c61"},
              ].map(s=>(
                <button key={s.l} onClick={()=>setFilterStatus(s.f)}
                  style={{background:filterStatus===s.f?"rgba(255,255,255,.08)":"transparent",
                    border:`1px solid ${filterStatus===s.f?"#3d3e40":"transparent"}`,
                    borderRadius:7,padding:"4px 9px",cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>
                  <span style={{fontSize:11,color:s.c,fontWeight:600}}>{s.l}</span>
                  <span style={{fontSize:11,color:"#9d9ea3"}}>{s.v}</span>
                </button>
              ))}

              {/* View toggle */}
              <div style={{display:"flex",background:"rgba(255,255,255,.05)",border:"1px solid #2c2d2f",borderRadius:7,overflow:"hidden",marginLeft:4}}>
                {[["table","≡"],["analytics","⊞"]].map(([v,icon])=>(
                  <button key={v} onClick={()=>setView(v)}
                    style={{padding:"5px 11px",background:view===v?"rgba(255,255,255,.1)":"transparent",border:"none",
                      color:view===v?"#f1f0ee":"#5a5c61",fontSize:14}}>
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div style={{flex:1,overflowY:"auto",background:"#1e1f21"}}>
            {view==="table" ? (
              companyGroups.length===0 ? (
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:60,color:"#5a5c61"}}>
                  <div style={{fontSize:36,marginBottom:12}}>📁</div>
                  <div style={{fontSize:16,fontWeight:600,color:"#9d9ea3",marginBottom:6}}>No companies yet</div>
                  <button onClick={()=>setCompanyModal({id:genId("c"),name:"",color:"#3B82F6",eldProvider:"leader",starred:false,collapsed:false,drivers:[]})}
                    style={{background:"#4573d2",border:"none",borderRadius:8,padding:"8px 18px",color:"#fff",fontSize:13,fontWeight:600}}>
                    + Create first company
                  </button>
                </div>
              ) : (
                companyGroups.map(company=>(
                  <CompanySection
                    key={company.id}
                    company={company}
                    responsibles={responsibles}
                    filters={filters}
                    onUpdateCompany={updateCompany}
                    onDeleteCompany={deleteCompany}
                    onUpdateDriver={updateDriver}
                    onDeleteDriver={deleteDriver}
                    onEditCompany={c=>setCompanyModal(c)}
                    onOpenDriverDetail={d=>{ /* could open a detail panel */ }}
                  />
                ))
              )
            ) : (
              /* ANALYTICS VIEW */
              <div style={{padding:20}}>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16}}>
                  {data.companies.map(c=>{
                    const drivers = c.drivers;
                    const conn = drivers.filter(d=>getELDStatus(d)==="connected").length;
                    const disc = drivers.filter(d=>getELDStatus(d)==="disconnected").length;
                    const unkn = drivers.filter(d=>getELDStatus(d)==="unknown").length;
                    const t = drivers.length||1;
                    return (
                      <div key={c.id} className="fade-up" style={{background:"#2c2d2f",border:"1px solid #3d3e40",borderRadius:13,padding:18,cursor:"pointer"}}
                        onClick={()=>{setActiveCompany(c.id);setView("table");}}>
                        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
                          <div style={{width:4,height:20,borderRadius:99,background:c.color}}/>
                          <span style={{fontWeight:700,fontSize:12,color:c.color,textTransform:"uppercase",letterSpacing:.8,flex:1}}>{c.name}</span>
                          <span style={{fontSize:10,color:"#5a5c61"}}>{c.eldProvider==="factor"?"⚡":"🔷"}</span>
                        </div>
                        {[[conn,"Connected","#22C55E","#4ADE80"],[disc,"Disconnected","#EF4444","#FCA5A5"],[unkn,"Unknown","#374151","#9D9EA3"]].map(([n,lbl,bg,tc])=>(
                          <div key={lbl} style={{marginBottom:8}}>
                            <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                              <span style={{fontSize:11,color:tc}}>{lbl}</span>
                              <span style={{fontSize:11,color:tc}}>{n}/{t}</span>
                            </div>
                            <div style={{background:"#1e1f21",borderRadius:99,height:4}}>
                              <div style={{background:bg,height:4,borderRadius:99,width:`${(n/t)*100}%`,transition:"width .5s"}}/>
                            </div>
                          </div>
                        ))}
                        {disc > 0 && (
                          <div style={{background:"rgba(239,68,68,.06)",border:"1px solid rgba(239,68,68,.15)",borderRadius:7,padding:9,marginTop:10}}>
                            <div style={{fontSize:10,color:"#fca5a5",fontWeight:700,marginBottom:4}}>⚠ Disconnected</div>
                            {drivers.filter(d=>getELDStatus(d)==="disconnected").map(d=>(
                              <div key={d.id} style={{fontSize:11,color:"#ef4444",padding:"1px 0"}}>→ {d.name} {d.truck&&<span style={{color:"#5a5c61"}}>({d.truck})</span>}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── MODALS ─────────────────────────────────────────── */}

      {companyModal && (
        <CompanyModal company={companyModal} onSave={saveCompany} onClose={()=>setCompanyModal(null)}/>
      )}

      {showSettings && (
        <SettingsModal settings={settings} onSave={handleSettingsSave} onClose={()=>setShowSettings(false)}/>
      )}

      {showResponsibleMgr && (
        <ManageResponsibleModal
          responsibles={responsibles}
          onSave={list=>{ setResponsibles(list); setShowResponsibleMgr(false); toast("Saved","Responsible persons updated","success"); }}
          onClose={()=>setShowResponsibleMgr(false)}
        />
      )}

      {syncLog && (
        <SyncLog syncLog={syncLog} onClose={()=>setSyncLog(null)}/>
      )}

      {tokenExpiry && (
        <TokenExpiryModal
          provider={tokenExpiry}
          onSave={token=>{
            const key   = tokenExpiry==="factor"?"factorToken":"leaderToken";
            const tsKey = tokenExpiry==="factor"?"factorSetAt":"leaderSetAt";
            const ns = {...settings,[key]:token,[tsKey]:Date.now()};
            handleSettingsSave(ns);
            setTokenExpiry(null);
          }}
          onSnooze={()=>{ snoozeExpiry(tokenExpiry,15); setTokenExpiry(null); }}
        />
      )}

      <ToastContainer items={toasts} onDismiss={dismiss}/>
    </>
  );
}
