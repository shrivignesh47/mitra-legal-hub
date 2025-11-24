import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Award } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const providers = [
  {
    name: "Adv. Priya Sharma",
    specialization: "Civil Law",
    location: "Delhi",
    rating: 4.9,
    reviews: 234,
    cases: 450,
    experience: "15 years",
    verified: true,
    initials: "PS"
  },
  {
    name: "Adv. Rajesh Kumar",
    specialization: "Corporate Law",
    location: "Mumbai",
    rating: 4.8,
    reviews: 189,
    cases: 380,
    experience: "12 years",
    verified: true,
    initials: "RK"
  },
  {
    name: "Adv. Aisha Khan",
    specialization: "Family Law",
    location: "Bangalore",
    rating: 5.0,
    reviews: 156,
    cases: 290,
    experience: "10 years",
    verified: true,
    initials: "AK"
  },
  {
    name: "Adv. Vikram Singh",
    specialization: "Criminal Law",
    location: "Chennai",
    rating: 4.7,
    reviews: 203,
    cases: 520,
    experience: "18 years",
    verified: true,
    initials: "VS"
  }
];

const FeaturedProviders = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Top Rated <span className="text-gradient-gold">Legal Experts</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Connect with India's most trusted and experienced legal service providers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {providers.map((provider) => (
            <Card 
              key={provider.name}
              className="group hover:shadow-elegant transition-all duration-300 cursor-pointer border-2 hover:border-accent/50"
            >
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-accent/20 group-hover:border-accent/40 transition-colors">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-xl font-bold">
                        {provider.initials}
                      </AvatarFallback>
                    </Avatar>
                    {provider.verified && (
                      <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-success rounded-full flex items-center justify-center border-2 border-background">
                        <Award className="w-4 h-4 text-success-foreground" />
                      </div>
                    )}
                  </div>
                </div>
                
                <CardTitle className="text-lg group-hover:text-gradient-primary transition-colors">
                  {provider.name}
                </CardTitle>
                <CardDescription className="flex items-center justify-center gap-1">
                  <Badge variant="secondary" className="text-xs">
                    {provider.specialization}
                  </Badge>
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-center gap-1 text-gold">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-semibold">{provider.rating}</span>
                  <span className="text-muted-foreground text-sm">({provider.reviews})</span>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{provider.location}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-sm">
                  <div>
                    <div className="font-bold text-foreground">{provider.cases}+</div>
                    <div className="text-muted-foreground text-xs">Cases</div>
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{provider.experience}</div>
                    <div className="text-muted-foreground text-xs">Experience</div>
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-primary hover:bg-primary hover:text-primary-foreground"
          >
            View All Providers
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProviders;
