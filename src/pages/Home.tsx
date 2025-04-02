import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { allMovies, featuredMovies, getFreeMovies, getPremiumMovies, getMoviesByGenre } from "@/lib/moviesData";
import { allTVShows, getFreeTVShows } from "@/lib/tvShowsData";
import FeaturedMovie from "@/components/FeaturedMovie";
import MovieCard from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, Upload, Award } from "lucide-react";

const Home = () => {
  const { isAuthenticated, user } = useAuth();
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
  const animeMovies = getMoviesByGenre("Anime");
  const shortFilms = getMoviesByGenre("Short Film");
  const bookMovies = getMoviesByGenre("Book");

  return (
    <div className="min-h-screen bg-background">
      <FeaturedMovie movie={featuredMovie} />
      
      <div className="container mx-auto px-4 md:px-6 py-12 space-y-16">
        {user && (
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Earn Points by Watching Ads</h3>
              <p className="text-gray-300">Watch short ads and earn points to unlock premium content!</p>
              <div className="mt-2 text-brand-yellow font-medium">Your current points: {user.points || 0}</div>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <Button 
                className="bg-brand-yellow text-black hover:bg-brand-yellow/90"
                onClick={() => navigate("/watch-ads")}
              >
                <Play className="mr-2 h-4 w-4" /> Watch Ads
              </Button>
              <Button 
                variant="outline" 
                className="border-brand-yellow text-brand-yellow hover:bg-brand-yellow/10"
                onClick={() => navigate("/upload-shortfilm")}
              >
                <Upload className="mr-2 h-4 w-4" /> Upload Short Film
              </Button>
            </div>
          </div>
        )}

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
          <h2 className="text-2xl font-bold">Anime</h2>
          <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {animeMovies.length > 0 ? (
              animeMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No anime content available yet.
              </div>
            )}
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Short Films</h2>
          <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {shortFilms.length > 0 ? (
              shortFilms.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                <p>No short films available yet.</p>
                <Link to="/upload-shortfilm">
                  <Button variant="link" className="text-brand-yellow mt-2">
                    <Upload className="mr-2 h-4 w-4" /> Upload your own short film
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Books</h2>
          <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {bookMovies.length > 0 ? (
              bookMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No book content available yet.
              </div>
            )}
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
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">TV Shows</h2>
          <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {allTVShows.slice(0, 8).map((show) => (
              <MovieCard key={show.id} movie={{
                id: show.id,
                title: show.title,
                description: show.description,
                thumbnailUrl: show.thumbnailUrl,
                bannerUrl: show.bannerUrl,
                year: show.year,
                genre: show.genre,
                isPremium: show.isPremium,
                price: show.price,
                duration: `${show.seasons} seasons`,
                director: show.creator,
                cast: show.cast,
                rating: show.rating
              }} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
