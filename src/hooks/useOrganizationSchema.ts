import { useEffect } from 'react';

export const useOrganizationSchema = () => {
  useEffect(() => {
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "VERZA TV",
      "alternateName": "Verza TV",
      "description": "The first U.S. platform for premium short-form vertical entertainment. From the founder of E! Entertainment Television.",
      "url": "https://verzatv.io/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://verzatv.io/og-image.png",
        "width": 1200,
        "height": 630
      },
      "image": "https://verzatv.io/og-image.png",
      "sameAs": [
        "https://twitter.com/verzatv",
        "https://www.tiktok.com/@verzatv",
        "https://www.instagram.com/verzatv",
        "https://www.facebook.com/verzatv"
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "email": "info@verzatv.com",
          "contactType": "Customer Service",
          "areaServed": "US"
        },
        {
          "@type": "ContactPoint",
          "email": "press@verzatv.com",
          "contactType": "Public Relations"
        },
        {
          "@type": "ContactPoint",
          "email": "licensing@verzatv.com",
          "contactType": "Sales"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "6353 Hollywood Blvd",
        "addressLocality": "Hollywood",
        "addressRegion": "CA",
        "postalCode": "90028",
        "addressCountry": "US"
      },
      "founder": {
        "@type": "Person",
        "name": "Alan Mruvka",
        "description": "Founder of E! Entertainment Television"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'organization-schema';
    script.text = JSON.stringify(organizationSchema);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('organization-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);
};
