import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import Banner from "../Components/Banner";

const Root = () => {
  return (
    <div>
      <Navbar />
      <Banner></Banner>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
