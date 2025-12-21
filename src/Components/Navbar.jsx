import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import ThemeToggle from "./ThemeToggle";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logOut } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
        setIsDropdownOpen(false);
      })
      .catch(() => toast.error("Logout failed. Please try again."));
  };

  return (
    <nav className="bg-base-100 max-w-7xl px-4 mx-auto dark:bg-base-200 transition-colors duration-300">
      <div className="flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="HomeNest" className="w-10 h-10 rounded" />
          <span className="text-xl font-bold text-base-content">
            Home<span className="text-primary font-bold">Nest</span>
          </span>
        </Link>

        {/* Desktop Middle Menu */}

        <div className="hidden md:flex space-x-6 font-semibold text-gray-700 dark:text-gray-200">
          <NavLink
            to="/"
            className="hover:text-primary transition-colors text-base-content"
          >
            Home
          </NavLink>
          <NavLink
            to="/all-properties"
            className="hover:text-primary transition-colors text-base-content"
          >
            All Properties
          </NavLink>
          <NavLink
            to="/about"
            className="hover:text-primary transition-colors text-base-content"
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="hover:text-primary transition-colors text-base-content"
          >
            Contact
          </NavLink>
          {user && (
            <NavLink
              to="/my-properties"
              className="hover:text-primary transition-colors text-base-content"
            >
              My Properties
            </NavLink>
          )}
          {user && (
            <NavLink
              to="/add-properties"
              className="hover:text-primary transition-colors text-base-content"
            >
              Add Properties
            </NavLink>
          )}
          {user && (
            <NavLink
              to="/my-ratings"
              className="hover:text-primary transition-colors text-base-content"
            >
              My Ratings
            </NavLink>
          )}
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />

          {/* Avatar (Only if user exists) */}
          {user && (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="w-10 h-10 rounded-full overflow-hidden border shadow-sm dark:border-gray-700 transition-colors"
              >
                <img
                  src={user?.photoURL}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-base-100 dark:bg-base-200 border dark:border-gray-700 rounded-xl shadow-lg py-2 z-50 transition-colors">
                  <Link
                    to="/user-profile"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    My Profile
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Login / Logout */}
          {user ? (
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-primary font-semibold"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="btn btn-outline btn-primary font-semibold">
                Login
              </button>
            </Link>
          )}

          {/* Register */}
          <Link to="/register">
            <button className="btn btn-primary text-white font-semibold">
              Sign Up
            </button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex justify-center items-center space-x-2">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg  dark:hover:bg-gray-700 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-3 mt-3 border-t border-gray-200 dark:border-gray-700 pt-3 font-semibold text-gray-700 dark:text-gray-200 transition-colors">
          <NavLink
            to="/"
            className="hover:text-primary transition-colors text-base-content"
          >
            Home
          </NavLink>
          <NavLink
            to="/all-properties"
            className="hover:text-primary transition-colors text-base-content"
          >
            All Properties
          </NavLink>
          <NavLink
            to="/about"
            className="hover:text-primary transition-colors text-base-content"
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="hover:text-primary transition-colors text-base-content"
          >
            Contact
          </NavLink>
          {user && (
            <NavLink
              to="/my-properties"
              className="hover:text-primary transition-colors text-base-content"
            >
              My Properties
            </NavLink>
          )}
          {user && (
            <NavLink
              to="/add-properties"
              className="hover:text-primary transition-colors text-base-content"
            >
              Add Properties
            </NavLink>
          )}
          {user && (
            <NavLink
              to="/my-ratings"
              className="hover:text-primary transition-colors text-base-content"
            >
              My Ratings
            </NavLink>
          )}

          {/* Avatar & Profile (Mobile) */}
          {user && (
            <Link
              to="/user-profile"
              className="flex items-center gap-3 hover:text-primary transition-colors text-base-content"
            >
              My Profile
            </Link>
          )}

          {/* Login / Logout */}
          {user ? (
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-primary"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-outline btn-primary">
              Login
            </Link>
          )}

          {/* Register */}
          <Link to="/register" className="btn btn-primary text-white">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}
