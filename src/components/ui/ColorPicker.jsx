import { useState } from "react";
import { PRESET_COLORS } from "../../data";

export function ColorPicker({ value, onChange }) {
  const [hex, setHex] = useState(value || "#3B82F6");
  const [mode, setMode] = useState("presets"); // presets | custom

  const apply = (color) => {
    setHex(color);
    onChange(color);
  };

  const handleHexInput = (e) => {
    const v = e.target.value;
    setHex(v);
    if (/^#[0-9a-fA-F]{6}$/.test(v)) onChange(v);
  };

  return (
    <div style={{padding:14,width:240}}>
      {/* Tabs */}
      <div style={{display:"flex",gap:4,marginBottom:12}}>
        {["presets","custom"].map(m=>(
          <button key={m} onClick={()=>setMode(m)}
            style={{flex:1,padding:"5px 0",borderRadius:6,border:"none",fontSize:11,fontWeight:600,textTransform:"capitalize",
              background:mode===m?"rgba(255,255,255,.1)":"transparent",
              color:mode===m?"#f1f0ee":"#5a5c61"}}>
            {m === "presets" ? "Presets" : "Custom HEX"}
          </button>
        ))}
      </div>

      {mode === "presets" ? (
        <>
          {/* Color grid */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:5,marginBottom:10}}>
            {PRESET_COLORS.map(c=>(
              <button key={c} onClick={()=>apply(c)}
                style={{width:"100%",aspectRatio:"1",borderRadius:6,background:c,border:`2px solid ${value===c?"#fff":"transparent"}`,cursor:"pointer",transition:"transform .1s"}}
                title={c}
              />
            ))}
          </div>
        </>
      ) : (
        <div>
          {/* Color preview + hex input */}
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
            <div style={{width:36,height:36,borderRadius:8,background:hex,border:"1px solid rgba(255,255,255,.15)",flexShrink:0}}/>
            <input value={hex} onChange={handleHexInput} maxLength={7}
              style={{flex:1,background:"#1e1f21",border:"1px solid #3d3e40",borderRadius:7,
                padding:"7px 10px",color:"#f1f0ee",fontSize:13,fontFamily:"monospace"}}
              placeholder="#3B82F6" />
          </div>
          {/* Quick hues */}
          <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:6}}>
            {["#EF4444","#F97316","#EAB308","#22C55E","#3B82F6","#6366F1","#8B5CF6","#EC4899"].map(c=>(
              <button key={c} onClick={()=>apply(c)}
                style={{width:26,height:26,borderRadius:5,background:c,border:`2px solid ${hex===c?"#fff":"transparent"}`,cursor:"pointer"}}/>
            ))}
          </div>
          <button onClick={()=>apply(hex)}
            style={{width:"100%",padding:"7px",borderRadius:7,border:"none",background:"#4573d2",color:"#fff",fontSize:12,fontWeight:600}}>
            Apply Color
          </button>
        </div>
      )}

      {/* Current selection */}
      <div style={{display:"flex",alignItems:"center",gap:6,marginTop:8,paddingTop:8,borderTop:"1px solid #3d3e40"}}>
        <div style={{width:16,height:16,borderRadius:4,background:value||hex,flexShrink:0}}/>
        <span style={{fontSize:11,color:"#9d9ea3",fontFamily:"monospace"}}>{value||hex}</span>
      </div>
    </div>
  );
}
