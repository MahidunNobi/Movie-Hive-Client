import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MovieType } from "../../../types/MovieTypes";
import Select, { ActionMeta, MultiValue } from "react-select";
import { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { GenersType } from "../../../types/GenersType";
import Swal from "sweetalert2";

interface Option {
  value: string;
  label: string;
}

const AddMovie = () => {
  // Hooks
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [selectedGeners, setSelectedGeners] =
    useState<null | MultiValue<GenersType>>(null);

  const { data: genersOptions } = useQuery({
    queryKey: ["Geners"],
    queryFn: async () => {
      const res = await axiosPublic.get("/geners");
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: (movie: MovieType) => {
      const res = axiosSecure.post("/movies", movie);
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

  const handleAddMovie = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (!selectedGeners || selectedGeners.length < 1) {
      return Swal.fire({
        title: "Please select at least one Geners",
        icon: "error",
      });
    }
    if (Number(form.movie_ratting.value) > 5) {
      return alert("Ratting cannot be more than 5");
    }

    const credentials: MovieType = {
      movie_name: form.movie_name.value,
      published_year: form.published_year.value,
      story: form.story.value,
      movie_geners: selectedGeners,
      movie_ratting: Number(form.movie_ratting.value),
      movie_poster_url: form.movie_poster_url.value,
    };
    mutation.mutate(credentials, {
      onSuccess: (data) => {
        if (data.data.success) {
          form.reset();
        }
      },
    });
  };

  return (
    <div className="max-w-[800px] mx-auto border-2 rounded-md p-6">
      <h1 className="text-4xl font-ubuntu font-bold text-center mb-6">
        Add Watched Movie
      </h1>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={handleAddMovie}
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
            type="text"
            placeholder="4.5/5"
            required
            name="movie_ratting"
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
          <button className="btn btn-primary w-full md:col-span-2 ">ADD</button>
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

export default AddMovie;
