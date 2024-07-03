import Featured from "../../componants/Home/Featured/Featured";
import Hero from "../../componants/Home/Hero/Hero";
import Recommendation from "../../componants/Home/Recommendation/Recommendation";
import Track from "../../componants/Home/Track/Track";

const Home = () => {
  return (
    <div>
      <Hero />
      <Featured />
      <Track />
      <Recommendation />
    </div>
  );
};

export default Home;
