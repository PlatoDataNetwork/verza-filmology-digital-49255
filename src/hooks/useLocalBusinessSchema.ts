import { useEffect } from 'react';

interface LocalBusinessSchemaProps {
  name: string;
  description: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  telephone?: string;
  email?: string;
  url: string;
  logo?: string;
  image?: string;
  priceRange?: string;
  openingHours?: string[];
  sameAs?: string[];
}

export const useLocalBusinessSchema = (business: LocalBusinessSchemaProps) => {
  useEffect(() => {
    const localBusinessSchema: Record<string, any> = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": business.name,
      "description": business.description,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": business.address.streetAddress,
        "addressLocality": business.address.addressLocality,
        "addressRegion": business.address.addressRegion,
        "postalCode": business.address.postalCode,
        "addressCountry": business.address.addressCountry
      },
      "url": business.url
    };

    if (business.telephone) localBusinessSchema.telephone = business.telephone;
    if (business.email) localBusinessSchema.email = business.email;
    if (business.logo) {
      localBusinessSchema.logo = {
        "@type": "ImageObject",
        "url": business.logo
      };
    }
    if (business.image) localBusinessSchema.image = business.image;
    if (business.priceRange) localBusinessSchema.priceRange = business.priceRange;
    if (business.openingHours && business.openingHours.length > 0) {
      localBusinessSchema.openingHoursSpecification = business.openingHours.map(hours => ({
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": hours.split(' ')[0],
        "opens": hours.split(' ')[1],
        "closes": hours.split(' ')[2]
      }));
    }
    if (business.sameAs && business.sameAs.length > 0) localBusinessSchema.sameAs = business.sameAs;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'local-business-schema';
    script.text = JSON.stringify(localBusinessSchema);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('local-business-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [business]);
};
