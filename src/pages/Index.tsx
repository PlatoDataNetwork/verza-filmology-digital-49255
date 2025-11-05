import { Hero } from "@/components/Hero";
import { Opportunity } from "@/components/Opportunity";
import { Solution } from "@/components/Solution";
import { Content } from "@/components/Content";
import { Founder } from "@/components/Founder";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMeta } from "@/hooks/useMeta";
import { useOrganizationSchema } from "@/hooks/useOrganizationSchema";
import { useWebsiteSchema } from "@/hooks/useWebsiteSchema";
import { useVideoSchema } from "@/hooks/useVideoSchema";

const Index = () => {
  const location = useLocation();
  
  useOrganizationSchema();
  useWebsiteSchema();
  
  useVideoSchema([
    {
      name: "Ultimate Revenge: A Mother's Justice",
      description: "A gripping vertical drama about a mother seeking justice for her family. Experience premium short-form entertainment designed for mobile viewing.",
      thumbnailUrl: "https://verzatv.io/og-image.png",
      uploadDate: "2024-01-15",
      duration: "PT2M30S",
      width: 1080,
      height: 1920
    },
    {
      name: "Tech Billionaire's Secret Love",
      description: "A compelling romance microdrama following a tech mogul's hidden relationship. Premium vertical content optimized for today's mobile-first audience.",
      thumbnailUrl: "https://verzatv.io/og-image.png",
      uploadDate: "2024-01-20",
      duration: "PT3M15S",
      width: 1080,
      height: 1920
    },
    {
      name: "The CEO's Double Life",
      description: "An addictive thriller revealing the secret identity of a powerful executive. Vertical storytelling at its finest on VERZA TV.",
      thumbnailUrl: "https://verzatv.io/og-image.png",
      uploadDate: "2024-02-01",
      duration: "PT2M45S",
      width: 1080,
      height: 1920
    }
  ]);
  
  useMeta({
    title: "Verza TV - The Next Generation of Vertical Shorts",
    description: "From the founder of E! Entertainment Television. The first U.S. platform for premium short-form vertical entertainment.",
    keywords: "short-form video, vertical content, mobile entertainment, streaming platform, Verza TV, microdramas",
    canonical: "https://verzatv.io/",
    ogUrl: "https://verzatv.io/",
    ogImage: "https://verzatv.io/og-image.png",
  });
  
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.substring(1));
      if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  }, [location]);
  return (
    <div className="min-h-screen">
      <Hero />
      <Opportunity />
      <Solution />
      <Content />
      <Founder />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
