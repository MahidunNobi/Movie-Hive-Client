import Featured from "../../componants/Home/Featured/Featured";
import Hero from "../../componants/Home/Hero/Hero";
import Recommendation from "../../componants/Home/Recommendation/Recommendation";
import Review from "../../componants/Home/Review/Review";
import Track from "../../componants/Home/Track/Track";

const Home = () => {
  return (
    <div>
      <Hero />
      <Featured />
      <Track />
      <Recommendation />
      <Review />
    </div>
  );
};

export default Home;
