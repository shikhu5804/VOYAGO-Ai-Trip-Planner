import React from "react";
import { FaHotel, FaMapMarkedAlt, FaClipboardList, FaGlobe, FaCloudSun, FaMapSigns } from "react-icons/fa";

function Features() {

    const features = [
      {
        icon: <FaHotel className="text-blue-500 text-4xl" />,
        title: "Hotel Recommendations",
        description: "Find the best hotel options based on your budget, location, and preferences."
      },
      {
        icon: <FaMapMarkedAlt className="text-blue-500 text-4xl" />,
        title: "AI-Powered Itinerary",
        description: "Get a personalized itinerary with optimized routes and schedules."
      },
      {
        icon: <FaClipboardList className="text-blue-500 text-4xl" />,
        title: "Budget Planning",
        description: "Estimate and manage your trip expenses effectively."
      },
      {
        icon: <FaGlobe className="text-blue-500 text-4xl" />,
        title: "People & Group Management",
        description: "Customize plans based on the number of people traveling."
      },
      {
        icon: <FaCloudSun className="text-blue-500 text-4xl" />,   // Weather icon added
        title: "Real-Time Weather Updates",
        description: "Stay informed with accurate weather forecasts for your travel destinations."
      },
      {
        icon: <FaMapSigns className="text-blue-500 text-4xl" />,
        title: "Nearby Activities & Attractions",
        description: "Discover local activities, sightseeing spots, and hidden gems around your stay."
      }
    ];
      

  return (
    <div className="bg-white py-5 px-8 md:px-16 lg:px-32">
      <h2 className="text-3xl font-bold text-center mb-12">Everything You Need for the Perfect Trip</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="border rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300">
            <div className="mb-6">{feature.icon}</div>
            <h3 className="text-xl font-bold">{feature.title}</h3>
            <p className="text-gray-500 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
