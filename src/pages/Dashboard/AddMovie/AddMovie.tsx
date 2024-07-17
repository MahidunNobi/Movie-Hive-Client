import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddMovie = () => {
  const axiosSecure = useAxiosSecure();
  const handleAddMovie = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const movie = {
      movie_name: form.movie_name.value,
      published_year: form.published_year.value,
      story: form.story.value,
      movie_geners: form.movie_geners.value,
      movie_ratting: form.movie_ratting.value,
    };
    const res = await axiosSecure.post("/movies", movie);
    console.log(res);
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
          <input
            type="text"
            required
            placeholder="Movie categories"
            name="movie_geners"
            className="input input-bordered w-full mt-2"
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
        <button className="btn btn-primary w-full md:col-span-2 "> ADD </button>
      </form>
    </div>
  );
};

export default AddMovie;
