import React, { useState, useEffect } from "react";
import { FaTrophy, FaUserGraduate, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { Fade } from "react-awesome-reveal";

const LanguageLeaderboard = () => {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    fetch("topTutors.json")
      .then((res) => res.json())
      .then((data) => setTutors(data));

  }, []);
//   console.log(tutors);
  return (
    <section className="my-12 px-4">
      <h2 className="text-2xl lg:text-3xl font-bold text-center mb-6 text-primary">
        <FaTrophy className="inline-block mr-2" />
        Language Leaderboard
      </h2>


      {/* Top Tutors Section */}
      <div className=" p-8 pt-0 rounded-lg shadow-lg">
        <h3 className="text-xl lg:text-2xl font-semibold mb-4 text-center">
          Top Tutors of the Week
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors &&
            tutors.map((tutor, index) => (
              <motion.div
                key={tutor.id}
                className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <Fade delay={index * 100}>
                <div className="flex items-center mb-4">
                  <FaStar className="text-3xl text-yellow-500 mr-4" />
                  <span className="text-xl font-semibold">{tutor.name}</span>
                </div>
                <div className="">
                  <p>Languages: {tutor.languages}</p>
                  <p>
                    Rating: <span className="font-bold">{tutor.rating}/5</span>
                  </p>
                  <p className="mt-2">
                    Students Helped: {tutor.studentsHelped}
                  </p>
                </div>
                </Fade>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default LanguageLeaderboard;
