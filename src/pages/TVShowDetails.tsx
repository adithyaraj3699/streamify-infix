import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getTVShowById, getTVShowsByGenre, TVShow } from "@/lib/tvShowsData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TVShowCard from "@/components/TVShowCard";
import { useToast } from "@/hooks/use-toast";
import WishlistButton from "@/components/WishlistButton";

const TVShowDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tvShow, setTVShow] = useState<TVShow | undefined>(undefined);
  const [relatedShows, setRelatedShows] = useState<TVShow[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(1);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (id) {
      const showData = getTVShowById(id);
      if (showData) {
        setTVShow(showData);
        // Get related shows from the same genre
        if (showData.genre.length > 0) {
          const related = getTVShowsByGenre(showData.genre[0]).filter(s => s.id !== id);
          setRelatedShows(related);
        }
      }
    }
  }, [id, isAuthenticated, navigate]);

  const handlePlayShow = () => {
    if (!tvShow) return;
    
    if (tvShow.isPremium && !paymentComplete) {
      toast({
        title: "Premium Content",
        description: "This show requires payment to watch. Please proceed to payment.",
        variant: "default",
      });
      return;
    }
    
    setIsPlaying(true);
    toast({
      title: "Now Playing",
      description: `Enjoy watching ${tvShow.title} - Season ${selectedSeason}!`,
    });
  };

  const handleProceedToPayment = () => {
    if (!tvShow) return;
    navigate(`/payment/${tvShow.id}?type=tvshow`);
  };

  const handleSimulatePayment = () => {
    if (!tvShow) return;
    
    setPaymentComplete(true);
    toast({
      title: "Payment Successful!",
      description: `You now have access to ${tvShow.title}`,
      variant: "default",
    });
  };

  const generateEpisodes = (season: number) => {
    const episodesPerSeason = tvShow ? Math.ceil(tvShow.episodes / tvShow.seasons) : 0;
    return Array.from({ length: episodesPerSeason }, (_, i) => ({
      id: `s${season}e${i + 1}`,
      title: `Episode ${i + 1}`,
      duration: `${Math.floor(Math.random() * 30) + 30}m`,
      description: `This is episode ${i + 1} of season ${season}.`
    }));
  };

  if (!tvShow) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">TV Show not found</h1>
          <Link to="/tv-shows">
            <Button>Back to TV Shows</Button>
          </Link>
        </div>
      </div>
    );
  }

  const episodes = generateEpisodes(selectedSeason);

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="relative w-full h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={tvShow.bannerUrl} 
            alt={tvShow.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white text-shadow animate-fade-in">{tvShow.title}</h1>
            
            <div className="flex items-center space-x-3 mb-4 animate-fade-in">
              <span className="text-brand-yellow font-medium">{tvShow.rating}/10</span>
              <span className="text-white/80">{tvShow.year}</span>
              <span className="text-white/80">{tvShow.seasons} {tvShow.seasons === 1 ? 'Season' : 'Seasons'}</span>
              {tvShow.isPremium && (
                <Badge className="bg-brand-yellow text-black">
                  Premium - ${tvShow.price.toFixed(2)}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 mt-8">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-8">
            {isPlaying ? (
              <div className="aspect-video bg-black/50 rounded-lg flex items-center justify-center animate-scale-in">
                <div className="text-center">
                  <h3 className="text-xl font-medium mb-2">Now Playing: {tvShow.title} - Season {selectedSeason}</h3>
                  <p className="text-muted-foreground">Video player would appear here in a real application</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex space-x-4">
                  {tvShow.isPremium && !paymentComplete ? (
                    <>
                      <Button 
                        onClick={handleProceedToPayment}
                        className="bg-brand-yellow text-black hover:bg-brand-yellow/90"
                      >
                        Subscribe for ${tvShow.price.toFixed(2)}/month
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={handleSimulatePayment}
                        className="border-white/30 text-white hover:bg-white/10"
                      >
                        Simulate Payment
                      </Button>
                    </>
                  ) : (
                    <Button 
                      onClick={handlePlayShow}
                      className="bg-brand-yellow text-black hover:bg-brand-yellow/90"
                    >
                      Play
                    </Button>
                  )}
                  <WishlistButton item={tvShow} type="tvshow" />
                </div>
                <p className="text-foreground/90">{tvShow.description}</p>
              </div>
            )}
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Creator</h3>
                  <p>{tvShow.creator}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Genres</h3>
                  <p>{tvShow.genre.join(", ")}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Rating</h3>
                  <p>{tvShow.rating}/10</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Release Year</h3>
                  <p>{tvShow.year}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Seasons</h3>
                  <p>{tvShow.seasons}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Episodes</h3>
                  <p>{tvShow.episodes}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Cast</h2>
              <div className="flex flex-wrap gap-2">
                {tvShow.cast.map((actor, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {actor}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Episodes</h2>
              <div className="flex space-x-2 mb-4">
                {Array.from({ length: tvShow.seasons }, (_, i) => (
                  <Button 
                    key={i} 
                    variant={selectedSeason === i + 1 ? "default" : "outline"}
                    onClick={() => setSelectedSeason(i + 1)}
                    className={selectedSeason === i + 1 ? "bg-brand-yellow text-black" : ""}
                  >
                    Season {i + 1}
                  </Button>
                ))}
              </div>
              
              <div className="space-y-4">
                {episodes.map((episode) => (
                  <div 
                    key={episode.id}
                    className="flex items-center justify-between p-4 border rounded-md hover:bg-secondary/50 transition-colors"
                  >
                    <div>
                      <h3 className="font-medium">{episode.title}</h3>
                      <p className="text-sm text-muted-foreground">{episode.description}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-muted-foreground">{episode.duration}</span>
                      <Button 
                        size="sm" 
                        className="bg-brand-yellow text-black hover:bg-brand-yellow/90"
                        onClick={handlePlayShow}
                      >
                        Play
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Related Shows</h2>
            <div className="space-y-4">
              {relatedShows.slice(0, 4).map((relatedShow) => (
                <Link 
                  key={relatedShow.id} 
                  to={`/tv-shows/${relatedShow.id}`}
                  className="flex items-start space-x-3 p-2 rounded-md hover:bg-secondary/50 transition-colors"
                >
                  <img 
                    src={relatedShow.thumbnailUrl} 
                    alt={relatedShow.title} 
                    className="w-20 h-28 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{relatedShow.title}</h3>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                      <span>{relatedShow.year}</span>
                      <span>{relatedShow.seasons} Seasons</span>
                    </div>
                    {relatedShow.isPremium && (
                      <Badge variant="outline" className="mt-2 text-xs bg-brand-yellow/10 text-brand-yellow border-brand-yellow/30">
                        Premium
                      </Badge>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        <section className="mt-16 space-y-4">
          <h2 className="text-2xl font-bold">More Like This</h2>
          <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {relatedShows.map((show) => (
              <TVShowCard key={show.id} tvShow={show} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TVShowDetails;
