import React from "react";
import { FaUserPlus, FaMap, FaCogs, FaGlobeAmericas } from "react-icons/fa";

function HowItWorks() {
  const steps = [
    {
      icon: <FaUserPlus className="text-blue-500 text-4xl" />,
      title: "1. Create an Account",
      description: "Sign up and unlock access to personalized trip planning features."
    },
    {
      icon: <FaMap className="text-blue-500 text-4xl" />,
      title: "2. Choose Your Destination",
      description: "Select your dream destination and let our AI handle the details."
    },
    {
      icon: <FaCogs className="text-blue-500 text-4xl" />,
      title: "3. Get Personalized Itinerary",
      description: "Receive a fully customized travel plan with routes, attractions, and accommodations."
    },
    {
      icon: <FaGlobeAmericas className="text-blue-500 text-4xl" />,
      title: "4. Explore Seamlessly",
      description: "Enjoy a stress-free trip with real-time navigation and travel tips."
    }
  ];

  return (
    <div className="bg-gray-100 mt-5 py-20 px-8 md:px-16 lg:px-32">
      <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-blue-100 rounded-full p-6 mb-6">{step.icon}</div>
            <h3 className="text-xl font-bold">{step.title}</h3>
            <p className="text-gray-500 mt-2">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HowItWorks;
