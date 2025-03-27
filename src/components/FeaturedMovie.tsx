
import { Link } from "react-router-dom";
import { Movie } from "@/lib/moviesData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FeaturedMovieProps {
  movie: Movie;
}

const FeaturedMovie = ({ movie }: FeaturedMovieProps) => {
  return (
    <div className="relative w-full min-h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={movie.bannerUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 md:px-6 h-full flex flex-col justify-center pt-24 pb-12">
        <div className="max-w-2xl animate-slide-up">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 text-white text-shadow">{movie.title}</h1>
          
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-brand-yellow font-medium">{movie.rating}/10</span>
            <span className="text-white/80">{movie.year}</span>
            <span className="text-white/80">{movie.duration}</span>
            {movie.isPremium && (
              <Badge className="bg-brand-yellow text-black">Premium</Badge>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genre.map(genre => (
              <Badge key={genre} variant="secondary" className="text-xs">
                {genre}
              </Badge>
            ))}
          </div>
          
          <p className="text-white/90 text-sm md:text-base mb-6 max-w-xl">{movie.description}</p>
          
          <div className="flex space-x-4">
            <Link to={`/movies/${movie.id}`}>
              <Button className="bg-brand-yellow text-black hover:bg-brand-yellow/90">
                Watch Now
              </Button>
            </Link>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
              Add to List
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMovie;
