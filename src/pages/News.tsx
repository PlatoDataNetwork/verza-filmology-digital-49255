import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { LoginDialog } from "@/components/LoginDialog";
import verzaLogo from "@/assets/verza-logo.png";

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
    title: "New US-based microdrama streaming service on the way.",
    url: "https://thestreamable.com/verza-tv-microdrama-streaming-service-launching?utm_source=newsletter&utm_medium=email&utm_campaign=sendgrid"
  }
];

export default function News() {
  const [loginOpen, setLoginOpen] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
      
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src={verzaLogo} alt="Verza TV" className="h-8 w-auto" />
            </Link>
            <div className="flex items-center gap-4">
              <Link 
                to="/" 
                className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="font-medium">Back</span>
              </Link>
              <button 
                onClick={() => setLoginOpen(true)}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
              >
                Login
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12 md:py-16">
          {/* Page Header */}
          <div className="max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Verza TV in the News
            </h1>
            <p className="text-lg text-muted-foreground">
              The latest press coverage and articles about Verza TV's revolutionary microdrama platform.
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
                className="block p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold text-primary">
                        {article.publication}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {article.date}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                  </div>
                  <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
