import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Link } from "react-router-dom";
import { ChevronLeft, Plus } from "lucide-react";
import { useState } from "react";
import { LoginDialog } from "@/components/LoginDialog";
import { useMeta } from "@/hooks/useMeta";
import { useOrganizationSchema } from "@/hooks/useOrganizationSchema";
import { useBreadcrumbSchema } from "@/hooks/useBreadcrumbSchema";
import { useFAQSchema } from "@/hooks/useFAQSchema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

const FAQ = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "FAQ", href: "/faq" }
  ];
  
  useOrganizationSchema();
  
  useBreadcrumbSchema([
    { name: "Home", url: "https://verzatv.io/" },
    { name: "FAQ", url: "https://verzatv.io/faq" }
  ]);
  
  useFAQSchema([
    {
      question: "What are VERZA TV's Terms of Use?",
      answer: "By accessing or using VERZA TV, you agree to be bound by our Terms of Use. These include maintaining account security, subscription payments, content usage restrictions, and prohibited conduct. We reserve the right to suspend or terminate accounts for violations."
    },
    {
      question: "How does VERZA TV protect my personal data?",
      answer: "VERZA TV implements industry-standard security measures to protect your personal information from unauthorized access, disclosure, or misuse. We collect account information, profile data, payment details, and usage data to provide and improve our services. You have the right to access, update, or delete your personal information at any time."
    },
    {
      question: "Can I share VERZA TV content with others?",
      answer: "No. All content on VERZA TV is protected by copyright and intellectual property laws. You receive a limited, non-exclusive, non-transferable license for personal, non-commercial use only. You may not copy, distribute, share, or create derivative works from our content without explicit written permission."
    },
    {
      question: "What is VERZA TV's refund policy?",
      answer: "Access to premium content requires a paid subscription. Subscriptions automatically renew unless cancelled before the renewal date. All payments are non-refundable except as required by law."
    },
    {
      question: "How can I use VERZA TV content for commercial purposes?",
      answer: "For commercial licensing, partnership opportunities, or permission to use our content, please contact us at licensing@verzatv.com. All content requires explicit written permission for commercial use."
    },
    {
      question: "Does VERZA TV provide professional advice?",
      answer: "No. The content on VERZA TV is for general entertainment purposes only and does not constitute professional advice. Before making any decisions based on information found on our platform, we strongly advise you to consult with appropriate professionals."
    },
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
  
  useMeta({
    title: "FAQ - Frequently Asked Questions - VERZA TV",
    description: "Find answers to common questions about VERZA TV, including terms of use, privacy, content licensing, subscriptions, and our platform features.",
    keywords: "VERZA TV FAQ, frequently asked questions, help, support, terms, privacy, licensing",
    canonical: "https://verzatv.io/faq",
    ogTitle: "FAQ - Frequently Asked Questions - VERZA TV",
    ogDescription: "Get answers to your questions about VERZA TV's platform, content, and policies.",
    ogUrl: "https://verzatv.io/faq",
  });

  return (
    <div className="min-h-screen bg-background">
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors min-h-[44px]">
              <ChevronLeft className="h-5 w-5" />
              <span className="font-medium">Back</span>
            </Link>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setLoginOpen(true)}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
              >
                Login
              </button>
              <Link 
                to="/news" 
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                News
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground mb-6 md:mb-8 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-12 md:mb-16">
            Find answers to common questions about VERZA TV
          </p>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1">
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-4 text-left font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-45">
                  What are VERZA TV's Terms of Use?
                  <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="text-muted-foreground">
                By accessing or using VERZA TV, you agree to be bound by our Terms of Use. These include maintaining account security, subscription payments, content usage restrictions, and prohibited conduct. We reserve the right to suspend or terminate accounts for violations.{" "}
                <Link to="/legal#terms-of-use" className="text-primary hover:underline">
                  Read full Terms of Use
                </Link>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-4 text-left font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-45">
                  How does VERZA TV protect my personal data?
                  <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="text-muted-foreground">
                VERZA TV implements industry-standard security measures to protect your personal information from unauthorized access, disclosure, or misuse. We collect account information, profile data, payment details, and usage data to provide and improve our services. You have the right to access, update, or delete your personal information at any time.{" "}
                <Link to="/legal#privacy" className="text-primary hover:underline">
                  Read Privacy Policy
                </Link>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-4 text-left font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-45">
                  Can I share VERZA TV content with others?
                  <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="text-muted-foreground">
                No. All content on VERZA TV is protected by copyright and intellectual property laws. You receive a limited, non-exclusive, non-transferable license for personal, non-commercial use only. You may not copy, distribute, share, or create derivative works from our content without explicit written permission.{" "}
                <Link to="/legal#licensing" className="text-primary hover:underline">
                  Read Licensing Terms
                </Link>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-4 text-left font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-45">
                  What is VERZA TV's refund policy?
                  <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="text-muted-foreground">
                Access to premium content requires a paid subscription. Subscriptions automatically renew unless cancelled before the renewal date. All payments are non-refundable except as required by law.{" "}
                <Link to="/legal#terms-of-use" className="text-primary hover:underline">
                  Read Terms of Use
                </Link>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-4 text-left font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-45">
                  How can I use VERZA TV content for commercial purposes?
                  <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="text-muted-foreground">
                For commercial licensing, partnership opportunities, or permission to use our content, please contact us at{" "}
                <a href="mailto:licensing@verzatv.com" className="text-primary hover:underline">
                  licensing@verzatv.com
                </a>
                . All content requires explicit written permission for commercial use.{" "}
                <Link to="/legal#licensing" className="text-primary hover:underline">
                  Read Licensing Terms
                </Link>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-4 text-left font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-45">
                  Does VERZA TV provide professional advice?
                  <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="text-muted-foreground">
                No. The content on VERZA TV is for general entertainment purposes only and does not constitute professional advice. Before making any decisions based on information found on our platform, we strongly advise you to consult with appropriate professionals.{" "}
                <Link to="/legal#disclaimer" className="text-primary hover:underline">
                  Read Disclaimer
                </Link>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-4 text-left font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-45">
                  What is VERZA TV?
                  <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="text-muted-foreground">
                VERZA TV is the first U.S. platform dedicated to premium short-form vertical entertainment. Founded by Alan Mruvka, the creator of E! Entertainment Television, VERZA TV delivers addictive microdramas optimized for mobile viewing.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-4 text-left font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-45">
                  Who founded VERZA TV?
                  <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="text-muted-foreground">
                VERZA TV was founded by Alan Mruvka, the visionary entrepreneur who created E! Entertainment Television. With decades of experience in entertainment media, Alan recognized the explosive opportunity in vertical short-form content.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-4 text-left font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-45">
                  What type of content does VERZA TV offer?
                  <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="text-muted-foreground">
                VERZA TV specializes in premium vertical microdramas designed for mobile-first audiences. Our content includes compelling stories across genres like romance, thriller, drama, and more, all optimized for vertical viewing on smartphones.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-4 text-left font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-45">
                  How is VERZA TV different from other streaming platforms?
                  <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="text-muted-foreground">
                VERZA TV is purpose-built for vertical short-form content, unlike traditional streaming platforms. We focus exclusively on premium microdramas that deliver complete storytelling experiences in bite-sized episodes, perfect for today's mobile-first generation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-11">
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-4 text-left font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-45">
                  Is VERZA TV available now?
                  <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="text-muted-foreground">
                VERZA TV is currently in development. We're building the next generation of entertainment for vertical shorts. Contact us at{" "}
                <a href="mailto:info@verzatv.com" className="text-primary hover:underline">
                  info@verzatv.com
                </a>
                {" "}to learn more about launch plans and partnership opportunities.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-16 p-6 bg-muted/30 rounded-lg border border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-2">Still have questions?</h2>
            <p className="text-muted-foreground mb-4">
              Can't find the answer you're looking for? Please reach out to our team.
            </p>
            <Link 
              to="/#contact" 
              className="text-primary hover:underline font-medium"
            >
              Contact us →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
