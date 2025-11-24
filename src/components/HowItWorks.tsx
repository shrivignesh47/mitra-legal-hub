import { Search, UserCheck, MessageSquare, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search & Browse",
    description: "Find the right legal service provider based on specialization, location, and ratings",
    step: "01"
  },
  {
    icon: UserCheck,
    title: "Review Profiles",
    description: "Check provider credentials, experience, reviews, and success rates",
    step: "02"
  },
  {
    icon: MessageSquare,
    title: "Connect & Consult",
    description: "Reach out via chat or voice. Schedule instant or future consultations",
    step: "03"
  },
  {
    icon: CheckCircle,
    title: "Get Resolution",
    description: "Receive professional legal services with transparent pricing and secure document handling",
    step: "04"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            How <span className="text-gradient-primary">It Works</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Getting legal help has never been easier. Follow these simple steps to connect with the right legal expert
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection Lines for Desktop */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.title}
                className="relative group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 text-8xl font-display font-bold text-accent/10 group-hover:text-accent/20 transition-colors">
                  {step.step}
                </div>

                <div className="relative bg-card border-2 border-border rounded-2xl p-8 h-full hover:border-accent/50 hover:shadow-elegant transition-all duration-300">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <Icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-gradient-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow for Desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-14 -right-6 text-accent/40 text-2xl z-20">
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
