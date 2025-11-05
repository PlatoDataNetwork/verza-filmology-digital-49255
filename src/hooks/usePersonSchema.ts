import { useEffect } from 'react';

interface PersonSchemaProps {
  name: string;
  jobTitle?: string;
  description?: string;
  url?: string;
  image?: string;
  sameAs?: string[];
  worksFor?: {
    name: string;
    url?: string;
  };
  alumniOf?: string[];
  knowsAbout?: string[];
}

export const usePersonSchema = (person: PersonSchemaProps) => {
  useEffect(() => {
    const personSchema: Record<string, any> = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": person.name,
    };

    if (person.jobTitle) personSchema.jobTitle = person.jobTitle;
    if (person.description) personSchema.description = person.description;
    if (person.url) personSchema.url = person.url;
    if (person.image) personSchema.image = person.image;
    if (person.sameAs && person.sameAs.length > 0) personSchema.sameAs = person.sameAs;
    
    if (person.worksFor) {
      personSchema.worksFor = {
        "@type": "Organization",
        "name": person.worksFor.name,
        ...(person.worksFor.url && { "url": person.worksFor.url })
      };
    }

    if (person.alumniOf && person.alumniOf.length > 0) personSchema.alumniOf = person.alumniOf;
    if (person.knowsAbout && person.knowsAbout.length > 0) personSchema.knowsAbout = person.knowsAbout;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'person-schema';
    script.text = JSON.stringify(personSchema);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('person-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [person]);
};
