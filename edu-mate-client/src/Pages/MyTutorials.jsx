import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../customHooks/useAuth";
import Swal from "sweetalert2";
import LoadingSpin from "../components/LoadingSpin";
import { TbMoodCry } from "react-icons/tb";
import { Link } from "react-router-dom";

const MyTutorials = () => {
  const { userInfo } = useAuth();
  const [myTutorials, setMyTutorials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [updatedData, setUpdatedData] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/tutorials?email=${userInfo.email}`, {
        withCredentials: true,
      })
      .then((res) => {
        setMyTutorials(res.data);
        setFetchingData(false);
      })
      .catch((err) => {
        console.error(err);
        setFetchingData(false);
      });
  }, [userInfo.email, updatedData]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        confirmButton:
          "px-6 py-3 text-white text-sm font-medium rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-600 hover:to-blue-600 transform transition-all duration-300",
        cancelButton:
          "px-6 py-3 text-white text-sm font-medium rounded-lg shadow-md bg-gradient-to-r from-red-500 to-pink-500 hover:from-pink-600 hover:to-red-600 transform transition-all duration-300",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/tutorials/${id}`)
          .then(() => {
            setMyTutorials(
              myTutorials.filter((tutorial) => tutorial._id !== id)
            );
            Swal.fire({
              title: "Deleted!",
              text: "Your tutorial has been deleted.",
              icon: "success",
              confirmButtonText: "OK",
              customClass: {
                confirmButton:
                  "px-6 py-3 text-white text-sm font-medium rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-600 hover:to-blue-600 transform transition-all duration-300",
              },
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Failed To Register!",
              text: error.code,
              icon: "error",
              confirmButtonText: "Try Again",
              customClass: {
                confirmButton:
                  "px-6 py-3 text-white text-sm font-medium rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-600 hover:to-blue-600 transform transition-all duration-300",
              },
            });
          });
      }
    });
  };

  const handleUpdate = (e) => {
    setUpdatedData(false);
    e.preventDefault();
    console.log(currentTutorial);
    const updatedData = { title: "Updated Tutorial Title" }; // Example
    axios
      .put(`http://localhost:5000/tutorials`, currentTutorial)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `<span style="font-size: 20px; line-height: ;">Tutorial Update Successful!    </span>`,
            showConfirmButton: false,
            timer: 1500,
          });
          setUpdatedData(true);
        }
        setIsModalOpen(false);
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
    <div className="p-8 bg-gradient-to-br  to-gray-200  md:w-11/12 mx-auto w-[95%]">
      <h2 className="text-2xl lg:text-3xl font-extrabold text-center mb-12 tracking-wide text-primary">
        My Tutorials
      </h2>
      {fetchingData ? (
        <LoadingSpin></LoadingSpin>
      ) : myTutorials.length < 1 ? (
        <div className="flex flex-col justify-center items-center text-left">
          <h1 className="font-semibold text-lg pt-10 flex items-center gap-2 text-gray-500">
            <TbMoodCry className="text-4xl" />
            Sorry, You haven't Added Any Tutorial!
          </h1>
          <Link to="/add-tutorial" className="text-primary my-6">
            <button className="green-button text-sm">Add Tutorial</button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {myTutorials.map((tutorial) => (
            <div
              key={tutorial._id}
              className="relative shadow-xl rounded-xl transform hover:-rotate-[0.2deg] hover:bg-white hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between"
              style={{ perspective: "1000px" }}
            >
              {/* Image Section */}
              <div className="overflow-hidden rounded-t-xl">
                <img
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                  src={tutorial.photoURL}
                  alt={tutorial.name}
                />
              </div>

              {/* Content Section */}
              <div className="p-6 relative z-10 flex-grow">
                <h5
                  className="text-xl font-extrabold text-primary"
                  title={tutorial.name}
                >
                  {tutorial.name}
                </h5>
                <p className="text-sm text-gray-500 mt-4">
                  <span className="font-semibold">Category:</span>{" "}
                  <span className="text-primary">{tutorial.category}</span>
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  <span className="font-semibold">Price:</span> $
                  <span className="text-primary">{tutorial.price}</span>
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  {tutorial.description}
                </p>
              </div>

              {/* Footer Section */}
              <div className="p-4 flex justify-between items-end">
                <div className="font-bold text-sm ">
                  Reviews:{" "}
                  <span className="text-primary">{tutorial.review}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-semibold rounded-full shadow-lg hover:from-red-600 hover:to-pink-600 transform transition-all duration-300"
                    onClick={() => handleDelete(tutorial._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold rounded-full shadow-lg hover:from-cyan-600 hover:to-blue-600 transform transition-all duration-300"
                    onClick={() => {
                      setIsModalOpen(true);
                      setCurrentTutorial(tutorial);
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 z-50 overflow-y-scroll p-8">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Update Tutorial's Data
            </h2>
            <form
              onSubmit={handleUpdate}
              className="sm:grid grid-cols-2 gap-x-2"
            >
              {/* Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-500">
                  Name
                </label>
                <input
                  type="text"
                  readOnly
                  value={currentTutorial?.name || ""}
                  onChange={(e) =>
                    setCurrentTutorial({
                      ...currentTutorial,
                      name: e.target.value,
                    })
                  }
                  className="bg-white mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-2 transition-all duration-300 ease-in-out hover:ring-2 hover:ring-blue-500 outline-none"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-500">
                  Email
                </label>
                <input
                  type="email"
                  readOnly
                  value={currentTutorial?.email || ""}
                  onChange={(e) =>
                    setCurrentTutorial({
                      ...currentTutorial,
                      email: e.target.value,
                    })
                  }
                  className="bg-white mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-2 transition-all duration-300 ease-in-out hover:ring-2 hover:ring-blue-500"
                  required
                />
              </div>

              {/* Photo URL */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-500">
                  Photo URL
                </label>
                <input
                  type="url"
                  value={currentTutorial?.photoURL || ""}
                  onChange={(e) =>
                    setCurrentTutorial({
                      ...currentTutorial,
                      photoURL: e.target.value,
                    })
                  }
                  className="bg-white mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-2 transition-all duration-300 ease-in-out hover:ring-2 hover:ring-blue-500"
                  required
                />
              </div>

              {/* Category */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-500">
                  Category
                </label>

                <select
                  className="bg-white mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-2 transition-all duration-300 ease-in-out hover:ring-2 hover:ring-blue-500"
                  required
                  name="category"
                  value={currentTutorial?.category || ""}
                  onChange={(e) =>
                    setCurrentTutorial({
                      ...currentTutorial,
                      category: e.target.value,
                    })
                  }
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
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-500">
                  Price
                </label>
                <input
                  type="number"
                  value={currentTutorial?.price || ""}
                  onChange={(e) =>
                    setCurrentTutorial({
                      ...currentTutorial,
                      price: e.target.value,
                    })
                  }
                  className="bg-white mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-2 transition-all duration-300 ease-in-out hover:ring-2 hover:ring-blue-500"
                  required
                />
              </div>

              {/* Review */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-500">
                  Review
                </label>
                <input
                  type="number"
                  readOnly
                  value={currentTutorial?.review || ""}
                  onChange={(e) =>
                    setCurrentTutorial({
                      ...currentTutorial,
                      review: e.target.value,
                    })
                  }
                  className="bg-white mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-2 transition-all duration-300 ease-in-out hover:ring-2 hover:ring-blue-500"
                  required
                  min="0"
                  max="5"
                />
              </div>

              {/* Description */}
              <div className="mb-4 col-span-2">
                <label className="block text-sm font-medium text-gray-500">
                  Description
                </label>
                <textarea
                  value={currentTutorial?.description || ""}
                  onChange={(e) =>
                    setCurrentTutorial({
                      ...currentTutorial,
                      description: e.target.value,
                    })
                  }
                  className="bg-white mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-2 transition-all duration-300 ease-in-out hover:ring-2 hover:ring-blue-500"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end mt-4 col-span-2">
                <button
                  type="button"
                  className="px-6 py-3 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg shadow-md hover:bg-gray-300 transition-all duration-300 ease-in-out mr-4"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 text-white text-sm font-medium rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-600 hover:to-blue-600 transform transition-all duration-300"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTutorials;
