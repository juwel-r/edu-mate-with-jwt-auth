import React from "react";
import { useLoaderData } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import { MdStar } from "react-icons/md";
import { Link } from "react-router-dom";
import useAuth from "../customHooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const TutorDetails = () => {
  const { userInfo } = useAuth();
  const tutor = useLoaderData();
  const { _id, name, email, photoURL, category, price, description, review } =
    tutor;
  // name,image,language,description, price,review,book button

  const bookedHandler = () => {
    const bookedData = {
      tutorId: _id,
      tutorPhoto: photoURL,
      tutorCategory: category,
      tutorPrice: price,
      tutorEmail: email,
      studentEmail: userInfo.email,
    };
    axios
      .post("http://localhost:5000/booked-tutorials", bookedData)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Successful!",
            text: `You have booked ${name} Session.`,
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Failed!",
          text: error.message,
          icon: "error",
          confirmButtonText: "Try Again!",
        });
      });
  };
  return (
    <div className=" mx-auto border-t bg-primary pt-40 pb-4 md:pt-52 lg:pb-8">
      {" "}
      <div className="relative bg-white w-[95%] lg:w-8/12 md:10/12 mx-auto">
        <section className="absolute rounded-full -top-[20%] md:-top-[30%] left-[20%] md:left-[32%] lg:left-[35%] lg:-top-[35%] z-10 p-1 h-60 w-60  lg:max-w-72 shadow-xl shadow-primary">
          <img
            className="rounded-full h-full w-full object-cover"
            src={photoURL}
            alt={name}
          />
        </section>
        <section className="p-4 pl-6 md:px-8">
          <p className="text-2xl md:text-3xl font-semibold mt-24 md:mt-8">
            {name}
          </p>
          <p className="text-white text-nowrap text-sm font-light bg-primary rounded-full  mt-2 px-4 py-1 w-fit flex items-center gap-2">
            <FaGraduationCap />
            {category}
          </p>
          <p className="text-gray-500 mt-6 font-light">{description}</p>
          <div className="flex items-start gap-6 mt-4">
            <p className="flex items-center font-extrabold">
              Reviews:&nbsp;
              <MdStar className="text-orange-500" /> {review} &nbsp;{" "}
            </p>
            <p>
              <strong>Fee: ${price}</strong>
            </p>
          </div>
          <div className="mt-6">
            <h1 className="font-bold text-xl">About Tutor</h1>
            <p className="text-sm text-gray-500">
              Meet {name}, an experienced and passionate tutor specializing in{" "}
              {category} language learning. Whether you’re just starting or
              looking to refine your skills, {name} offers personalized lessons
              that focus on speaking, reading, writing, and listening. With a
              deep understanding of {category}, {name} will guide you through
              every step of your learning journey, ensuring that you gain
              confidence and proficiency in both everyday conversations and more
              advanced topics. Get ready to immerse yourself in {category} and
              unlock new opportunities for personal and professional growth with{" "}
              {name}'s expert guidance!
            </p>
          </div>
          <button
            onClick={bookedHandler}
            className="btn btn-ghost text-primary text-nowrap btn-outline btn-sm rounded-none my-4 hover:bg-primary hover:text-white hover:border-primary"
          >
            Book a Session
          </button>
        </section>
      </div>
    </div>
  );
};

export default TutorDetails;
