import { Scale, Users, FileText, Stamp, PenTool } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const categories = [
  {
    icon: Scale,
    title: "Advocates",
    description: "Experienced lawyers for all legal matters",
    count: "5,000+",
    color: "from-primary to-primary/70"
  },
  {
    icon: Users,
    title: "Arbitrators",
    description: "Professional dispute resolution services",
    count: "1,500+",
    color: "from-accent to-accent/70"
  },
  {
    icon: Users,
    title: "Mediators",
    description: "Expert mediation for conflict resolution",
    count: "2,000+",
    color: "from-gold to-gold/70"
  },
  {
    icon: Stamp,
    title: "Notaries",
    description: "Quick and reliable notarization services",
    count: "3,000+",
    color: "from-success to-success/70"
  },
  {
    icon: PenTool,
    title: "Document Writers",
    description: "Professional legal documentation",
    count: "1,800+",
    color: "from-primary to-accent"
  }
];

const ServiceCategories = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Browse Legal <span className="text-gradient-primary">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Connect with verified legal service providers across multiple specializations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card 
                key={category.title}
                className="group hover:shadow-elegant transition-all duration-300 cursor-pointer border-2 hover:border-accent/50 relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-gradient-primary transition-colors">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="text-2xl font-bold text-accent">
                    {category.count}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Providers available
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
