import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Components/Home";
import AllProperties from "../Components/AllProperties";
import Myproperties from "../Components/Myproperties";
import AddProperties from "../Components/AddProperties";
import MyRating from "../Components/MyRating";

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
        element: <Myproperties></Myproperties>,
      },
      {
        path: "/add-properties",
        element: <AddProperties></AddProperties>,
      },
      {
        path: "/my-ratings",
        element: <MyRating></MyRating>,
      },
    ],
  },
]);
