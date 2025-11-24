import { Shield, Award, Lock, TrendingUp, DollarSign, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Shield,
    title: "Verified Providers",
    description: "All legal service providers are thoroughly verified and authenticated",
    color: "from-primary to-primary/50"
  },
  {
    icon: Award,
    title: "Rating & Reviews",
    description: "Transparent rating system based on client feedback and case success rates",
    color: "from-gold to-gold/50"
  },
  {
    icon: Lock,
    title: "S-Locker Security",
    description: "Secure document storage with encrypted S-locker for all your legal files",
    color: "from-success to-success/50"
  },
  {
    icon: TrendingUp,
    title: "Incentive System",
    description: "Providers earn rewards and bonuses based on ratings and service quality",
    color: "from-accent to-accent/50"
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "Standardized service fees with no hidden charges. Pay only for services used",
    color: "from-primary to-accent"
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Book instant consultations or schedule appointments at your convenience",
    color: "from-gold to-accent"
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Why Choose <span className="text-gradient-gold">SamadhanMitra</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Experience the future of legal services with our comprehensive platform features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.title}
                className="group hover:shadow-elegant transition-all duration-300 border-2 hover:border-accent/50 relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-gradient-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
