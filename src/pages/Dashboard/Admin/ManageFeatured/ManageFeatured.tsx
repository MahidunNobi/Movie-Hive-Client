import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { MovieType } from "../../../../types/MovieTypes";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import Rating from "../../../../componants/SharedComponants/Ratting/Ratting";
import FilledButton from "../../../../componants/SharedComponants/Buttons/FilledButton/FilledButton";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageFeatured = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isPending, isError } = useQuery<MovieType[]>({
    queryKey: ["feature-movies"],
    queryFn: async () => {
      const res = await axiosPublic.get("/movies/featured");
      return res.data;
    },
  });
  const mutation = useMutation({
    mutationFn: (id: string | undefined) => {
      return axiosSecure.post(`/movies/not-featured/${id}`);
    },
  });

  const handleDeleteMovie = (id: string | undefined) => {
    mutation.mutate(id, {
      onSuccess: (res) => {
        console.log(res.data);
      },
    });
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
    <div className="overflow-x-auto">
      <div className="flex justify-end">
        <Link to={"/dashboard/add-featured-movies"}>
          <FilledButton text="Add Movie" />
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
          {data ? (
            data?.map((movie) => (
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
                  <div className="flex flex-col ">
                    <Rating rating={movie.movie_ratting} />
                    <span className="text-sm ml-2 text-gray-600">
                      ({movie.movie_ratting}/5)
                    </span>
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteMovie(movie._id)}
                    className="btn btn-sm btn-circle btn-outline btn-error"
                  >
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

export default ManageFeatured;
