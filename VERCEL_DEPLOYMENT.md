# OptiSolve Labs - Vercel Deployment Guide

## Current Deployment Status
✅ **Ready for Vercel** - All files optimized for serverless Node.js deployment

## Architecture
- **Frontend**: Vite (builds to `dist/public/`)
- **Backend**: Express.js (compiled to `dist/index.js`)
- **Database**: PostgreSQL (via DATABASE_URL env var)
- **Email Service**: Resend API

## Files Configuration

### vercel.json
```json
{
  "version": 2,
  "builds": [
    { "src": "dist/index.js", "use": "@vercel/node" },
    { "src": "dist/public/**", "use": "@vercel/static" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "/dist/index.js" }
  ]
}
```
This tells Vercel:
- Run `dist/index.js` as a Node.js serverless function (your Express API)
- Serve `dist/public/` as static files (your Vite frontend)
- Route all requests through the Node.js function (Express handles routing, SPA fallback, API)

### Build Process
```bash
npm run build
# Produces:
# - dist/public/    (Vite frontend + assets)
# - dist/index.js   (Bundled Express server)
```

## Required Environment Variables in Vercel

Go to **Project Settings → Environment Variables** and add:

| Variable | Value | Notes |
|----------|-------|-------|
| `ADMIN_SECRET` | `optisolve-admin-2024-secure` | Admin panel password |
| `RESEND_API_KEY` | `re_eRKtdbah_HVMmChR6ywnPDyQn5QskkGv1` | Email service API key |
| `DATABASE_URL` | `postgresql://...` | PostgreSQL connection string (if using persistent DB) |

## Deployment Steps

### 1. Ensure Code is on GitHub
```bash
git add -A
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Import Project to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **Add New... → Project**
3. Select **Import Git Repository**
4. Choose your GitHub repository
5. Vercel auto-detects Node.js project (no need to configure build command)

### 3. Add Environment Variables
1. In project settings, go to **Environment Variables**
2. Add the three variables from the table above
3. Choose environment: **All (Production, Preview, Development)**

### 4. Deploy
Click **Deploy** button. Vercel will:
1. Clone your repo
2. Run `npm run build` (produces dist/index.js + dist/public/)
3. Deploy `dist/index.js` as serverless function
4. Serve `dist/public/` as static files
5. Route requests correctly via `vercel.json`

## Verify Deployment
After deployment:
1. Visit your Vercel domain (e.g., `https://optisolve-labs.vercel.app`)
2. Check home page loads correctly
3. Visit `/services` page
4. Test admin panel at `/admin` (password: `optisolve-admin-2024-secure`)
5. Test contact form (should send via Resend)
6. Verify dark mode toggle works

## Database Configuration (Optional)
For persistent data storage instead of in-memory:

1. Create Supabase/PostgreSQL instance
2. Get connection string: `postgresql://user:password@host:port/database`
3. In Vercel, add `DATABASE_URL` environment variable
4. In `server/storage.ts` line 145, change:
   ```typescript
   new MemStorage()  // Change to:
   new DBStorage()
   ```
5. Run database migrations: `npm run db:push -- --force`

## Troubleshooting

**Build fails: "No Output Directory found"**
- Verify `vercel.json` exists and is valid JSON
- Check that Vite builds to `dist/public/` (see `vite.config.ts`)

**404 errors on pages**
- Vercel should serve `dist/public/index.html` for SPA routes
- This is handled by the route rule: `{ "src": "/(.*)", "dest": "/dist/index.js" }`
- Express then serves index.html for unmatched routes

**API requests failing**
- Verify environment variables are set in Vercel
- Check logs in Vercel dashboard: Deployments → Select deployment → Logs
- Ensure ADMIN_SECRET and RESEND_API_KEY are correct

**Emails not sending**
- Verify RESEND_API_KEY in environment variables
- Check that contact form sends to: `optisolvelabs@gmail.com`

## Auto-Deployment
Every time you push to GitHub, Vercel automatically rebuilds and deploys!

```bash
git push origin main  # Vercel deploys automatically
```

## Local Testing Before Vercel
```bash
npm run build          # Build for production
npm start              # Run locally (serves on port 5000)
```

Visit `http://localhost:5000` to test before deploying to Vercel.
