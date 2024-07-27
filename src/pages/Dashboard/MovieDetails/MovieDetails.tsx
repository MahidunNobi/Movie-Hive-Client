import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MovieType } from "../../../types/MovieTypes";
import Rating from "../../../componants/SharedComponants/Ratting/Ratting";
import { FaPen } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Getting movie details
  const {
    data: movieDetails,
    isLoading,
    isPending,
    isError,
  } = useQuery<MovieType>({
    queryKey: ["get-movie"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/movies/${id}`);
      return res.data;
    },
  });

  // Delete mutation function
  const deleteMutation = useMutation({
    mutationFn: (id: string | undefined) => {
      const res = axiosSecure.delete(`/movies/${id}`);
      return res;
    },
  });

  // Handling delete movie function
  const handleDeleteMovie = async (id: string | undefined) => {
    deleteMutation.mutate(id, {
      onSuccess: (data) => {
        if (data.data.success) {
          navigate("/dashboard/manage-movie");
        }
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
    <div className="flex flex-col md:flex-row gap-4">
      {/* Image or Movie poster */}
      <div className="w-36">
        <img
          src={
            movieDetails.movie_poster_url
              ? movieDetails.movie_poster_url
              : "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAyL3Zwcm9qZWN0b2xkMS10YW5nLTE0Njktam9iMTcyMi1wLnBuZw.png"
          }
          alt={movieDetails.movie_name}
        />
      </div>
      {/* Movie details */}
      <div className="space-y-3">
        {/* Title */}
        <h2 className="text-3xl font-semibold">
          {movieDetails.movie_name} - {movieDetails.published_year}
        </h2>
        {/* Geners */}
        <div>
          {movieDetails.movie_geners?.map((geners) => (
            <span
              key={geners._id}
              className="border px-2 rounded-xl border-net-red text-net-red mr-2"
            >
              {geners.label}
            </span>
          ))}
        </div>
        {/* Ratting */}
        <div className="flex gap-1">
          <Rating rating={movieDetails.movie_ratting} />
          <span className="text-sm ml-2 text-gray-400">
            ({movieDetails.movie_ratting}/5)
          </span>
        </div>
        {/* Story */}
        <p className="text-gray-500">{movieDetails.story}</p>
        {/* Action Btns */}
        <div>
          <Link
            to={`/dashboard/manage-movie/edit/${movieDetails._id}`}
            className="btn  btn-circle btn-outline mr-2"
          >
            <FaPen size={20} />
          </Link>
          <button
            onClick={() => handleDeleteMovie(movieDetails._id)}
            className="btn  btn-circle btn-outline btn-error"
          >
            <RiDeleteBin6Line size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
