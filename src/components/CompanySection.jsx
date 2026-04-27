import { useState, useRef, useEffect } from "react";
import { DriverRow } from "./DriverRow";
import { ELD_STATUS_CFG, getELDStatus, genId, today } from "../utils/helpers";

const TABLE_HEADERS = [
  { label:"Name",          width:280 },
  { label:"Truck",         width:80  },
  { label:"Responsible",   width:110 },
  { label:"Note",          width:90  },
  { label:"Date",          width:100 },
  { label:"Paperlogbook",  width:90  },
  { label:"User's manual", width:90  },
  { label:"Tablet / Pho.", width:90  },
  { label:"Times of ELD", width:90  },
  { label:"Connection",    width:130 },
];

function CompanyMenu({ company, onEdit, onDelete, onToggleStar, onClose }) {
  const ref = useRef(null);
  useEffect(()=>{
    const h = e=>{ if(ref.current&&!ref.current.contains(e.target))onClose(); };
    document.addEventListener("mousedown",h);
    return ()=>document.removeEventListener("mousedown",h);
  },[]);
  return (
    <div ref={ref} className="dropdown-menu fade-up"
      style={{position:"absolute",top:"100%",left:0,zIndex:400,minWidth:180}}>
      <div className="dropdown-item" onClick={()=>{onEdit();onClose();}}>✏️ Edit company</div>
      <div className="dropdown-item" onClick={()=>{onToggleStar();onClose();}}>
        {company.starred?"☆ Remove from starred":"⭐ Add to starred"}
      </div>
      <div className="dropdown-item danger" onClick={()=>{onDelete();onClose();}}>🗑 Delete company</div>
    </div>
  );
}

