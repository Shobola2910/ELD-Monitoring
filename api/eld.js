export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Methods","GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers","Content-Type,x-eld-token,x-eld-url,x-eld-provider");
  if(req.method==="OPTIONS") return res.status(200).end();

  const token    = req.headers["x-eld-token"];
  const baseUrl  = req.headers["x-eld-url"];
  const provider = req.headers["x-eld-provider"]||"unknown";
  const endpoint = req.query.endpoint;

  if(!token)   return res.status(401).json({ok:false,error:"Token required"});
  if(!baseUrl) return res.status(400).json({ok:false,error:"Base URL required"});

  if(endpoint) return proxyOne(res,token,baseUrl,endpoint);

  const VEHICLE_EPS = provider==="factor"
    ? ["vehicles","trucks","assets","fleet","v2/vehicles","v1/vehicles"]
    : ["vehicles","trucks","assets","v1/vehicles","api/v1/vehicles"];
  const DRIVER_EPS = ["drivers","v1/drivers","v2/drivers","api/drivers"];

  const results={vehicles:null,drivers:null};

  for(const ep of VEHICLE_EPS){
    try{
      const r=await callELD(token,baseUrl,ep);
      if(r.ok){
        const items=extractArray(r.data);
        if(items.length>0){results.vehicles={endpoint:ep,items:items.map(v=>normalizeVehicle(v,provider)),raw:items.slice(0,2)};break;}
      }
    }catch{}
  }
  if(!results.vehicles||!results.vehicles.items.some(v=>v.driverName)){
    for(const ep of DRIVER_EPS){
      try{
        const r=await callELD(token,baseUrl,ep);
        if(r.ok){const items=extractArray(r.data);if(items.length>0){results.drivers={endpoint:ep,items:items.map(d=>normalizeDriver(d))};break;}}
      }catch{}
    }
  }
  const found=(results.vehicles?.items?.length||0)+(results.drivers?.items?.length||0);
  return res.status(200).json({ok:found>0,provider,found,vehicles:results.vehicles,drivers:results.drivers,error:found===0?"No data. Check token and base URL.":null});
}

async function proxyOne(res,token,baseUrl,endpoint){
  try{const r=await callELD(token,baseUrl,endpoint);return res.status(r.status).json({ok:r.ok,data:r.data});}
  catch(e){return res.status(500).json({ok:false,error:e.message});}
}

async function callELD(token,baseUrl,endpoint){
  const url=`${baseUrl.replace(/\/$/,"")}/${endpoint}`;
  const r=await fetch(url,{headers:{"Authorization":`Bearer ${token}`,"Accept":"application/json"}});
  const text=await r.text();
  let data;try{data=JSON.parse(text);}catch{data={raw:text};}
  return{ok:r.ok,status:r.status,data};
}

function extractArray(d){
  if(Array.isArray(d))return d;
  for(const k of["data","vehicles","trucks","assets","drivers","results","items","list"])
    if(Array.isArray(d?.[k]))return d[k];
  return[];
}

function normalizeVehicle(item,provider){
  const truck=String(item.unit_number??item.truck_number??item.vehicle_number??item.number??item.unit??item.name??"").replace(/^#/,"").trim();
  const secs=item.last_seen_seconds_ago??item.secondsSinceLastPing??null;
  const connected=item.eld_status==="connected"||item.status==="connected"||item.status==="online"||item.online===true||item.is_connected===true||item.connection_status==="connected"||item.eld?.connected===true||(secs!==null&&secs<600);
  const driverName=String(item.driver?.name??item.driver?.full_name??item.driver_name??item.current_driver?.name??"").trim();
  return{id:item.id??item._id??truck,truck,connected:Boolean(connected),driverName,lastSeen:item.last_seen??item.lastSeen??item.last_ping??item.updated_at??null,rawStatus:item.eld_status??item.status??item.connection_status??"unknown"};
}

function normalizeDriver(item){
  const name=String(item.full_name??item.fullName??item.name??`${item.first_name??""} ${item.last_name??""}`.trim()??"").trim();
  const truck=String(item.truck_number??item.unit_number??item.vehicle?.unit_number??"").replace(/^#/,"").trim();
  const connected=item.eld_status==="connected"||item.status==="connected"||item.online===true||item.eld?.connected===true;
  return{id:item.id??item._id,name,truck,connected:Boolean(connected),rawStatus:item.eld_status??item.status??"unknown",lastSeen:item.last_seen??item.updated_at??null};
}
