import { Hero } from "@/components/Hero";
import { Opportunity } from "@/components/Opportunity";
import { Solution } from "@/components/Solution";
import { Content } from "@/components/Content";
import { Founder } from "@/components/Founder";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Handle hash navigation on page load
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, []);
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
