export interface Result {
  characters: string[]; //url
  created: string; //datetime
  director: string;
  edited: string; //datetime
  episode_id: number;
  opening_crawl: string;
  planets: string[];
  producer: string;
  release_date: string; //date
  species: string[]; //url
  starships: string[]; //url
  title: string;
  url: string;
  vehicles: string[]; //url
}

export interface Movie {
  results: Result[];
}

export interface StoreState {
  isMovieOpen: boolean;
  setMovieOpen: (x: boolean) => void;
  isOptionsOpen: boolean;
  setOptionsOpen: (x: boolean) => void;
  movie: null | Result;
  setMovie: (m: Result) => void;
}

export interface Character {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films: any[];
  species: any[];
  starships: any[];
  vehicles: any[];
  url: string;
  created: string;
  edited: string;
}
