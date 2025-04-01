
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getMovieById } from "@/lib/moviesData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, CreditCard, Calendar, Zap } from "lucide-react";

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
  const [paymentType, setPaymentType] = useState("one-time");
  const [subscriptionPlan, setSubscriptionPlan] = useState("monthly");
  
  const movie = id ? getMovieById(id) : undefined;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!movie && paymentType === "one-time") {
      navigate("/home");
      return;
    }
  }, [isAuthenticated, movie, navigate, paymentType]);

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
    
    if (paymentType === "subscription") {
      toast({
        title: "Subscription Activated!",
        description: `Your ${subscriptionPlan} subscription has been activated. Enjoy unlimited access!`,
      });
    } else {
      toast({
        title: "Payment Successful!",
        description: `You now have access to ${movie?.title}. Enjoy watching!`,
      });
    }
    
    setIsProcessing(false);
    
    // Redirect based on payment type
    if (paymentType === "subscription") {
      navigate("/home");
    } else if (id) {
      navigate(`/movies/${id}`);
    }
  };

  // Calculate subscription price
  const getSubscriptionPrice = () => {
    return subscriptionPlan === "monthly" ? 9.99 : 99.99;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-scale-in">
        <CardHeader>
          <CardTitle className="text-2xl">Complete Your Payment</CardTitle>
          <CardDescription>
            {paymentType === "subscription" 
              ? `${subscriptionPlan === "monthly" ? "Monthly" : "Annual"} subscription plan` 
              : `One-time payment for "${movie?.title}"`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="one-time" value={paymentType} onValueChange={setPaymentType} className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="one-time">Single Movie</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
            </TabsList>
            <TabsContent value="one-time">
              <div className="p-4 bg-gray-900/40 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{movie?.title}</h3>
                    <p className="text-sm text-muted-foreground">One-time purchase</p>
                  </div>
                  <span className="text-lg font-bold">${movie?.price.toFixed(2)}</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="subscription">
              <RadioGroup value={subscriptionPlan} onValueChange={setSubscriptionPlan} className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <RadioGroupItem value="monthly" id="monthly" className="peer sr-only" />
                  <Label
                    htmlFor="monthly"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-brand-yellow [&:has([data-state=checked])]:border-brand-yellow"
                  >
                    <Calendar className="mb-2 h-6 w-6" />
                    <span className="text-sm font-medium mb-1">Monthly</span>
                    <span className="text-xl font-bold">$9.99</span>
                    <span className="text-xs text-muted-foreground">Billed monthly</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="yearly" id="yearly" className="peer sr-only" />
                  <Label
                    htmlFor="yearly"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-brand-yellow [&:has([data-state=checked])]:border-brand-yellow"
                  >
                    <Calendar className="mb-2 h-6 w-6" />
                    <div className="absolute -top-2 -right-2 bg-brand-yellow text-black text-xs px-2 py-1 rounded-full">
                      Save 16%
                    </div>
                    <span className="text-sm font-medium mb-1">Annual</span>
                    <span className="text-xl font-bold">$99.99</span>
                    <span className="text-xs text-muted-foreground">Billed yearly</span>
                  </Label>
                </div>
              </RadioGroup>
              <div className="bg-gray-900/40 p-3 rounded-md mb-2">
                <div className="flex items-center mb-2">
                  <Zap className="h-4 w-4 mr-2 text-brand-yellow" />
                  <span className="font-medium">Subscription Benefits</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Unlimited access to all premium content</li>
                  <li>• Early access to new releases</li>
                  <li>• Download for offline viewing</li>
                  <li>• Ad-free experience</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>

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
                    <CreditCard className="mb-2 h-4 w-4" />
                    <span className="text-sm font-medium">Credit Card</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="points" id="points" className="peer sr-only" disabled={!user?.points || user.points < (paymentType === "subscription" ? 600 : (movie?.price || 0) * 100)} />
                  <Label
                    htmlFor="points"
                    className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-brand-yellow [&:has([data-state=checked])]:border-brand-yellow ${(!user?.points || user.points < (paymentType === "subscription" ? 600 : (movie?.price || 0) * 100)) ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <Award className="mb-2 h-4 w-4" />
                    <span className="text-sm font-medium">Use Points</span>
                    <span className="text-xs text-muted-foreground">{user?.points || 0} avail.</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" disabled />
                  <Label
                    htmlFor="paypal"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground opacity-50 cursor-not-allowed"
                  >
                    <DollarSign className="mb-2 h-4 w-4" />
                    <span className="text-sm font-medium">PayPal</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {paymentMethod === "credit-card" && (
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
            )}

            <div>
              <Label className="text-sm text-muted-foreground">Order Summary</Label>
              <div className="mt-2 border-t border-border pt-2">
                {paymentType === "subscription" ? (
                  <div className="flex justify-between py-1">
                    <span>{subscriptionPlan === "monthly" ? "Monthly" : "Annual"} Subscription</span>
                    <span>${getSubscriptionPrice().toFixed(2)}</span>
                  </div>
                ) : (
                  <div className="flex justify-between py-1">
                    <span>{movie?.title}</span>
                    <span>${movie?.price.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 font-medium border-t border-border mt-2 pt-2">
                  <span>Total</span>
                  <span>${paymentType === "subscription" ? getSubscriptionPrice().toFixed(2) : movie?.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-brand-yellow text-black hover:bg-brand-yellow/90"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : paymentMethod === "points" 
                ? "Use Points" 
                : `Pay $${paymentType === "subscription" ? getSubscriptionPrice().toFixed(2) : movie?.price.toFixed(2)}`}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between text-xs text-muted-foreground">
          <p>Secure payment processing</p>
          <p>{paymentType === "subscription" ? "Recurring billing, cancel anytime" : "One-time payment"}</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Payment;
