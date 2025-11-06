import { Header } from "@/components/Header";
import { MobileDock } from "@/components/MobileDock";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Footer } from "@/components/Footer";
import { useMeta } from "@/hooks/useMeta";
import { useOrganizationSchema } from "@/hooks/useOrganizationSchema";
import { useArticleSchema } from "@/hooks/useArticleSchema";

const pressArticles = [
  {
    publication: "The Hollywood Reporter",
    date: "October 15, 2025",
    title: "E! Channel Founder to Launch the First U.S. Platform for Microdramas (Exclusive).",
    url: "https://www.hollywoodreporter.com/tv/tv-news/microdramas-come-to-america-verza-tv-vertical-soap-operas-1236401254/"
  },
  {
    publication: "IMDb News",
    date: "October 15, 2025",
    title: "E! Channel Founder to Launch the First U.S. Platform for Microdramas.",
    url: "https://www.imdb.com/news/ni65523634/?ref_=nwc_art_perm"
  },
  {
    publication: "StageRunner",
    date: "October 15, 2025",
    title: "Microdramas Go Mainstream: Fox Bets Big, Verza TV Launches, Unions Set the Rules.",
    url: "https://stagerunner.net/microdramas-go-mainstream-fox-bets-big-verza-tv-launches-unions-set-the-rules/"
  },
  {
    publication: "MSN",
    date: "October 15, 2025",
    title: "New US-based microdrama streaming service on the way.",
    url: "https://www.msn.com/en-us/tv/news/new-us-based-microdrama-streaming-service-on-the-way/ar-AA1OB9y4?apiversion=v2&domshim=1&noservercache=1&noservertelemetry=1&batchservertelemetry=1&renderwebcomponents=1&wcseo=1"
  },
  {
    publication: "The Streamable",
    date: "October 16, 2025",
    title: "E! Channel Founder to Launch the First U.S. Platform for Microdramas.",
    url: "https://thestreamable.com/verza-tv-microdrama-streaming-service-launching?utm_source=newsletter&utm_medium=email&utm_campaign=sendgrid"
  }
];

export default function News() {
  
  useOrganizationSchema();
  
  useArticleSchema(pressArticles.map(article => ({
    headline: article.title,
    description: `Coverage of VERZA TV from ${article.publication}. ${article.title}`,
    image: "https://verzatv.io/og-image.png",
    datePublished: new Date(article.date).toISOString(),
    author: {
      name: article.publication,
    },
    url: article.url
  })));
  
  useMeta({
    title: "VERZA TV in the News - Latest Press Coverage & Updates",
    description: "The latest press coverage and articles about VERZA TV's revolutionary microdrama platform, featuring coverage from The Hollywood Reporter, IMDb, and more.",
    keywords: "VERZA TV news, press coverage, microdramas, vertical entertainment, media coverage, Hollywood Reporter",
    canonical: "https://verzatv.io/news",
    ogTitle: "VERZA TV in the News - Latest Press Coverage",
    ogDescription: "Latest press coverage and articles about VERZA TV's revolutionary microdrama platform from major media outlets.",
    ogUrl: "https://verzatv.io/news",
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background pb-16 md:pb-0">
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12 md:py-16">
          {/* Page Header */}
          <div className="max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              VERZA TV in the News
            </h1>
            <p className="text-lg text-muted-foreground">
              The latest press coverage and articles about VERZA TV's revolutionary microdrama platform.
            </p>
          </div>

          {/* Press Articles */}
          <div className="max-w-4xl mx-auto space-y-6">
            {pressArticles.map((article, index) => (
              <a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 md:p-8 rounded-2xl border border-border bg-card hover:bg-muted/30 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                        {article.publication}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {article.date}
                      </span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-semibold mb-2 group-hover:text-primary transition-colors leading-tight">
                      {article.title}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary transition-colors mt-3">
                      <span>Read article</span>
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <MobileDock />
    </div>
  );
}
