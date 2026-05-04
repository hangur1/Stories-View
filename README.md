# Stories Dashboard

Live work overview for the Stories team, pulling directly from Asana.

## Why it didn't work before
Opening `index.html` directly in a browser blocks requests to Asana's API (CORS).
This version fixes that with a Vercel serverless function that proxies all API calls server-side.

## Deploy in 5 steps

### 1. Get your Asana token
Go to https://app.asana.com/0/my-apps → Create new token → copy it

### 2. Install Vercel CLI (if you don't have it)
```
npm install -g vercel
```

### 3. Deploy
```
cd stories-v2
vercel
```
- When asked "Set up and deploy?" → Y
- Framework preset → Other
- Everything else → hit Enter to accept defaults

Vercel will give you a URL like `stories-v2-abc123.vercel.app`

### 4. Add your Asana token
Go to vercel.com → your project → **Settings → Environment Variables**
- Name: `ASANA_TOKEN`
- Value: paste your token
- Click Save

### 5. Redeploy to pick up the env variable
```
vercel --prod
```

That's it. Share the URL with Sid.

## File structure
```
stories-v2/
  vercel.json          # routing config
  api/
    asana.js           # serverless proxy (keeps token server-side)
  public/
    index.html         # the dashboard UI
```

## Refreshing data
The dashboard loads fresh on every page open. Use the "↺ Refresh data" button in the sidebar to pull latest without reloading.
