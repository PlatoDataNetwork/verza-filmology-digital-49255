import { Hero } from "@/components/Hero";
import { Opportunity } from "@/components/Opportunity";
import { Solution } from "@/components/Solution";
import { Content } from "@/components/Content";
import { Founder } from "@/components/Founder";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
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
