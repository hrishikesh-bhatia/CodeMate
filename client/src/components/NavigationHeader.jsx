import { Button } from "./ui/button";
import { Code2 } from "lucide-react";
import { useNavigate } from "react-router-dom";


const NavigationHeader = () => {
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Code2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">CodeMate</h1>
              <p className="text-xs text-muted-foreground">Collaborative Editor</p>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3  text-white px-4 py-2 rounded transition">
            <Button variant="ghost" size="default" className="hover:border-1 cursor-pointer" onClick={() => navigate("/Auth")} >
              Sign In
            </Button>
            <Button variant="default" size="default"  className="hover:border-1 cursor-pointer" onClick={() => navigate("/Auth")} >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};



export default NavigationHeader;