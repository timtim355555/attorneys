import React from 'react';
import { Lawyer } from '../types/lawyer';
import { generateMetaTags, generateFAQSchema, generateLocalBusinessSchema } from '../utils/seoHelpers';

interface SEOHeadProps {
  type: 'homepage' | 'lawyer' | 'practiceArea' | 'location';
  data?: {
    lawyer?: Lawyer;
    practiceArea?: string;
    location?: string;
  };
}

export const SEOHead: React.FC<SEOHeadProps> = ({ type, data }) => {
  const metaTags = generateMetaTags(type, data);
  
  if (!metaTags) return null;

  React.useEffect(() => {
    // Update document title
    document.title = metaTags.title;
    
    // Update meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', metaTags.canonical);

    // Update meta tags
    updateMetaTag('description', metaTags.description);
    updateMetaTag('keywords', metaTags.keywords);
    updateMetaTag('og:title', metaTags.ogTitle, true);
    updateMetaTag('og:description', metaTags.ogDescription, true);
    updateMetaTag('og:image', metaTags.ogImage, true);
    updateMetaTag('og:url', metaTags.ogUrl, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', metaTags.ogTitle);
    updateMetaTag('twitter:description', metaTags.ogDescription);
    updateMetaTag('twitter:image', metaTags.ogImage);

    // Add structured data for lawyer profiles
    if (type === 'lawyer' && data?.lawyer) {
      const faqSchema = generateFAQSchema(data.lawyer);
      const businessSchema = generateLocalBusinessSchema(data.lawyer);
      
      // Remove existing structured data
      const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]');
      existingSchemas.forEach(schema => {
        if (schema.textContent?.includes('"@type": "FAQPage"') || 
            schema.textContent?.includes('"@type": "LegalService"')) {
          schema.remove();
        }
      });
      
      // Add FAQ schema
      const faqScript = document.createElement('script');
      faqScript.type = 'application/ld+json';
      faqScript.textContent = JSON.stringify(faqSchema);
      document.head.appendChild(faqScript);
      
      // Add Local Business schema
      const businessScript = document.createElement('script');
      businessScript.type = 'application/ld+json';
      businessScript.textContent = JSON.stringify(businessSchema);
      document.head.appendChild(businessScript);
    }
  }, [type, data, metaTags]);

  return null;
};