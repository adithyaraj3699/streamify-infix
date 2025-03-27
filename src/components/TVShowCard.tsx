
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { TVShow } from "@/lib/tvShowsData";
import { useWishlist } from "@/context/WishlistContext";
import { BookmarkPlus, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface TVShowCardProps {
  tvShow: TVShow;
}

const TVShowCard = ({ tvShow }: TVShowCardProps) => {
  const { toast } = useToast();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isInList = isInWishlist("tvshow", tvShow.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInList) {
      removeFromWishlist("tvshow", tvShow.id);
      toast({
        title: "Removed from list",
        description: `${tvShow.title} has been removed from your list`,
      });
    } else {
      addToWishlist({ type: "tvshow", item: tvShow });
      toast({
        title: "Added to list",
        description: `${tvShow.title} has been added to your list`,
      });
    }
  };

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
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 h-8 w-8 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleWishlistToggle}
        >
          {isInList ? (
            <BookmarkCheck className="h-4 w-4 text-brand-yellow" />
          ) : (
            <BookmarkPlus className="h-4 w-4" />
          )}
        </Button>
        
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
