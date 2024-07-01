import FilledButton from "../../SharedComponants/Buttons/FilledButton/FilledButton";

const Hero = () => {
  return (
    <div className="hero-background min-h-screen flex justify-center items-center">
      <div className="container mx-auto px-6 flex flex-col items-center space-y-6">
        <h1 className="text-5xl font-semibold text-center font-roboto">
          Keep Track of Your Movies and Discover What's Next
        </h1>

        <h3 className="text-xl font-semibold text-center">
          Save watched movies to your collection. Receive personalized
          recommendations.
        </h3>

        <FilledButton
          text="GET STARTED"
          aditionalClass="rounded-none py-4 px-6"
        />

        {/* <p className="text-center mx-auto text-gray-300">
          Explore your favorite movies, save them to your collection, and
          receive personalized recommendations. Whether you're tracking what
          you've watched or looking for your next favorite film, Movie Hive is
          your ultimate movie companion.
        </p> */}
      </div>
    </div>
  );
};

export default Hero;
