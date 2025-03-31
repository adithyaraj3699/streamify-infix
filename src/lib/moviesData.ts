
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
  isAudioFormat?: boolean;
}

export const featuredMovies: Movie[] = [
  {
    id: "1",
    title: "Dune",
    description: "A mythic and emotionally charged hero's journey, 'Dune' tells the story of Paul Atreides, a brilliant and gifted young man born into a great destiny.",
    thumbnailUrl: "https://images.unsplash.com/photo-1682687221323-6ce2dbc803ab",
    bannerUrl: "https://images.unsplash.com/photo-1682687221323-6ce2dbc803ab",
    year: 2021,
    duration: "2h 35m",
    genre: ["Action", "Adventure", "Sci-Fi"],
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Rebecca Ferguson", "Oscar Isaac"],
    rating: 8.0,
    isPremium: true,
    price: 5.99
  },
  {
    id: "2",
    title: "Everything Everywhere All at Once",
    description: "A middle-aged Chinese immigrant is swept up in an insane adventure where she alone can save existence by exploring other universes and connecting with the lives she could have led.",
    thumbnailUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
    bannerUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
    year: 2022,
    duration: "2h 19m",
    genre: ["Action", "Adventure", "Comedy"],
    director: "Daniel Kwan, Daniel Scheinert",
    cast: ["Michelle Yeoh", "Stephanie Hsu", "Jamie Lee Curtis"],
    rating: 8.7,
    isPremium: true,
    price: 6.99
  },
  {
    id: "3",
    title: "Oppenheimer",
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    thumbnailUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7",
    bannerUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7",
    year: 2023,
    duration: "3h 00m",
    genre: ["Biography", "Drama", "History"],
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon"],
    rating: 8.5,
    isPremium: false,
    price: 0
  }
];

export const allMovies: Movie[] = [
  ...featuredMovies,
  {
    id: "4",
    title: "Barbie",
    description: "Barbie suffers a crisis that leads her to question her world and her existence, and embark on a journey of self-discovery.",
    thumbnailUrl: "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d",
    bannerUrl: "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d",
    year: 2023,
    duration: "1h 54m",
    genre: ["Adventure", "Comedy", "Fantasy"],
    director: "Greta Gerwig",
    cast: ["Margot Robbie", "Ryan Gosling", "America Ferrera"],
    rating: 7.0,
    isPremium: true,
    price: 5.99
  },
  {
    id: "5",
    title: "The Batman",
    description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
    thumbnailUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb",
    bannerUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb",
    year: 2022,
    duration: "2h 56m",
    genre: ["Action", "Crime", "Drama"],
    director: "Matt Reeves",
    cast: ["Robert Pattinson", "Zoë Kravitz", "Jeffrey Wright"],
    rating: 7.8,
    isPremium: false,
    price: 0
  },
  {
    id: "6",
    title: "Spider-Man: Across the Spider-Verse",
    description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
    thumbnailUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820",
    bannerUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820",
    year: 2023,
    duration: "2h 16m",
    genre: ["Animation", "Action", "Adventure"],
    director: "Joaquim Dos Santos, Kemp Powers, Justin K. Thompson",
    cast: ["Shameik Moore", "Hailee Steinfeld", "Oscar Isaac"],
    rating: 8.7,
    isPremium: false,
    price: 0
  },
  {
    id: "7",
    title: "Top Gun: Maverick",
    description: "After more than thirty years of service as a top naval aviator, Pete Mitchell is where he belongs, pushing the envelope as a courageous test pilot.",
    thumbnailUrl: "https://images.unsplash.com/photo-1564022314296-824191d16a36",
    bannerUrl: "https://images.unsplash.com/photo-1564022314296-824191d16a36",
    year: 2022,
    duration: "2h 10m",
    genre: ["Action", "Drama"],
    director: "Joseph Kosinski",
    cast: ["Tom Cruise", "Miles Teller", "Jennifer Connelly"],
    rating: 8.3,
    isPremium: true,
    price: 4.99
  },
  {
    id: "8",
    title: "Avatar: The Way of Water",
    description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.",
    thumbnailUrl: "https://images.unsplash.com/photo-1579202673506-ca3ce28943ef",
    bannerUrl: "https://images.unsplash.com/photo-1579202673506-ca3ce28943ef",
    year: 2022,
    duration: "3h 12m",
    genre: ["Action", "Adventure", "Fantasy"],
    director: "James Cameron",
    cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
    rating: 7.6,
    isPremium: true,
    price: 6.99
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
