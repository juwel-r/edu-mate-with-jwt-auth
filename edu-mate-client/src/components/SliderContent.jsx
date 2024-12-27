import React from "react";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

const SliderContent = ({ title, description, description2 }) => {
  return (
    <Fade direction="left">
      <div className="flex text-left justify-start max-w-96 md:max-w-[600px] lg:max-w-full items-start flex-col my-8 px-6 lg:pl-44 md:px-10 lg:space-y-8 text-white">
        <h1 className="mt-8 md:text-xl text-sm">{title}</h1>

        <p className="md:my-4 my-2  font-bold text-2xl lg:text-5xl md:text-3xl lg:leading-[60px]">
          {description}
        </p>

        <p className="md:text-lg ">{description2}</p>
        <Link
          to="/all-equipments"
          className="md:text-xl font-semibold border-2 md:py-2 md:px-8 mt-3 hover:bg-secondary border-white text-white transition-colors btn btn-ghost rounded-none btn-sm md:btn-md mb-8"
        >
          Explore More
        </Link>
      </div>
    </Fade>
  );
};

export default SliderContent;
