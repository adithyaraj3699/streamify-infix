
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Don't show navbar on login page
  if (location.pathname === "/login") {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md py-2 shadow-md" : "bg-gradient-to-b from-background/90 to-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Logo size="medium" />
          {isAuthenticated && (
            <nav className="hidden md:flex space-x-6">
              <Link 
                to="/home" 
                className={`text-sm font-medium transition-colors hover:text-brand-yellow ${
                  location.pathname === "/home" ? "text-brand-yellow" : "text-foreground/80"
                }`}
              >
                Home
              </Link>
              <Link 
                to="/movies" 
                className={`text-sm font-medium transition-colors hover:text-brand-yellow ${
                  location.pathname.includes("/movies") ? "text-brand-yellow" : "text-foreground/80"
                }`}
              >
                Movies
              </Link>
              <Link 
                to="/tv-shows" 
                className={`text-sm font-medium transition-colors hover:text-brand-yellow ${
                  location.pathname.includes("/tv-shows") ? "text-brand-yellow" : "text-foreground/80"
                }`}
              >
                TV Shows
              </Link>
              <Link 
                to="/my-list" 
                className={`text-sm font-medium transition-colors hover:text-brand-yellow ${
                  location.pathname === "/my-list" ? "text-brand-yellow" : "text-foreground/80"
                }`}
              >
                My List
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {user?.isAdmin && (
                <Link to="/admin">
                  <Button variant="outline" size="sm" className="hidden md:inline-flex">
                    Admin
                  </Button>
                </Link>
              )}
              <div className="flex items-center space-x-4">
                <Link to="/watch-ads" className="hidden md:flex items-center text-sm font-medium text-yellow-500">
                  <Award className="w-4 h-4 mr-1" />
                  <span>{user?.points || 0} points</span>
                </Link>
                <div className="hidden md:block text-sm font-medium">
                  {user?.name}
                </div>
                <Button onClick={logout} variant="ghost" size="sm" className="text-brand-yellow hover:text-brand-yellow/90">
                  Sign Out
                </Button>
              </div>
            </>
          ) : (
            <Link to="/login">
              <Button className="bg-brand-yellow text-black hover:bg-brand-yellow/90">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
