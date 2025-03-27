
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="container mx-auto px-4 md:px-6 py-6 flex justify-between items-center">
        <Logo size="large" />
        <Button 
          onClick={() => navigate("/login")}
          className="bg-brand-yellow text-black hover:bg-brand-yellow/90"
        >
          Sign In
        </Button>
      </header>

      <main className="flex-1 flex flex-col">
        <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
              alt="Background" 
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <div className="max-w-3xl mx-auto space-y-6 animate-slide-up">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Unlimited movies, TV shows, and more
              </h1>
              <p className="text-xl md:text-2xl text-foreground/80">
                Watch anywhere. Cancel anytime.
              </p>
              <div className="pt-4">
                <Button 
                  onClick={() => navigate("/login")}
                  className="bg-brand-yellow text-black hover:bg-brand-yellow/90 text-lg py-6 px-8"
                  size="lg"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 md:px-6 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-secondary/50 backdrop-blur-sm p-8 rounded-xl text-center animate-scale-in">
              <h3 className="text-2xl font-bold mb-4">Watch Everywhere</h3>
              <p className="text-foreground/80">Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
            </div>
            <div className="bg-secondary/50 backdrop-blur-sm p-8 rounded-xl text-center animate-scale-in">
              <h3 className="text-2xl font-bold mb-4">Premium Content</h3>
              <p className="text-foreground/80">Access premium movies with a single payment - no subscription required.</p>
            </div>
            <div className="bg-secondary/50 backdrop-blur-sm p-8 rounded-xl text-center animate-scale-in">
              <h3 className="text-2xl font-bold mb-4">HD Quality</h3>
              <p className="text-foreground/80">Experience crisp, clear HD streaming on all your favorite devices.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-secondary py-10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Logo size="medium" />
          <p className="mt-4 text-sm text-foreground/60">© 2023 Infix. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
