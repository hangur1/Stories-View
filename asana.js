export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const token = process.env.ASANA_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'ASANA_TOKEN environment variable not set. Add it in Vercel → Settings → Environment Variables.' });
  }

  const { path } = req.query;
  if (!path) return res.status(400).json({ error: 'Missing path param' });

  const asanaPath = Array.isArray(path) ? path.join('/') : path;
  const qs = new URLSearchParams(req.query);
  qs.delete('path');
  const url = `https://app.asana.com/api/1.0/${asanaPath}?${qs.toString()}`;

  try {
    const upstream = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });
    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
