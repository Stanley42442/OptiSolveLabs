# OptiSolve Labs - GitHub & Netlify Deployment Guide

## Step 1: Create a GitHub Repository

1. Go to **github.com** and sign in to your account
2. Click the **"+"** icon in the top right → **"New repository"**
3. Name it: `optisolve-labs` (or any name you prefer)
4. **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**
6. You'll see commands to push an existing repository - follow the instructions below

## Step 2: Push Your Code to GitHub

Open your terminal and run these commands (replace the URL with your GitHub repo URL):

```bash
cd /path/to/optisolve-labs  # Navigate to your project folder

# If you haven't set up git credentials yet (do this once):
git config --global user.name "Your Name"
git config --global user.email "your-email@gmail.com"

# Add all changes
git add -A

# Commit the code
git commit -m "Initial commit: OptiSolve Labs - Professional website with admin panel"

# Add the GitHub remote (replace USERNAME and REPO_NAME with your values)
git remote add origin https://github.com/USERNAME/optisolve-labs.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Netlify

1. Go to **netlify.com** and sign in (create free account if needed)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your GitHub account (authorize Netlify)
4. Select your `optisolve-labs` repository
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist/public`
6. Add environment variable:
   - **Key:** `ADMIN_SECRET`
   - **Value:** `optisolve-admin-2024-secure`
7. Click **"Deploy"**

Netlify will automatically build and deploy your site. You'll get a `.netlify.app` domain (you can also add a custom domain later).

## Step 4: Auto-Deployment (Optional)

Now every time you push to GitHub, Netlify automatically rebuilds and deploys your site. Just commit and push:

```bash
git add -A
git commit -m "Your message here"
git push
```

## Important Notes

- **Database:** Currently using in-memory storage. For production persistence, upgrade to Supabase or use Replit's PostgreSQL
- **Emails:** Contact form emails are configured via Resend integration
- **Admin Access:** Password is `optisolve-admin-2024-secure` (change in admin panel and update in Netlify env vars)

## Troubleshooting

**"fatal: origin already exists"**
- Run: `git remote remove origin`
- Then add the new remote again

**Build fails on Netlify**
- Check that all required environment variables are set
- Ensure Node.js version is 18+ (Netlify default should work)

**Site shows errors after deployment**
- Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- Check Netlify deployment logs for detailed error messages
