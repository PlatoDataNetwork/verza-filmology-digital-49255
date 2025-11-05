import { useEffect } from 'react';

export interface VideoSchemaProps {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string; // ISO 8601 duration format (e.g., "PT1M30S" for 1 minute 30 seconds)
  contentUrl?: string;
  embedUrl?: string;
  width?: number;
  height?: number;
}

export const useVideoSchema = (videos: VideoSchemaProps | VideoSchemaProps[]) => {
  useEffect(() => {
    const videoArray = Array.isArray(videos) ? videos : [videos];
    
    const videoSchemas = videoArray.map((video, index) => ({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": video.name,
      "description": video.description,
      "thumbnailUrl": video.thumbnailUrl,
      "uploadDate": video.uploadDate,
      "duration": video.duration,
      "contentUrl": video.contentUrl,
      "embedUrl": video.embedUrl,
      "publisher": {
        "@type": "Organization",
        "name": "VERZA TV",
        "logo": {
          "@type": "ImageObject",
          "url": "https://verzatv.io/og-image.png"
        }
      },
      "author": {
        "@type": "Organization",
        "name": "VERZA TV"
      },
      ...(video.width && video.height && {
        "width": video.width,
        "height": video.height
      }),
      "inLanguage": "en-US"
    }));

    const scripts = videoSchemas.map((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `video-schema-${index}`;
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
      return script;
    });

    return () => {
      scripts.forEach((_, index) => {
        const existingScript = document.getElementById(`video-schema-${index}`);
        if (existingScript) {
          document.head.removeChild(existingScript);
        }
      });
    };
  }, [videos]);
};
