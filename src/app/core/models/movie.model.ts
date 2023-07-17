export interface Movie {
  id: number;
  title: string;
  title_original: string;
  cover: string;
  director: string;
  description: string;
  duration: string;
  scores: { id: number, score: number }
  kinopoisk: string;
  rating_kinopoisk: number;
  rating_imdb: number;
  rating_halva: number;
  rating_sum: number;
  rating_average: number;
  year: number;
  film_length: number;
  serial: boolean;
  short_film: false;
  genres: string[];
}
