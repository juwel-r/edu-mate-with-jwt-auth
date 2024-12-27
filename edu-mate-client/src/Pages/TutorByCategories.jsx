import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TutorCard from "../components/TutorCard";

const TutorByCategories = () => {
  let { category } = useParams();
  category = category.replace("-", " ");
  const [tutors, setTutors] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/tutorials/${category}`).then((res) => {
      console.log(res.data);
      setTutors(res.data);
    });
  }, []);
  console.log(tutors);
  return (
    <div className="md:w-11/12 mx-auto w-[95%]">
      <div className="text-center">
        <h1 className="md:w-8/12 mx-auto text-2xl md:text-3xl lg:text-3xl font-semibold">
          Total {tutors.length}{" "}
          <span className="text-primary font-bold ">{category}</span> Found
        </h1>
        <p className="md:w-11/12 lg:w-[60%] mx-auto md:my-6 my-4 text-sm md:text-base">
          Explore top-notch <strong>{category}</strong> to master the language
          with ease. Whether you're a beginner or advanced learner, find
          personalized lessons tailored just for you.
        </p>
      </div>
      <div className="grid lg:grid-cols-2 gap-6 lg:mt-10">
        {tutors.map((tutor) => (
          <TutorCard key={tutor._id} tutor={tutor}></TutorCard>
        ))}
      </div>
    </div>
  );
};

export default TutorByCategories;
