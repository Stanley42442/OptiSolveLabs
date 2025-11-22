# OptiSolve Labs - Deployment Guide

## Overview
This document provides step-by-step instructions for deploying the OptiSolve Labs website to Netlify.

## Prerequisites
- Netlify account
- GitHub repository with this code (optional but recommended)
- Admin secret key for managing promotional slots

## Environment Variables

### Required Environment Variables
You **must** configure these environment variables in your Netlify site settings before deployment:

1. **ADMIN_SECRET** (Required)
   - Purpose: Secure admin authentication for managing promo slots
   - Example: `optisolve-admin-2024-secure-key`
   - **Important**: Choose a strong, random secret. The application will fail to start if this is not set.
   - Set in: Netlify Dashboard → Site Settings → Environment Variables → Add variable

2. **DATABASE_URL** (Required)
   - Purpose: PostgreSQL database connection for persistent promo slot storage
   - Example: `postgres://user:password@host:5432/database`
   - **Important**: This application uses a PostgreSQL database to persist promo slots across serverless function invocations. Without this, promo data will be lost.
   - Recommended: Use [Neon](https://neon.tech), [Supabase](https://supabase.com), or [Heroku Postgres](https://www.heroku.com/postgres)


## Deployment Steps

### Option 1: Deploy via GitHub (Recommended)

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Log in to [Netlify](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository
   - Netlify will auto-detect build settings from `netlify.toml`

3. **Set up PostgreSQL Database**
   - Create a PostgreSQL database (recommended: Neon, Supabase, or Heroku Postgres)
   - Copy the connection string (DATABASE_URL)
   - Keep this ready for the next step

4. **Configure Environment Variables**
   - Go to Site settings → Environment variables
   - Click "Add a variable"
   - Add `ADMIN_SECRET` with a secure value
   - Add `DATABASE_URL` with your PostgreSQL connection string
   - Click "Save"

5. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete (typically 2-3 minutes)
   - The build process will:
     - Push database schema to PostgreSQL (creates tables automatically)
     - Build the frontend (React app)
     - Bundle the serverless function (Express API)

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize site**
   ```bash
   netlify init
   ```

4. **Set environment variables**
   ```bash
   netlify env:set ADMIN_SECRET "your-secure-admin-secret-here"
   netlify env:set DATABASE_URL "postgres://user:password@host:5432/database"
   ```

5. **Deploy**
   ```bash
   netlify deploy --prod
   ```

### Option 3: Manual Deploy via Netlify CLI (Recommended for Full-Stack)

**Note**: Simple drag-and-drop is NOT recommended for this full-stack app because it won't deploy the serverless function. Use CLI or GitHub integration instead.

1. **Build the project locally**
   ```bash
   npm install
   npm run build
   ```

2. **Deploy via CLI**
   ```bash
   # Install Netlify CLI if not already installed
   npm install -g netlify-cli
   
   # Login to Netlify
   netlify login
   
   # Deploy
   netlify deploy --prod
   ```

3. **Set up PostgreSQL Database**
   - Create a PostgreSQL database (recommended providers: Neon, Supabase, Heroku Postgres)
   - Copy the DATABASE_URL connection string

4. **Configure environment variables**
   - During deployment, Netlify CLI will prompt for site name
   - After deployment, set environment variables:
   ```bash
   netlify env:set ADMIN_SECRET "your-secure-admin-secret-here"
   netlify env:set DATABASE_URL "postgres://user:password@host:5432/database"
   ```
   - Trigger a new build after setting env vars

## Build Configuration

The build process is configured in `netlify.toml`:
- **Build command**: `npm run build` (builds both frontend and serverless function)
- **Publish directory**: `dist/public` (Vite output for frontend)
- **Node version**: 20
- **Functions directory**: `.netlify/functions` (Express API as serverless function)

### How it Works
This is a full-stack application that uses:
- **Frontend**: Vite builds the React app to `dist/public`
- **Backend**: Express API wrapped in Netlify serverless function at `.netlify/functions/server.ts`
- **Database**: PostgreSQL (via Neon/Supabase/etc) for persistent promo slot storage
- **API Routes**: All `/api/*` requests are redirected to the serverless function
- **SPA Routing**: All other requests serve `index.html` for client-side routing

**Build Process:**
1. `npm run db:push --force` - Pushes database schema to PostgreSQL (creates/updates tables)
   - **Note**: If this step fails due to database connectivity issues, the entire build will fail
   - Ensure your DATABASE_URL is correct and the database is accessible during build
   - Check your PostgreSQL provider's status if build fails at this step
2. `npm run build` - Builds both frontend (Vite) and serverless function (esbuild)

**Data Initialization:**
- Promo slots are automatically initialized on **first API request** (not during build)
- When `/api/promo/status` is called for the first time, it creates the current month's promo with 3 slots
- No manual database seeding required
- Empty database is perfectly fine - initialization happens automatically

**Important**: 
- The build process generates both static files AND a serverless function
- Simple drag-and-drop is NOT sufficient - use GitHub integration or Netlify CLI
- A PostgreSQL database is REQUIRED for promo slots to persist across serverless function invocations
- Database tables are auto-created during the build process
- Promo data is auto-initialized on first API call

## Post-Deployment

### 1. Verify Deployment
- Visit your deployed site URL
- Check that all pages load correctly
- Verify WhatsApp links work properly
- Test navigation between pages

### 2. Access Admin Panel
- Navigate to `/admin`
- Enter your ADMIN_SECRET value
- You should now be able to manage promo slots

### 3. Test Promo System
- With admin access, update promo slots
- Verify the promo banner appears when slots > 0
- Check that pricing shows discounts on all service pages
- Confirm banner hides when slots = 0

## Important Notes

### Security
- **Never commit ADMIN_SECRET to git**
- Change ADMIN_SECRET regularly
- Only share ADMIN_SECRET with authorized administrators

### Environment Variables in Netlify
- Environment variables are set at the site level
- Changes to env vars require a new deployment to take effect
- Access env vars: Site Settings → Environment variables

### Custom Domain (Optional)
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow Netlify's instructions to configure DNS

### SSL Certificate
- Netlify automatically provisions SSL certificates
- HTTPS is enforced by default
- No additional configuration needed

## Troubleshooting

### Build Failures

**Error: "ADMIN_SECRET environment variable is required"**
- Solution: Add ADMIN_SECRET in Netlify environment variables
- Go to Site settings → Environment variables → Add variable

**Error: "DATABASE_URL environment variable is required"**
- Solution: Create a PostgreSQL database and add DATABASE_URL
- Recommended providers: Neon (neon.tech), Supabase (supabase.com), or Heroku Postgres
- Add the connection string to Netlify environment variables

**Error: "Build command failed"**
- Check build logs in Netlify dashboard
- Ensure all dependencies are in package.json
- Verify Node version compatibility

### Runtime Issues

**Admin panel not working**
- Verify ADMIN_SECRET is correctly set in Netlify
- Clear browser cache and try again
- Check browser console for errors

**Pricing not updating**
- Promo status is cached for 30 seconds on client
- Try hard refreshing the page (Ctrl+Shift+R or Cmd+Shift+R)
- Verify promo slots are > 0 in admin panel

**API requests failing**
- Check Netlify function logs in dashboard
- Verify API redirects are working in `netlify.toml`

## Updating the Site

After making code changes:

1. **Via GitHub** (if using Git integration)
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
   - Netlify will automatically deploy

2. **Via CLI**
   ```bash
   netlify deploy --prod
   ```

## Support

For issues with:
- **Netlify deployment**: Check [Netlify Docs](https://docs.netlify.com)
- **Application bugs**: Review error logs in Netlify Functions
- **Promo system**: Access admin panel and check slot counts

## Production Checklist

Before going live:
- [ ] ADMIN_SECRET is set and secure
- [ ] DATABASE_URL is set with a valid PostgreSQL connection
- [ ] Database tables are created (auto-created on first API call)
- [ ] All pages load correctly
- [ ] WhatsApp links work properly
- [ ] Admin panel is accessible and functional
- [ ] Promo system updates in real-time and persists across page reloads
- [ ] Mobile responsive design works on all devices
- [ ] SEO meta tags are correct
- [ ] Custom domain configured (if desired)
- [ ] SSL certificate is active

## Contact Information

For technical support or questions about deployment, contact:
- Website: OptiSolve Labs
- WhatsApp: (Your WhatsApp number)
