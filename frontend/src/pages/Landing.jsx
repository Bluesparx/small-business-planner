import React from "react";
import { HeroParallaxDemo } from "./HeroParallax";
import { Navbar } from "../Components/Navbar";
import { Footer } from "./Footer";

const Landing = () => {
  return (
    <div>
      <HeroParallaxDemo></HeroParallaxDemo>
      <div className="mt-4">
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
