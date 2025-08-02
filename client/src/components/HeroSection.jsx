import { Button } from "./ui/button";
import { Code, Users, Video, Play } from "lucide-react";
import heroImage from "./assets/hero-collaboration.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero flex items-center justify-center overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Code Together,
                <br />
                <span className="bg-gradient-primary bg-clip-text">
                  Learn Better
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                The ultimate collaborative code editor for students and mentors. 
                Write, execute, and learn together in real-time with integrated voice chat 
                and persistent sessions.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2">
                <Code className="w-4 h-4 text-primary" />
                <span className="text-sm">Real-time Editing</span>
              </div>
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2">
                <Video className="w-4 h-4 text-secondary" />
                <span className="text-sm">Voice Chat</span>
              </div>
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2">
                <Users className="w-4 h-4 text-accent" />
                <span className="text-sm">Collaborative</span>
              </div>
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2">
                <Play className="w-4 h-4 text-success" />
                <span className="text-sm">Code Execution</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl" className="group cursor-pointer">
                Get Started
                <Code className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Button>
              <Button variant="outline" size="xl" className="cursor-pointer">
                Sign In
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-card border border-border/50">
              <img 
                src={heroImage} 
                alt="Collaborative coding interface" 
                className="w-full h-auto"
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-primary rounded-2xl opacity-80 animate-bounce delay-500"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary rounded-xl opacity-60 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;