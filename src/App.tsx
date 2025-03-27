
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import MyList from "@/pages/MyList";
import MovieDetails from "@/pages/MovieDetails";
import TVShows from "@/pages/TVShows";
import TVShowDetails from "@/pages/TVShowDetails";
import Payment from "@/pages/Payment";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/NotFound";
import Navbar from "@/components/Navbar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <WishlistProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/my-list" element={<MyList />} />
              <Route path="/movies/:id" element={<MovieDetails />} />
              <Route path="/tv-shows" element={<TVShows />} />
              <Route path="/tv-shows/:id" element={<TVShowDetails />} />
              <Route path="/payment/:id" element={<Payment />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </WishlistProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
