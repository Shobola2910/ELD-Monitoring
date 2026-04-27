export function SyncLog({ syncLog, onClose }) {
  if (!syncLog) return null;
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.65)",zIndex:1000,
      display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={onClose}>
      <div className="fade-up" style={{background:"#2c2d2f",border:"1px solid #3d3e40",borderRadius:14,
        width:"100%",maxWidth:480,maxHeight:"80vh",overflowY:"auto",
        boxShadow:"0 32px 80px rgba(0,0,0,.6)"}} onClick={e=>e.stopPropagation()}>

        <div style={{padding:"16px 20px",borderBottom:"1px solid #3d3e40",display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:18}}>🔄</span>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,color:"#f1f0ee",fontSize:14}}>ELD Sync Report</div>
            <div style={{fontSize:11,color:"#5a5c61"}}>{syncLog.time} · {syncLog.total} vehicle{syncLog.total!==1?"s":""} updated</div>
          </div>
          <button onClick={onClose} className="btn-ghost" style={{fontSize:16}}>✕</button>
        </div>

        <div style={{padding:16,display:"flex",flexDirection:"column",gap:10}}>
          {syncLog.logs.map((pl,i)=>(
            <div key={i} style={{background:"#1e1f21",border:`1px solid ${pl.ok?"rgba(74,222,128,.15)":"rgba(239,68,68,.2)"}`,borderRadius:10,padding:14}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:pl.log?.length?10:0}}>
                <span style={{fontSize:14}}>{pl.ok?"✅":"❌"}</span>
                <span style={{fontWeight:700,fontSize:13,color:"#f1f0ee"}}>{pl.provider}</span>
                {pl.ok && <>
                  <span style={{fontSize:11,background:"rgba(74,222,128,.1)",color:"#4ade80",padding:"1px 7px",borderRadius:99,border:"1px solid rgba(74,222,128,.2)"}}>{pl.matched} matched</span>
                  {pl.newFromELD>0 && <span style={{fontSize:11,background:"rgba(234,179,8,.1)",color:"#fcd34d",padding:"1px 7px",borderRadius:99}}>{pl.newFromELD} new</span>}
                  <span style={{fontSize:10,color:"#3d3e40",marginLeft:"auto"}}>/{pl.endpoint}</span>
                </>}
                {!pl.ok && <span style={{fontSize:12,color:"#fca5a5"}}>{pl.error}</span>}
              </div>

              {pl.log?.length > 0 && (
                <div style={{display:"flex",flexDirection:"column",gap:3,maxHeight:200,overflowY:"auto"}}>
                  {pl.log.map((row,j)=>(
                    <div key={j} style={{display:"flex",alignItems:"center",gap:7,
                      padding:"4px 8px",background:"rgba(255,255,255,.02)",borderRadius:5}}>
                      <span style={{width:6,height:6,borderRadius:"50%",flexShrink:0,
                        background:row.connected?"#22C55E":"#EF4444",
                        boxShadow:row.connected?"0 0 5px #22C55E":"none"}}/>
                      <span style={{fontSize:12,color:"#d9d8d5",flex:1}}>{row.driver}</span>
                      <span style={{fontSize:11,fontFamily:"monospace",color:"#60A5FA"}}>{row.truck||"—"}</span>
                      <span style={{fontSize:10,fontWeight:600,color:row.connected?"#4ADE80":"#FCA5A5"}}>
                        {row.connected?"Connected":"Disconnected"}
                      </span>
                      {row.isNew && <span style={{fontSize:9,background:"rgba(234,179,8,.15)",color:"#fcd34d",padding:"1px 5px",borderRadius:3}}>NEW</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{padding:"10px 16px",borderTop:"1px solid #3d3e40"}}>
          <button onClick={onClose} style={{width:"100%",padding:"8px",background:"rgba(69,115,210,.15)",border:"1px solid rgba(69,115,210,.25)",borderRadius:8,color:"#6da3f8",fontSize:13,fontWeight:600}}>Close</button>
        </div>
      </div>
    </div>
  );
}
