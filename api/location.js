export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const { latitude, longitude, accuracy, timestamp } = req.body || {};

    const lat = Number(latitude);
    const lng = Number(longitude);
    const acc = Number(accuracy);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return res.status(400).json({ ok: false, error: 'Koordinat tidak valid' });
    }

    const appsScriptUrl = process.env.APPS_SCRIPT_URL;

    if (!appsScriptUrl) {
      return res.status(500).json({
        ok: false,
        error: 'APPS_SCRIPT_URL belum disetel di Vercel'
      });
    }

    const response = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        latitude: lat,
        longitude: lng,
        accuracy: Number.isFinite(acc) ? acc : '',
        timestamp: timestamp || new Date().toISOString()
      }),
      redirect: 'follow'
    });

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { ok: response.ok, raw: text };
    }

    if (!response.ok || data.ok === false) {
      return res.status(502).json({
        ok: false,
        error: data.error || 'Apps Script gagal menyimpan data'
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err.message || 'Internal server error'
    });
  }
}
