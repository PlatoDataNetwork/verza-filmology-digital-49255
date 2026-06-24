import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Package = {
  label: string;
  title: string;
  price: string;
  description: string[];
  sections: { heading: string; items: string[] }[];
  startingPrice?: { label: string; note: string };
};

const packages: Package[] = [
  {
    label: "Package 1",
    title: "Collaborative Brand-Centered Microdrama",
    price: "Starting at $400,000",
    description: [
      "Transform your brand into entertainment.",
      "VERZA TV develops, writes, produces, directs, and distributes a custom original microdrama built around your brand, product, service, mission, or customer story.",
      "Unlike a commercial, this is a premium entertainment experience designed to engage audiences while naturally integrating your brand throughout the storyline.",
    ],
    sections: [
      {
        heading: "Includes",
        items: [
          "Recognizable talent",
          "Original screenplay development",
          "Story concept creation",
          "Professional casting",
          "Production and filming",
          "Directing and editing",
          "Brand integration throughout storyline",
          "60–90 minutes of premium content",
          "Distribution on VERZA TV",
          "Delivery of all content assets",
          "Rights for brand distribution across owned channels",
        ],
      },
      {
        heading: "Distribution Rights",
        items: [
          "Website",
          "Social media",
          "YouTube",
          "Events",
          "Sales presentations",
          "Internal communications",
          "Marketing campaigns",
          "Paid advertising",
        ],
      },
      {
        heading: "Ideal For",
        items: [
          "Consumer brands",
          "Retail companies",
          "Hospitality brands",
          "Travel companies",
          "Financial services firms",
          "Healthcare brands",
          "Technology companies",
          "Major product launches",
        ],
      },
    ],
    startingPrice: {
      label: "$400,000+",
      note: "Pricing varies based on production complexity, cast requirements, locations, and distribution strategy.",
    },
  },
  {
    label: "Package 2",
    title: "Platform Advertising Package",
    price: "Starting at $20,000 per Month",
    description: [
      "Reach highly engaged viewers through premium advertising placements across the VERZA TV platform.",
    ],
    sections: [
      {
        heading: "Available Placements",
        items: [
          "Pre-roll video ads",
          "Mid-roll video ads",
          "Homepage placements",
          "Featured content sponsorships",
          "Branded content recommendations",
          "Category sponsorships",
          "App-wide display placements",
        ],
      },
      {
        heading: "Includes",
        items: [
          "Dedicated campaign management",
          "Audience targeting options",
          "Performance reporting",
          "Creative consultation",
          "Monthly campaign optimization",
        ],
      },
      {
        heading: "Ideal For",
        items: [
          "Brand awareness campaigns",
          "Product launches",
          "Mobile app promotion",
          "Entertainment marketing",
          "Consumer products",
          "Retail promotions",
        ],
      },
    ],
    startingPrice: {
      label: "$20,000/month",
      note: "Custom annual and enterprise packages available.",
    },
  },
  {
    label: "Package 3",
    title: "Product Placement Partnership",
    price: "Starting at $10,000",
    description: [
      "Place your product, service, or brand directly within a VERZA TV original microdrama.",
      "Rather than interrupting the viewing experience, your brand becomes part of the story.",
    ],
    sections: [
      {
        heading: "Includes",
        items: [
          "Product featured within a VERZA-produced microdrama",
          "Organic on-screen integration",
          "Brand visibility throughout key scenes",
          "Creative collaboration with VERZA production team",
          "Brand approval on placement execution",
          "Featured in content distributed across VERZA TV",
        ],
      },
      {
        heading: "Ideal For",
        items: [
          "Consumer products",
          "Beauty brands",
          "Fashion brands",
          "Food & beverage companies",
          "Restaurants",
          "Travel brands",
          "Apps & technology companies",
        ],
      },
    ],
    startingPrice: {
      label: "$10,000+",
      note: "Pricing varies based on placement prominence, screen time, and production requirements.",
    },
  },
  {
    label: "Package 4",
    title: "VERZA TV App Marketplace & Commerce Partnership",
    price: "Setup Fee + Revenue Share",
    description: [
      "Sell your products on the VERZA TV app marketplace section.",
      "Turn viewers into customers.",
      "VERZA TV's integrated marketplace allows brands to sell products directly to engaged audiences through a seamless entertainment and commerce experience.",
      "Whether featured within content, promoted through the platform, or discovered organically by viewers, brands can connect storytelling directly to sales.",
    ],
    sections: [
      {
        heading: "Includes",
        items: [
          "Dedicated brand storefront within the VERZA marketplace",
          "Product listings and catalog management",
          "Direct purchase capability through the platform",
          "Featured placement opportunities",
          "Integration with relevant content and audience categories",
          "Performance and sales reporting",
          "Ongoing marketplace support",
        ],
      },
      {
        heading: "Commerce Opportunities",
        items: [
          "Featured Products",
          "Seasonal Promotions",
          "New Product Launches",
          "Creator-Recommended Products",
          "Content-Driven Commerce",
          "Exclusive Marketplace Offers",
          "Limited Edition Collections",
        ],
      },
      {
        heading: "Ideal For",
        items: [
          "Fashion Brands",
          "Beauty Brands",
          "Consumer Products",
          "Home Goods Companies",
          "Health & Wellness Brands",
          "Technology Products",
          "Collectibles & Merchandise",
          "Lifestyle Brands",
        ],
      },
      {
        heading: "Optional Add-Ons",
        items: [
          "Product Placement Integration",
          "Featured Homepage Placement",
          "Creator Collaborations",
          "Sponsored Collections",
          "Branded Microdramas",
          "Platform Advertising",
        ],
      },
    ],
    startingPrice: {
      label: "Setup Fee + Revenue Share",
      note: "Plus revenue share on marketplace sales. Custom enterprise commerce partnerships available.",
    },
  },
];

