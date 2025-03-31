
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { addMovie } from "@/lib/adminService";

interface MovieFormData {
  title: string;
  description: string;
  year: number;
  genre: string;
  director: string;
  imageUrl: string;
  price: number;
  isPremium: boolean;
}

const MovieUploadForm = () => {
  const { toast } = useToast();
  const [isPremium, setIsPremium] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<MovieFormData>();

  const onSubmit = (data: MovieFormData) => {
    try {
      // Create the new movie object
      const newMovie = {
        title: data.title,
        description: data.description,
        year: parseInt(data.year.toString()),
        genre: data.genre,
        director: data.director,
        imageUrl: data.imageUrl || "https://via.placeholder.com/500x750",
        price: parseFloat(data.price.toString()) || 0,
        isPremium: isPremium,
        rating: 0,
        duration: "2h 10m", // Default value
      };

      // Call the service to add the movie
      addMovie(newMovie);

      // Show success message
      toast({
        title: "Movie Added",
        description: `${data.title} has been successfully added.`,
      });

      // Reset the form
      reset();
      setIsPremium(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add movie. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Movie</CardTitle>
        <CardDescription>Fill in the details to add a new movie to the catalog</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="movie-upload-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register("title", { required: "Title is required" })}
              placeholder="Movie title"
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description", { required: "Description is required" })}
              placeholder="Movie description"
              rows={3}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Release Year</Label>
              <Input
                id="year"
                type="number"
                {...register("year", { 
                  required: "Year is required",
                  min: { value: 1900, message: "Year must be valid" },
                  max: { value: new Date().getFullYear(), message: "Year cannot be in the future" }
                })}
                placeholder="2023"
              />
              {errors.year && <p className="text-sm text-red-500">{errors.year.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Input
                id="genre"
                {...register("genre", { required: "Genre is required" })}
                placeholder="Action, Thriller, etc."
              />
              {errors.genre && <p className="text-sm text-red-500">{errors.genre.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="director">Director</Label>
              <Input
                id="director"
                {...register("director", { required: "Director is required" })}
                placeholder="Director name"
              />
              {errors.director && <p className="text-sm text-red-500">{errors.director.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Poster URL</Label>
              <Input
                id="imageUrl"
                {...register("imageUrl")}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register("price", { 
                  required: "Price is required",
                  min: { value: 0, message: "Price cannot be negative" }
                })}
                placeholder="9.99"
              />
              {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
            </div>

            <div className="flex items-center space-x-2 pt-8">
              <Switch
                id="premium"
                checked={isPremium}
                onCheckedChange={setIsPremium}
              />
              <Label htmlFor="premium">Premium Content</Label>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          type="submit" 
          form="movie-upload-form"
          className="bg-brand-yellow text-black hover:bg-brand-yellow/90 w-full"
        >
          Add Movie
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MovieUploadForm;
