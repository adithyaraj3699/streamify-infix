
export interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  bannerUrl: string;
  year: number;
  duration: string;
  genre: string[];
  director: string;
  cast: string[];
  rating: number;
  isPremium: boolean;
  price: number;
}

export const featuredMovies: Movie[] = [
  {
    id: "1",
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    thumbnailUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    bannerUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    year: 2010,
    duration: "2h 28m",
    genre: ["Action", "Sci-Fi", "Thriller"],
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    rating: 8.8,
    isPremium: true,
    price: 4.99
  },
  {
    id: "2",
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    thumbnailUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    bannerUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    year: 2014,
    duration: "2h 49m",
    genre: ["Adventure", "Drama", "Sci-Fi"],
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    rating: 8.6,
    isPremium: true,
    price: 5.99
  },
  {
    id: "3",
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    thumbnailUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    bannerUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    year: 2008,
    duration: "2h 32m",
    genre: ["Action", "Crime", "Drama"],
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    rating: 9.0,
    isPremium: false,
    price: 0
  }
];

export const allMovies: Movie[] = [
  ...featuredMovies,
  {
    id: "4",
    title: "The Matrix",
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    thumbnailUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    bannerUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    year: 1999,
    duration: "2h 16m",
    genre: ["Action", "Sci-Fi"],
    director: "Lana Wachowski, Lilly Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    rating: 8.7,
    isPremium: true,
    price: 3.99
  },
  {
    id: "5",
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    thumbnailUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    bannerUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    year: 1994,
    duration: "2h 34m",
    genre: ["Crime", "Drama"],
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    rating: 8.9,
    isPremium: false,
    price: 0
  },
  {
    id: "6",
    title: "Forrest Gump",
    description: "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an IQ of 75.",
    thumbnailUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    bannerUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    year: 1994,
    duration: "2h 22m",
    genre: ["Drama", "Romance"],
    director: "Robert Zemeckis",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    rating: 8.8,
    isPremium: false,
    price: 0
  },
  {
    id: "7",
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    thumbnailUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    bannerUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    year: 1994,
    duration: "2h 22m",
    genre: ["Drama"],
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    rating: 9.3,
    isPremium: true,
    price: 4.99
  },
  {
    id: "8",
    title: "The Godfather",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    thumbnailUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    bannerUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    year: 1972,
    duration: "2h 55m",
    genre: ["Crime", "Drama"],
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    rating: 9.2,
    isPremium: true,
    price: 5.99
  }
];

export const getMovieById = (id: string): Movie | undefined => {
  return allMovies.find(movie => movie.id === id);
};

export const getMoviesByGenre = (genre: string): Movie[] => {
  return allMovies.filter(movie => movie.genre.includes(genre));
};

export const getFreeMovies = (): Movie[] => {
  return allMovies.filter(movie => !movie.isPremium);
};

export const getPremiumMovies = (): Movie[] => {
  return allMovies.filter(movie => movie.isPremium);
};
