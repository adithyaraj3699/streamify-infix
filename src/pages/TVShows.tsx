
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { allTVShows, featuredTVShows, getFreeTVShows, getPremiumTVShows, getTVShowsByGenre } from "@/lib/tvShowsData";
import FeaturedTVShow from "@/components/FeaturedTVShow";
import TVShowCard from "@/components/TVShowCard";

const TVShows = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const featuredShow = featuredTVShows[0];
  const freeTVShows = getFreeTVShows();
  const premiumTVShows = getPremiumTVShows();
  const dramaTVShows = getTVShowsByGenre("Drama");
  const comedyTVShows = getTVShowsByGenre("Comedy");

  return (
    <div className="min-h-screen bg-background">
      <FeaturedTVShow tvShow={featuredShow} />
      
      <div className="container mx-auto px-4 md:px-6 py-12 space-y-16">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Trending Shows</h2>
          <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {allTVShows.slice(0, 8).map((show) => (
              <TVShowCard key={show.id} tvShow={show} />
            ))}
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Premium Shows</h2>
          <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {premiumTVShows.map((show) => (
              <TVShowCard key={show.id} tvShow={show} />
            ))}
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Free to Watch</h2>
          <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {freeTVShows.map((show) => (
              <TVShowCard key={show.id} tvShow={show} />
            ))}
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Drama</h2>
          <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {dramaTVShows.map((show) => (
              <TVShowCard key={show.id} tvShow={show} />
            ))}
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Comedy</h2>
          <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {comedyTVShows.map((show) => (
              <TVShowCard key={show.id} tvShow={show} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TVShows;
