
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { Award, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
              <div className="hidden md:flex items-center space-x-4">
                {user?.isAdmin && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10">
                      Admin
                    </Button>
                  </Link>
                )}
                <Link to="/watch-ads" className="flex items-center text-sm font-medium text-yellow-500">
                  <Award className="w-4 h-4 mr-1" />
                  <span>{user?.points || 0} points</span>
                </Link>
                <div className="text-sm font-medium">
                  {user?.name}
                </div>
                <Button onClick={logout} variant="ghost" size="sm" className="text-brand-yellow hover:text-brand-yellow/90">
                  Sign Out
                </Button>
              </div>

              {/* Mobile menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[80%] sm:w-[350px]">
                  <div className="flex flex-col h-full py-6">
                    <div className="flex items-center justify-between mb-8">
                      <Logo size="small" />
                    </div>
                    <nav className="flex flex-col space-y-6 flex-1">
                      <Link to="/home" className="text-lg font-medium">Home</Link>
                      <Link to="/movies" className="text-lg font-medium">Movies</Link>
                      <Link to="/tv-shows" className="text-lg font-medium">TV Shows</Link>
                      <Link to="/my-list" className="text-lg font-medium">My List</Link>
                      {user?.isAdmin && (
                        <Link to="/admin" className="text-lg font-medium">Admin</Link>
                      )}
                      <Link to="/watch-ads" className="flex items-center text-brand-yellow">
                        <Award className="w-5 h-5 mr-2" />
                        <span>{user?.points || 0} points</span>
                      </Link>
                    </nav>
                    <div className="pt-6 border-t border-border mt-auto">
                      <div className="mb-4 text-lg font-medium">{user?.name}</div>
                      <Button onClick={logout} variant="outline" className="w-full">
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
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
