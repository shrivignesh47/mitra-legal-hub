import { Button } from "@/components/ui/button";
import { Scale, Menu, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Scale className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-bold text-gradient-primary">SamadhanMitra</span>
              <span className="text-xs text-muted-foreground">Legal Services Marketplace</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              Services
            </a>
            <a href="#providers" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              Find Providers
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              How It Works
            </a>
            <a href="#about" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              About
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                  Dashboard
                </Button>
                <Button variant="ghost" onClick={signOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/auth')}>
                  Sign In
                </Button>
                <Button className="bg-primary hover:bg-primary/90" onClick={() => navigate('/auth')}>
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <a href="#services" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
                Services
              </a>
              <a href="#providers" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
                Find Providers
              </a>
              <a href="#how-it-works" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
                How It Works
              </a>
              <a href="#about" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
                About
              </a>
              <div className="flex flex-col gap-2 pt-2">
                {user ? (
                  <>
                    <Button variant="ghost" className="w-full" onClick={() => navigate('/dashboard')}>
                      Dashboard
                    </Button>
                    <Button variant="ghost" className="w-full" onClick={signOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" className="w-full" onClick={() => navigate('/auth')}>
                      Sign In
                    </Button>
                    <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => navigate('/auth')}>
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
