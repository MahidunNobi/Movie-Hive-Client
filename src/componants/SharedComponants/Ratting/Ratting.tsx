import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

// Define the props for the component
interface RatingProps {
  rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  // Create an array to hold the star images
  const stars = [];

  // Loop to create the star images
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      // Full star
      stars.push(<FaStar className="text-orange-500 text-lg" />);
    } else if (rating >= i - 0.5) {
      // Half star
      stars.push(<FaStarHalfAlt className="text-orange-500 text-lg" />);
    } else {
      // Empty star
      stars.push(<FaStar className="text-gray-500 text-lg" />);
    }
  }

  return <div className="flex  items-center">{stars}</div>;
};

export default Rating;
