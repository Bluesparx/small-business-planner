import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../Components/ui/card";
import { Button } from "../Components/ui/button";
import { Spotlight } from "@/Components/ui/Spotlight";
import image from '../assets/image.png'

const About = () => {
  return (
    <div className="min-h-screen ">
          
      {/* Mission Section */}

      <section className="px-6 py-24 bg-gray-500" style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', opacity:'0.8'}}>
        <div className="text-center text-white">
          {/* <h2 className="text-3xl font-bold ">Our Mission</h2> */}
          <p className="mt-4 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Our mission is to empower small businesses by simplifying financial
            planning and enabling smarter, data-driven decisions. By leveraging
            advanced technology, we help businesses of all sizes thrive in a
            competitive market.
          </p>
        </div>
      </section>
      <div className=" w-full rounded-md flex flex-col md:items-center md:justify-center antialiased bg-grid-white/[0.02] relative overflow-hidden">
            {/* Spotlight Effect */}
            <Spotlight className="left-0 md:left-60" fill="gray" />
            
      <section className="flex flex-col items-center justify-center px-6 py-12 text-center">
        <h3 className=" text-3xl font-bold tracking-tight  mb-6">
          About Our App
        </h3>
        <p className="text-lg md:text-xl leading-relaxed max-w-3xl py-2 dark:text-gray-200">
          A revolutionary
          tool designed to simplify financial management and empower businesses
          with data-driven insights. Whether it's analyzing income statements,
          tracking balance sheets, or predicting stock trends, our platform is
          your trusted companion in making informed decisions.
        </p>
      </section>
      </div>
      {/* Features and Technology Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 max-w-6xl mx-auto">
        {/* Key Features */}
        <Card className="hover:shadow-xl border-gray-500 transition-shadow ">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Key Features
            </CardTitle>
            <CardDescription>Why choose our platform?</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-3">
              <li>Upload and analyze income statements and balance sheets</li>
              <li>Advanced AI-powered stock growth and decline predictions</li>
              <li>Comprehensive financial reports and actionable insights</li>
              <li>Secure subscription payments via Web3 and MetaMask</li>
            </ul>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card className="hover:shadow-xl border-gray-500 transition-shadow ">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Technology Stack
            </CardTitle>
            <CardDescription>
              Built with cutting-edge tools and technologies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-3">
              <li>
                <strong>AI & Machine Learning:</strong> Accurate stock data
                analysis and trend predictions.
              </li>
              <li>
                <strong>Web3 Integration:</strong> Secure blockchain-based
                subscription management.
              </li>
              <li>
                <strong>Data Analytics:</strong> Extract actionable insights
                from financial data.
              </li>
              <li>
                <strong>Modern Web Development:</strong> Powered by React.js,
                Tailwind CSS, and ShadCN components for a seamless user
                experience.
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

    </div>
  );
};

export default About;
