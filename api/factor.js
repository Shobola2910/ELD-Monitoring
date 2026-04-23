export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-eld-token, x-eld-url");
  if (req.method === "OPTIONS") return res.status(200).end();

  const token = req.headers["x-eld-token"];
  const baseUrl = req.headers["x-eld-url"] || "https://api.factorhq.com/v1";
  if (!token) return res.status(401).json({ ok: false, error: "Token required" });

  try {
    const endpoint = req.query.endpoint || "drivers";
    const url = `${baseUrl}/${endpoint}`;
    const response = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }
    res.status(response.status).json({ ok: response.ok, status: response.status, data });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}
