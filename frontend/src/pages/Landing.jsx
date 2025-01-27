import React, { useState, useEffect } from "react"; 
import { HeroParallaxDemo } from "../components/HeroParallax";
import { Footer } from "../components/Footer";
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
          <div className="mt-4">
            <h4>hi i removed landing component</h4>
            <Footer />  
          </div>
        </>
      )}
    </div>
  );
};

export default Landing;
