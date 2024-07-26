import { MultiValue } from "react-select";
import { GenersType } from "./GenersType";

export type MovieType = {
  _id?: string;
  movie_name: string;
  published_year: number;
  story: string;
  movie_geners: MultiValue<GenersType>;
  movie_ratting: number;
  user?: string;
  movie_poster_url?: string;
};
