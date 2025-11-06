import { Header } from "@/components/Header";
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
import { useFAQSchema } from "@/hooks/useFAQSchema";
import { useLocalBusinessSchema } from "@/hooks/useLocalBusinessSchema";
import { useItemListSchema } from "@/hooks/useItemListSchema";

const Index = () => {
  const location = useLocation();
  
  useOrganizationSchema();
  useWebsiteSchema();
  
  useLocalBusinessSchema({
    name: "VERZA TV",
    description: "The first U.S. platform for premium short-form vertical entertainment. From the founders of E! Entertainment Television.",
    address: {
      streetAddress: "6353 Hollywood Blvd",
      addressLocality: "Hollywood",
      addressRegion: "CA",
      postalCode: "90028",
      addressCountry: "US"
    },
    telephone: "+1-310-560-6055",
    email: "info@verzatv.com",
    url: "https://verzatv.io/",
    logo: "https://verzatv.io/og-image.png",
    image: "https://verzatv.io/og-image.png",
    sameAs: [
      "https://twitter.com/verzatv",
      "https://www.tiktok.com/@verzatv",
      "https://www.instagram.com/verzatv",
      "https://www.facebook.com/verzatv"
    ]
  });
  
  useItemListSchema({
    name: "Featured VERZA TV Microdramas",
    description: "Premium vertical entertainment content on VERZA TV including microdramas, reality shows, and original series",
    items: [
      {
        name: "Ultimate Revenge: A Mother's Justice",
        description: "A gripping vertical drama about a mother seeking justice for her family",
        image: "https://verzatv.io/og-image.png"
      },
      {
        name: "Tech Billionaire's Secret Love",
        description: "A compelling romance microdrama following a tech mogul's hidden relationship",
        image: "https://verzatv.io/og-image.png"
      },
      {
        name: "The CEO's Double Life",
        description: "An addictive thriller revealing the secret identity of a powerful executive",
        image: "https://verzatv.io/og-image.png"
      }
    ]
  });
  
  useFAQSchema([
    {
      question: "What is VERZA TV?",
      answer: "VERZA TV is the first U.S. platform dedicated to premium short-form vertical entertainment. Founded by Alan Mruvka, the creator of E! Entertainment Television, VERZA TV delivers addictive microdramas optimized for mobile viewing."
    },
    {
      question: "Who founded VERZA TV?",
      answer: "VERZA TV was founded by Alan Mruvka, the visionary entrepreneur who created E! Entertainment Television. With decades of experience in entertainment media, Alan recognized the explosive opportunity in vertical short-form content."
    },
    {
      question: "What type of content does VERZA TV offer?",
      answer: "VERZA TV specializes in premium vertical microdramas designed for mobile-first audiences. Our content includes compelling stories across genres like romance, thriller, drama, and more, all optimized for vertical viewing on smartphones."
    },
    {
      question: "How is VERZA TV different from other streaming platforms?",
      answer: "VERZA TV is purpose-built for vertical short-form content, unlike traditional streaming platforms. We focus exclusively on premium microdramas that deliver complete storytelling experiences in bite-sized episodes, perfect for today's mobile-first generation."
    },
    {
      question: "Is VERZA TV available now?",
      answer: "VERZA TV is currently in development. We're building the next generation of entertainment for vertical shorts. Contact us at info@verzatv.com to learn more about launch plans and partnership opportunities."
    }
  ]);
  
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
    description: "From the founders of E! Entertainment Television. The first U.S. platform for premium short-form vertical entertainment.",
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
      <Header />
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
