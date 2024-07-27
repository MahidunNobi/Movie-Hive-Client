import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MovieType } from "../../../types/MovieTypes";
import Select, { ActionMeta, MultiValue } from "react-select";
import { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { GenersType } from "../../../types/GenersType";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

interface Option {
  value: string;
  label: string;
}

const EditMovie = () => {
  // Hooks
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState<MovieType | null>(null);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [selectedGeners, setSelectedGeners] =
    useState<null | MultiValue<GenersType>>(null);
  const navigate = useNavigate();

  const { data: genersOptions } = useQuery({
    queryKey: ["Geners"],
    queryFn: async () => {
      const res = await axiosPublic.get("/geners");
      return res.data;
    },
  });
  const { isLoading, isPending, isError } = useQuery({
    queryKey: ["movie-details"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/movies/${id}`);
      setMovieDetails(res.data);
      const { movie_geners } = res.data;
      setSelectedGeners(movie_geners);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: (movie: MovieType) => {
      const res = axiosSecure.patch(`/movies/${id}`, movie);
      return res;
    },
  });

  const handleGenerChange = (
    newValue: MultiValue<Option>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    actionMeta: ActionMeta<Option>
  ) => {
    setSelectedGeners(newValue);
    return;
  };

  const handleUpdateMovie = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (!selectedGeners || selectedGeners.length < 1) {
      return Swal.fire({
        title: "Please select at least one Geners",
        icon: "error",
      });
    }
    const credentials: MovieType = {
      movie_name: form.movie_name.value,
      published_year: form.published_year.value,
      story: form.story.value,
      movie_geners: selectedGeners,
      movie_ratting: form.movie_ratting.value,
      movie_poster_url: form.movie_poster_url.value,
    };
    mutation.mutate(credentials, {
      onSuccess: (data) => {
        if (data.data.success) {
          navigate(`/dashboard/manage-movie`);
        }
      },
    });
  };

  if (isLoading || isPending || !movieDetails) {
    return (
      <div className="w-full flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else if (isError) {
    return (
      <div className="w-full flex justify-center">
        <h3 className="text-2xl"> There was an error. </h3>
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto border-2 rounded-md p-6">
      <h1 className="text-4xl font-ubuntu font-bold text-center mb-6">
        Edit Movie
      </h1>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={handleUpdateMovie}
      >
        {/* Movie Name */}
        <div>
          <label htmlFor="movie_name" className="font-semibold">
            Movie Name
          </label>
          <input
            required
            type="text"
            placeholder="Full Movie name"
            name="movie_name"
            defaultValue={movieDetails.movie_name}
            className="input input-bordered w-full mt-2"
          />
        </div>
        {/* Published Year */}
        <div>
          <label htmlFor="published_year" className="font-semibold">
            Published year
          </label>
          <input
            required
            type="text"
            placeholder="2024"
            name="published_year"
            defaultValue={movieDetails.published_year}
            className="input input-bordered w-full mt-2"
          />
        </div>
        {/* Story */}
        <div className="md:col-span-2">
          <label htmlFor="story" className="font-semibold">
            Story
          </label>
          <textarea
            placeholder="Sumarize the movie story."
            name="story"
            required
            defaultValue={movieDetails.story}
            className="textarea input-bordered w-full mt-2"
          ></textarea>
        </div>
        {/* Movie Genres */}
        <div>
          <label htmlFor="movie_geners" className="font-semibold">
            Movie Genres
          </label>
          <Select
            closeMenuOnSelect={false}
            // components={animatedComponents}
            defaultValue={selectedGeners}
            onChange={handleGenerChange}
            isMulti
            options={genersOptions}
          />
        </div>
        {/* Movie Ratting */}
        <div>
          <label htmlFor="movie_ratting" className="font-semibold">
            Ratting
          </label>

          <input
            type="number"
            placeholder="4.5/5"
            required
            max={5}
            name="movie_ratting"
            defaultValue={movieDetails.movie_ratting}
            className="input input-bordered w-full mt-2"
          />
        </div>
        {/* Movie poster url*/}
        <div>
          <label htmlFor="movie_poster_url" className="font-semibold">
            Poster URL
          </label>

          <input
            type="url"
            placeholder="https://google.com/photos/12@4512#44521"
            required
            name="movie_poster_url"
            defaultValue={movieDetails.movie_poster_url}
            className="input input-bordered w-full mt-2"
          />
        </div>
        {/* Movie poster */}
        <div>
          <label htmlFor="movie_poster" className="font-semibold">
            Poster
          </label>

          <input
            name="movie_poster"
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
          />
        </div>
        {mutation.isPending ? (
          <span className="loading loading-spinner loading-md text-net-red mx-auto"></span>
        ) : (
          <button className="btn btn-primary w-full md:col-span-2 ">
            Update
          </button>
        )}
      </form>
      {mutation.isSuccess && (
        <h6 className="text-green-600 font-medium mt-3 text-center">
          Movie added to your collection
        </h6>
      )}
      {mutation.isError && (
        <h6 className="text-red-600 font-medium mt-3 text-center">
          Something went wrong.
        </h6>
      )}
    </div>
  );
};

export default EditMovie;
