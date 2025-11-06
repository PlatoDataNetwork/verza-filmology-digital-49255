import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Contact = () => {
  return (
    <section id="contact" className="py-8 md:py-12 lg:py-16 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-4 md:mb-6 tracking-tight px-2">
              Let's innovate together.
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
              Ready to build the future of entertainment?
            </p>
          </div>

          {/* Contact Form - Clean Apple style */}
          <div className="bg-muted/30 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12">
            <form className="space-y-4 md:space-y-6">
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <Input 
                    placeholder="Name" 
                    className="bg-background border-border/50 rounded-xl md:rounded-2xl h-12 md:h-14 px-4 focus:border-primary transition-colors text-base"
                  />
                </div>
                <div>
                  <Input 
                    type="email" 
                    placeholder="Email" 
                    className="bg-background border-border/50 rounded-xl md:rounded-2xl h-12 md:h-14 px-4 focus:border-primary transition-colors text-base"
                  />
                </div>
              </div>
              <div>
                <Input 
                  placeholder="Company" 
                  className="bg-background border-border/50 rounded-xl md:rounded-2xl h-12 md:h-14 px-4 focus:border-primary transition-colors text-base"
                />
              </div>
              <div>
                <Textarea 
                  placeholder="Message" 
                  rows={5}
                  className="bg-background border-border/50 rounded-xl md:rounded-2xl px-4 py-3 focus:border-primary transition-colors resize-none text-base"
                />
              </div>
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-12 md:h-14 text-base font-medium transition-all hover:scale-[1.02] min-h-[48px]"
              >
                Send message
              </Button>
            </form>
          </div>

          {/* Contact Info - Minimal presentation */}
          <div className="mt-12 md:mt-16 grid md:grid-cols-3 gap-6 md:gap-8 text-center">
            <div className="space-y-1 md:space-y-2">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">Phone</p>
              <a href="tel:+13105606055" className="text-sm sm:text-base text-foreground hover:text-primary transition-colors block">
                +1 (310) 560-6055
              </a>
            </div>
            <div className="space-y-1 md:space-y-2">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">Email</p>
              <a href="mailto:hello@verzatv.com" className="text-sm sm:text-base text-foreground hover:text-primary transition-colors block break-all">
                hello@verzatv.com
              </a>
            </div>
            <div className="space-y-1 md:space-y-2">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">Location</p>
              <p className="text-sm sm:text-base text-foreground">
                Los Angeles, CA
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
