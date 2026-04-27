import { useState, useRef, useEffect } from "react";
import { YesNoBadge, ELDStatusPill, ResponsiblePill } from "./ui/Atoms";
import { ResponsiblePicker } from "./ResponsiblePicker";
import { fmtDate, today } from "../utils/helpers";
import { NOTE_OPTIONS, ELD_TIME_OPTIONS } from "../data";

// Inline editable cell
function Cell({ children, onSave, type = "text", options = [], style, noEdit = false }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState("");
  const ref = useRef(null);

  const startEdit = () => {
    if (noEdit) return;
    setEditing(true);
  };

  const commit = () => {
    setEditing(false);
    if (onSave) onSave(val);
  };

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
      if (ref.current.select) ref.current.select();
    }
  }, [editing]);

  const tdStyle = {
    padding: "0 8px", height: 36, borderBottom: "1px solid #2c2d2f",
    fontSize: 13, color: "#d9d8d5", verticalAlign: "middle", ...style,
  };

  if (editing) {
    if (type === "select") {
      return (
        <td style={tdStyle}>
          <select ref={ref} value={val} onChange={e=>setVal(e.target.value)} onBlur={commit}
            autoFocus
            style={{background:"#1e1f21",border:"1px solid #4573d2",borderRadius:5,
              padding:"3px 6px",color:"#f1f0ee",fontSize:12,width:"100%"}}>
            <option value="">—</option>
            {options.map(o=><option key={o}>{o}</option>)}
          </select>
        </td>
      );
    }
    if (type === "date") {
      return (
        <td style={tdStyle}>
          <input ref={ref} type="date" value={val} onChange={e=>setVal(e.target.value)} onBlur={commit}
            onKeyDown={e=>{if(e.key==="Enter")commit();if(e.key==="Escape")setEditing(false);}}
            style={{background:"#1e1f21",border:"1px solid #4573d2",borderRadius:5,
              padding:"3px 6px",color:"#f1f0ee",fontSize:12,width:"100%"}}/>
        </td>
      );
    }
    return (
      <td style={tdStyle}>
        <input ref={ref} value={val} onChange={e=>setVal(e.target.value)}
          onBlur={commit}
          onKeyDown={e=>{if(e.key==="Enter")commit();if(e.key==="Escape")setEditing(false);}}
          style={{background:"#1e1f21",border:"1px solid #4573d2",borderRadius:5,
            padding:"3px 6px",color:"#f1f0ee",fontSize:12,width:"100%"}}/>
      </td>
    );
  }

  return (
    <td style={tdStyle} className={noEdit?"":"cell-edit"}
      onClick={()=>{ setVal(typeof children==="string"?children:""); startEdit(); }}>
      {children}
    </td>
  );
}

