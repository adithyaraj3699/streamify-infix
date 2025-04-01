
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Award, ChevronRight, Play } from "lucide-react";

const WatchAds = () => {
  const { user, isAuthenticated, updateUserPoints } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isWatching, setIsWatching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [totalPointsToday, setTotalPointsToday] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isWatching) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsWatching(false);
            const newPoints = 5;
            setPointsEarned(prev => prev + newPoints);
            setTotalPointsToday(prev => prev + newPoints);
            
            if (typeof updateUserPoints === 'function') {
              updateUserPoints(newPoints);
            }
            
            toast({
              title: "Points Earned!",
              description: `You earned ${newPoints} points for watching an ad.`,
            });
            return 0;
          }
          return prev + 10;
        });
      }, 500);
      
      return () => clearInterval(interval);
    }
  }, [isWatching, toast, updateUserPoints]);

  const handleWatchAd = () => {
    setIsWatching(true);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 border-border">
            <CardHeader>
              <CardTitle className="text-2xl">Watch Ads & Earn Points</CardTitle>
              <CardDescription>
                Earn points by watching short advertisements. Use these points to unlock premium content!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isWatching ? (
                <div className="space-y-4">
                  <div className="aspect-video bg-gray-800 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <Play className="h-16 w-16 text-brand-yellow mx-auto" />
                      <p className="text-lg font-medium mt-2">Advertisement Playing</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </div>
              ) : (
                <div className="bg-gray-900/40 rounded-lg p-6 text-center">
                  <Award className="h-12 w-12 text-brand-yellow mx-auto mb-3" />
                  <h3 className="text-xl font-bold mb-2">Ready to earn points?</h3>
                  <p className="text-gray-400 mb-4">Watch a short 15-30 second advertisement to earn 5 points.</p>
                  <Button 
                    onClick={handleWatchAd} 
                    className="bg-brand-yellow text-black hover:bg-brand-yellow/90"
                  >
                    <Play className="mr-2 h-4 w-4" /> Watch Ad Now
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <div className="w-full text-sm text-muted-foreground">
                You can watch up to 10 ads per day. Points expire after 30 days.
              </div>
            </CardFooter>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Points Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Current Balance</span>
                  <span className="text-xl font-bold">{user?.points || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Earned Today</span>
                  <span className="text-brand-yellow font-medium">{totalPointsToday}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>This Session</span>
                  <span className="text-brand-yellow font-medium">+{pointsEarned}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>What can I do with points?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Rent Premium Movies</h4>
                    <p className="text-sm text-muted-foreground">200 points per movie</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Monthly Subscription</h4>
                    <p className="text-sm text-muted-foreground">600 points per month</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Exclusive Content</h4>
                    <p className="text-sm text-muted-foreground">100 points per item</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchAds;
