import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Import images from your assets folder
import Image5 from '../../assets/image8.png'; // Adjust the file extension if needed
import Image6 from '../../assets/image6.png'; // Adjust the file extension if needed
import Image7 from '../../assets/image7.png'; // Adjust the file extension if needed

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = [Image5, Image6, Image7]; // Using imported images

  // Function to move to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  // Use effect to automatically change the slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Change every 3 seconds

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative ">
      <motion.div
        className="w-full max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={items[currentIndex]}
          alt={`carousel-slide-${currentIndex}`}
          className="w-full h-[35rem]  rounded-lg"
        />
      </motion.div>

      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <h2 className="text-5xl md:text-5xl font-bold text-white drop-shadow-lg">
          Managing Finances, Building Businesses
        </h2>
      </div>
    </div>
  );
};

export default Carousel;
