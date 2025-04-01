
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ShortFilmFormData {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  genre: string;
}

const UploadShortFilm = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ShortFilmFormData>();

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const onSubmit = (data: ShortFilmFormData) => {
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      
      toast({
        title: "Upload Successful",
        description: "Your short film has been uploaded and is pending review. You'll earn points as users view your content!",
      });
      
      navigate("/home");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <Card className="border-border animate-scale-in">
          <CardHeader>
            <CardTitle className="text-2xl">Upload Your Short Film</CardTitle>
            <CardDescription>
              Share your creativity with our community and earn points when others watch your content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="upload-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  {...register("title", { required: "Title is required" })}
                  placeholder="Your short film title"
                />
                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register("description", { required: "Description is required" })}
                  placeholder="Describe your short film"
                  rows={3}
                />
                {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="genre">Genre</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comedy">Comedy</SelectItem>
                    <SelectItem value="drama">Drama</SelectItem>
                    <SelectItem value="action">Action</SelectItem>
                    <SelectItem value="horror">Horror</SelectItem>
                    <SelectItem value="documentary">Documentary</SelectItem>
                    <SelectItem value="animation">Animation</SelectItem>
                    <SelectItem value="experimental">Experimental</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="videoUrl">Video File</Label>
                <Input
                  id="videoUrl"
                  type="file"
                  accept="video/*"
                  {...register("videoUrl", { required: "Video file is required" })}
                />
                {errors.videoUrl && <p className="text-sm text-red-500">{errors.videoUrl.message}</p>}
                <p className="text-xs text-muted-foreground">Max file size: 500MB. Supported formats: MP4, MOV, AVI</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="thumbnailUrl">Thumbnail</Label>
                <Input
                  id="thumbnailUrl"
                  type="file"
                  accept="image/*"
                  {...register("thumbnailUrl", { required: "Thumbnail is required" })}
                />
                {errors.thumbnailUrl && <p className="text-sm text-red-500">{errors.thumbnailUrl.message}</p>}
                <p className="text-xs text-muted-foreground">Recommended size: 1280x720px. Supported formats: JPG, PNG</p>
              </div>
              
              <div className="bg-gray-900/50 p-4 rounded-md">
                <h4 className="font-medium mb-2">Upload Guidelines</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Your short film must be under 30 minutes in length</li>
                  <li>• Content must comply with our community guidelines</li>
                  <li>• You'll earn 1 point for every 10 views</li>
                  <li>• Uploads are reviewed before being published</li>
                </ul>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              form="upload-form"
              className="bg-brand-yellow text-black hover:bg-brand-yellow/90 w-full"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload Short Film"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default UploadShortFilm;
