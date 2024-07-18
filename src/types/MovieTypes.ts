export type MovieType = {
  _id?: string;
  movie_name: string;
  published_year: number;
  story: string;
  movie_geners: [string];
  movie_ratting: number;
  user?: string;
};
