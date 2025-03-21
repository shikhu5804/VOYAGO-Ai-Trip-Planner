import React from "react";
import { Link } from "react-router-dom";

function CTASection() {
  return (
    <div className="bg-blue-600 mt-10 text-white py-16 px-8 text-center">
      <h2 className="text-4xl font-bold mb-4">
        Ready to Plan Your Perfect Trip?
      </h2>
      <p className="text-xs lg:text-sm mb-8 text-gray-300">
        Join thousands of travelers using our AI-powered planner to create
        seamless itineraries and discover the best hotels and attractions.
      </p>
      <Link onClick={() => scrollTo(0, 0)} to={"/create-trip"}>
        <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-2xl shadow-md hover:bg-gray-200 transition animate-bounce">
          Start Planning Now
        </button>
      </Link>
    </div>
  );
}

export default CTASection;
