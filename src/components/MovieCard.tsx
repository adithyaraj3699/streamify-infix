
import { Link } from "react-router-dom";
import { Movie } from "@/lib/moviesData";
import { Badge } from "@/components/ui/badge";

interface MovieCardProps {
  movie: Movie;
  size?: "small" | "medium" | "large";
}

const MovieCard = ({ movie, size = "medium" }: MovieCardProps) => {
  const sizeClasses = {
    small: "w-[160px]",
    medium: "w-[220px]",
    large: "w-[300px]"
  };

  return (
    <Link 
      to={`/movies/${movie.id}`} 
      className={`${sizeClasses[size]} relative group overflow-hidden rounded-md movie-card-hover`}
    >
      <div className="aspect-[2/3] relative">
        <img 
          src={movie.thumbnailUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white font-semibold mb-1 text-shadow">{movie.title}</h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-white/90">{movie.year}</span>
            <span className="text-xs text-white/90">{movie.duration}</span>
            <span className="text-xs text-white/90">{movie.rating}/10</span>
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            {movie.genre.slice(0, 2).map(genre => (
              <Badge key={genre} variant="outline" className="text-[10px] bg-black/30 backdrop-blur-sm">
                {genre}
              </Badge>
            ))}
          </div>
          {movie.isPremium && (
            <Badge variant="default" className="absolute top-2 right-2 bg-brand-yellow text-black">
              Premium
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
