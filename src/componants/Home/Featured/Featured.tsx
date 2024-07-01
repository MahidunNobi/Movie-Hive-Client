import Movie from "../../SharedComponants/Movie/Movie";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import { Autoplay } from "swiper/modules";

const Featured = () => {
  return (
    <div className="border-y-2 border-gray-600 py-24">
      <div className="container mx-auto">
        <h1 className="text-4xl font-roboto text-center font-semibold">
          Featured Movies
        </h1>
        {/* -------Featured movies container------ */}
        <Swiper
          slidesPerView={4}
          spaceBetween={10}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper mt-6"
        >
          <SwiperSlide>
            <Movie />
          </SwiperSlide>
          <SwiperSlide>
            <Movie />
          </SwiperSlide>
          <SwiperSlide>
            <Movie />
          </SwiperSlide>
          <SwiperSlide>
            <Movie />
          </SwiperSlide>
          <SwiperSlide>
            <Movie />
          </SwiperSlide>
          <SwiperSlide>
            <Movie />
          </SwiperSlide>
          <SwiperSlide>
            <Movie />
          </SwiperSlide>
          <SwiperSlide>
            <Movie />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Featured;
