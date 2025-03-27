
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import MovieCard from "@/components/MovieCard";
import TVShowCard from "@/components/TVShowCard";
import { Bookmark, Film, Tv } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MyList = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { wishlist } = useWishlist();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const movieItems = wishlist.filter((item) => item.type === "movie");
  const tvShowItems = wishlist.filter((item) => item.type === "tvshow");

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center gap-3 mb-8">
          <Bookmark className="h-6 w-6 text-brand-yellow" />
          <h1 className="text-3xl font-bold">My List</h1>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-muted mb-4">
              <Bookmark className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your list is empty</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Add movies and TV shows to your list to keep track of what you want to watch.
            </p>
          </div>
        ) : (
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all" className="relative">
                All ({wishlist.length})
              </TabsTrigger>
              <TabsTrigger value="movies" className="relative">
                <Film className="h-4 w-4 mr-2" />
                Movies ({movieItems.length})
              </TabsTrigger>
              <TabsTrigger value="tvshows" className="relative">
                <Tv className="h-4 w-4 mr-2" />
                TV Shows ({tvShowItems.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {movieItems.map((item) => (
                  <MovieCard key={`movie-${item.item.id}`} movie={item.item} />
                ))}
                {tvShowItems.map((item) => (
                  <TVShowCard key={`tvshow-${item.item.id}`} tvShow={item.item} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="movies" className="mt-0">
              {movieItems.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                  {movieItems.map((item) => (
                    <MovieCard key={`movie-${item.item.id}`} movie={item.item} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No movies in your list yet.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="tvshows" className="mt-0">
              {tvShowItems.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                  {tvShowItems.map((item) => (
                    <TVShowCard key={`tvshow-${item.item.id}`} tvShow={item.item} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No TV shows in your list yet.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default MyList;
