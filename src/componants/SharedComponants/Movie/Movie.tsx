import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import FilledButton from "../Buttons/FilledButton/FilledButton";

const Movie = () => {
  return (
    <div className="rounded max-w-[260px] max-h-[550px] overflow-hidden relative group cursor-pointer">
      <img
        src="https://filmfare.wwmindia.com/content/2023/aug/jawan21691407612.jpg"
        alt="Jawan"
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 h-full w-full bg-gray-950/80 transform translate-y-full group-hover:translate-y-0 duration-300 ease-in-out p-3 flex flex-col justify-between">
        <div>
          <span className="px-2 border-net-red border text-net-red font-medium rounded-lg">
            2024
          </span>
          <h5 className="text-3xl font-semibold">Jawan</h5>
          <div>
            <span className="text-gray-300 font-semibold">
              Action / Thriller
            </span>
          </div>
          {/*----- Rating ------*/}
          <div className="flex  items-center">
            <FaStar className="text-orange-500 text-lg" />
            <FaStar className="text-orange-500 text-lg" />
            <FaStar className="text-orange-500 text-lg" />
            <FaStarHalfAlt className="text-orange-500 text-lg" />
            <FaStar className="text-gray-500 text-lg" />
            <span className="text-sm ml-2 text-gray-300">(4.5/5)</span>
          </div>
          <p className="text-gray-300 text-sm font-medium mt-2">
            A prison warden recruits inmates to commit outrageous crimes that
            shed light on corruption and injustice - and that lead him to an
            unexpected reunion A prison warden recruits inmates to commit
            outrageous crimes that shed light on corruption and injustice...
          </p>
        </div>

        <FilledButton text="Details" />
      </div>
    </div>
  );
};

export default Movie;
