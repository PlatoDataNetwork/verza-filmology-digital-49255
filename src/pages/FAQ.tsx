import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileDock } from "@/components/MobileDock";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useMeta } from "@/hooks/useMeta";
import { useOrganizationSchema } from "@/hooks/useOrganizationSchema";
import { useFAQSchema } from "@/hooks/useFAQSchema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

type QA = { question: string; answer: string };
type Category = { title: string; items: QA[] };

const faqCategories: Category[] = [
  {
    title: "General",
    items: [
      {
        question: "What is VERZA TV?",
        answer:
          "VERZA TV is a mobile-first micro drama platform featuring premium short-form entertainment, including micro dramas, reality series, creator content, podcasts, talk shows, and more.",
      },
      {
        question: "What is a micro drama?",
        answer:
          "Micro-dramas are highly engaging scripted series told in short episodes designed for mobile viewing. Each episode is typically only a few minutes long, making them easy to binge-watch anywhere.",
      },
      {
        question: "Is VERZA TV free?",
        answer:
          "Many shows and episodes can be viewed for free. Additional content and premium experiences may require payment or individual show purchases.",
      },
      {
        question: "Does VERZA TV offer subscriptions?",
        answer: "No. VERZA TV currently does not offer subscription plans.",
      },
      {
        question: "Where can I download VERZA TV?",
        answer: "VERZA TV is available on the App Store and Google Play Store.",
      },
      {
        question: "What devices support VERZA TV?",
        answer:
          "VERZA TV is designed for mobile devices and supports both iOS and Android.",
      },
    ],
  },
  {
    title: "Creator Program",
    items: [
      {
        question: "What is the VERZA TV Creator Program?",
        answer:
          "The VERZA TV Creator Program allows creators to upload content, build an audience, and participate in revenue-sharing opportunities.",
      },
      {
        question: "How do I create a creator account?",
        answer:
          "Download the VERZA TV app and register for a creator account through the creator onboarding process within the platform.",
      },
      {
        question: "Who can become a creator?",
        answer:
          "Anyone with original content and the rights to distribute it may apply for a creator account.",
      },
      {
        question: "Is there a cost to become a creator?",
        answer: "No. Creating a creator account is free.",
      },
      {
        question: "How long does it take to get approved as a creator?",
        answer: "Most creator applications are reviewed within a few business days.",
      },
      {
        question: "Can I upload videos directly from my phone?",
        answer: "Yes. Creators can upload videos directly from their mobile devices.",
      },
      {
        question: "Can I upload videos from a computer?",
        answer:
          "Yes. Creators may upload content through the creator portal using a desktop or laptop computer.",
      },
      {
        question: "How long does it take for a video to upload?",
        answer:
          "Upload times vary depending on file size and internet speed. Most uploads are processed within a few minutes.",
      },
      {
        question: "How long does it take for my content to go live?",
        answer:
          "Most content is reviewed and published within 24–72 hours after submission.",
      },
      {
        question: "Can I edit a video after it has been uploaded?",
        answer:
          "Yes. Creators can update content information and submit revised versions when necessary.",
      },
      {
        question: "What type of content can I upload?",
        answer:
          "Creators can upload micro dramas, reality content, talk shows, podcasts, lifestyle content, entertainment content, and creator-led series.",
      },
      {
        question: "Does my content need to be vertical?",
        answer:
          "No. VERZA TV supports both vertical and horizontal content formats.",
      },
      {
        question: "Do I keep ownership of my content?",
        answer: "Yes. Creators retain ownership of their content.",
      },
      {
        question: "Can I upload content that is already on YouTube or other platforms?",
        answer: "Yes, provided you own the rights to the content.",
      },
      {
        question: "Can I upload an entire season at once?",
        answer:
          "Yes. Creators may upload individual episodes or entire seasons of content.",
      },
      {
        question: "Can I schedule content releases?",
        answer:
          "Yes. Creators can schedule content to be released at future dates and times.",
      },
      {
        question: "Can I create multiple series under one account?",
        answer:
          "Yes. Creators can manage multiple series and content franchises from a single creator account.",
      },
      {
        question: "Can creators have their own channel?",
        answer:
          "Yes. Every approved creator receives their own dedicated channel on VERZA TV where they can publish, manage, and monetize their content.",
      },
    ],
  },
  {
    title: "Monetization",
    items: [
      {
        question: "Can creators make money on VERZA TV?",
        answer:
          "Yes. VERZA TV offers revenue-sharing opportunities for qualifying creators.",
      },
      {
        question: "How does revenue sharing work?",
        answer:
          "Eligible creators receive a percentage of revenue generated through their content. Additional details are provided during creator onboarding.",
      },
      {
        question: "How much can creators earn on VERZA TV?",
        answer:
          "Creator earnings vary based on audience size, content performance, engagement, and purchases made through their channel. There is no cap on creator earnings.",
      },
      {
        question: "Is there a minimum audience size required to monetize?",
        answer: "No. Creators of all sizes are encouraged to apply.",
      },
      {
        question: "When do creators get paid?",
        answer:
          "Creator payouts are typically issued on a recurring payment schedule outlined in the creator agreement.",
      },
    ],
  },
  {
    title: "Content & Viewing",
    items: [
      {
        question: "How many shows are available on VERZA TV?",
        answer:
          "VERZA TV offers a growing library of micro dramas, creator content, reality programming, podcasts, and entertainment series.",
      },
      {
        question: "Can I watch shows without creating an account?",
        answer:
          "Some content may be available without registration, but creating an account provides access to additional features.",
      },
      {
        question: "Can I save shows for later?",
        answer: "Yes. Users can save content to watch later within the app.",
      },
      {
        question: "Can I follow my favorite creators?",
        answer:
          "Yes. Users can follow creators and receive updates when new content is released.",
      },
      {
        question: "Does VERZA TV release original content?",
        answer:
          "Yes. VERZA TV produces and distributes original micro dramas and exclusive creator content.",
      },
    ],
  },
  {
    title: "Content Requirements",
    items: [
      {
        question: "What video formats are supported?",
        answer:
          "VERZA TV supports industry-standard video formats including MP4 and MOV.",
      },
      {
        question: "What video quality is recommended?",
        answer:
          "For the best viewing experience, creators should upload videos in HD (1080p) or higher.",
      },
      {
        question: "Can I upload feature films?",
        answer:
          "Yes. VERZA TV supports both short-form and long-form content, including independent feature films.",
      },
      {
        question: "Can I upload podcasts?",
        answer: "Yes. Creators can upload podcast content and podcast video episodes.",
      },
      {
        question: "Do I need professional equipment to become a creator?",
        answer:
          "No. Many creators begin using smartphones and basic editing tools.",
      },
    ],
  },
  {
    title: "Audience Growth",
    items: [
      {
        question: "How do viewers discover my content?",
        answer:
          "VERZA TV uses content discovery tools, featured placements, recommendations, search functionality, and creator channels to help viewers discover content.",
      },
      {
        question: "Can I bring my audience from TikTok, Instagram, or YouTube?",
        answer:
          "Yes. Creators are encouraged to promote their VERZA TV channel across their existing social media platforms.",
      },
      {
        question: "Does VERZA TV help promote creators?",
        answer:
          "VERZA TV regularly features creators through social media, platform promotions, recommendations, and editorial content.",
      },
      {
        question: "Can viewers interact with creators?",
        answer:
          "Yes. VERZA TV is continually expanding tools that strengthen creator-audience engagement.",
      },
    ],
  },
  {
    title: "Technical Support",
    items: [
      {
        question: "The app isn't working. What should I do?",
        answer:
          "First, ensure you're using the latest version of the app. If problems persist, contact support.",
      },
      {
        question: "How do I report a bug?",
        answer: "Contact support through the app or email the VERZA TV support team.",
      },
      {
        question: "How do I contact customer support?",
        answer:
          "Visit the Help section within the app or email the support team directly.",
      },
      {
        question: "How do I delete my account?",
        answer:
          "Account deletion requests can be submitted through the app's settings or by contacting customer support.",
      },
    ],
  },
  {
    title: "Business & Partnerships",
    items: [
      {
        question: "Can brands advertise on VERZA TV?",
        answer:
          "Yes. VERZA TV offers advertising, sponsorship, product placement, and branded content opportunities.",
      },
      {
        question: "Can brands sponsor creator content?",
        answer:
          "Yes. Brands can work directly with creators and VERZA TV to develop sponsored content and branded storytelling campaigns.",
      },
      {
        question: "Can products be featured inside micro dramas?",
        answer:
          "Yes. VERZA TV actively supports product placement and brand integrations within content.",
      },
      {
        question: "Can viewers purchase products featured in content?",
        answer:
          "VERZA TV is developing commerce integrations that allow viewers to engage with and purchase products featured within select content experiences.",
      },
      {
        question: "Can studios distribute content on VERZA TV?",
        answer:
          "Yes. VERZA TV works with creators, producers, and studios to distribute content to a growing audience.",
      },
      {
        question: "How do I discuss a partnership with VERZA TV?",
        answer:
          "Please contact the VERZA TV business development team through the website or partnership inquiry form.",
      },
    ],
  },
  {
    title: "What Makes VERZA TV Different?",
    items: [
      {
        question: "How is VERZA TV different from TikTok?",
        answer:
          "TikTok is primarily focused on short-form social media content. VERZA TV is focused on premium storytelling, serialized micro dramas, creator-owned channels, and direct monetization opportunities.",
      },
      {
        question: "How is VERZA TV different from YouTube?",
        answer:
          "VERZA TV is purpose-built for micro dramas, premium entertainment, and creator monetization through a curated entertainment-focused ecosystem.",
      },
      {
        question: "Why are micro dramas becoming so popular?",
        answer:
          "Micro-dramas combine the storytelling depth of traditional television with the convenience of mobile-first viewing, making them ideal for modern audiences.",
      },
      {
        question: "Is VERZA TV only for micro dramas?",
        answer:
          "No. While micro dramas are a core focus, VERZA TV also supports podcasts, reality programming, creator content, talk shows, independent films, and other entertainment formats.",
      },
      {
        question: "What is VERZA TV's mission?",
        answer:
          "VERZA TV's mission is to become the digital theatre for the next generation by empowering creators, connecting audiences with compelling stories, and building the future of mobile entertainment.",
      },
    ],
  },
];

