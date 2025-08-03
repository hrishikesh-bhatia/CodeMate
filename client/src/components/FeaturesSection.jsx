import { 
  Code2, 
  Users, 
  Video, 
  Play, 
  Link, 
  Save,
  Zap,
  MessageSquare 
} from "lucide-react";

const features = [
  {
    icon: Link,
    title: "Instant Room Sharing",
    description: "Create or join collaborative sessions with unique room links or IDs in seconds.",
    color: "text-primary"
  },
  {
    icon: Code2,
    title: "Real-time Code Editing",
    description: "Write and edit code together with live cursor tracking and syntax highlighting.",
    color: "text-secondary"
  },
  {
    icon: Video,
    title: "Integrated Voice Chat",
    description: "Communicate seamlessly with built-in voice channels while coding together.",
    color: "text-accent"
  },
  {
    icon: Play,
    title: "Live Code Execution",
    description: "Run code instantly and view outputs, errors, and console logs in real-time.",
    color: "text-success"
  },
  {
    icon: Save,
    title: "Persistent Sessions",
    description: "Save your work and revisit collaborative sessions anytime with full history.",
    color: "text-primary"
  },
  {
    icon: MessageSquare,
    title: "Smart Collaboration",
    description: "Perfect for mentoring with role-based access and guided learning features.",
    color: "text-secondary"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Everything You Need to
            <br />
            <span className="bg-gradient-primary bg-clip-text">
              Code Together
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Powerful features designed for seamless collaboration between students and mentors
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-gradient-card p-8 rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-card hover:scale-105"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { number: "4+", label: "Programming Languages" },
            { number: "Real-time", label: "Collaboration" },
            { number: "Instant", label: "Code Execution" },
            { number: "24/7", label: "Session Persistence" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-primary bg-clip-text mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;