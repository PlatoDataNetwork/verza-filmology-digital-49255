import { useEffect, useRef, useState } from 'react';

interface UseLazyImageOptions {
  src: string;
  placeholder?: string;
  rootMargin?: string;
}

export const useLazyImage = ({ src, placeholder = '', rootMargin = '50px' }: UseLazyImageOptions) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            setIsLoaded(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin }
    );

    observer.observe(imageRef.current);

    return () => {
      observer.disconnect();
    };
  }, [src, rootMargin]);

  return { imageSrc, isLoaded, imageRef };
};
