
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { allMovies, featuredMovies, getFreeMovies, getPremiumMovies, getMoviesByGenre } from "@/lib/moviesData";
import FeaturedMovie from "@/components/FeaturedMovie";
import MovieCard from "@/components/MovieCard";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const featuredMovie = featuredMovies[0];
  const freeMovies = getFreeMovies();
  const premiumMovies = getPremiumMovies();
  const actionMovies = getMoviesByGenre("Action");
  const dramaMovies = getMoviesByGenre("Drama");

  return (
    <div className="min-h-screen bg-background">
      <FeaturedMovie movie={featuredMovie} />
      
      <div className="container mx-auto px-4 md:px-6 py-12 space-y-16">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Trending Now</h2>
          <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {allMovies.slice(0, 8).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Premium Movies</h2>
          <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {premiumMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Free to Watch</h2>
          <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {freeMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Action</h2>
          <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {actionMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Drama</h2>
          <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {dramaMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
