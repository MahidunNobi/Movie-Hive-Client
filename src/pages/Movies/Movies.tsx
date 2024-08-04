import { useQuery } from "@tanstack/react-query";
import Movie from "../../componants/SharedComponants/Movie/Movie";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { MovieType } from "../../types/MovieTypes";
import { CiSearch } from "react-icons/ci";

const Movies = () => {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, isPending, isError } = useQuery<MovieType[]>({
    queryKey: ["get-all-movies"],
    queryFn: async () => {
      const res = await axiosPublic.get("/movies");
      return res.data;
    },
  });

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
      <div className="container mx-auto">
        <h1 className="text-4xl font-ubuntu text-center font-semibold ">
          All Movies
        </h1>

        <div className="flex justify-between">
          {/* Sort by */}
          <div>
            <select className="select select-bordered w-full max-w-xs">
              <option disabled selected>
                Sort Movies By
              </option>
              <option>Name(A-Z)</option>
              <option>Name(Z-A)</option>
              <option>Ratting(Ascending)</option>
              <option>Ratting(Descending)</option>
              <option>Realesed Year(Ascending)</option>
              <option>Realesed Year(Descending)</option>
            </select>
          </div>
          {/* Search */}
          <div>
            <label className="input input-bordered flex items-center gap-2 max-w-xs pr-0 overflow-hidden">
              <input type="text" className="grow" placeholder="Search" />
              <button className="bg-gray-600 hover:bg-gray-500 duration-150 h-full px-3">
                <CiSearch size={24} />
              </button>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 mt-12">
          {data.map((mov) => (
            <Movie key={mov._id} movie={mov} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;
