import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { useEffect } from "react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  const baseUrl = "https://verzatv.io";
  
  // Generate structured data for breadcrumbs
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label,
        "item": `${baseUrl}${item.href}`
      }))
    };
    
    // Remove existing breadcrumb structured data if present
    const existingScript = document.querySelector('script[data-breadcrumb-schema]');
    if (existingScript) {
      existingScript.remove();
    }
    
    // Add new breadcrumb structured data
    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-breadcrumb-schema', 'true');
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    // Cleanup on unmount
    return () => {
      const scriptToRemove = document.querySelector('script[data-breadcrumb-schema]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [items, baseUrl]);
  
  return (
    <nav aria-label="Breadcrumb" className="mb-6 md:mb-8">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            )}
            {index === items.length - 1 ? (
              <span 
                className="text-foreground font-medium flex items-center gap-1.5"
                aria-current="page"
              >
                {index === 0 && <Home className="h-4 w-4" />}
                {item.label}
              </span>
            ) : (
              <Link
                to={item.href}
                className="hover:text-primary transition-colors flex items-center gap-1.5"
              >
                {index === 0 && <Home className="h-4 w-4" />}
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
