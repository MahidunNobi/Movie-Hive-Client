import TrackImg from "../../../assets/Track.jpg";

const Track = () => {
  return (
    <div className="border-y-2 border-gray-600 py-24">
      <div className="container mx-auto flex flex-col md:flex-row gap-6">
        {/* ----Image---- */}
        <div className="max-w-[500px] rounded-md overflow-hidden">
          <img src={TrackImg} alt="Track" className="w-full object-cover" />
        </div>
        {/* -------Details------ */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-ubuntu text-left font-semibold ">
            Track Your Watched Movies
          </h1>
          <p className="mt-6 text-lg font-roboto">
            Keeping track of the movies you've watched is essential. With so
            many great films out there, it's easy to forget which ones you've
            already seen. By saving your watched movies, you can avoid the
            confusion of rewatching films and instead focus on discovering new
            favorites. Let Movie Hive help you organize your movie-watching
            history so you always know what's next on your list.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Track;
