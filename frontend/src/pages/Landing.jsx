import React, { useState, useEffect } from "react"; 
import { Footer } from "../components/Footer";
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
        <>
          <SpotlightPreview />
          <Carousel />
          <div className="mt-4">
            <Footer />  
          </div>
        </>
      )}
    </div>
  );
};

export default Landing;
