import FilledButton from "../Buttons/FilledButton/FilledButton";
import { MovieType } from "../../../types/MovieTypes";
import Rating from "../Ratting/Ratting";
import { Link } from "react-router-dom";

const Movie = ({ movie }: { movie: MovieType }) => {
  const {
    _id,
    movie_name,
    movie_geners,
    movie_ratting,
    movie_poster_url,
    published_year,
    story,
  } = movie;
  return (
    <div className="rounded h-[400px] max-w-[260px] overflow-hidden relative group cursor-pointer">
      <img
        src={
          movie_poster_url
            ? movie_poster_url
            : "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAyL3Zwcm9qZWN0b2xkMS10YW5nLTE0Njktam9iMTcyMi1wLnBuZw.png"
        }
        alt={movie_name}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 h-full w-full bg-gray-950/80 transform translate-y-full group-hover:translate-y-0 duration-300 ease-in-out p-3 flex flex-col justify-between">
        <div>
          <span className="px-2 border-net-red border text-net-red font-medium rounded-lg">
            {published_year}
          </span>
          <h5 className="text-3xl font-semibold">{movie_name}</h5>
          <div>
            <span className="text-gray-300 font-semibold">
              {movie_geners.map(
                (gen, i) =>
                  `${gen.label} ${i + 1 != movie_geners.length ? "/ " : ""}`
              )}
            </span>
          </div>
          {/*----- Rating ------*/}
          <div className="flex  items-center">
            {/* <FaStar className="text-orange-500 text-lg" />
            <FaStar className="text-orange-500 text-lg" />
            <FaStar className="text-orange-500 text-lg" />
            <FaStarHalfAlt className="text-orange-500 text-lg" />
            <FaStar className="text-gray-500 text-lg" /> */}
            <Rating rating={movie_ratting} />
            <span className="text-sm ml-2 text-gray-300">
              ({movie_ratting}/5)
            </span>
          </div>
          <p className="text-gray-300 text-sm font-medium mt-2">
            {story.length > 290 ? `${story.slice(0, 290)}...` : story}
          </p>
        </div>
        <Link to={`/movies/${_id}`}>
          <FilledButton text="Details" />
        </Link>
      </div>
    </div>
  );
};

export default Movie;