export function CompanySection({
  company, responsibles, filters,
  onUpdateCompany, onDeleteCompany,
  onUpdateDriver, onDeleteDriver,
  onOpenDriverDetail, onEditCompany,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const allDrivers = company.drivers;
  const visibleDrivers = allDrivers.filter(d => {
    if (filters.resp !== "all" && d.responsible !== filters.resp) return false;
    if (filters.status !== "all" && getELDStatus(d) !== filters.status) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (!d.name.toLowerCase().includes(q) && !d.truck.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const connected    = allDrivers.filter(d=>getELDStatus(d)==="connected").length;
  const disconnected = allDrivers.filter(d=>getELDStatus(d)==="disconnected").length;
  const unknown      = allDrivers.filter(d=>getELDStatus(d)==="unknown").length;
  const pct = allDrivers.length ? Math.round((connected/allDrivers.length)*100) : 0;

  const addDriver = () => {
    const newDriver = {
      id: genId("d"), name:"New Driver", truck:"", responsible:"",
      note:"New", date:today(), paperLogbook:null, userManual:null,
      tabletMounted:null, eldTimes:"", eldStatus:"unknown", eldLastSeen:null,
      active:true, eldDriverId:"", updatedBy:"", updatedAt:new Date().toISOString(),
    };
    onUpdateCompany({ ...company, drivers:[...company.drivers, newDriver] });
  };

  return (
    <div style={{marginBottom:0}}>
      {/* Company Header */}
      <div style={{
        display:"flex",alignItems:"center",gap:8,
        padding:"8px 16px",background:"#1e1f21",
        position:"sticky",top:0,zIndex:10,
        borderBottom:"1px solid #2c2d2f",
        borderTop:"2px solid #2c2d2f",
      }}>
        {/* Collapse arrow */}
        <button onClick={()=>onUpdateCompany({...company,collapsed:!company.collapsed})}
          className="btn-ghost" style={{fontSize:11,padding:"2px 4px",transform:company.collapsed?"rotate(-90deg)":"rotate(0deg)",transition:"transform .15s"}}>
          ▼
        </button>

        {/* Color dot + Name */}
        <div style={{width:10,height:10,borderRadius:"50%",background:company.color,flexShrink:0}}/>
        <span style={{fontWeight:700,fontSize:12,color:company.color,textTransform:"uppercase",letterSpacing:.8,cursor:"pointer"}}
          onClick={()=>onEditCompany&&onEditCompany(company)}>
          {company.name}
        </span>

        {/* Driver count */}
        <span style={{fontSize:11,color:"#5a5c61",background:"rgba(255,255,255,.05)",padding:"1px 7px",borderRadius:99}}>
          {allDrivers.length}
        </span>

        {/* ELD provider */}
        <span style={{fontSize:10,color:"#5a5c61"}}>
          {company.eldProvider==="factor"?"⚡ Factor":"🔷 Leader"}
        </span>

        {/* Connection mini-stats */}
        <div style={{display:"flex",alignItems:"center",gap:8,marginLeft:4}}>
          {connected>0 && <span style={{fontSize:10,background:"rgba(74,222,128,.1)",color:"#4ade80",padding:"1px 7px",borderRadius:99,border:"1px solid rgba(74,222,128,.2)"}}>🟢 {connected}</span>}
          {disconnected>0 && <span style={{fontSize:10,background:"rgba(239,68,68,.1)",color:"#fca5a5",padding:"1px 7px",borderRadius:99,border:"1px solid rgba(239,68,68,.2)"}}>🔴 {disconnected}</span>}
          {unknown>0 && <span style={{fontSize:10,color:"#5a5c61",padding:"1px 7px",borderRadius:99}}>● {unknown}</span>}
        </div>

        {/* Progress bar */}
        {connected > 0 && (
          <div style={{display:"flex",alignItems:"center",gap:5,marginLeft:2}}>
            <div style={{width:50,height:3,background:"#2c2d2f",borderRadius:99}}>
              <div style={{width:`${pct}%`,height:"100%",background:company.color,borderRadius:99}}/>
            </div>
            <span style={{fontSize:9,color:"#5a5c61"}}>{pct}%</span>
          </div>
        )}

        {/* Actions */}
        <div style={{marginLeft:"auto",display:"flex",gap:4,position:"relative"}} ref={menuRef}>
          <button onClick={addDriver}
            style={{background:"rgba(69,115,210,.12)",border:"1px solid rgba(69,115,210,.25)",color:"#6da3f8",borderRadius:6,padding:"3px 10px",fontSize:11,fontWeight:700}}>
            + Add driver
          </button>
          <button onClick={()=>setMenuOpen(o=>!o)} className="btn-ghost" style={{fontSize:16,padding:"2px 6px"}}>…</button>
          {menuOpen && (
            <CompanyMenu
              company={company}
              onEdit={()=>onEditCompany&&onEditCompany(company)}
              onDelete={()=>onDeleteCompany(company.id)}
              onToggleStar={()=>onUpdateCompany({...company,starred:!company.starred})}
              onClose={()=>setMenuOpen(false)}
            />
          )}
        </div>
      </div>

      {/* Table */}
      {!company.collapsed && (
        <table style={{width:"100%",borderCollapse:"collapse",tableLayout:"fixed"}}>
          <thead>
            <tr style={{background:"#1e1f21",borderBottom:"1px solid #2c2d2f"}}>
              {TABLE_HEADERS.map(h=>(
                <th key={h.label} style={{
                  padding:"6px 8px",textAlign:"left",fontSize:10,fontWeight:600,
                  color:"#5a5c61",textTransform:"uppercase",letterSpacing:.7,
                  whiteSpace:"nowrap",width:h.width,borderBottom:"1px solid #2c2d2f",
                }}>
                  {h.label}
                </th>
              ))}
              <th style={{width:30,borderBottom:"1px solid #2c2d2f"}}/>
            </tr>
          </thead>
          <tbody>
            {visibleDrivers.map(driver=>(
              <DriverRow
                key={driver.id}
                driver={driver}
                company={company}
                responsibles={responsibles}
                onUpdate={d=>onUpdateDriver(company.id,d)}
                onDelete={id=>onDeleteDriver(company.id,id)}
                onOpenDetail={onOpenDriverDetail}
              />
            ))}
          </tbody>
        </table>
      )}

      {/* Add row button */}
      {!company.collapsed && (
        <div onClick={addDriver} style={{
          padding:"7px 16px 7px 36px",fontSize:12,color:"#5a5c61",cursor:"pointer",
          borderBottom:"1px solid #2c2d2f",display:"flex",alignItems:"center",gap:6,
          transition:"background .08s",
        }}
        onMouseEnter={e=>e.currentTarget.style.background="#2c2d2f"}
        onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
          <span style={{fontSize:14}}>+</span> Add driver
        </div>
      )}
    </div>
  );
}
