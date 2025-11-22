# OptiSolve Labs - Netlify Deployment Guide

## Step-by-Step Instructions

### Prerequisites
- GitHub account with your code pushed
- Netlify account (free tier is fine)
- ADMIN_SECRET environment variable value: `optisolve-admin-2024-secure`

---

## Step 1: Push Your Code to GitHub

Before deploying, make sure your code is on GitHub:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit with a message
git commit -m "OptiSolve Labs - Ready for deployment"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR-USERNAME/optisolve-labs.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy to Netlify

### Option A: Using Netlify UI (Recommended for Beginners)

1. Go to **https://netlify.com** and sign in (or create a free account)

2. Click **"Add new site"** button (top right)

3. Choose **"Import an existing project"**

4. Select **GitHub** as your Git provider
   - You'll be asked to authorize Netlify to access your GitHub
   - Authorize when prompted

5. Select your **optisolve-labs** repository

6. Click **"Deploy site"**
   - Netlify will auto-detect build settings
   - Build command: `npm run build`
   - Publish directory: `dist/public`

7. **Add Environment Variables:**
   - While the site is building, go to **Site Settings** (top navigation)
   - Click **"Environment"** in left sidebar
   - Click **"Edit variables"**
   - Add new variable:
     - Key: `ADMIN_SECRET`
     - Value: `optisolve-admin-2024-secure`
   - Click **Save**

8. Netlify will automatically redeploy with the environment variables

9. Wait for deployment to complete (takes 2-5 minutes)

10. Your site will be live at: `https://[random-name].netlify.app`

---

### Option B: Using Netlify CLI (For Advanced Users)

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Build your project
npm run build

# Deploy
netlify deploy --prod
```

---

## Step 3: Set Up Environment Variables (If Not Done Yet)

If you didn't add environment variables during deployment:

1. Go to your Netlify site dashboard
2. Click **Site Settings** (top navigation)
3. Click **Environment** in left sidebar
4. Click **Edit variables**
5. Add:
   - **Key:** `ADMIN_SECRET`
   - **Value:** `optisolve-admin-2024-secure`
6. Click **Save**
7. Netlify will automatically redeploy

---

## Step 4: Verify Your Deployment

1. Visit your deployed site URL
2. Test all pages:
   - ✓ Home page loads
   - ✓ Navigate between all pages
   - ✓ Theme toggle button works (Sun/Moon icon)
   - ✓ Promo banner displays with "50% OFF"
   - ✓ Admin page works with password: `optisolve-admin-2024-secure`
   - ✓ WhatsApp buttons work on all pages

---

## Step 5: Set Up Custom Domain (Optional)

If you have a custom domain:

1. In Netlify dashboard, go to **Site Settings**
2. Click **Domain management**
3. Click **Add custom domain**
4. Enter your domain name
5. Netlify will provide DNS configuration instructions
6. Follow the instructions to point your domain to Netlify
7. SSL certificate is automatically provisioned

---

## Updating Your Site

After deployment, any changes you push to GitHub will automatically trigger a new deploy:

```bash
# Make your changes
git add .
git commit -m "Updated feature XYZ"
git push origin main

# Netlify automatically deploys!
# Check deployment status in Netlify dashboard
```

---

## Troubleshooting

### Build Failed
- Check build logs in Netlify dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version is 20

### Environment Variables Not Working
- Go to **Site Settings** → **Environment**
- Verify `ADMIN_SECRET` is set
- Trigger a manual redeploy (click **Trigger deploy**)

### Admin Panel Not Working
- Verify `ADMIN_SECRET` is correctly set: `optisolve-admin-2024-secure`
- Clear browser cache (Ctrl+Shift+R)
- Check browser console for errors

### Theme Toggle Not Working
- Clear browser local storage
- Hard refresh (Ctrl+Shift+R)
- Check that dark mode CSS is loaded (inspect element)

---

## Important Notes

- **Data Persistence**: Currently uses in-memory storage (data resets on server restart)
- **To Add Database**: Follow instructions in `replit.md` to switch to Supabase
- **SSL**: Automatically enabled by Netlify (HTTPS)
- **CDN**: Netlify automatically caches your site globally
- **Monitor**: Check Netlify dashboard for performance and errors

---

## Contact & Support

- **Netlify Docs**: https://docs.netlify.com
- **Build Issues**: Check Netlify function logs in dashboard
- **Questions**: See `DEPLOYMENT.md` for more details

---

**Your site is now live!** Share your Netlify URL with anyone and they can access your OptiSolve Labs website.
