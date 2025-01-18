import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                BrandLogo
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                About
              </Link>
              <Link
                to="/services"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                Services
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                Contact
              </Link>
              {/* Login Button */}
              <Link
                to="/login"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                Login
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <Link
                to="/"
                className="block px-4 py-2 text-gray-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Home
              </Link>
              <Link
                to="about"
                className="block px-4 py-2 text-gray-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                About
              </Link>
              <Link
                to="services"
                className="block px-4 py-2 text-gray-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Services
              </Link>
              <Link
                to="contact"
                className="block px-4 py-2 text-gray-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Contact
              </Link>
              {/* Mobile Login Button */}
              <Link
                to="/login"
                className="block px-4 py-2 text-gray-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
