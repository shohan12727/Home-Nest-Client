import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import building1 from "../assets/hn1.jpg";
import building2 from "../assets/hn2.jpg";
import building3 from "../assets/build2.png";

import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router";

export default function Banner() {
  const slides = [building1, building2, building3];

  return (
    <div className="relative w-full">
      <Swiper
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        modules={[Navigation, Autoplay]}
        className="h-[70vh] "
      >
        {slides.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[70vh] w-full overflow-hidden">
              {/* Background Image */}
              <img
                src={img}
                alt="Property"
                className="absolute inset-0 w-full h-full object-cover scale-105"
              />

              {/* Blur Layer */}
              <div className="absolute inset-0 backdrop-blur-sm" />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-3xl px-6 md:px-16 text-left">
                  <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                    Find Your Perfect Home with HomeNest
                  </h1>

                  <p className="mt-4 text-lg md:text-xl text-gray-200">
                    Explore verified properties for rent and sale — simple,
                    secure, seamless.
                  </p>

                  <div className="mt-6 flex gap-4">
                    <Link to="/all-properties">
                      <button className="btn btn-primary">
                        All Properties
                      </button>
                    </Link>

                    <Link to="/add-properties">
                      <button className="btn btn-outline border-white text-white hover:bg-white/10">
                        Add Listing
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
