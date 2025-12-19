import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Components/Home";
import AllProperties from "../Components/AllProperties";
import Myproperties from "../Components/Myproperties";
import AddProperties from "../Components/AddProperties";
import MyRating from "../Components/MyRating";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Profile from "../Components/Profile";
import PrivateRoute from "./PrivateRoute";
import PropertyDetails from "../Components/PropertyDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-properties",
        Component: AllProperties,
      },
      {
        path: "/my-properties",
        element: (
          <PrivateRoute>
            <Myproperties></Myproperties>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-properties",
        element: (
          <PrivateRoute>
            <AddProperties></AddProperties>
          </PrivateRoute>
        ),
      },
      {
        path: "/property-details/:id",
        element: (
          <PrivateRoute>
            <PropertyDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-ratings",
        element: <MyRating></MyRating>,
      },
      {
        path: "/user-profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
]);
