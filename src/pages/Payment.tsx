
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getMovieById } from "@/lib/moviesData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

const Payment = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  
  const movie = id ? getMovieById(id) : undefined;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!movie) {
      navigate("/home");
      return;
    }
  }, [isAuthenticated, movie, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      toast({
        title: "Error",
        description: "Please fill out all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Payment Successful!",
      description: `You now have access to ${movie?.title}. Enjoy watching!`,
    });
    
    setIsProcessing(false);
    
    // Redirect to movie details page after successful payment
    if (id) {
      navigate(`/movies/${id}`);
    }
  };

  if (!movie) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-scale-in">
        <CardHeader>
          <CardTitle className="text-2xl">Complete Your Payment</CardTitle>
          <CardDescription>
            One-time payment for "{movie.title}" - ${movie.price.toFixed(2)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <RadioGroup defaultValue="credit-card" value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-3 gap-4">
                <div>
                  <RadioGroupItem value="credit-card" id="credit-card" className="peer sr-only" />
                  <Label
                    htmlFor="credit-card"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-brand-yellow [&:has([data-state=checked])]:border-brand-yellow"
                  >
                    <span className="mb-2">💳</span>
                    <span className="text-sm font-medium">Credit Card</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" disabled />
                  <Label
                    htmlFor="paypal"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground opacity-50 cursor-not-allowed"
                  >
                    <span className="mb-2">🅿️</span>
                    <span className="text-sm font-medium">PayPal</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="crypto" id="crypto" className="peer sr-only" disabled />
                  <Label
                    htmlFor="crypto"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground opacity-50 cursor-not-allowed"
                  >
                    <span className="mb-2">₿</span>
                    <span className="text-sm font-medium">Crypto</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input
                  id="card-number"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  maxLength={19}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Cardholder Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    maxLength={5}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    maxLength={3}
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Order Summary</Label>
              <div className="mt-2 border-t border-border pt-2">
                <div className="flex justify-between py-1">
                  <span>{movie.title}</span>
                  <span>${movie.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 font-medium border-t border-border mt-2 pt-2">
                  <span>Total</span>
                  <span>${movie.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-brand-yellow text-black hover:bg-brand-yellow/90"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : `Pay $${movie.price.toFixed(2)}`}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between text-xs text-muted-foreground">
          <p>Secure payment processing</p>
          <p>One-time payment, no subscription</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Payment;
