import React, { useState, useEffect } from "react"; 
import { HeroParallaxDemo } from "./HeroParallax";
import { Footer } from "./Footer";
import Loader from "../Components/Loader";  

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
          <HeroParallaxDemo />
          <div className="mt-4">
            <Footer />  
          </div>
        </>
      )}
    </div>
  );
};

export default Landing;
