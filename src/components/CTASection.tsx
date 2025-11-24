import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-accent/80" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Content */}
          <h2 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground leading-tight">
            Ready to Access Quality Legal Services?
          </h2>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
            Join thousands of satisfied citizens getting professional legal help through India's trusted marketplace
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-8 group shadow-elegant"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8"
            >
              Register as Provider
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary-foreground">100%</div>
              <div className="text-sm text-primary-foreground/80">Verified Providers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary-foreground">24/7</div>
              <div className="text-sm text-primary-foreground/80">Platform Support</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary-foreground">Secure</div>
              <div className="text-sm text-primary-foreground/80">Document Storage</div>
            </div>
          </div>

          {/* Government Badge */}
          <div className="pt-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold/20 border border-gold/30 backdrop-blur-sm">
              <span className="text-sm font-medium text-gold-foreground">
                🇮🇳 Supported by Ministry of Law and Justice, Government of India
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
