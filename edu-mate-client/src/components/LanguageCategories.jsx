import { Link } from "react-router-dom";
import {
  GiBookshelf,
  GiCastle,
  GiEgyptianTemple,
  GiScrollUnfurled,
  GiTempleGate,
} from "react-icons/gi";
import {
  FaArrowAltCircleRight,
  FaArrowRight,
  FaChalkboardTeacher,
  FaFlagUsa,
  FaGlobe,
  FaMosque,
} from "react-icons/fa";
import { PiCellTowerLight } from "react-icons/pi";
import { MdOutlineSchool, MdTranslate } from "react-icons/md";
import { LiaLanguageSolid } from "react-icons/lia";
import { Fade } from "react-awesome-reveal";

const categories = [
  {
    id: 1,
    title: "English Tutors",
    count: "2,476",
    logo: <FaChalkboardTeacher />,
  },
  {
    id: 2,
    title: "Spanish Tutors",
    count: "1,892",
    logo: <FaGlobe />,
  },
  {
    id: 3,
    title: "French Tutors",
    count: "2,041",
    logo: <PiCellTowerLight />,
  },
  {
    id: 4,
    title: "German Tutors",
    count: "1,732",
    logo: <GiCastle />,
  },
  {
    id: 5,
    title: "Italian Tutors",
    count: "1,482",
    logo: <GiBookshelf />,
  },
  {
    id: 6,
    title: "Chinese Tutors",
    count: "2,223",
    logo: <GiTempleGate />,
  },
  {
    id: 7,
    title: "Arabic Tutors",
    count: "1,810",
    logo: <FaMosque />,
  },
  {
    id: 8,
    title: "Japanese Tutors",
    count: "2,198",
    logo: <GiEgyptianTemple />,
  },
  {
    id: 9,
    title: "Portuguese Tutors",
    count: "1,499",
    logo: <MdOutlineSchool />,
  },
  {
    id: 10,
    title: "Korean Tutors",
    count: "1,673",
    logo: <GiScrollUnfurled />,
  },
  {
    id: 11,
    title: "Russian Tutors",
    count: "2,119",
    logo: <FaFlagUsa />,
  },
  {
    id: 12,
    title: "Hindi Tutors",
    count: "1,841",
    logo: <MdTranslate />,
  },
];

const LanguageCategories = () => {
  return (
    <div>
      <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold flex items-center my-6 mb-4 lg:mt-14 ">
        Explore Our &nbsp;{" "}
        <span className="text-primary flex items-center gap-1">
          Languages
          <LiaLanguageSolid />
        </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <Fade delay={index * 30} key={category.id}>
            <Link
              to={`/find-tutors/${category.title.replace(" ", "-")}`}
              key={category.id}
              className="flex justify-between items-center hover:bg-white p-5 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.001] rounded-xl"
            >
              <div className="flex items-center gap-6">
                <span className="text-4xl text-blue-500 bg-blue-100 p-3 rounded-full shadow-md">
                  {category.logo}
                </span>
                <div>
                  <h3 className="text-xl font-bold ">{category.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {category.count} teachers
                  </p>
                </div>
              </div>
              <FaArrowRight className="text-blue-500 text-xl transition-transform transform hover:translate-x-1" />
            </Link>
          </Fade>
        ))}
      </div>
    </div>
  );
};

export default LanguageCategories;
