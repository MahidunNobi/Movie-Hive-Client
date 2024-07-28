import ReviewPic from "../../../assets/Review.jpg";

const Review = () => {
  return (
    <div className="border-y-2 border-gray-600 py-24">
      <div className="container mx-auto flex flex-col md:flex-row-reverse gap-6">
        {/* -------Details------ */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl font-ubuntu text-left font-semibold ">
            Share Your Reviews
          </h1>
          <p className="mt-6 text-lg font-roboto">
            Your opinions matter! Share your thoughts and ratings on the movies
            you've watched. Help others discover great films by providing your
            honest reviews. Join the Movie Hive community and contribute to a
            richer movie-watching experience for everyone.
          </p>
        </div>

        {/* ----Image---- */}
        <div className="max-w-[500px] rounded-md overflow-hidden">
          <img src={ReviewPic} alt="Track" className="w-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Review;
