import { Button } from "./ui/button";
import { ArrowRight, Code2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-24 bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-4 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full px-6 py-3">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Join thousands of developers</span>
                <Code2 className="w-5 h-5 text-secondary" />
              </div>
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
              Ready to Start
              <br />
              <span className="bg-gradient-primary bg-clip-text">
                Coding Together?
              </span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join CodeMate today and transform the way you learn and teach programming. 
              Start collaborating in minutes, not hours.
            </p>

            {/* Main CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button variant="hero" size="xl" className="group min-w-48 hover:border-1 cursor-pointer" onClick={() => navigate("/Auth")}>
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl" className="min-w-48 hover:border-1 cursor-pointer" onClick={() => navigate("/Auth")}>
                Sign In
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-12 space-y-4">
              <p className="text-sm text-muted-foreground">
                Trusted by students and educators worldwide
              </p>
              <div className="flex justify-center items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Free to start</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Setup in 30 seconds</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;