// Toggle3 cell (Yes / No / —)
function Toggle3Cell({ value, onSave, style }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(()=>{
    const close = e=>{ if(ref.current&&!ref.current.contains(e.target))setOpen(false); };
    document.addEventListener("mousedown",close);
    return ()=>document.removeEventListener("mousedown",close);
  },[]);

  const select = (v)=>{ onSave(v); setOpen(false); };

  return (
    <td style={{padding:"0 8px",height:36,borderBottom:"1px solid #2c2d2f",verticalAlign:"middle",...style}}
        ref={ref}>
      <div style={{position:"relative",display:"inline-block"}}>
        <div className="cell-edit" onClick={()=>setOpen(o=>!o)} style={{padding:"2px 4px",borderRadius:4}}>
          <YesNoBadge v={value}/>
        </div>
        {open && (
          <div className="dropdown-menu fade-up" style={{position:"absolute",top:"110%",left:0,zIndex:400,minWidth:90}}>
            {[[true,"YES","#4ade80"],[false,"NO","#fca5a5"],[null,"—","#5a5c61"]].map(([v,l,c])=>(
              <div key={l} className="dropdown-item" onClick={()=>select(v)}
                style={{color:c,justifyContent:"space-between"}}>
                {l} {value===v&&<span style={{fontSize:12}}>✓</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </td>
  );
}

// ─── Main DriverRow ────────────────────────────────────────
export function DriverRow({ driver, company, responsibles, onUpdate, onDelete, onOpenDetail }) {
  const [hovered, setHovered] = useState(false);

  const update = (field, val) => {
    const changes = { [field]: val };
    // Auto-update date when responsible or note changes
    if (field === "responsible" || field === "note") {
      changes.updatedAt = new Date().toISOString();
      changes.date = today();
    }
    onUpdate({ ...driver, ...changes });
  };

  const noteColor = driver.note==="All good"?"#4ADE80":driver.note==="Off"?"#FCA5A5":driver.note==="Issue"?"#EF4444":"#FCD34D";
  const responsible = responsibles.find(r=>r.name===driver.responsible);

  return (
    <tr className="driver-row"
      style={{background:"transparent"}}
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={()=>setHovered(false)}>

      {/* Checkbox + Name */}
      <td style={{padding:"0 8px",height:36,borderBottom:"1px solid #2c2d2f",verticalAlign:"middle",minWidth:280}}>
        <div style={{display:"flex",alignItems:"center",gap:7}}>
          {/* Check circle */}
          <div style={{width:16,height:16,borderRadius:"50%",border:`1.5px solid ${driver.active?"#5a5c61":"#3d3e40"}`,flexShrink:0,cursor:"pointer",
            background:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}
            onClick={()=>update("active",!driver.active)}>
            {!driver.active && <span style={{fontSize:9,color:"#4573d2"}}>✓</span>}
          </div>
          {/* Name */}
          <span onClick={()=>onOpenDetail&&onOpenDetail(driver)}
            style={{fontSize:13,color:driver.active?"#d9d8d5":"#5a5c61",cursor:"pointer",flex:1,
              textDecoration:driver.active?"none":"line-through"}}
            className="cell-edit">
            {driver.name}
          </span>
          {/* Row actions (hover) */}
          <div className="row-actions" style={{opacity:hovered?1:0,display:"flex",gap:3,transition:"opacity .1s"}}>
            <button onClick={()=>onOpenDetail&&onOpenDetail(driver)} className="btn-ghost" style={{fontSize:11,padding:"2px 5px"}}>✏</button>
            <button onClick={()=>onDelete(driver.id)} className="btn-ghost" style={{fontSize:11,padding:"2px 5px",color:"#ef4444"}}>🗑</button>
          </div>
        </div>
      </td>

      {/* Truck */}
      <Cell style={{minWidth:70}} onSave={v=>update("truck",v)}>
        <span style={{color:"#60A5FA",fontFamily:"monospace",fontWeight:600,fontSize:12}}>{driver.truck||"—"}</span>
      </Cell>

      {/* Responsible — special picker */}
      <td style={{padding:"0 4px",height:36,borderBottom:"1px solid #2c2d2f",verticalAlign:"middle",minWidth:100}}>
        <ResponsiblePicker
          value={driver.responsible}
          responsibles={responsibles}
          onChange={v=>update("responsible",v)}
        />
      </td>

      {/* Note */}
      <Cell type="select" options={NOTE_OPTIONS} onSave={v=>update("note",v)}
        style={{minWidth:90}}>
        <span style={{fontSize:12,fontWeight:600,color:noteColor}}>{driver.note||"—"}</span>
      </Cell>

      {/* Date (auto-updated) */}
      <Cell type="date" onSave={v=>update("date",v)} style={{minWidth:100}}>
        <span style={{fontSize:12,color: driver.date===today()?"#d9d8d5":"#9d9ea3"}}>{fmtDate(driver.date)}</span>
      </Cell>

      {/* Paperlogbook */}
      <Toggle3Cell value={driver.paperLogbook} onSave={v=>update("paperLogbook",v)} style={{minWidth:80}}/>

      {/* User's Manual */}
      <Toggle3Cell value={driver.userManual} onSave={v=>update("userManual",v)} style={{minWidth:80}}/>

      {/* Tablet Mounted */}
      <Toggle3Cell value={driver.tabletMounted} onSave={v=>update("tabletMounted",v)} style={{minWidth:80}}/>

      {/* ELD Times */}
      <Cell type="select" options={ELD_TIME_OPTIONS} onSave={v=>update("eldTimes",v)} style={{minWidth:90}}>
        <span style={{fontSize:11,fontWeight:600,color:driver.eldTimes==="ALL GOOD"?"#4ADE80":driver.eldTimes?"#FCD34D":"#5a5c61"}}>
          {driver.eldTimes||"—"}
        </span>
      </Cell>

      {/* ELD Connection (from token — read only) */}
      <td style={{padding:"0 8px",height:36,borderBottom:"1px solid #2c2d2f",verticalAlign:"middle",minWidth:130}} noEdit>
        <ELDStatusPill driver={driver} small/>
      </td>
    </tr>
  );
}
