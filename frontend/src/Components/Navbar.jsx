import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../components/ui/ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";
import { useAuth } from "@/utils/authProvider";
import Sidebar  from "./ui/Sidebar";

export const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { token, logout } = useAuth();
  const [isConnected, setIsConnected] = React.useState(false);
  const [userAddress, setUserAddress] = React.useState(null);

  const isLoggedIn = token && token !== null;

  const handleLogout = () => {
    logout();
    setIsConnected(false);
    setUserAddress(null);
  };

  return (
    <>
      <Sidebar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div className="md:ml-60">
        <nav className="shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-end md:h-16 h-8">
              
              {/* Right section with theme toggle */}
              <div className="flex items-center space-x-6">
                <button
                  onClick={toggleTheme}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {isDarkMode ? (
                    <SunIcon className="h-8 w-8 text-yellow-500" />
                  ) : (
                    <MoonIcon className="h-8 w-8 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};