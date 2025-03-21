import React from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col items-center text-center px-8 md:px-16 lg:px-32 py-5 bg-white">
      {/* Heading */}
      <h1 className="text-3xl md:text-7xl font-extrabold leading-tight">
        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          AI-Powered Adventures Await You{" "}
        </span>
        <br />
        with AI-Powered Itineraries
      </h1>

      {/* Subtext */}
      <p className="text-md md:text-xl text-gray-500 mt-6 max-w-2xl">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budget.
      </p>

      {/* Buttons */}
      <div className="flex gap-4 mt-8">
        <Link onClick={() => scrollTo(0, 0)}  to={"/create-trip"}>
          <Button className="bg-black text-white hover:bg-gray-900 transition-all duration-300 px-6 py-3 text-lg">
            Get Started
          </Button>
        </Link>
      </div>

      {/* Image */}
      <img
        src="/Trip.jpeg"
        alt="Landing"
        className="mt-12 w-full max-w-6xl  object-cover rounded-lg shadow-lg"
      />
    </div>
  );
}

export default Hero;
