import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServiceCategories from "@/components/ServiceCategories";
import FeaturedProviders from "@/components/FeaturedProviders";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ServiceCategories />
        <FeaturedProviders />
        <HowItWorks />
        <Features />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
