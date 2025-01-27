import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Section */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-lg font-semibold">BrandLogo</p>
            <p className="text-sm">Your tagline or description goes here.</p>
          </div>

          {/* Middle Section - Links */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a
              href=""
              className="text-gray-400 hover:text-white text-sm"
            >
              Home
            </a>
            <a
              href="about"
              className="text-gray-400 hover:text-white text-sm"
            >
              About
            </a>
            <a
              href="services"
              className="text-gray-400 hover:text-white text-sm"
            >
              Services
            </a>
            <a
              href="contact"
              className="text-gray-400 hover:text-white text-sm"
            >
              Contact
            </a>
          </div>

          {/* Right Section - Social Media */}
          <div className="flex space-x-6">
            <a
              href="https://facebook.com"
              className="text-gray-400 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M22 12.1C22 6.48 17.52 2 12 2S2 6.48 2 12.1c0 5.37 4.06 9.8 9.38 9.8h.24v-6.9H9.3v-2.8h2.3V9.5c0-2.2 1.3-3.5 3.5-3.5 1.02 0 2.1.1 2.4.1v2.8h-1.7c-1.3 0-1.7.7-1.7 1.6v2.2h3.4l-.5 2.8h-2.9v6.9h.24c5.32 0 9.38-4.43 9.38-9.8z"
                />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              className="text-gray-400 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M23.643 4.937c-.883.392-1.83.654-2.825.773 1.015-.61 1.796-1.575 2.165-2.723-.951.564-2.005.974-3.126 1.197C18.967 2.718 17.58 2 16.059 2c-2.945 0-5.333 2.388-5.333 5.333 0 .417.045.82.128 1.206-4.44-.22-8.378-2.355-11.04-5.59-.463.794-.727 1.715-.727 2.7 0 1.87 1.01 3.515 2.536 4.47-1.115-.035-2.167-.341-3.09-.851v.086c0 2.604 1.848 4.788 4.3 5.284-.451.122-.925.19-1.409.19-.346 0-.684-.034-1.018-.097.687 2.146 2.687 3.717 5.064 3.759-1.85 1.45-4.176 2.312-6.69 2.312-.433 0-.858-.025-1.276-.075 2.373 1.518 5.183 2.406 8.191 2.406 9.852 0 15.265-8.165 15.265-15.265 0-.232 0-.463-.016-.692.96-.692 1.79-1.56 2.44-2.548z"
                />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              className="text-gray-400 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M20.45 20.451H3.55c-1.83 0-3.3-1.47-3.3-3.3V6.85c0-1.83 1.47-3.3 3.3-3.3h16.9c1.83 0 3.3 1.47 3.3 3.3v10.3c0 1.83-1.47 3.3-3.3 3.3zM3.55 5.35c-.77 0-1.4.63-1.4 1.4v10.9c0 .77.63 1.4 1.4 1.4h16.9c.77 0 1.4-.63 1.4-1.4V6.75c0-.77-.63-1.4-1.4-1.4H3.55z"
                />
                <path
                  d="M10.27 14.68c0 1.64-.47 2.91-1.41 3.78-1.47 1.3-3.64 1.3-5.12 0-.94-.87-1.41-2.14-1.41-3.78v-4.61h2.82v4.61c0 .67.2 1.18.63 1.47.42.28.97.28 1.39-.02s.63-.8.63-1.47V10.6h2.82v4.61z"
                />
                <path
                  d="M5.41 8.16c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm mt-4">
          <p>© {new Date().getFullYear()} BrandLogo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
