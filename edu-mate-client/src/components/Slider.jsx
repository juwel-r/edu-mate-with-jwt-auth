import React from "react";
import slide1 from "../assets/slide_Photo/slide1.jpg";
import slide2 from "../assets/slide_Photo/slide2.jpg";
import slide3 from "../assets/slide_Photo/slide3.png";
import slide4 from "../assets/slide_Photo/slide4.png";
// import SliderContent from "./SliderContent";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SliderContent from "./SliderContent";

const Slider = () => {
  const slider = [
    {
      id: 1,
      cover: slide1,
      title: "Expert Tutors",
      description: "Find Skilled Professionals",
      description2: "Connect with the best for every subject.",
    },
    {
      id: 2,
      cover: slide2,
      title: "Language Learning",
      description: "Master Global Languages",
      description2: "Learn and excel in languages like never before.",
    },
    {
      id: 3,
      cover: slide3,
      title: "Affordable Plans",
      description: "Value for Quality Education",
      description2: "Learn without breaking the bank.",
    },
    // {
    //   id: 4,
    //   cover: slide4,
    //   title: "Interactive Sessions",
    //   description: "Engage with Dynamic Tutors",
    //   description2: "Boost your skills with personalized lessons.",
    // },
  ];
  
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, A11y]}
      slidesPerView={1}
      spaceBetween={50}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      className="w-full"
    >
      {slider.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className={`carousel-item marker:relative w-full bg-cover object-cover bg-right-top md:py-8 lg:py-16 lg:h-[80vh]`}
            style={{ backgroundImage: `url(${slide.cover})` }}
          >
            <div className=" absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="flex justify-start items-center h-full">
            <SliderContent
              title={slide.title}
              description={slide.description}
              description2={slide.description2}
            ></SliderContent>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
