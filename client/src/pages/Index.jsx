import NavigationHeader from "../components/NavigationHeader";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;