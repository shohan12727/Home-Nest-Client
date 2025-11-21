import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white w-11/12 mx-auto">
      <div className="flex justify-between items-center h-16">
        <Link to="/" className="flex items-center space-x-1">
          <div className="w-10 h-10 flex items-center justify-center">
            <img className="rounded" src={logo} alt="" />
          </div>
          <span className="text-xl font-bold text-gray-800">HomeNest</span>
        </Link>

        <div className="hidden md:flex space-x-8">
          <NavLink
            to="/all-properties"
            className="hover:text-primary transition font-medium"
          >
            All Properties
          </NavLink>
          <NavLink
            to="/my-properties"
            className="hover:text-primary transition font-medium"
          >
            My Properties
          </NavLink>
          <NavLink
            to="/add-properties"
            className="hover:text-primary transition font-medium"
          >
            Add Properties
          </NavLink>
          <NavLink
            to="/my-ratings"
            className="hover:text-primary transition font-medium"
          >
            My Ratings
          </NavLink>
        </div>

        <div className="hidden md:flex space-x-4">
          <button className="btn btn-outline  rounded-lg hover:bg-blue-50 transition font-medium font-bold">
            Login
          </button>
          <button className="btn-primary font-medium">Register</button>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
        >
          {isOpen ? (
            <X size={24} className="text-gray-800" />
          ) : (
            <Menu size={24} className="text-gray-800" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden pb-4 space-y-3 border-t border-gray-200 mt-2 flex flex-col">
          <NavLink
            to="/all-properties"
            className="hover:text-primary transition font-medium"
          >
            All Properties
          </NavLink>
          <NavLink
            to="/my-properties"
            className="hover:text-primary transition font-medium"
          >
            My Properties
          </NavLink>
          <NavLink
            to="/add-properties"
            className="hover:text-primary transition font-medium"
          >
            Add Properties
          </NavLink>
          <NavLink
            to="/my-ratings"
            className="hover:text-primary transition font-medium"
          >
            My Ratings
          </NavLink>
          <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
            <button className="btn btn-outline  rounded-lg hover:bg-blue-50 transition font-medium font-bold">
              Login
            </button>
            <button className="btn-primary font-medium">Register</button>
          </div>
        </div>
      )}
    </nav>
  );
}
