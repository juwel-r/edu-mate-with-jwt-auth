import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../customHooks/useAuth";
import { MdStar } from "react-icons/md";
import Swal from "sweetalert2";
import LoadingSpin from "../components/LoadingSpin";
import { TbMoodCry } from "react-icons/tb";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MyBookedTutorials = () => {
  const { userInfo } = useAuth();
  const [bookedTutorials, setBookedTutorials] = useState([]);
  const [review, setReview] = useState(0);
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/booked-tutorials?email=${userInfo.email}`, {
        withCredentials: true,
      })
      .then((res) => {
        setBookedTutorials(res.data);
        setFetching(false);
      })
      .catch((err) => {
        console.log(err);
        setFetching(false);
      });
  }, [review]);

  const reviewUpdateHandler = (tutorId, reviews) => {
    axios
      .put(`http://localhost:5000/tutorials/${tutorId}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `<span style="font-size: 20px; line-height: ;">Reviewed Successfully!    </span>`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
        setReview(reviews + 1);
        console.log(res.data);
      })
      .catch((err) => {
        Swal.fire({
          title: "ERROR!",
          text: "Something went wrong",
          icon: "error",
          confirmButtonText: "Try Again",
        });
        console.log(err);
      });
  };

  // if (bookedTutorials.length < 1 ) {
  //   return (
  // <div className="" >
  //   <h1 className="text-center font-bold text-3xl pt-10 text-primary">
  //     You haven't Booked Any Session
  //   </h1>
  //   <p className="text-center my-4">
  //     If you not booked any session please select your tutor and book any session.{" "}
  //   </p>
  // </div>
  //   );
  // }

  return (
    <div className="container mx-auto px-6 py-6">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-3 text-primary ">
        You Have Booked {bookedTutorials.length} Sessions
      </h1>
      <p className="text-center text-lg text-gray-600 mb-8">
        Review and provide feedback for your tutors.
      </p>
      {fetching ? (
        <LoadingSpin></LoadingSpin>
      ) : bookedTutorials.length < 1 ? (
        <div className="flex flex-col items-center justify-center text-left">
          <h1 className="font-semibold text-lg pt-10 flex items-center gap-2 text-gray-500">
            <TbMoodCry className="text-4xl" />
            Sorry! You haven't Booked Any Session
          </h1>
          <p className=" my-4">
            If you not booked any session please select your tutor and book any
            session.{" "}
          </p>
          <Link to="/find-tutors" className="text-primary my-6">
            <button className="green-button text-sm">Book A Session</button>
          </Link>
        </div>
      ) : (
        ""
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {bookedTutorials &&
          bookedTutorials.map((tutorial, index) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              key={tutorial._id}
              className={` border-gray-100 rounded-2xl overflow-hidden transform transition-all duration-300 ${
                tutorial.tutorName
                  ? "shadow-sm border hover:rotate-[0.5deg] hover:scale-[1.001] hover:shadow-xl "
                  : "opacity-40 bg-gray-50"
              }`}
            >
              <div className="max-w-lg mx-auto p-6 shadow-md">
                <div className="flex flex-col items-center relative">
                  <div className="relative ">
                    <img
                      src={tutorial.tutorPhoto}
                      alt="User Avatar"
                      className="w-64 h-64 object-cover rounded-full shadow-lg shadow-primary mb-4"
                    />
                    <div className="bg-gradient-to-bl from-blue-500 to-purple-500/60 absolute top-0 right-0 rounded-full h-20 w-20 flex items-center justify-center shadow-md shadow-primary/90">
                      <p className="text-center text-white text-sm text-wrap">
                        {tutorial.tutorCategory}
                      </p>
                    </div>
                  </div>
                  <>
                    {tutorial.tutorName ? (
                      <h1 className="text-2xl font-semibold">
                        {tutorial.tutorName}
                      </h1>
                    ) : (
                      <p className="left-6 text-xl text-red-600 pr-2">
                        This Tutorial has Deleted!
                      </p>
                    )}
                    <div className="flex items-center gap-2">
                      Price:
                      <span className="font-semibold">
                        ${tutorial.tutorPrice}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      Reviews:
                      <span className="font-semibold">{tutorial.review}</span>
                    </div>

                    <button
                      disabled={tutorial.tutorName ? false : true}
                      className="green-button mt-4 text-sm"
                      onClick={() =>
                        reviewUpdateHandler(tutorial.tutorId, tutorial.review)
                      }
                    >
                      Review
                    </button>
                  </>
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default MyBookedTutorials;
