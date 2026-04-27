// ELD API sync utilities — Factor ELD & Leader ELD
// Calls /api/eld Vercel proxy, normalizes response,
// maps truck numbers → driver connection status

// ─── Call our Vercel proxy ─────────────────────────────────
export async function callELDProxy(provider, token, baseUrl) {
  try {
    const res = await fetch("/api/eld", {
      headers: {
        "x-eld-token":    token,
        "x-eld-url":      baseUrl,
        "x-eld-provider": provider,
      },
    });
    if (!res.ok) return { ok:false, error:`HTTP ${res.status}` };
    return await res.json();
  } catch(e) {
    return { ok:false, error: e.message };
  }
}

// ─── Match ELD truck to our driver ────────────────────────
export function matchTruck(eldTruck, ourTruck) {
  const clean = (s) => String(s||"").replace(/^#/,"").replace(/\s/g,"").toLowerCase();
  const a = clean(eldTruck);
  const b = clean(ourTruck);
  return a.length > 0 && b.length > 0 && a === b;
}

// ─── Match ELD driver name to our driver ──────────────────
export function matchDriver(eldName, ourName) {
  if (!eldName || !ourName) return false;
  const clean = (s) => s.toLowerCase().replace(/[^a-z]/g,"");
  const a = clean(eldName);
  const b = clean(ourName);
  // Check if first word matches (first name)
  const aFirst = a.split("")[0];
  return a === b || a.includes(b.slice(0,5)) || b.includes(a.slice(0,5));
}

// ─── Apply ELD data to our app state ──────────────────────
// Returns { newData, stats: { matched, unmatched, newFromELD } }
export function applyELDData(currentData, eldResult) {
  const allELD = [
    ...(eldResult.vehicles?.items || []),
    ...(eldResult.drivers?.items  || []),
  ];

  const stats = { matched:0, unmatched:0, newFromELD:0, log:[] };

  const newCompanies = currentData.companies.map(company => {
    const newDrivers = company.drivers.map(driver => {
      // Try to match by truck number first, then by name
      const match =
        allELD.find(v => matchTruck(v.truck, driver.truck)) ||
        allELD.find(v => matchDriver(v.driverName, driver.name));

      if (!match) { stats.unmatched++; return driver; }

      stats.matched++;
      stats.log.push({
        driver: driver.name,
        truck:  driver.truck,
        connected: match.connected,
        rawStatus: match.rawStatus,
        lastSeen:  match.lastSeen,
        isNew: false,
      });

      return {
        ...driver,
        eldStatus:   match.connected ? "connected" : "disconnected",
        eldLastSeen: match.lastSeen || new Date().toISOString(),
        eldDriverId: match.id || driver.eldDriverId,
        // If ELD has driver name and ours is empty, fill it
        name: driver.name || match.driverName || driver.name,
        // If ELD has truck number and ours is empty, fill it
        truck: driver.truck || (match.truck ? `#${match.truck}` : driver.truck),
      };
    });
    return { ...company, drivers: newDrivers };
  });

  // Find ELD vehicles not matched to any driver (new)
  allELD.forEach(v => {
    const matched = currentData.companies.flatMap(c=>c.drivers).some(d =>
      matchTruck(v.truck, d.truck) || matchDriver(v.driverName, d.name)
    );
    if (!matched && v.truck) {
      stats.newFromELD++;
      stats.log.push({
        driver: v.driverName || "Unknown",
        truck:  v.truck ? `#${v.truck}` : "—",
        connected: v.connected,
        rawStatus: v.rawStatus,
        isNew: true,
      });
    }
  });

  return { newData: { ...currentData, companies: newCompanies }, stats };
}

// ─── Request browser notification permission ───────────────
export async function requestNotifPermission() {
  if (!("Notification" in window)) return false;
  if (Notification.permission === "granted") return true;
  const perm = await Notification.requestPermission();
  return perm === "granted";
}

// ─── Send browser notification ─────────────────────────────
export function sendNotification(title, body) {
  if (Notification.permission === "granted") {
    new Notification(title, { body, icon:"/favicon.ico" });
  }
}