const FAQ = () => {
  useOrganizationSchema();

  useFAQSchema(faqCategories.flatMap((c) => c.items));

  useMeta({
    title: "FAQ - Frequently Asked Questions - VERZA TV",
    description:
      "Answers about VERZA TV: micro dramas, the Creator Program, monetization, viewing, content requirements, technical support, and brand partnerships.",
    keywords:
      "VERZA TV FAQ, frequently asked questions, micro drama, creator program, monetization, help, support, partnerships",
    canonical: "https://verzatv.io/faq",
    ogTitle: "FAQ - Frequently Asked Questions - VERZA TV",
    ogDescription:
      "Get answers to your questions about VERZA TV's platform, content, Creator Program, and policies.",
    ogUrl: "https://verzatv.io/faq",
  });

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />

      {/* Content */}
      <main className="py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground mb-6 md:mb-8 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-12 md:mb-16">
            Everything you need to know about VERZA TV — watching, creating, and growing.
          </p>

          <div className="space-y-12 md:space-y-16">
            {faqCategories.map((category) => (
              <section key={category.title}>
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 md:mb-6 tracking-tight">
                  {category.title}
                </h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {category.items.map((item, index) => (
                    <AccordionItem
                      key={item.question}
                      value={`${category.title}-${index}`}
                    >
                      <AccordionPrimitive.Header className="flex">
                        <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between gap-4 py-4 text-left font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-45">
                          {item.question}
                          <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                        </AccordionPrimitive.Trigger>
                      </AccordionPrimitive.Header>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ))}
          </div>

          <div className="mt-16 p-6 bg-muted/30 rounded-lg border border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-2">Still have questions?</h2>
            <p className="text-muted-foreground mb-4">
              Can't find the answer you're looking for? Please reach out to our team.
            </p>
            <Link to="/#contact" className="text-primary hover:underline font-medium">
              Contact us →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <MobileDock />
    </div>
  );
};

export default FAQ;
