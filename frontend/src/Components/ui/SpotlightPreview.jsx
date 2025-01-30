import React from "react";
import { Spotlight } from "./Spotlight"; // Adjust the import path as needed
import { Button } from "@/Components/ui/button"; // Adjust the import path as needed



export function SpotlightPreview() {
  return (
    
    <div className="h-[30rem] w-full rounded-md flex md:items-center md:justify-center antialiased bg-grid-white/[0.02] relative overflow-hidden">
      {/* Spotlight Effect */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
        {/* Hero Section Heading */}
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-neutral-400 bg-opacity-50">
          Small business<br /> finance planning app
        </h1>
        
        {/* Hero Section Paragraph */}
        <p className="mt-4 font-normal text-base text-gray-600 max-w-lg text-center mx-auto">
        Vyapaar-e simplifies financial planning for small businesses, providing easy-to-use tools and real-time insights to help you grow and succeed with confidence.
        </p>
        
        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button size="lg" className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700">
            <a href="/login">Get Started</a>
          </Button>
          <Button size="lg" variant="outline" className="px-6 py-3 text-blue-600 border-blue-600 hover:bg-blue-100">
            <a href="/about">Know More</a>
          </Button>
        </div>
      </div>
    </div>
    
   
   
   
  );
}
