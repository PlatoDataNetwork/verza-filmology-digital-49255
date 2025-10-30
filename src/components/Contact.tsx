import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Contact = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-6 tracking-tight">
              Let's innovate together.
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Ready to build the future of entertainment?
            </p>
          </div>

          {/* Contact Form - Clean Apple style */}
          <div className="bg-muted/30 rounded-3xl p-8 md:p-12">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Input 
                    placeholder="Name" 
                    className="bg-background border-border/50 rounded-2xl h-12 px-4 focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <Input 
                    type="email" 
                    placeholder="Email" 
                    className="bg-background border-border/50 rounded-2xl h-12 px-4 focus:border-primary transition-colors"
                  />
                </div>
              </div>
              <div>
                <Input 
                  placeholder="Company" 
                  className="bg-background border-border/50 rounded-2xl h-12 px-4 focus:border-primary transition-colors"
                />
              </div>
              <div>
                <Textarea 
                  placeholder="Message" 
                  rows={5}
                  className="bg-background border-border/50 rounded-2xl px-4 py-3 focus:border-primary transition-colors resize-none"
                />
              </div>
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-12 text-base font-medium transition-all hover:scale-[1.02]"
              >
                Send message
              </Button>
            </form>
          </div>

          {/* Contact Info - Minimal presentation */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <a href="tel:+13105606055" className="text-base text-foreground hover:text-primary transition-colors">
                +1 (310) 560-6055
              </a>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <a href="mailto:hello@verzatv.com" className="text-base text-foreground hover:text-primary transition-colors">
                hello@verzatv.com
              </a>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Location</p>
              <p className="text-base text-foreground">
                Los Angeles, CA
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
