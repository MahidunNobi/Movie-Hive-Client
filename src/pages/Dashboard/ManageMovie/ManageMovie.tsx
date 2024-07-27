import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MovieType } from "../../../types/MovieTypes";
import Ratting from "../../../componants/SharedComponants/Ratting/Ratting";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";

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
            <th>Movie Name</th>
            <th>Rating</th>
            <th>Action</th>
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
                      <Link
                        to={`${movie._id}`}
                        className="font-bold hover:text-blue-600 duration-100"
                      >
                        {movie.movie_name} - {movie.published_year}
                      </Link>
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
                {/* Ratting */}
                <td>
                  <div className="flex flex-col items-center">
                    <Ratting rating={movie.movie_ratting} />
                    <span className="text-sm ml-2 text-gray-600">
                      ({movie.movie_ratting}/5)
                    </span>
                  </div>
                </td>
                <td>
                  <Link
                    to={`edit/${movie._id}`}
                    className="btn btn-sm btn-circle btn-outline mr-2"
                  >
                    <FaPen size={16} />
                  </Link>
                  <button className="btn btn-sm btn-circle btn-outline btn-error">
                    <RiDeleteBin6Line size={16} />
                  </button>
                </td>
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
