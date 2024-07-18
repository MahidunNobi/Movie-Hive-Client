import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MovieType } from "../../../types/MovieTypes";
import Select, { ActionMeta, MultiValue } from "react-select";
import { useState } from "react";

interface Option {
  value: string;
  label: string;
}
const AddMovie = () => {
  const axiosSecure = useAxiosSecure();

  // const animatedComponents = makeAnimated();
  const [selectedGeners, setSelectedGeners] =
    useState<null | MultiValue<Option>>(null);

  const genersOptions: Option[] = [
    { value: "Action", label: "Action" },
    { value: "Thriller", label: "Thriller" },
    { value: "Horror", label: "Horror" },
  ];

  const mutation = useMutation({
    mutationFn: (movie: MovieType) => {
      const res = axiosSecure.post("/movies", movie);
      return res;
    },
  });

  const handleGenerChange = (
    newValue: MultiValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => {
    console.log(actionMeta);
    setSelectedGeners(newValue);
    return;
  };
  console.log(selectedGeners);

  const handleAddMovie = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const credentials: MovieType = {
      movie_name: form.movie_name.value,
      published_year: form.published_year.value,
      story: form.story.value,
      movie_geners: form.movie_geners.value,
      movie_ratting: form.movie_ratting.value,
    };
    mutation.mutate(credentials);
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
          {/* <input
            type="text"
            required
            placeholder="Movie categories"
            name="movie_geners"
            className="input input-bordered w-full mt-2"
          /> */}
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
            maxLength={1}
            name="movie_ratting"
            className="input input-bordered w-full mt-2"
          />
        </div>
        {mutation.isPending ? (
          <span className="loading loading-spinner loading-md text-net-red mx-auto"></span>
        ) : (
          <button className="btn btn-primary w-full md:col-span-2 ">
            {" "}
            ADD{" "}
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

export default AddMovie;
