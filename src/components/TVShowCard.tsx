
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { TVShow } from "@/lib/tvShowsData";

interface TVShowCardProps {
  tvShow: TVShow;
}

const TVShowCard = ({ tvShow }: TVShowCardProps) => {
  return (
    <Link 
      to={`/tv-shows/${tvShow.id}`}
      className="group w-[180px] flex-shrink-0 transition-all hover:scale-105"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-md">
        <img 
          src={tvShow.thumbnailUrl} 
          alt={tvShow.title} 
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {tvShow.isPremium && (
          <Badge className="absolute top-2 left-2 bg-brand-yellow text-black">
            Premium
          </Badge>
        )}
      </div>
      
      <div className="mt-2 space-y-1">
        <h3 className="font-medium text-foreground line-clamp-1">{tvShow.title}</h3>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <span>{tvShow.year}</span>
          <span className="w-1 h-1 bg-muted-foreground rounded-full" />
          <span>{tvShow.seasons} {tvShow.seasons === 1 ? 'Season' : 'Seasons'}</span>
        </div>
      </div>
    </Link>
  );
};

export default TVShowCard;
