import { useState } from "react";
import { ColorPicker } from "../ui/ColorPicker";
import { genId } from "../../utils/helpers";

export function CompanyModal({ company, onSave, onClose }) {
  const isNew = !company?.id;
  const [form, setForm] = useState({
    id:          company?.id || genId("c"),
    name:        company?.name || "",
    color:       company?.color || "#3B82F6",
    eldProvider: company?.eldProvider || "leader",
    starred:     company?.starred || false,
    collapsed:   company?.collapsed || false,
    drivers:     company?.drivers || [],
  });
  const [showPicker, setShowPicker] = useState(false);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.65)",zIndex:1000,
      display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={onClose}>
      <div className="fade-up" style={{background:"#2c2d2f",border:"1px solid #3d3e40",borderRadius:14,
        width:"100%",maxWidth:400,boxShadow:"0 32px 80px rgba(0,0,0,.6)"}} onClick={e=>e.stopPropagation()}>

        <div style={{padding:"16px 20px",borderBottom:"1px solid #3d3e40",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontSize:15,fontWeight:700,color:"#f1f0ee"}}>{isNew?"+ New Company":"Edit Company"}</div>
          <button onClick={onClose} className="btn-ghost" style={{fontSize:16}}>✕</button>
        </div>

        <div style={{padding:20,display:"flex",flexDirection:"column",gap:14}}>
          {/* Name */}
          <div>
            <label style={{display:"block",fontSize:11,color:"#9d9ea3",fontWeight:700,textTransform:"uppercase",letterSpacing:.8,marginBottom:5}}>Company Name</label>
            <input value={form.name} onChange={e=>set("name",e.target.value)}
              placeholder="e.g. SABIR EXPRESS INC"
              className="field-input"/>
          </div>

          {/* Color */}
          <div>
            <label style={{display:"block",fontSize:11,color:"#9d9ea3",fontWeight:700,textTransform:"uppercase",letterSpacing:.8,marginBottom:5}}>Color</label>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div onClick={()=>setShowPicker(o=>!o)} style={{width:32,height:32,borderRadius:8,background:form.color,cursor:"pointer",border:"1px solid rgba(255,255,255,.15)"}}/>
              <span style={{fontSize:12,color:"#9d9ea3",fontFamily:"monospace"}}>{form.color}</span>
            </div>
            {showPicker && (
              <div style={{marginTop:8,background:"#1e1f21",borderRadius:10,border:"1px solid #3d3e40"}}>
                <ColorPicker value={form.color} onChange={c=>{set("color",c);}}/>
                <div style={{padding:"0 14px 10px",textAlign:"right"}}>
                  <button onClick={()=>setShowPicker(false)} style={{background:"#4573d2",border:"none",borderRadius:6,padding:"5px 12px",color:"#fff",fontSize:11,fontWeight:600}}>Done</button>
                </div>
              </div>
            )}
          </div>

          {/* ELD Provider */}
          <div>
            <label style={{display:"block",fontSize:11,color:"#9d9ea3",fontWeight:700,textTransform:"uppercase",letterSpacing:.8,marginBottom:5}}>ELD Provider</label>
            <div style={{display:"flex",gap:8}}>
              {[["factor","⚡ Factor ELD"],["leader","🔷 Leader ELD"]].map(([v,l])=>(
                <button key={v} onClick={()=>set("eldProvider",v)}
                  style={{flex:1,padding:"8px 0",borderRadius:8,border:`1px solid ${form.eldProvider===v?"#4573d2":"#3d3e40"}`,
                    background:form.eldProvider===v?"rgba(69,115,210,.15)":"transparent",
                    color:form.eldProvider===v?"#6da3f8":"#9d9ea3",fontSize:12,fontWeight:600}}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Starred */}
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div onClick={()=>set("starred",!form.starred)}
              style={{width:36,height:20,borderRadius:99,background:form.starred?"#4573d2":"#3d3e40",cursor:"pointer",position:"relative",transition:"background .15s"}}>
              <div style={{width:14,height:14,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:form.starred?19:3,transition:"left .15s"}}/>
            </div>
            <span style={{fontSize:13,color:"#d9d8d5"}}>⭐ Add to Starred</span>
          </div>
        </div>

        <div style={{padding:"12px 20px",borderTop:"1px solid #3d3e40",display:"flex",gap:8,justifyContent:"flex-end"}}>
          <button onClick={onClose} style={{padding:"8px 18px",borderRadius:8,border:"1px solid #3d3e40",background:"transparent",color:"#9d9ea3",fontSize:13}}>Cancel</button>
          <button onClick={()=>form.name.trim()&&onSave(form)}
            style={{padding:"8px 20px",borderRadius:8,border:"none",background:"#4573d2",color:"#fff",fontSize:13,fontWeight:700,opacity:form.name.trim()?1:.5}}>
            {isNew?"Create Company":"Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
