
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface RatingButtonsProps {
  itemId: string;
  itemType: "movie" | "tvshow";
  className?: string;
}

const RatingButtons = ({ itemId, itemType, className = "" }: RatingButtonsProps) => {
  const { toast } = useToast();
  const [liked, setLiked] = useState<boolean | null>(null);

  // Load rating from localStorage on mount
  useEffect(() => {
    const savedRating = localStorage.getItem(`rating-${itemType}-${itemId}`);
    if (savedRating) {
      setLiked(savedRating === "liked");
    }
  }, [itemId, itemType]);

  const handleRate = (isLiked: boolean) => {
    // If already selected the same rating, deselect it
    if (liked === isLiked) {
      setLiked(null);
      localStorage.removeItem(`rating-${itemType}-${itemId}`);
      toast({
        title: "Rating removed",
        description: "Your rating has been removed",
      });
      return;
    }

    // Set new rating
    setLiked(isLiked);
    localStorage.setItem(`rating-${itemType}-${itemId}`, isLiked ? "liked" : "disliked");
    
    toast({
      title: isLiked ? "Liked!" : "Disliked",
      description: `You have ${isLiked ? "liked" : "disliked"} this ${itemType === "movie" ? "movie" : "TV show"}`,
    });
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Button
        variant={liked === true ? "default" : "outline"}
        size="sm"
        onClick={() => handleRate(true)}
        className={liked === true ? "bg-green-600 hover:bg-green-700" : ""}
      >
        <ThumbsUp className="h-4 w-4 mr-2" />
        Like
      </Button>
      
      <Button
        variant={liked === false ? "default" : "outline"}
        size="sm"
        onClick={() => handleRate(false)}
        className={liked === false ? "bg-red-600 hover:bg-red-700" : ""}
      >
        <ThumbsDown className="h-4 w-4 mr-2" />
        Dislike
      </Button>
    </div>
  );
};

export default RatingButtons;
