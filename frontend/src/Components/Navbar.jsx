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
import { useAuth } from "@/utils/authProvider";

export const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { token, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const isLoggedIn = token && token !== null;

  const handleLogout = () => {
    logout();
  };

  const handleDropdownClick = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleMenuItemClick = () => {
    setOpenDropdown(null);
  };

  return (
    <>
      <nav className="bg-[#252630] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo section remains the same */}
            <div className="flex items-center">
              <div className="hidden md:flex items-center space-x-6 pr-2">
                <button
                  onClick={toggleTheme}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
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
                className="text-2xl font-bold text-blue-500 dark:text-blue-400"
              >
                Vyapaar-e
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {!isLoggedIn && (
                <Link
                  to="/"
                  className="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  Home
                </Link>
              )}
              <Link
                to="/about"
                className="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                About
              </Link>

              <Link
                to="/subscription"
                className="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                Pricing
              </Link>
              {isLoggedIn && (
                <>
                  <Link
                    to="/dash"
                    className="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    Dashboard
                  </Link>
                  <DropdownMenu open={openDropdown === 'calculator'} onOpenChange={() => handleDropdownClick('calculator')}>
                    <DropdownMenuTrigger className="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                      Calculator
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="rounded-lg shadow-md">
                      <DropdownMenuItem onClick={handleMenuItemClick}>
                        <Link to="/emi">EMI Calculator</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleMenuItemClick}>
                        <Link to="/sip">SIP Calculator</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu open={openDropdown === 'upload'} onOpenChange={() => handleDropdownClick('upload')}>
                    <DropdownMenuTrigger className="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                      Upload Data
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#252630] border-gray-500 rounded-xl shadow-md">
                      <DropdownMenuItem onClick={handleMenuItemClick}>
                        <Link to="/incomeS">Income statement</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleMenuItemClick}>
                        <Link to="/stockInput">Stocks Data</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu open={openDropdown === 'analytics'} onOpenChange={() => handleDropdownClick('analytics')}>
                    <DropdownMenuTrigger className="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                      Analytics
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#252630] border-gray-500 rounded-xl shadow-md">
                      <DropdownMenuItem onClick={handleMenuItemClick}>
                        <Link to="/analysis">Finance</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleMenuItemClick}>
                        <Link to="/stock-analysis">Stocks Data</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Link to="/">
                    <button
                      onClick={handleLogout}
                      className="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                    >
                      Logout
                    </button>
                  </Link>
                </>
              )}
              {!isLoggedIn && (
                <>
                  <Link
                    to="/login"
                    className="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu toggle and content remain the same */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
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
              {/* Mobile menu content remains the same */}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};