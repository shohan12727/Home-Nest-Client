import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Assets
import building1 from "../assets/build1.png";
import building2 from "../assets/build2.png";
import building3 from "../assets/build3.png";
console.log(building2, building1);

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function Banner() {
  return (
    <div className="w-full">
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
          <img
            src={building1}
            alt="Building"
            className="min-w-screen h-100 object-cover"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src={building2}
            alt="Building"
            className="min-w-screen h-100 object-cover"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src={building3}
            alt="Building"
            className="min-w-screen h-100 object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
