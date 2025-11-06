import { useLazyImage } from "@/hooks/useLazyImage";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholder?: string;
  rootMargin?: string;
}

export const LazyImage = ({ 
  src, 
  alt, 
  placeholder = '', 
  rootMargin = '50px',
  className = '',
  ...props 
}: LazyImageProps) => {
  const { imageSrc, isLoaded, imageRef } = useLazyImage({ src, placeholder, rootMargin });

  return (
    <img
      ref={imageRef}
      src={imageSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      loading="lazy"
      {...props}
    />
  );
};
