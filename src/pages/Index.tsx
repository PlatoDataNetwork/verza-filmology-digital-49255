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

const Index = () => {
  const location = useLocation();
  
  useOrganizationSchema();
  useWebsiteSchema();
  
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