export const BrandPartnerships = () => {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-6 md:space-y-8">
            {packages.map((pkg) => (
              <Card key={pkg.label} className="overflow-hidden">
                <CardHeader className="bg-muted/40 border-b">
                  <p className="text-sm font-semibold text-primary uppercase tracking-widest">
                    {pkg.label}
                  </p>
                  <CardTitle className="text-2xl md:text-3xl">{pkg.title}</CardTitle>
                  <p className="text-lg font-semibold text-foreground">{pkg.price}</p>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-3 text-muted-foreground">
                    {pkg.description.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {pkg.sections.map((s) => (
                      <div key={s.heading}>
                        <h4 className="font-semibold text-foreground mb-3">{s.heading}</h4>
                        <ul className="space-y-2">
                          {s.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <svg
                                className="w-4 h-4 mt-0.5 text-primary shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  {pkg.startingPrice && (
                    <div className="border-t pt-4">
                      <p className="font-semibold text-foreground">
                        Starting Price: {pkg.startingPrice.label}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {pkg.startingPrice.note}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Why It Works */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-2xl">Why It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>Most advertising stops at awareness.</p>
              <p>
                VERZA TV allows brands to move consumers from discovery to engagement to purchase within a single ecosystem—transforming entertainment into a measurable commerce channel.
              </p>
            </CardContent>
          </Card>

          {/* Custom Enterprise Partnerships */}
          <Card className="mt-8 border-primary">
            <CardHeader>
              <CardTitle className="text-2xl">Custom Enterprise Partnerships</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                For larger brands seeking a fully integrated entertainment strategy, VERZA TV offers bespoke partnership opportunities that combine:
              </p>
              <ul className="grid sm:grid-cols-2 gap-2">
                {[
                  "Product Placement",
                  "Custom Microdramas",
                  "Platform Advertising",
                  "Sponsored Originals",
                  "Influencer Partnerships",
                  "Social Media Campaigns",
                  "Live Events",
                  "Creator Collaborations",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <svg
                      className="w-4 h-4 mt-0.5 text-primary shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="border-t pt-4 space-y-3">
                <p className="font-semibold text-foreground">Custom Pricing Available</p>
                <p className="text-muted-foreground">
                  Contact VERZA TV Partnerships for a tailored proposal.
                </p>
                <Button asChild>
                  <a href="mailto:info@verzatv.com">info@verzatv.com</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
