import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileDock } from "@/components/MobileDock";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useMeta } from "@/hooks/useMeta";
import { useOrganizationSchema } from "@/hooks/useOrganizationSchema";
import { usePersonSchema } from "@/hooks/usePersonSchema";

const About = () => {
  
  useOrganizationSchema();
  
  usePersonSchema({
    name: "Alan Mruvka",
    jobTitle: "Founder & CEO",
    description: "Founder of E! Entertainment Television and VERZA TV. Visionary entrepreneur revolutionizing vertical entertainment and mobile-first content.",
    url: "https://verzatv.io/about",
    image: "https://verzatv.io/og-image.png",
    worksFor: {
      name: "VERZA TV",
      url: "https://verzatv.io"
    },
    knowsAbout: [
      "Entertainment Technology",
      "Vertical Video Content",
      "Mobile Streaming",
      "Content Production",
      "Media Business",
      "Television Broadcasting"
    ],
    sameAs: [
      "https://www.imdb.com/name/nm0612067/",
      "https://en.wikipedia.org/wiki/Alan_Mruvka"
    ]
  });
  
  useMeta({
    title: "About VERZA TV - Revolutionary Vertical Entertainment",
    description: "Learn about VERZA TV's mission to revolutionize vertical entertainment with micro dramas, reality content, and premium originals from the founders of E! Entertainment Television.",
    keywords: "VERZA TV, about, vertical entertainment, micro dramas, reality content, mobile streaming, E! Entertainment",
    canonical: "https://verzatv.io/about",
    ogTitle: "About VERZA TV - Revolutionary Vertical Entertainment",
    ogDescription: "Learn about VERZA TV's mission to revolutionize vertical entertainment with micro dramas, reality content, and premium originals.",
    ogUrl: "https://verzatv.io/about",
  });
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />

      {/* Content */}
      <main className="py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground mb-6 md:mb-8 tracking-tight">
            About VERZA TV
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 md:mb-16 leading-relaxed">
            The next evolution in vertical entertainment
          </p>

          <div className="space-y-12 md:space-y-16 text-foreground/90">
            {/* Our Vision */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Our Vision</h2>
              <p className="text-base md:text-lg leading-relaxed">
                VERZA TV is pioneering the future of short-form vertical content. We believe that compelling stories don't need hours to be told—they need the right format, the right creators, and the right platform. From micro dramas that captivate in minutes to reality content that keeps you coming back, we're building the destination for vertical entertainment.
              </p>
            </section>

            {/* Our Mission */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Our Mission</h2>
              <p className="text-base md:text-lg leading-relaxed">
                We're on a mission to revolutionize how people discover and consume content. By combining cutting-edge technology with creative storytelling, VERZA TV delivers premium vertical content that fits seamlessly into your life—whether you have 30 seconds or 30 minutes.
              </p>
            </section>

            {/* What We Offer */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">What We Offer</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">Micro Dramas</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Binge-worthy serialized content designed for vertical viewing. Each episode delivers complete story arcs in bite-sized formats, perfect for today's mobile-first audience.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">Reality Content</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Unscripted, authentic moments that capture real life in vertical format. From lifestyle content to trending challenges, we bring you closer to the action.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">Premium Originals</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Exclusive content you won't find anywhere else. Our original productions push the boundaries of vertical storytelling with high production value and compelling narratives.
                  </p>
                </div>
              </div>
            </section>

            {/* Our Heritage */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Our Heritage</h2>
              <p className="text-base md:text-lg leading-relaxed">
                Founded by the visionary behind E! Entertainment Television, VERZA TV brings decades of entertainment industry expertise to the vertical content revolution. We understand what audiences want because we've been creating groundbreaking content for generations.
              </p>
            </section>

            {/* Market Opportunity */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">The Opportunity</h2>
              <p className="text-base md:text-lg leading-relaxed">
                The vertical content market is experiencing explosive growth, with an $11 billion market size and over 150 million downloads across leading platforms. VERZA TV is positioned at the forefront of this transformation, serving audiences from 18 to 65+ who demand premium, mobile-optimized entertainment.
              </p>
            </section>

            {/* Technology */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Our Technology</h2>
              <p className="text-base md:text-lg leading-relaxed">
                Built on cutting-edge streaming technology, VERZA TV delivers seamless, high-quality vertical video experiences optimized for mobile devices. Our platform uses advanced recommendation algorithms to surface content you'll love, while our adaptive streaming ensures perfect playback on any connection.
              </p>
            </section>

            {/* Values */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Our Values</h2>
              <ul className="space-y-3 text-base md:text-lg leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span><strong>Innovation First:</strong> We constantly push boundaries to redefine what's possible in vertical content.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span><strong>Quality Content:</strong> Every piece of content on our platform meets the highest standards of production and storytelling.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span><strong>User Experience:</strong> Your time is valuable. We design every feature to maximize engagement and enjoyment.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span><strong>Creator Support:</strong> We empower creators with the tools and platform to bring their vertical content visions to life.</span>
                </li>
              </ul>
            </section>

            {/* Join Us */}
            <section className="space-y-4 bg-muted/30 p-6 md:p-8 rounded-lg">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Join the Revolution</h2>
              <p className="text-base md:text-lg leading-relaxed">
                Whether you're a content creator, an industry professional, or someone who simply loves great entertainment, VERZA TV welcomes you to be part of the vertical content revolution. Together, we're shaping the future of how stories are told and consumed.
              </p>
              <div className="pt-4">
                <Link 
                  to="/#contact" 
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Get in touch →
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
      <MobileDock />
    </div>
  );
};

export default About;
