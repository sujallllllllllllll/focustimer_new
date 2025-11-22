# Vercel Deployment Checklist ✅

## Pre-Deployment Steps Completed
- ✅ Removed test/unused logo files
- ✅ Updated all URLs to focustimer.shop
- ✅ Added Google AdSense verification meta tag
- ✅ Removed console.log statements
- ✅ Cleaned up vercel.json
- ✅ Created .env.example

## Deploy to Vercel

### 1. Push to GitHub
```bash
git add .
git commit -m "Production ready - focustimer.shop"
git push origin main
```

### 2. Import to Vercel
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: (leave default)

### 3. Add Environment Variables (Optional)
In Vercel dashboard → Settings → Environment Variables:
```
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-6308926394211577
NEXT_PUBLIC_SITE_URL=https://focustimer.shop
```

### 4. Configure Custom Domain
1. Go to Project Settings → Domains
2. Add domain: `focustimer.shop`
3. Add domain: `www.focustimer.shop`
4. Follow DNS configuration instructions

### 5. Post-Deployment
- ✅ Test all timer pages
- ✅ Verify AdSense meta tag in page source
- ✅ Check sitemap.xml at /sitemap.xml
- ✅ Check robots.txt at /robots.txt
- ✅ Test PWA installation
- ✅ Test offline functionality
- ✅ Submit sitemap to Google Search Console

## Important URLs
- Site: https://focustimer.shop
- Sitemap: https://focustimer.shop/sitemap.xml
- Robots: https://focustimer.shop/robots.txt

## Google AdSense Next Steps
1. Wait for domain verification (automatic via meta tag)
2. Create ad units in AdSense dashboard
3. Implement ad components (see README.md)
4. Test ads in production

## Performance Optimization
- ✅ Images optimized with Next.js Image
- ✅ Fonts optimized with next/font
- ✅ Static generation enabled
- ✅ PWA manifest configured
- ✅ SEO metadata complete

## Support
For issues, check Vercel deployment logs in dashboard.
