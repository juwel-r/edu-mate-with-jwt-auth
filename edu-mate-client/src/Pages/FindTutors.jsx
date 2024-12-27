import React, { useEffect, useState } from "react";
import TutorCard from "../components/TutorCard";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import LoadingSpin from "../components/LoadingSpin";
import { TbMoodCry } from "react-icons/tb";
import { Link } from "react-router-dom";

const FindTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  console.log(searchValue);
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/tutorials/search?value=${searchValue}`)
      .then((res) => {
        setTutors(res.data);
        setFetchingData(false);
      })
      .catch((error) => {
        console.error("Error fetching tutorials:", error);
        setFetchingData(false);
      });
  }, [searchValue]);

  return (
    <div className="md:w-11/12 mx-auto w-[95%] py-8">
      <div className="text-center mb-8">
        <h1 className="md:w-8/12 mx-auto text-2xl md:text-3xl font-semibold">
          Find Your Perfect{" "}
          <span className="text-primary font-bold">Tutor</span>
        </h1>
        <p className="md:w-11/12 lg:w-[60%] mx-auto md:my-6 my-4 text-sm md:text-base text-gray-500">
          Explore top-rated tutors across various languages. Connect with
          experienced educators to enhance your learning journey. Book your
          session today and take the first step toward mastering a new language!
        </p>
      </div>
      <div className="mb-6">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex justify-between items-center w-full md:w-1/2  border border-gray-300 rounded-md mx-auto"
        >
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            name="search"
            placeholder="Search for tutorials..."
            className="w-full p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button>
            {" "}
            <IoIosSearch className="text-2xl mx-2 " />
          </button>
        </form>
      </div>

      {fetchingData ? (
        <LoadingSpin></LoadingSpin>
      ) : tutors.length < 1 ? (
        <div className="flex flex-col items-center justify-center text-left">
          <h1 className="font-semibold text-lg pt-10 flex items-center gap-2 text-gray-500">
            <TbMoodCry className="text-4xl" />
            Somthing Went Wrong!
          </h1>
          <p className=" my-2">Please Try Again Later or Add A Tutorial</p>
          <Link to="/find-tutors" className="text-primary my-4">
            <button className="green-button text-sm">Book A Tutorial</button>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6 lg:mt-10">
          {Array.isArray(tutors) && tutors.length > 0
            ? tutors.map((tutor) => (
                <TutorCard key={tutor._id} tutor={tutor}></TutorCard>
              ))
            : ""}
        </div>
      )}
    </div>
  );
};

export default FindTutors;
