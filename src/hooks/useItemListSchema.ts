import { useEffect } from 'react';

interface ListItem {
  name: string;
  url?: string;
  image?: string;
  description?: string;
}

interface ItemListSchemaProps {
  name: string;
  description?: string;
  items: ListItem[];
}

export const useItemListSchema = (itemList: ItemListSchemaProps) => {
  useEffect(() => {
    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": itemList.name,
      ...(itemList.description && { "description": itemList.description }),
      "itemListElement": itemList.items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        ...(item.url && { "url": item.url }),
        ...(item.image && { "image": item.image }),
        ...(item.description && { "description": item.description })
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'item-list-schema';
    script.text = JSON.stringify(itemListSchema);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('item-list-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [itemList]);
};
