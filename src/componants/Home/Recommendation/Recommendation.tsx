import RecommendataionImg from "../../../assets/Recommendation.jpg";
export default function Recommendation() {
  return (
    <div className="border-y-2 border-gray-600 py-24">
      <div className="container mx-auto flex flex-col md:flex-row gap-6">
        {/* -------Details------ */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl font-ubuntu text-left font-semibold ">
            Get Recommendations
          </h1>
          <p className="mt-6 text-lg font-roboto">
            Finding the perfect movie can be a daunting task, and picking the
            wrong one can waste precious time. That's where personalized
            recommendations come in. Based on your watch history and ratings,
            Movie Hive suggests movies tailored to your tastes. Say goodbye to
            endless scrolling and hello to curated suggestions that match your
            preferences. Make the most of your movie nights with recommendations
            you can trust.
          </p>
        </div>

        {/* ----Image---- */}
        <div className="max-w-[500px] rounded-md overflow-hidden">
          <img
            src={RecommendataionImg}
            alt="Track"
            className="w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
