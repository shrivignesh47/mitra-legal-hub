import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Legal services in India" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-accent/75" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-sm font-medium text-gold-foreground">Ministry of Law and Justice Initiative</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-display font-bold text-primary-foreground leading-tight">
            Legal Services Made{" "}
            <span className="text-gradient-gold">Accessible</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
            Connect with trusted advocates, arbitrators, mediators, notaries, and document writers across India
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent to-gold rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
              <div className="relative flex items-center gap-3 bg-background p-3 rounded-2xl shadow-elegant">
                <Search className="w-5 h-5 text-muted-foreground ml-3" />
                <input
                  type="text"
                  placeholder="Search for advocates, legal services, or specializations..."
                  className="flex-1 bg-transparent border-none focus:outline-none text-foreground placeholder:text-muted-foreground"
                />
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button 
              size="lg" 
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg"
            >
              Find Legal Services
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Join as Provider
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">10,000+</div>
              <div className="text-sm text-primary-foreground/80">Legal Providers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">50,000+</div>
              <div className="text-sm text-primary-foreground/80">Cases Resolved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">4.8/5</div>
              <div className="text-sm text-primary-foreground/80">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
