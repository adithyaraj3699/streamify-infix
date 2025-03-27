
export interface TVShow {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  bannerUrl: string;
  year: number;
  seasons: number;
  episodes: number;
  genre: string[];
  creator: string;
  cast: string[];
  rating: number;
  isPremium: boolean;
  price: number;
}

export const featuredTVShows: TVShow[] = [
  {
    id: "1",
    title: "Stranger Things",
    description: "When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.",
    thumbnailUrl: "https://images.unsplash.com/photo-1627873649417-c67f79df6207",
    bannerUrl: "https://images.unsplash.com/photo-1627873649417-c67f79df6207",
    year: 2016,
    seasons: 4,
    episodes: 34,
    genre: ["Drama", "Fantasy", "Horror"],
    creator: "The Duffer Brothers",
    cast: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"],
    rating: 8.7,
    isPremium: true,
    price: 9.99
  },
  {
    id: "2",
    title: "Breaking Bad",
    description: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
    thumbnailUrl: "https://images.unsplash.com/photo-1554595666-19ceabf46a84",
    bannerUrl: "https://images.unsplash.com/photo-1554595666-19ceabf46a84",
    year: 2008,
    seasons: 5,
    episodes: 62,
    genre: ["Crime", "Drama", "Thriller"],
    creator: "Vince Gilligan",
    cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn"],
    rating: 9.5,
    isPremium: false,
    price: 0
  },
  {
    id: "3",
    title: "The Crown",
    description: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
    thumbnailUrl: "https://images.unsplash.com/photo-1605201100110-1f07883d2882",
    bannerUrl: "https://images.unsplash.com/photo-1605201100110-1f07883d2882",
    year: 2016,
    seasons: 5,
    episodes: 50,
    genre: ["Biography", "Drama", "History"],
    creator: "Peter Morgan",
    cast: ["Claire Foy", "Olivia Colman", "Imelda Staunton"],
    rating: 8.7,
    isPremium: true,
    price: 7.99
  }
];

export const allTVShows: TVShow[] = [
  ...featuredTVShows,
  {
    id: "4",
    title: "The Mandalorian",
    description: "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
    thumbnailUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820",
    bannerUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820",
    year: 2019,
    seasons: 3,
    episodes: 24,
    genre: ["Action", "Adventure", "Fantasy"],
    creator: "Jon Favreau",
    cast: ["Pedro Pascal", "Carl Weathers", "Giancarlo Esposito"],
    rating: 8.7,
    isPremium: true,
    price: 8.99
  },
  {
    id: "5",
    title: "Succession",
    description: "The Roy family is known for controlling the biggest media and entertainment company in the world. However, their world changes when their father steps down from the company.",
    thumbnailUrl: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5",
    bannerUrl: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5",
    year: 2018,
    seasons: 4,
    episodes: 40,
    genre: ["Drama", "Comedy"],
    creator: "Jesse Armstrong",
    cast: ["Brian Cox", "Jeremy Strong", "Sarah Snook"],
    rating: 8.8,
    isPremium: false,
    price: 0
  },
  {
    id: "6",
    title: "Ted Lasso",
    description: "American college football coach Ted Lasso heads to London to manage AFC Richmond, a struggling English Premier League football team.",
    thumbnailUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018",
    bannerUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018",
    year: 2020,
    seasons: 3,
    episodes: 34,
    genre: ["Comedy", "Drama", "Sport"],
    creator: "Bill Lawrence, Jason Sudeikis",
    cast: ["Jason Sudeikis", "Hannah Waddingham", "Brett Goldstein"],
    rating: 8.8,
    isPremium: true,
    price: 6.99
  },
  {
    id: "7",
    title: "The Last of Us",
    description: "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope.",
    thumbnailUrl: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1",
    bannerUrl: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1",
    year: 2023,
    seasons: 1,
    episodes: 9,
    genre: ["Action", "Adventure", "Drama"],
    creator: "Craig Mazin, Neil Druckmann",
    cast: ["Pedro Pascal", "Bella Ramsey", "Gabriel Luna"],
    rating: 8.8,
    isPremium: true,
    price: 9.99
  },
  {
    id: "8",
    title: "Wednesday",
    description: "Wednesday Addams is sent to Nevermore Academy, a bizarre boarding school where she attempts to master her psychic powers, stop a monstrous killing spree, and solve the supernatural mystery that affected her family 25 years ago.",
    thumbnailUrl: "https://images.unsplash.com/photo-1568376794508-ae52c6ab3929",
    bannerUrl: "https://images.unsplash.com/photo-1568376794508-ae52c6ab3929",
    year: 2022,
    seasons: 1,
    episodes: 8,
    genre: ["Comedy", "Crime", "Fantasy"],
    creator: "Alfred Gough, Miles Millar",
    cast: ["Jenna Ortega", "Emma Myers", "Catherine Zeta-Jones"],
    rating: 8.1,
    isPremium: false,
    price: 0
  }
];

export const getTVShowById = (id: string): TVShow | undefined => {
  return allTVShows.find(show => show.id === id);
};

export const getTVShowsByGenre = (genre: string): TVShow[] => {
  return allTVShows.filter(show => show.genre.includes(genre));
};

export const getFreeTVShows = (): TVShow[] => {
  return allTVShows.filter(show => !show.isPremium);
};

export const getPremiumTVShows = (): TVShow[] => {
  return allTVShows.filter(show => show.isPremium);
};
