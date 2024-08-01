import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../..//hooks/useAxiosSecure";
import { MovieType } from "../../../../types/MovieTypes";
import Ratting from "../../../../componants/SharedComponants/Ratting/Ratting";
import { Link } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";

const AddManageFeatured = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: movies,
    refetch,
    isLoading,
    isPending,
  } = useQuery<MovieType[]>({
    queryKey: ["get-user-movies"],
    queryFn: async () => {
      const res = await axiosSecure.get("/movies/not-featured");
      return res.data;
    },
  });

  if (isLoading || isPending) {
    return (
      <div className="w-full flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="my-6">
        <h1 className="text-3xl font-semibold text-center my-6">
          Add Movies to Featured
        </h1>
        <Link to={"/dashboard/manage-featured"}>
          <button className="hover:bg-indigo-200 hover:text-indigo-800 duration-100 px-2 border border-gray-700 hover:border-indigo-800 py-2 rounded-full">
            <FaArrowLeft size={16} />
          </button>
        </Link>
      </div>
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
                        to={`/dashboard/manage-movie/${movie._id}`}
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
                  <div className="flex flex-col">
                    <Ratting rating={movie.movie_ratting} />
                    <span className="text-sm ml-2 text-gray-600">
                      ({movie.movie_ratting}/5)
                    </span>
                  </div>
                </td>
                <td>
                  <button className="btn btn-sm btn-circle btn-outline mr-2">
                    <IoIosAdd size={20} />
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

export default AddManageFeatured;
