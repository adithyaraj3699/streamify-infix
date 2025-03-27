
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Movie } from "@/lib/moviesData";
import { TVShow } from "@/lib/tvShowsData";

export type WishlistItem = 
  | { type: "movie"; item: Movie }
  | { type: "tvshow"; item: TVShow };

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (type: "movie" | "tvshow", id: string) => void;
  isInWishlist: (type: "movie" | "tvshow", id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage:", error);
      }
    }
  }, []);

  // Save wishlist to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (item: WishlistItem) => {
    // Check if item is already in wishlist
    if (!isInWishlist(item.type, item.item.id)) {
      setWishlist((prev) => [...prev, item]);
    }
  };

  const removeFromWishlist = (type: "movie" | "tvshow", id: string) => {
    setWishlist((prev) => 
      prev.filter((item) => !(item.type === type && item.item.id === id))
    );
  };

  const isInWishlist = (type: "movie" | "tvshow", id: string) => {
    return wishlist.some((item) => item.type === type && item.item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
