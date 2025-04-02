
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TVShow } from "@/lib/tvShowsData";
import WishlistButton from "./WishlistButton";

interface FeaturedTVShowProps {
  tvShow: TVShow;
}

const FeaturedTVShow = ({ tvShow }: FeaturedTVShowProps) => {
  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={tvShow.bannerUrl} 
          alt={tvShow.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white animate-fade-in">
              {tvShow.title}
            </h1>
            
            <div className="flex items-center space-x-3 text-white/80 animate-fade-in">
              <span className="text-brand-yellow font-medium">{tvShow.rating}/10</span>
              <span>{tvShow.year}</span>
              <span>{tvShow.seasons} {tvShow.seasons === 1 ? 'Season' : 'Seasons'}</span>
              {tvShow.isPremium && (
                <Badge className="bg-brand-yellow text-black">
                  Premium
                </Badge>
              )}
            </div>
            
            <p className="text-lg text-white/90 line-clamp-3 animate-fade-in">
              {tvShow.description}
            </p>
            
            <div className="pt-4 flex space-x-4 animate-fade-in">
              <Link to={`/tv-shows/${tvShow.id}`}>
                <Button size="lg" className="bg-brand-yellow text-black hover:bg-brand-yellow/90">
                  Watch Now
                </Button>
              </Link>
              <WishlistButton 
                item={tvShow} 
                type="tvshow" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTVShow;
