import React, { useState, useEffect } from "react"; 
import { Footer } from "../Components/Footer";
import Loader from "../Components/Loader";  
import { SpotlightPreview } from "@/Components/ui/SpotlightPreview";
import Carousel from "@/Components/ui/Carousel";

const Landing = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 0);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mb-4">
          <SpotlightPreview />
          <Carousel />
        </div>
      )}
    </div>
  );
};

export default Landing;
