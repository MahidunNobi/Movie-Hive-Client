import { useQuery } from "@tanstack/react-query";
import Movie from "../../componants/SharedComponants/Movie/Movie";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { MovieType } from "../../types/MovieTypes";
import { CiSearch } from "react-icons/ci";
import React, { useRef, useState } from "react";

const Movies = () => {
  const axiosPublic = useAxiosPublic();
  const [movies, setMovies] = useState<MovieType[] | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, refetch, isPending, isError } = useQuery<
    MovieType[]
  >({
    queryKey: ["get-all-movies"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        searchRef.current?.value
          ? `/movies?movie_name=${searchRef.current?.value}`
          : `/movies`
      );
      setMovies(res.data);
      return res.data;
    },
  });

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!movies) return;
    if (value === "name(a-z)") {
      const sorted = movies.sort(function (a, b) {
        return a.movie_name.localeCompare(b.movie_name);
      });
      setMovies([...sorted]);
      // console.log(sorted);
    } else if (value === "name(z-a)") {
      const sorted = movies.sort(function (a, b) {
        return b.movie_name.localeCompare(a.movie_name);
      });
      setMovies([...sorted]);
      // console.log(sorted);
    } else if (value === "rating(ascending)") {
      const sorted = movies.sort(function (a, b) {
        return a.movie_ratting - b.movie_ratting;
      });
      setMovies([...sorted]);
      // setMovies()
    } else if (value === "rating(descending)") {
      const sorted = movies.sort(function (a, b) {
        return b.movie_ratting - a.movie_ratting;
      });
      // console.log(sorted);
      setMovies([...sorted]);
    } else if (value === "realesed_year(ascending)") {
      const sorted = movies.sort(function (a, b) {
        return a.published_year - b.published_year;
      });
      setMovies([...sorted]);
    } else if (value === "realesed_year(descending)") {
      const sorted = movies.sort(function (a, b) {
        return b.published_year - a.published_year;
      });
      setMovies([...sorted]);
    }
  };

  const handleSearch = () => {
    refetch();
  };

  if (isLoading || isPending) {
    return (
      <div className="w-full flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else if (isError) {
    return (
      <div className="w-full flex justify-center">
        <h2 className="text-red-600">There was an error</h2>
      </div>
    );
  }

  return (
    <div className="pt-24">
      <div className="container mx-auto px-3">
        <h1 className="text-4xl font-ubuntu text-center font-semibold ">
          All Movies
        </h1>

        <div className="flex flex-col md:flex-row gap-4 items-center mt-6 justify-center md:justify-between">
          {/* Sort by */}
          <div>
            <select
              defaultValue=""
              className="select select-bordered w-full max-w-xs"
              onChange={handleSortChange}
            >
              <option disabled value="">
                Sort Movies By
              </option>
              <option value="name(a-z)">Name(A-Z)</option>
              <option value="name(z-a)">Name(Z-A)</option>
              <option value="rating(ascending)">Ratting(Ascending)</option>
              <option value="rating(descending)">Ratting(Descending)</option>
              <option value="realesed_year(ascending)">
                Realesed Year(Ascending)
              </option>
              <option value="realesed_year(descending)">
                Realesed Year(Descending)
              </option>
            </select>
          </div>

          {/* Search */}
          <div>
            <label className="input input-bordered flex items-center gap-2 max-w-xs pr-0 overflow-hidden">
              <input
                type="text"
                className="grow"
                ref={searchRef}
                placeholder="Search"
              />
              <button
                onClick={handleSearch}
                className="bg-gray-600 hover:bg-gray-500 duration-150 h-full px-3"
              >
                <CiSearch size={24} />
              </button>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 mt-12">
          {movies?.map((mov) => (
            <Movie key={mov._id} movie={mov} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;
