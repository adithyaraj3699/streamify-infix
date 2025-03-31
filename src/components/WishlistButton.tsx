
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/WishlistContext";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Movie } from "@/lib/moviesData";
import { TVShow } from "@/lib/tvShowsData";

interface WishlistButtonProps {
  item: Movie | TVShow;
  type: "movie" | "tvshow";
  variant?: "default" | "outline";
  className?: string;
}

const WishlistButton = ({ 
  item, 
  type, 
  variant = "outline", 
  className = ""
}: WishlistButtonProps) => {
  const { toast } = useToast();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isInList = isInWishlist(type, item.id);
  
  const handleToggleWishlist = () => {
    if (isInList) {
      removeFromWishlist(type, item.id);
      toast({
        title: "Removed from list",
        description: `${item.title} has been removed from your list`,
      });
    } else {
      if (type === "movie") {
        addToWishlist({ type: "movie", item: item as Movie });
      } else {
        addToWishlist({ type: "tvshow", item: item as TVShow });
      }
      toast({
        title: "Added to list",
        description: `${item.title} has been added to your list`,
      });
    }
  };

  return (
    <Button 
      variant={variant} 
      onClick={handleToggleWishlist}
      className={`${className} ${variant === "outline" ? "border-white/30 text-white hover:bg-white/10" : ""}`}
    >
      {isInList ? (
        <>
          <BookmarkCheck className="h-4 w-4 mr-2" />
          Remove from List
        </>
      ) : (
        <>
          <Bookmark className="h-4 w-4 mr-2" />
          Add to List
        </>
      )}
    </Button>
  );
};

export default WishlistButton;
