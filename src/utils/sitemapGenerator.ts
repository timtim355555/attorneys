export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

export const generateSitemap = (lawyers: any[], baseUrl: string = 'https://precious-sherbet-ca08de.netlify.app'): string => {
  const urls: SitemapUrl[] = [
    // Static pages
    {
      loc: baseUrl,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: '1.0'
    },
    {
      loc: `${baseUrl}/lawyers`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: '0.9'
    },
    {
      loc: `${baseUrl}/practice-areas`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: `${baseUrl}/about-us`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '0.6'
    },
    {
      loc: `${baseUrl}/contact-us`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '0.6'
    },
    {
      loc: `${baseUrl}/privacy-policy`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '0.5'
    },
    {
      loc: `${baseUrl}/terms-conditions`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '0.5'
    },
    {
      loc: `${baseUrl}/disclaimer`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '0.5'
    }
  ];

  // Add lawyer profile URLs
  lawyers.forEach(lawyer => {
    // Generate SEO-friendly URL for primary practice area only (avoid duplicate content)
    if (lawyer.practiceAreas && lawyer.practiceAreas.length > 0) {
      const practiceArea = lawyer.practiceAreas[0]; // Use primary practice area
      const practiceAreaSlug = practiceArea.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      
      const locationSlug = lawyer.location.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

      urls.push({
        loc: `${baseUrl}/best-attorney-for-${practiceAreaSlug}-in-${locationSlug}-2025`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.9'
      });
    }
    
    // Also add traditional lawyer profile URL as backup
    const nameSlug = lawyer.name.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    urls.push({
      loc: `${baseUrl}/lawyer/${lawyer.id}/${nameSlug}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.8'
    });
  });

  // Add practice area URLs
  const practiceAreas = [...new Set(lawyers.flatMap(lawyer => lawyer.practiceAreas))];
  practiceAreas.forEach(area => {
    const areaSlug = area.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    urls.push({
      loc: `${baseUrl}/practice-area/${areaSlug}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.7'
    });
  });

  // Add location URLs
  const locations = [...new Set(lawyers.map(lawyer => lawyer.location))];
  locations.forEach(location => {
    const locationSlug = location.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    urls.push({
      loc: `${baseUrl}/lawyers-in/${locationSlug}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.6'
    });
  });

  // Generate XML
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  const urlsetClose = '</urlset>';

  const urlElements = urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n');

  return xmlHeader + urlsetOpen + urlElements + '\n' + urlsetClose;
};

export const downloadSitemap = (lawyers: any[], filename: string = 'sitemap.xml') => {
  const sitemapContent = generateSitemap(lawyers);
  const blob = new Blob([sitemapContent], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const generateRobotsTxt = (baseUrl: string = 'https://precious-sherbet-ca08de.netlify.app'): string => {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Allow all important pages
Allow: /lawyer/
Allow: /practice-area/
Allow: /lawyers-in/
Allow: /best-attorney-for-*

# Allow legal pages
Allow: /about-us
Allow: /contact-us
Allow: /privacy-policy
Allow: /terms-conditions
Allow: /disclaimer

# Disallow admin and management areas
Disallow: /admin/
Disallow: /api/
Disallow: /*.json$
Disallow: /*?*
Disallow: /bulk-manager
Disallow: /sitemap-manager

# Allow CSS, JS, and images for better rendering
Allow: /static/
Allow: /*.css
Allow: /*.js
Allow: /*.png
Allow: /*.jpg
Allow: /*.jpeg
Allow: /*.gif
Allow: /*.svg
Allow: /*.ico

# Enhanced crawling for specific practice areas
Allow: /best-attorney-for-corporate-law-*
Allow: /best-attorney-for-criminal-defense-*
Allow: /best-attorney-for-family-law-*
Allow: /best-attorney-for-personal-injury-*
Allow: /best-attorney-for-real-estate-law-*
Allow: /best-attorney-for-immigration-law-*
Allow: /best-attorney-for-tax-law-*
Allow: /best-attorney-for-employment-law-*
Allow: /best-attorney-for-intellectual-property-*
Allow: /best-attorney-for-estate-planning-*
`;
};

export const downloadRobotsTxt = (filename: string = 'robots.txt') => {
  const robotsContent = generateRobotsTxt();
  const blob = new Blob([robotsContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};