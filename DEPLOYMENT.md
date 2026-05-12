/**
 * DEPLOYMENT.md - Production Deployment Guide
 */

# Deployment Guide

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] AdSense code integrated
- [ ] Analytics (GA4) configured
- [ ] Domain purchased and configured
- [ ] SSL certificate ready
- [ ] SEO metadata reviewed
- [ ] Performance tested (Core Web Vitals)
- [ ] Mobile responsiveness verified
- [ ] All pages tested
- [ ] Backup strategy in place

## Environment Setup

### 1. Environment Variables

```bash
# .env.production
NEXT_PUBLIC_GA_ID=G-YOUR-GA-ID
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-YOUR-ADSENSE-ID
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 2. Build Optimization

```bash
# Ensure build succeeds
npm run build

# Check build size
npm run analyze # (requires @next/bundle-analyzer)
```

## Deployment Options

### Option 1: Vercel (Recommended)

**Pros:** Easiest, automatic deployments, free tier, CDN included

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in dashboard
# Deploy to production
vercel --prod
```

**Vercel Configuration:**

Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "rewrites": [
    {
      "source": "/robots.txt",
      "destination": "/api/robots"
    }
  ]
}
```

### Option 2: Docker + Self-Hosted

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY .next ./.next
COPY public ./public

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t seo-tools .
docker run -p 3000:3000 seo-tools
```

### Option 3: Traditional VPS (AWS, DigitalOcean, Linode)

```bash
# SSH into server
ssh root@your-server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone <your-repo>
cd website_seo_tools

# Install dependencies
npm install

# Build
npm run build

# Use PM2 for process management
npm install -g pm2
pm2 start "npm start" --name "seo-tools"
pm2 startup
pm2 save
```

### Option 4: AWS Amplify

```bash
# Connect your GitHub repo
amplify init

# Deploy
amplify publish
```

## Domain & SSL

### 1. Domain Configuration

1. Purchase domain (Namecheap, GoDaddy, Route53)
2. Point to hosting provider
3. Update DNS records

**For Vercel:**
- Add domain in project settings
- Vercel provides DNS records
- Update nameservers at registrar
- SSL certificate auto-provisioned

**For self-hosted:**
- Point A record to server IP
- Install Let's Encrypt SSL
  ```bash
  sudo apt-get install certbot
  sudo certbot certonly --standalone -d yourdomain.com
  ```

### 2. HTTPS Setup

All traffic should be HTTPS:

```nginx
# nginx.conf
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    # ... proxy to Next.js
}
```

## Performance Optimization

### 1. CDN Configuration

**Vercel:** Automatic global CDN

**Self-hosted:**
- Use CloudFront (AWS)
- Use Cloudflare (free tier available)
- Configure cache rules

```
# Cache strategy
Static files (JS, CSS)  → 1 year
Images                 → 30 days
HTML pages             → 1 hour
API routes             → no-cache
```

### 2. Monitoring

```bash
# Install PM2 monitoring
pm2 install pm2-auto-pull
pm2 install pm2-logrotate

# Check status
pm2 status
pm2 logs
```

### 3. Performance Testing

```bash
# Lighthouse
npm run lighthouse

# Puppeteer performance
npm run perf-test

# Load testing
npm install -g artillery
artillery run load-test.yml
```

## Database Setup (When Scaling)

### PostgreSQL Setup

```bash
# Install PostgreSQL
sudo apt-get install postgresql

# Create database
sudo -u postgres createdb seo_tools_db

# Setup Prisma
npm install @prisma/client
npm install -D prisma

# Generate client
npx prisma generate

# Deploy schema
npx prisma migrate deploy
```

## Monitoring & Logging

### 1. Google Analytics Setup

1. Create GA4 property
2. Add to `.env.production`
3. Track:
   - Tool usage
   - Page views
   - User flow
   - Conversions

### 2. Error Tracking (Optional)

```bash
# Sentry
npm install @sentry/nextjs

# Initialize
npx @sentry/wizard@latest -i nextjs
```

### 3. Server Logs

```bash
# Vercel: View logs in dashboard
vercel logs

# Self-hosted: PM2 logs
pm2 logs
pm2 logs --lines 100
```

## AdSense Setup

### 1. AdSense Account

1. Sign up at https://adsense.google.com
2. Add website
3. Get Publisher ID (ca-pub-XXXXXX)

### 2. Integration

```bash
# Add to .env.production
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-YOUR-ID

# Update ad components
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR-ID"
  crossOrigin="anonymous"
></script>
```

### 3. Ad Approval

- Usually takes 3-7 days
- Ensure quality content
- Proper compliance pages
- Natural ad placement

## Post-Deployment

### 1. Verify Everything

```bash
# Test homepage
curl https://yourdomain.com

# Test tools
curl https://yourdomain.com/tools/word-counter

# Check SEO
curl -I https://yourdomain.com/sitemap.xml

# Verify robots.txt
curl https://yourdomain.com/robots.txt
```

### 2. Submit to Search Engines

1. **Google Search Console**
   - Add property
   - Submit sitemap
   - Request indexing

2. **Bing Webmaster Tools**
   - Add site
   - Submit sitemap

3. **Google Analytics**
   - Verify tracking

### 3. Backups

```bash
# Daily backup script
0 2 * * * pg_dump seo_tools_db > /backups/db-$(date +\%Y\%m\%d).sql
0 2 * * * tar -czf /backups/app-$(date +\%Y\%m\%d).tar.gz /app
```

### 4. Monitoring Alerts

Set up alerts for:
- High error rates
- Performance degradation
- Disk space
- CPU usage
- Memory usage

## Scaling Checklist

As traffic grows:

- [ ] Upgrade server specs (2x CPU, 2x RAM)
- [ ] Implement database connection pooling
- [ ] Add Redis caching layer
- [ ] Implement rate limiting
- [ ] Setup load balancing
- [ ] Archive old logs
- [ ] Increase backup frequency
- [ ] Scale database replicas
- [ ] Implement CDN distribution
- [ ] Add monitoring dashboards

## Rollback Plan

If deployment fails:

```bash
# Vercel
vercel rollback

# Self-hosted with Git
git revert <commit-hash>
npm run build
pm2 restart all
```

## Maintenance

### Regular Tasks

- [ ] Daily: Check error logs
- [ ] Weekly: Review analytics
- [ ] Monthly: Update dependencies
- [ ] Monthly: Security patches
- [ ] Quarterly: Performance audit
- [ ] Annually: Audit review

### Security Updates

```bash
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix

# Update packages
npm update
```

## Troubleshooting

### High Memory Usage
- Check for memory leaks
- Restart application
- Scale up server

### Slow Performance
- Check Core Web Vitals
- Review database queries
- Check CDN status
- Optimize images

### SSL Errors
- Renew Let's Encrypt certificate
- Check certificate expiry
- Update Vercel domain

### Database Errors
- Check connection pool
- Verify credentials
- Check disk space
- Review slow queries

---

**Need help?** Check server logs with `pm2 logs` or Vercel dashboard logs.
