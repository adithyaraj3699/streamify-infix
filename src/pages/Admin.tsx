
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { allMovies, Movie } from "@/lib/moviesData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [movies, setMovies] = useState<Movie[]>(allMovies);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    if (!user?.isAdmin) {
      toast({
        title: "Access Denied",
        description: "You do not have admin privileges to access this page.",
        variant: "destructive",
      });
      navigate("/home");
    }
  }, [isAuthenticated, user, navigate, toast]);

  const handleEditMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setTitle(movie.title);
    setDescription(movie.description);
    setYear(movie.year.toString());
    setPrice(movie.price.toString());
    setIsPremium(movie.isPremium);
  };

  const handleUpdateMovie = () => {
    if (!selectedMovie) return;
    
    const updatedMovie: Movie = {
      ...selectedMovie,
      title,
      description,
      year: parseInt(year),
      price: parseFloat(price),
      isPremium
    };
    
    // Update movie in the list
    const updatedMovies = movies.map(movie => 
      movie.id === selectedMovie.id ? updatedMovie : movie
    );
    
    setMovies(updatedMovies);
    setSelectedMovie(null);
    
    toast({
      title: "Movie Updated",
      description: `${title} has been successfully updated.`,
    });
  };

  const handleCancelEdit = () => {
    setSelectedMovie(null);
  };

  const handleDeleteMovie = (movieId: string) => {
    const updatedMovies = movies.filter(movie => movie.id !== movieId);
    setMovies(updatedMovies);
    
    toast({
      title: "Movie Deleted",
      description: "The movie has been successfully removed.",
    });
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your movie catalog and settings</p>
        </div>
        
        <Tabs defaultValue="movies" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="movies">Movies</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="movies" className="space-y-6">
            {selectedMovie ? (
              <Card>
                <CardHeader>
                  <CardTitle>Edit Movie</CardTitle>
                  <CardDescription>Make changes to {selectedMovie.title}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="year">Year</Label>
                      <Input
                        id="year"
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="premium"
                      checked={isPremium}
                      onCheckedChange={setIsPremium}
                    />
                    <Label htmlFor="premium">Premium Content</Label>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
                  <Button onClick={handleUpdateMovie} className="bg-brand-yellow text-black hover:bg-brand-yellow/90">
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Movie Catalog</h3>
                    <Button className="bg-brand-yellow text-black hover:bg-brand-yellow/90">
                      Add New Movie
                    </Button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Title</th>
                          <th className="text-left p-2">Year</th>
                          <th className="text-left p-2">Premium</th>
                          <th className="text-left p-2">Price</th>
                          <th className="text-left p-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {movies.map((movie) => (
                          <tr key={movie.id} className="border-b">
                            <td className="p-2">{movie.title}</td>
                            <td className="p-2">{movie.year}</td>
                            <td className="p-2">
                              {movie.isPremium ? (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Yes
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  No
                                </span>
                              )}
                            </td>
                            <td className="p-2">
                              {movie.isPremium ? `$${movie.price.toFixed(2)}` : "Free"}
                            </td>
                            <td className="p-2">
                              <div className="flex space-x-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleEditMovie(movie)}
                                >
                                  Edit
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => handleDeleteMovie(movie.id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage user accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  User management functionality would be implemented here in a real application.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Manage your platform configuration</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Settings management functionality would be implemented here in a real application.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
