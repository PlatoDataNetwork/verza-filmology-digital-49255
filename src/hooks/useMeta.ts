import { useEffect } from 'react';

interface MetaTagsConfig {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
}

export const useMeta = (config: MetaTagsConfig) => {
  useEffect(() => {
    const baseUrl = 'https://verzatv.io';
    const defaultImage = `${baseUrl}/og-image.png`;
    
    // Update title
    if (config.title) {
      document.title = config.title;
    }
    
    // Helper function to update or create meta tag
    const updateMetaTag = (selector: string, attribute: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (attribute === 'property') {
          element.setAttribute('property', selector.replace('meta[property="', '').replace('"]', ''));
        } else {
          element.setAttribute('name', selector.replace('meta[name="', '').replace('"]', ''));
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };
    
    // Update standard meta tags
    if (config.description) {
      updateMetaTag('meta[name="description"]', 'name', config.description);
    }
    
    if (config.keywords) {
      updateMetaTag('meta[name="keywords"]', 'name', config.keywords);
    }
    
    // Update canonical URL
    if (config.canonical) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', config.canonical);
    }
    
    // Update Open Graph tags
    updateMetaTag('meta[property="og:title"]', 'property', config.ogTitle || config.title || '');
    updateMetaTag('meta[property="og:description"]', 'property', config.ogDescription || config.description || '');
    updateMetaTag('meta[property="og:image"]', 'property', config.ogImage || defaultImage);
    updateMetaTag('meta[property="og:url"]', 'property', config.ogUrl || baseUrl);
    updateMetaTag('meta[property="og:type"]', 'property', 'website');
    
    // Update Twitter Card tags
    updateMetaTag('meta[name="twitter:card"]', 'name', 'summary_large_image');
    updateMetaTag('meta[name="twitter:site"]', 'name', '@verzatv');
    updateMetaTag('meta[name="twitter:title"]', 'name', config.twitterTitle || config.ogTitle || config.title || '');
    updateMetaTag('meta[name="twitter:description"]', 'name', config.twitterDescription || config.ogDescription || config.description || '');
    updateMetaTag('meta[name="twitter:image"]', 'name', config.twitterImage || config.ogImage || defaultImage);
    
  }, [config]);
};
