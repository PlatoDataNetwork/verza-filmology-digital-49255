import { useEffect } from 'react';

interface ArticleSchemaProps {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
  publisher?: {
    name: string;
    logo: string;
  };
  url: string;
}

export const useArticleSchema = (articles: ArticleSchemaProps | ArticleSchemaProps[]) => {
  useEffect(() => {
    const articleArray = Array.isArray(articles) ? articles : [articles];
    
    const defaultPublisher = {
      "@type": "Organization",
      "name": "VERZA TV",
      "logo": {
        "@type": "ImageObject",
        "url": "https://verzatv.io/og-image.png"
      }
    };

    const schemas = articleArray.map((article) => ({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.headline,
      "description": article.description,
      "image": article.image,
      "datePublished": article.datePublished,
      "dateModified": article.dateModified || article.datePublished,
      "author": {
        "@type": "Person",
        "name": article.author.name,
        "url": article.author.url
      },
      "publisher": article.publisher ? {
        "@type": "Organization",
        "name": article.publisher.name,
        "logo": {
          "@type": "ImageObject",
          "url": article.publisher.logo
        }
      } : defaultPublisher,
      "url": article.url,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": article.url
      }
    }));

    const scriptIds: string[] = [];
    
    schemas.forEach((schema, index) => {
      const scriptId = `article-schema-${index}`;
      scriptIds.push(scriptId);
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = scriptId;
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      scriptIds.forEach(id => {
        const existingScript = document.getElementById(id);
        if (existingScript) {
          document.head.removeChild(existingScript);
        }
      });
    };
  }, [articles]);
};
