import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be less than 255 characters"),
  company: z.string().trim().max(200, "Company must be less than 200 characters").optional().default(""),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message must be less than 2000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const Contact = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as keyof ContactFormData;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setIsSubmitting(true);
    // Form is validated but not connected to a backend yet
    toast({ title: "Message validated", description: "Contact form backend coming soon." });
    setIsSubmitting(false);
  };

  return (
    <section 
      id="contact" 
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-8 md:py-10 lg:py-12 bg-background scroll-mt-20 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-4 md:mb-6 tracking-tight px-2">
              Let's innovate together.
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
              Ready to build the future of entertainment?
            </p>
          </div>

          <div className="bg-muted/30 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <Input 
                    placeholder="Name" 
                    value={formData.name}
                    onChange={e => handleChange("name", e.target.value)}
                    maxLength={100}
                    className="bg-background border-border/50 rounded-xl md:rounded-2xl h-12 md:h-14 px-4 focus:border-primary transition-colors text-base"
                  />
                  {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Input 
                    type="email" 
                    placeholder="Email"
                    value={formData.email}
                    onChange={e => handleChange("email", e.target.value)}
                    maxLength={255}
                    className="bg-background border-border/50 rounded-xl md:rounded-2xl h-12 md:h-14 px-4 focus:border-primary transition-colors text-base"
                  />
                  {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                </div>
              </div>
              <div>
                <Input 
                  placeholder="Company" 
                  value={formData.company}
                  onChange={e => handleChange("company", e.target.value)}
                  maxLength={200}
                  className="bg-background border-border/50 rounded-xl md:rounded-2xl h-12 md:h-14 px-4 focus:border-primary transition-colors text-base"
                />
                {errors.company && <p className="text-destructive text-sm mt-1">{errors.company}</p>}
              </div>
              <div>
                <Textarea 
                  placeholder="Message" 
                  rows={5}
                  value={formData.message}
                  onChange={e => handleChange("message", e.target.value)}
                  maxLength={2000}
                  className="bg-background border-border/50 rounded-xl md:rounded-2xl px-4 py-3 focus:border-primary transition-colors resize-none text-base"
                />
                {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}
              </div>
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-12 md:h-14 text-base font-medium transition-all hover:scale-[1.02] min-h-[48px]"
              >
                {isSubmitting ? "Sending..." : "Send message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
