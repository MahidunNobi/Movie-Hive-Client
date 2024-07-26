import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MovieType } from "../../../types/MovieTypes";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const ManageMovie = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: moviesRes,
    isLoading,
    isPending,
  } = useQuery<{ message: string; data: MovieType[] }>({
    queryKey: ["get-user-movies"],
    queryFn: async () => {
      const res = await axiosSecure.get("/movies/user");
      return res.data;
    },
  });

  const movies = moviesRes?.data;

  console.log(movies);
  if (isLoading || isPending) {
    return (
      <div className="w-full flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {movies ? (
            movies?.map((movie) => (
              <tr key={movie._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={
                            movie.movie_poster_url
                              ? movie.movie_poster_url
                              : "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAyL3Zwcm9qZWN0b2xkMS10YW5nLTE0Njktam9iMTcyMi1wLnBuZw.png"
                          }
                          alt={movie.movie_name}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{movie.movie_name}</div>
                      <div className="text-sm opacity-50">
                        {movie.movie_geners?.map((geners) => (
                          <span
                            key={geners._id}
                            className="border px-2 rounded-xl border-gray-400 mr-2"
                          >
                            {geners.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex  items-center">
                    <FaStar className="text-orange-500 text-lg" />
                    <FaStar className="text-orange-500 text-lg" />
                    <FaStar className="text-orange-500 text-lg" />
                    <FaStarHalfAlt className="text-orange-500 text-lg" />
                    <FaStar className="text-gray-500 text-lg" />
                    <span className="text-sm ml-2 text-gray-600">(4.5/5)</span>
                  </div>
                </td>
                <td>Purple</td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>
            ))
          ) : (
            <div className="w-full flex justify-center">
              <span>No Movies found</span>
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageMovie;
