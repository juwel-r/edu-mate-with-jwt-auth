import React from "react";
import { Fade } from "react-awesome-reveal";
import { FaClock } from "react-icons/fa";

const OneMinuteLessons = () => {
  const lessons = [
    {
      id: 1,
      title: "Basic Greetings in Spanish",
      content: "How to say 'Hello' (Hola) and 'Goodbye' (Adiós).",
      video: "https://www.youtube.com/embed/f74_LhYQWaA?si=FwbULPoRWhuMQlvd",
    },
    {
      id: 2,
      title: "French Numbers 1-5",
      content: "Un, Deux, Trois, Quatre, Cinq. Practice counting!",
      video: "https://www.youtube.com/embed/0M1C9yEzplI?si=y3JfF81PTxuUKaqh",
    },
    {
      id: 3,
      title: "Japanese Introductions",
      content: "Say 'My name is' as 'Watashi wa [Name] desu'.",
      video: "https://www.youtube.com/embed/stVbjS8_D1w?si=M_hocn8UIbhyHwwJ",
    },
    {
      id: 4,
      title: "German Days of the Week",
      content: "Montag, Dienstag, Mittwoch, Donnerstag, Freitag.",
      video: "https://www.youtube.com/embed/VCPGMjCW0is?si=GVvp0qpLVLXntqmF",
    },
  ];

  return (
    <section className="my-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-primary">
        <FaClock className="inline-block mr-2" />
        One Minute Lessons
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {lessons &&
          lessons.map((lesson, index) => (
            <Fade delay={index * 200} key={lesson.id}>
              <div
                key={lesson.id}
                className="p-6 bg-white border border-gray-200 shadow-md rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-blue-600 mb-2">
                  {lesson.title}
                </h3>
                <p className="text-gray-600 text-sm">{lesson.content}</p>
                <iframe
                  className="mt-2 rounded-lg"
                  width="100%"
                  height="300"
                  src={lesson.video}
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </div>
            </Fade>
          ))}
      </div>
    </section>
  );
};

export default OneMinuteLessons;
