
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
  audioFormat: boolean;
  mp4Format: boolean;
  cast: string;
}

const MovieUploadForm = () => {
  const { toast } = useToast();
  const [isPremium, setIsPremium] = useState(false);
  const [isAudioFormat, setIsAudioFormat] = useState(false);
  const [isMp4Format, setIsMp4Format] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<MovieFormData>();

  const onSubmit = (data: MovieFormData) => {
    try {
      // Convert genre and cast strings to arrays
      const genreArray = data.genre.split(',').map(item => item.trim());
      const castArray = data.cast.split(',').map(item => item.trim());
      
      // Create the new movie object
      const newMovie = {
        title: data.title,
        description: data.description,
        year: parseInt(data.year.toString()),
        genre: genreArray,
        director: data.director,
        thumbnailUrl: data.imageUrl || "https://images.unsplash.com/photo-1578022761797-b8636ac1773c",
        bannerUrl: data.imageUrl || "https://images.unsplash.com/photo-1578022761797-b8636ac1773c",
        cast: castArray,
        price: parseFloat(data.price.toString()) || 0,
        isPremium: isPremium,
        rating: 0,
        duration: "2h 10m", // Default value
        isAudioFormat: isAudioFormat,
        isMp4Format: isMp4Format
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
      setIsAudioFormat(false);
      setIsMp4Format(false);
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
              <Label htmlFor="cast">Cast</Label>
              <Input
                id="cast"
                {...register("cast", { required: "Cast is required" })}
                placeholder="Actor 1, Actor 2, Actor 3"
              />
              {errors.cast && <p className="text-sm text-red-500">{errors.cast.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Poster URL</Label>
            <Input
              id="imageUrl"
              {...register("imageUrl")}
              placeholder="https://example.com/image.jpg"
            />
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
            
            <div className="space-y-2 flex flex-col justify-center">
              <div className="flex items-center space-x-2">
                <Switch
                  id="premium"
                  checked={isPremium}
                  onCheckedChange={setIsPremium}
                />
                <Label htmlFor="premium">Premium Content</Label>
              </div>
              
              <div className="flex items-center space-x-2 mt-2">
                <Switch
                  id="audioFormat"
                  checked={isAudioFormat}
                  onCheckedChange={setIsAudioFormat}
                />
                <Label htmlFor="audioFormat">MP3 Audio Format</Label>
              </div>
              
              <div className="flex items-center space-x-2 mt-2">
                <Switch
                  id="mp4Format"
                  checked={isMp4Format}
                  onCheckedChange={setIsMp4Format}
                />
                <Label htmlFor="mp4Format">MP4 Video Format</Label>
              </div>
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
