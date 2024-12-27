import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import HomeLayout from "../Layout/HomeLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import FindTutors from "../Pages/FindTutors";
import AddTutorial from "../Pages/AddTutorial";
import PrivateRoute from "./PrivateRoute";
import TutorDetails from "../Pages/TutorDetails";
import MyTutorials from "../Pages/MyTutorials";
import MyBookedTutorials from "../Pages/MyBookedTutorials";
import TutorByCategories from "../Pages/TutorByCategories";
import UserProfile from "../Pages/UserProfile";
import ErrorPage from "../Pages/ErrorPage";

const router = createBrowserRouter([
  {
    element: <MainLayout></MainLayout>,
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        element: <HomeLayout></HomeLayout>,
        path: "/",
      },
      {
        element: <Login></Login>,
        path: "/login",
      },
      {
        element: <Register></Register>,
        path: "/register",
      },
      {
        element: <FindTutors></FindTutors>,
        path: "/find-tutors",
      },
      {
        element: <TutorByCategories></TutorByCategories>,
        path: "/find-tutors/:category",
      },
      {
        element: (
          <PrivateRoute>
            <TutorDetails></TutorDetails>
          </PrivateRoute>
        ),
        path: "/tutor/:details",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/tutor/${params.details}`),
      },
      {
        element: (
          <PrivateRoute>
            <AddTutorial></AddTutorial>
          </PrivateRoute>
        ),
        path: "/add-tutorial",
      },
      {
        element: (
          <PrivateRoute>
            <MyTutorials></MyTutorials>
          </PrivateRoute>
        ),
        path: "/my-tutorials",
      },
      {
        element: (
          <PrivateRoute>
            <MyBookedTutorials></MyBookedTutorials>
          </PrivateRoute>
        ),
        path: "/my-booked-tutorials",
      },
      {
        element: (
          <PrivateRoute>
            <UserProfile></UserProfile>
          </PrivateRoute>
        ),
        path: "/profile",
      },
    ],
  },
]);

export default router;
