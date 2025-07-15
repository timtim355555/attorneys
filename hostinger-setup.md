# 🚀 Complete Hostinger VPS Auto-Deployment Setup

## Step 1: VPS Initial Setup

### Connect to your Hostinger VPS:
```bash
ssh root@your-vps-ip
```

### Install required software:
```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Install Nginx
apt install nginx -y

# Install Git
apt install git -y

# Install PM2 (process manager)
npm install -g pm2

# Start and enable Nginx
systemctl start nginx
systemctl enable nginx
```

## Step 2: Setup Project Directory

```bash
# Create web directory
mkdir -p /var/www/html/your-domain
cd /var/www/html/your-domain

# Clone your GitHub repository (you'll create this)
git clone https://github.com/yourusername/lawyers-directory.git .

# Install dependencies
npm install

# Build the project
npm run build

# Set permissions
chown -R www-data:www-data /var/www/html/your-domain/
chmod -R 755 /var/www/html/your-domain/
```

## Step 3: Nginx Configuration

Create `/etc/nginx/sites-available/your-domain`:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    root /var/www/html/your-domain/dist;
    index index.html;

    # Handle React Router (SPA)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Optimize static files
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;
}
```

### Enable the site:
```bash
# Enable site
ln -s /etc/nginx/sites-available/your-domain /etc/nginx/sites-enabled/

# Remove default site
rm /etc/nginx/sites-enabled/default

# Test configuration
nginx -t

# Reload Nginx
systemctl reload nginx
```

## Step 4: SSL Certificate (Free)

```bash
# Install Certbot
apt install certbot python3-certbot-nginx -y

# Get SSL certificate
certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal (already set up by certbot)
```

## Step 5: GitHub Repository Setup

### On your local machine or in GitHub web interface:

1. **Create new repository**: `lawyers-directory`
2. **Upload all project files** from Bolt
3. **Add GitHub Secrets** (Repository Settings → Secrets and variables → Actions):
   - `VPS_HOST`: Your Hostinger VPS IP
   - `VPS_USERNAME`: root (or your username)
   - `VPS_PASSWORD`: Your VPS password
   - `VPS_PORT`: 22 (default SSH port)

## Step 6: Make Deploy Script Executable

On your VPS:
```bash
cd /var/www/html/your-domain
chmod +x deploy.sh
```

## Step 7: Test the Setup

### Manual test:
```bash
cd /var/www/html/your-domain
./deploy.sh
```

### Auto-deployment test:
1. Make any change in Bolt
2. Download/export the project
3. Push to GitHub
4. Watch GitHub Actions run
5. Check your live website!

## 🎯 Your Workflow After Setup:

```
1. Make changes in Bolt ✏️
2. Export/download project 📥
3. Push to GitHub 🚀
4. GitHub Actions automatically deploys 🤖
5. Live website updates instantly! ✅
```

## 🔧 Troubleshooting Commands:

```bash
# Check Nginx status
systemctl status nginx

# Check Nginx logs
tail -f /var/log/nginx/error.log

# Check if site is accessible
curl -I http://your-domain.com

# Restart services if needed
systemctl restart nginx

# Check deployment logs
cd /var/www/html/your-domain && git log --oneline -5
```

## 📱 Update Domain in Code:

Before deployment, update these files with your actual domain:
- `src/utils/seoHelpers.ts` - Change base URL
- `public/sitemap.xml` - Update all URLs
- `public/robots.txt` - Update sitemap URL