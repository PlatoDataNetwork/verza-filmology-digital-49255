import { useEffect } from 'react';

export const useWebsiteSchema = () => {
  useEffect(() => {
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "VERZA TV",
      "alternateName": "Verza TV",
      "url": "https://verzatv.io/",
      "description": "The first U.S. platform for premium short-form vertical entertainment. From the founder of E! Entertainment Television.",
      "publisher": {
        "@type": "Organization",
        "name": "VERZA TV",
        "logo": {
          "@type": "ImageObject",
          "url": "https://verzatv.io/og-image.png"
        }
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://verzatv.io/?s={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      },
      "sameAs": [
        "https://twitter.com/verzatv",
        "https://www.tiktok.com/@verzatv",
        "https://www.instagram.com/verzatv",
        "https://www.facebook.com/verzatv"
      ],
      "inLanguage": "en-US",
      "copyrightYear": 2025,
      "copyrightHolder": {
        "@type": "Organization",
        "name": "Filmology Labs"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'website-schema';
    script.text = JSON.stringify(websiteSchema);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('website-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);
};
