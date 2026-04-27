import { useState, useRef, useEffect } from "react";
import { ColorPicker } from "./ui/ColorPicker";
import { genId } from "../utils/helpers";

// Asana-like responsible person dropdown
// Image 1: pill list with checkmark, Edit options, Add option
export function ResponsiblePicker({ value, responsibles, onChange, onEditList, style }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = responsibles.find(r => r.name === value);

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const select = (name) => { onChange(name); setOpen(false); };

  return (
    <div ref={ref} style={{position:"relative",...style}}>
      {/* Trigger */}
      <div onClick={()=>setOpen(o=>!o)} className="cell-edit"
        style={{padding:"3px 6px",borderRadius:5,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:6}}>
        {current ? (
          <span style={{background:`${current.color}22`,color:current.color,padding:"2px 9px",borderRadius:99,fontSize:11,fontWeight:600,border:`1px solid ${current.color}44`,whiteSpace:"nowrap"}}>
            {current.name}
          </span>
        ) : (
          <span style={{color:"#5a5c61",fontSize:12,padding:"2px 4px"}}>—</span>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="dropdown-menu fade-up" style={{
          position:"absolute",top:"calc(100% + 4px)",left:0,zIndex:500,minWidth:160,
        }}>
          <div style={{padding:"6px 4px"}}>
            {/* Search */}
            <div style={{padding:"4px 8px",marginBottom:4}}>
              <input autoFocus placeholder="Search..." style={{
                width:"100%",background:"#1e1f21",border:"1px solid #3d3e40",
                borderRadius:6,padding:"5px 8px",color:"#f1f0ee",fontSize:12,
              }}/>
            </div>

            {/* List */}
            {responsibles.map(r => (
              <div key={r.id} className="dropdown-item" onClick={()=>select(r.name)}
                style={{justifyContent:"space-between"}}>
                <div style={{display:"flex",alignItems:"center",gap:7}}>
                  <span style={{width:10,height:10,borderRadius:"50%",background:r.color,flexShrink:0}}/>
                  <span style={{background:`${r.color}20`,color:r.color,padding:"2px 9px",borderRadius:99,fontSize:11,fontWeight:600,border:`1px solid ${r.color}44`}}>
                    {r.name}
                  </span>
                </div>
                {value === r.name && <span style={{color:"#4573d2",fontSize:14}}>✓</span>}
              </div>
            ))}

            {/* Clear */}
            {value && (
              <div className="dropdown-item" onClick={()=>select("")} style={{borderTop:"1px solid #3d3e40",marginTop:4,paddingTop:8,color:"#9d9ea3"}}>
                <span style={{fontSize:14}}>✕</span> Clear
              </div>
            )}
          </div>

          {/* Footer actions */}
          <div style={{borderTop:"1px solid #3d3e40",padding:"4px 0"}}>
            <div className="dropdown-item" onClick={()=>{setOpen(false);onEditList&&onEditList();}}>
              <span>✏️</span> Edit options
            </div>
            <div className="dropdown-item" style={{color:"#9d9ea3",fontSize:11}}>
              <span>⟳</span> Auto-fill field value
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Manage Responsible Persons Modal ─────────────────────
export function ManageResponsibleModal({ responsibles, onSave, onClose }) {
  const [list, setList] = useState([...responsibles]);
  const [editId, setEditId] = useState(null);
  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState("#3B82F6");
  const [showColorPicker, setShowColorPicker] = useState(null); // id of item

  const add = () => {
    if (!newName.trim()) return;
    setList(l => [...l, { id:genId("r"), name:newName.trim(), color:newColor }]);
    setNewName(""); setNewColor("#3B82F6");
  };

  const remove = (id) => setList(l => l.filter(r=>r.id!==id));

  const updateColor = (id, color) => setList(l => l.map(r=>r.id===id?{...r,color}:r));
  const updateName  = (id, name)  => setList(l => l.map(r=>r.id===id?{...r,name}:r));

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.7)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}
         onClick={onClose}>
      <div className="fade-up" style={{background:"#2c2d2f",border:"1px solid #3d3e40",borderRadius:14,width:"100%",maxWidth:420,maxHeight:"80vh",overflowY:"auto",boxShadow:"0 32px 80px rgba(0,0,0,.6)"}}
           onClick={e=>e.stopPropagation()}>

        <div style={{padding:"18px 20px",borderBottom:"1px solid #3d3e40",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontSize:15,fontWeight:700,color:"#f1f0ee"}}>✏️ Edit Responsible Options</div>
          <button onClick={onClose} className="btn-ghost" style={{fontSize:16}}>✕</button>
        </div>

        <div style={{padding:16}}>
          {/* Existing items */}
          <div style={{display:"flex",flexDirection:"column",gap:4,marginBottom:14}}>
            {list.map(r=>(
              <div key={r.id} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 8px",background:"#1e1f21",borderRadius:8}}>
                {/* Color swatch — click to open picker */}
                <div style={{position:"relative"}}>
                  <div onClick={()=>setShowColorPicker(showColorPicker===r.id?null:r.id)}
                    style={{width:22,height:22,borderRadius:5,background:r.color,cursor:"pointer",border:"1px solid rgba(255,255,255,.15)",flexShrink:0}}/>
                  {showColorPicker===r.id && (
                    <div style={{position:"absolute",left:0,top:"110%",zIndex:600,background:"#2c2d2f",border:"1px solid #3d3e40",borderRadius:10,boxShadow:"0 8px 24px rgba(0,0,0,.5)"}}>
                      <ColorPicker value={r.color} onChange={c=>{updateColor(r.id,c);}}/>
                      <div style={{padding:"0 14px 10px",textAlign:"right"}}>
                        <button onClick={()=>setShowColorPicker(null)} style={{background:"#4573d2",border:"none",borderRadius:6,padding:"5px 12px",color:"#fff",fontSize:11,fontWeight:600}}>Done</button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Name input */}
                {editId===r.id ? (
                  <input value={r.name} autoFocus onBlur={()=>setEditId(null)}
                    onChange={e=>updateName(r.id,e.target.value)}
                    onKeyDown={e=>{if(e.key==="Enter"||e.key==="Escape")setEditId(null);}}
                    style={{flex:1,background:"#2c2d2f",border:"1px solid #4573d2",borderRadius:5,padding:"3px 8px",color:"#f1f0ee",fontSize:13}}/>
                ) : (
                  <span onClick={()=>setEditId(r.id)}
                    style={{flex:1,fontSize:12,fontWeight:600,color:r.color,cursor:"pointer",
                      background:`${r.color}18`,padding:"2px 9px",borderRadius:99,
                      border:`1px solid ${r.color}33`,display:"inline-block"}}>
                    {r.name}
                  </span>
                )}

                <button onClick={()=>remove(r.id)} className="btn-ghost" style={{fontSize:14,padding:"2px 5px",color:"#ef4444"}}>✕</button>
              </div>
            ))}
          </div>

          {/* Add new */}
          <div style={{border:"1px dashed #3d3e40",borderRadius:8,padding:12}}>
            <div style={{fontSize:11,color:"#9d9ea3",marginBottom:8,fontWeight:600}}>ADD NEW PERSON</div>
            <div style={{display:"flex",gap:7,alignItems:"center"}}>
              <div style={{position:"relative"}}>
                <div onClick={()=>setShowColorPicker(showColorPicker==="new"?null:"new")}
                  style={{width:28,height:28,borderRadius:7,background:newColor,cursor:"pointer",border:"1px solid rgba(255,255,255,.15)"}}/>
                {showColorPicker==="new" && (
                  <div style={{position:"absolute",left:0,top:"110%",zIndex:600,background:"#2c2d2f",border:"1px solid #3d3e40",borderRadius:10,boxShadow:"0 8px 24px rgba(0,0,0,.5)"}}>
                    <ColorPicker value={newColor} onChange={c=>{setNewColor(c);}}/>
                    <div style={{padding:"0 14px 10px",textAlign:"right"}}>
                      <button onClick={()=>setShowColorPicker(null)} style={{background:"#4573d2",border:"none",borderRadius:6,padding:"5px 12px",color:"#fff",fontSize:11,fontWeight:600}}>Done</button>
                    </div>
                  </div>
                )}
              </div>
              <input value={newName} onChange={e=>setNewName(e.target.value)}
                onKeyDown={e=>{if(e.key==="Enter")add();}}
                placeholder="Name (e.g. Alex)" style={{flex:1,background:"#1e1f21",border:"1px solid #3d3e40",borderRadius:7,padding:"7px 10px",color:"#f1f0ee",fontSize:13}}/>
              <button onClick={add} style={{background:"#4573d2",border:"none",borderRadius:7,padding:"7px 12px",color:"#fff",fontSize:12,fontWeight:700}}>+ Add</button>
            </div>
          </div>
        </div>

        <div style={{padding:"12px 16px",borderTop:"1px solid #3d3e40",display:"flex",gap:8,justifyContent:"flex-end"}}>
          <button onClick={onClose} style={{padding:"8px 18px",borderRadius:8,border:"1px solid #3d3e40",background:"transparent",color:"#9d9ea3",fontSize:13}}>Cancel</button>
          <button onClick={()=>onSave(list)} style={{padding:"8px 20px",borderRadius:8,border:"none",background:"#4573d2",color:"#fff",fontSize:13,fontWeight:700}}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}
