
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getMovieById, getMoviesByGenre, Movie } from "@/lib/moviesData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MovieCard from "@/components/MovieCard";
import { useToast } from "@/hooks/use-toast";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [movie, setMovie] = useState<Movie | undefined>(undefined);
  const [relatedMovies, setRelatedMovies] = useState<Movie[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (id) {
      const movieData = getMovieById(id);
      if (movieData) {
        setMovie(movieData);
        // Get related movies from the same genre
        if (movieData.genre.length > 0) {
          const related = getMoviesByGenre(movieData.genre[0]).filter(m => m.id !== id);
          setRelatedMovies(related);
        }
      }
    }
  }, [id, isAuthenticated, navigate]);

  const handlePlayMovie = () => {
    if (!movie) return;
    
    if (movie.isPremium && !paymentComplete) {
      toast({
        title: "Premium Content",
        description: "This movie requires payment to watch. Please proceed to payment.",
        variant: "default",
      });
      return;
    }
    
    setIsPlaying(true);
    toast({
      title: "Now Playing",
      description: `Enjoy watching ${movie.title}!`,
    });
  };

  const handleProceedToPayment = () => {
    if (!movie) return;
    navigate(`/payment/${movie.id}`);
  };

  const handleSimulatePayment = () => {
    if (!movie) return;
    
    setPaymentComplete(true);
    toast({
      title: "Payment Successful!",
      description: `You now have access to ${movie.title}`,
      variant: "default",
    });
  };

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
          <Link to="/home">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="relative w-full h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={movie.bannerUrl} 
            alt={movie.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white text-shadow animate-fade-in">{movie.title}</h1>
            
            <div className="flex items-center space-x-3 mb-4 animate-fade-in">
              <span className="text-brand-yellow font-medium">{movie.rating}/10</span>
              <span className="text-white/80">{movie.year}</span>
              <span className="text-white/80">{movie.duration}</span>
              {movie.isPremium && (
                <Badge className="bg-brand-yellow text-black">
                  Premium - ${movie.price.toFixed(2)}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 mt-8">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-8">
            {isPlaying ? (
              <div className="aspect-video bg-black/50 rounded-lg flex items-center justify-center animate-scale-in">
                <div className="text-center">
                  <h3 className="text-xl font-medium mb-2">Now Playing: {movie.title}</h3>
                  <p className="text-muted-foreground">Video player would appear here in a real application</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex space-x-4">
                  {movie.isPremium && !paymentComplete ? (
                    <>
                      <Button 
                        onClick={handleProceedToPayment}
                        className="bg-brand-yellow text-black hover:bg-brand-yellow/90"
                      >
                        Rent for ${movie.price.toFixed(2)}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={handleSimulatePayment}
                        className="border-white/30 text-white hover:bg-white/10"
                      >
                        Simulate Payment
                      </Button>
                    </>
                  ) : (
                    <Button 
                      onClick={handlePlayMovie}
                      className="bg-brand-yellow text-black hover:bg-brand-yellow/90"
                    >
                      Play
                    </Button>
                  )}
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    Add to List
                  </Button>
                </div>
                <p className="text-foreground/90">{movie.description}</p>
              </div>
            )}
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Director</h3>
                  <p>{movie.director}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Genres</h3>
                  <p>{movie.genre.join(", ")}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Rating</h3>
                  <p>{movie.rating}/10</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Release Year</h3>
                  <p>{movie.year}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Duration</h3>
                  <p>{movie.duration}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Cast</h2>
              <div className="flex flex-wrap gap-2">
                {movie.cast.map((actor, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {actor}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Related Movies</h2>
            <div className="space-y-4">
              {relatedMovies.slice(0, 4).map((relatedMovie) => (
                <Link 
                  key={relatedMovie.id} 
                  to={`/movies/${relatedMovie.id}`}
                  className="flex items-start space-x-3 p-2 rounded-md hover:bg-secondary/50 transition-colors"
                >
                  <img 
                    src={relatedMovie.thumbnailUrl} 
                    alt={relatedMovie.title} 
                    className="w-20 h-28 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{relatedMovie.title}</h3>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                      <span>{relatedMovie.year}</span>
                      <span>{relatedMovie.duration}</span>
                    </div>
                    {relatedMovie.isPremium && (
                      <Badge variant="outline" className="mt-2 text-xs bg-brand-yellow/10 text-brand-yellow border-brand-yellow/30">
                        Premium
                      </Badge>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        <section className="mt-16 space-y-4">
          <h2 className="text-2xl font-bold">More Like This</h2>
          <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {relatedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MovieDetails;
