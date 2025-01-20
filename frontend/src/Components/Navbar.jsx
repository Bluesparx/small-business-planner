import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../components/ui/ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in (JWT token exists in localStorage)
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    setIsLoggedIn(!!token); // Set state based on token existence
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setIsLoggedIn(false); // Update state after logout
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="hidden md:flex items-center space-x-6 pr-2">
                <button
                  onClick={toggleTheme}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {isDarkMode ? (
                    <SunIcon className="h-6 w-6 text-yellow-500" />
                  ) : (
                    <MoonIcon className="h-6 w-6 text-gray-500" />
                  )}
                </button>
              </div>
              <Link
                to="/"
                className="text-2xl font-bold text-blue-600 dark:text-blue-400"
              >
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
              {isLoggedIn && (
                <>
                  <Link
                    to="/dash"
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    Dashboard
                  </Link>

                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                      Upload Data
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Link to="/incomeS">Income statement</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link to="/dash">Stocks Data</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link to="/dash">Balance Sheet</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                      Analytics
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Link to="/">Income statement</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link to="/dash">Stocks Data</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link to="/dash">Balance Sheet</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    Logout
                  </button>
                </>
              )}
              {!isLoggedIn && (
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  Login
                </Link>
              )}
              {!isLoggedIn && (
                <Link
                  to="/signup"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  Sign Up
                </Link>
              )}
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
                to="/about"
                className="block px-4 py-2 text-gray-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                About
              </Link>
              {isLoggedIn && (
                <>
                  <Link
                    to="/dash"
                    className="block px-4 py-2 text-gray-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/services"
                    className="block px-4 py-2 text-gray-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Services
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-gray-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </>
              )}
              {!isLoggedIn && (
                <Link
                  to="/login"
                  className="block px-4 py-2 text-gray-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Login
                </Link>
              )}
              {!isLoggedIn && (
                <Link
                  to="/signup"
                  className="block px-4 py-2 text-gray-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Sign Up
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
