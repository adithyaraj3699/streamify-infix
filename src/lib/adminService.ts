
import { Movie, allMovies } from "@/lib/moviesData";
import { TVShow, allTVShows } from "@/lib/tvShowsData";

// Function to get user growth data (mocked)
export const getUserGrowthData = () => {
  return [
    { month: "Jan", users: 120 },
    { month: "Feb", users: 150 },
    { month: "Mar", users: 200 },
    { month: "Apr", users: 320 },
    { month: "May", users: 450 },
    { month: "Jun", users: 480 },
    { month: "Jul", users: 520 },
    { month: "Aug", users: 600 },
    { month: "Sep", users: 700 },
    { month: "Oct", users: 850 },
    { month: "Nov", users: 920 },
    { month: "Dec", users: 1000 },
  ];
};

// Function to get popular genres (mocked)
export const getPopularGenres = () => {
  return [
    { genre: "Action", count: 450 },
    { genre: "Comedy", count: 380 },
    { genre: "Drama", count: 320 },
    { genre: "Sci-Fi", count: 280 },
    { genre: "Horror", count: 150 },
  ];
};

// Function to get recent activity (mocked)
export const getRecentActivity = () => {
  return [
    { id: 1, user: "john_doe", action: "Liked", item: "Inception", timestamp: "2023-10-15T14:30:00" },
    { id: 2, user: "jane_smith", action: "Disliked", item: "The Matrix", timestamp: "2023-10-15T13:45:00" },
    { id: 3, user: "alex_brown", action: "Added to List", item: "Interstellar", timestamp: "2023-10-15T12:30:00" },
    { id: 4, user: "sarah_johnson", action: "Purchased", item: "Dune", timestamp: "2023-10-15T11:15:00" },
    { id: 5, user: "mike_williams", action: "Watched", item: "The Dark Knight", timestamp: "2023-10-15T10:00:00" },
  ];
};

// Function to add a new movie (local only for now)
export const addMovie = (movie: Omit<Movie, "id">): Movie => {
  const newMovie: Movie = {
    ...movie,
    id: `movie-${Date.now()}`,
  };
  
  // In a real app, this would be an API call to save to a database
  console.log("Added new movie:", newMovie);
  
  return newMovie;
};

// Function to delete a movie (local only for now)
export const deleteMovie = (id: string): void => {
  // In a real app, this would be an API call to delete from a database
  console.log("Deleted movie with ID:", id);
};

// Function to add a new TV show (local only for now)
export const addTVShow = (tvShow: Omit<TVShow, "id">): TVShow => {
  const newTVShow: TVShow = {
    ...tvShow,
    id: `tvshow-${Date.now()}`,
  };
  
  // In a real app, this would be an API call to save to a database
  console.log("Added new TV show:", newTVShow);
  
  return newTVShow;
};
