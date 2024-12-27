// className="px-6 py-3 text-white text-sm font-medium rounded-lg shadow-md bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 transition-all duration-300 ease-in-out"

import React, { useState, useEffect } from "react";

const MyTutorials = () => {
  const [tutorials, setTutorials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTutorial, setCurrentTutorial] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/tutorials?email=${userInfo.email}`)
      .then((res) => {
        setTutorials(res.data);
      })
      .catch((err) => console.error(err));
  }, [userInfo.email]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/tutorials/${id}`)
      .then(() => {
        setMyTutorials(myTutorials.filter((tutorial) => tutorial._id !== id));
        Swal.fire({
          title: "Added Tutorial",
          text: "New Tutorial Added Successful!",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Failed To Register!",
          text: error.code,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
  };

  const handleUpdate = (id) => {
    const updatedData = { title: "Updated Tutorial Title" }; // Example
    axios
      .put(`http://localhost:5000/tutorials/${id}`, updatedData)
      .then(() => {
        alert("Tutorial updated successfully!");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Tutorials</h1>
      <div className="grid grid-cols-3 gap-4">
        {tutorials.length > 0 ? (
          tutorials.map((tutorial) => (
            <div
              key={tutorial._id}
              className="bg-white p-4 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-bold mb-2">{tutorial.title}</h2>
              <p className="text-gray-700 mb-4">{tutorial.description}</p>
              <div className="flex justify-between">
                <button
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold rounded-full shadow-lg hover:from-red-600 hover:to-pink-600 transform transition-all duration-300"
                  onClick={() => handleDelete(tutorial._id)}
                >
                  Delete
                </button>
                <button
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold rounded-full shadow-lg hover:from-cyan-600 hover:to-blue-600 transform transition-all duration-300"
                  onClick={() => handleUpdate(tutorial._id)}
                >
                  Update
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-3">
            No tutorials found.
          </p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Update Tutorial</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={currentTutorial?.title || ""}
                  onChange={(e) =>
                    setCurrentTutorial({
                      ...currentTutorial,
                      title: e.target.value,
                    })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
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
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-black text-xs font-semibold rounded-full shadow-lg hover:bg-gray-400 transform transition-all duration-300 mr-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white text-xs font-semibold rounded-full shadow-lg hover:from-green-600 hover:to-teal-600 transform transition-all duration-300"
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
