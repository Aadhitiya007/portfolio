import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavigation = (id: string) => {
    onNavigate(id);
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm border-b border-gray-200' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <a 
              href="#" 
              className="text-primary font-bold text-2xl"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("hero");
              }}
            >
              Launchify
            </a>
          </div>
          
          <nav className="hidden md:flex space-x-8 items-center">
            <a 
              href="#features" 
              className={`font-medium transition duration-150 ${activeSection === 'features' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("features");
              }}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className={`font-medium transition duration-150 ${activeSection === 'how-it-works' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("how-it-works");
              }}
            >
              How it Works
            </a>
            <a 
              href="#faq" 
              className={`font-medium transition duration-150 ${activeSection === 'faq' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("faq");
              }}
            >
              FAQ
            </a>
            <Button
              className="shadow-md hover:shadow-lg"
              onClick={() => handleNavigation("waitlist")}
            >
              Join Waitlist
            </Button>
          </nav>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-600"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-3 space-y-3">
            <a 
              href="#features" 
              className={`block py-2 transition duration-150 ${activeSection === 'features' ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary font-medium'}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("features");
              }}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className={`block py-2 transition duration-150 ${activeSection === 'how-it-works' ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary font-medium'}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("how-it-works");
              }}
            >
              How it Works
            </a>
            <a 
              href="#faq" 
              className={`block py-2 transition duration-150 ${activeSection === 'faq' ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary font-medium'}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("faq");
              }}
            >
              FAQ
            </a>
            <Button
              className="w-full"
              onClick={() => handleNavigation("waitlist")}
            >
              Join Waitlist
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
