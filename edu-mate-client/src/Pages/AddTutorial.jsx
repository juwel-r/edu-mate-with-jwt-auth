import React, { useState } from "react";
import readingAnimation from "../assets/aniamtion_json/reading-animation.json";
import Lottie from "lottie-react";
import useAuth from "../customHooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import LoadingSpin from "../components/LoadingSpin";

const AddTutorial = () => {
  const { userInfo } = useAuth();
  const [category, setCategory] = useState("");
  const selectHandler = (e) => {
    setSelectedCategory(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const category = form.category.value;
    const price = parseFloat(form.price.value);
    const description = form.description.value;
    const review = parseFloat(form.review.value);
    const tutorialData = {
      name,
      email,
      photoURL,
      category,
      price,
      description,
      review,
    };
    axios
      .post("http://localhost:5000/tutorials", tutorialData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            title: "Added Tutorial",
            text: "New Tutorial Added Successful!",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Failed To Register!",
          text: error.code,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
    console.log(tutorialData);
  };

  const categories = [
    { id: 1, categoryName: "English" },
    { id: 2, categoryName: "Spanish" },
    { id: 3, categoryName: "French" },
    { id: 4, categoryName: "German" },
    { id: 5, categoryName: "Italian" },
    { id: 6, categoryName: "Chinese" },
    { id: 7, categoryName: "Arabic" },
    { id: 8, categoryName: "Japanese" },
    { id: 9, categoryName: "Portuguese" },
    { id: 10, categoryName: "Korean" },
    { id: 11, categoryName: "Russian" },
    { id: 12, categoryName: "Hindi" },
  ];

  return (
    <div className="p-4 md:pt-8 flex items-start justify-center bg-gradient-to-br ">
      <div className="max-w-7xl w-full  rounded-xl shadow-lg p-6 md:p-12 flex flex-col md:flex-row gap-8">
        <h1 className="md:hidden text-2xl md:text-3xl font-extrabold text-center text-primary">
          Add New Tutorial </h1>
        {/* Animation */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <Lottie
            animationData={readingAnimation}
            className="w-full max-w-md"
          />
        </div>

        {/* Form */}
        <form
          onSubmit={submitHandler}
          className="w-full md:w-1/2 flex flex-col gap-4"
        >
          <h1 className="hidden md:block text-2xl md:text-3xl font-extrabold text-center text-primary">
            Add New Tutorial
          </h1>

          {/* Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm text-gray-500">
              Name
            </label>
            <input
              value={userInfo.displayName}
              type="text"
              name="name"
              readOnly
              className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm text-gray-500">
              Email
            </label>
            <input
              value={userInfo.email}
              type="email"
              name="email"
              readOnly
              className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

          {/* Photo URL */}
          <div className="flex flex-col gap-1">
            <label htmlFor="photoURL" className="text-sm text-gray-500">
              Photo URL
            </label>
            <input
              type="url"
              name="photoURL"
              required
              placeholder="https://example.com/photo.jpg"
              className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            {/* Category */}
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="category" className="text-sm text-gray-500">
                Category
              </label>
              <select
                name="category"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              >
                <option value="" disabled>
                  Select Language
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.categoryName}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="price" className="text-sm text-gray-500">
                Price
              </label>
              <input
                type="number"
                step="any"
                name="price"
                required
                placeholder="Price"
                className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="text-sm text-gray-500">
              Description
            </label>
            <textarea
              name="description"
              required
              placeholder="Provide a brief description..."
              className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-28 resize-none"
            ></textarea>
          </div>

          {/* Review */}
          <div className="flex flex-col gap-1">
            <label htmlFor="review" className="text-sm text-gray-500">
              Review
            </label>
            <input
              defaultValue="0"
              type="number"
              step="any"
              name="review"
              readOnly
              className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTutorial;
