import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HotelCardItem({ item }) {
  const [photoUrl, setPhotoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const apiKey = import.meta.env.VITE_GOMAP_API_KEY;

  useEffect(() => {
    if (item && item.hotelName) {
      GetPlaceImg();
    }
  }, [item]);

  const GetPlaceImg = async () => {
    try {
      setIsLoading(true);
      const placeDetailsUrl = `https://maps.gomaps.pro/maps/api/place/textsearch/json?query=${encodeURIComponent(item.hotelName)}&key=${apiKey}`;
      const response = await fetch(placeDetailsUrl);
      const data = await response.json();

      if (data.results && data.results[0]?.photos) {
        const photoRef = data.results[0].photos[0].photo_reference;
        const photoUrl = `https://maps.gomaps.pro/maps/api/place/photo?photo_reference=${photoRef}&maxwidth=600&key=${apiKey}`;
        setPhotoUrl(photoUrl);
      } else {
        console.error("No photo found");
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 bg-white">
      <Link
        to={`https://www.google.com/maps/search/?api=1&query=${item?.hotelName},${item?.hotelAddress}`}
        target="_blank"
        className="block"
      >
        {/* Hotel Image with Conditional Address */}
        <div className="relative w-full h-[220px] md:h-[280px] lg:h-[320px]">
          {isLoading ? (
            <div className="w-full h-full bg-gray-200 animate-pulse"></div>
          ) : (
            <>
              <img
                src={photoUrl || "https://images.unsplash.com/photo-1600047509763-3d2b8c4a0126?q=80&w=2080&auto=format&fit=crop"}
                alt="Hotel"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

              {/* Hotel Name and Address - Address only on larger screens */}
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-lg md:text-xl font-bold">{item?.hotelName}</h2>
                <p className="hidden md:block text-xs md:text-sm">📍 {item?.hotelAddress}</p>
              </div>
            </>
          )}
        </div>

        {/* Hotel Details */}
        <div className="p-4 md:p-6">
          <div className="md:flex-row justify-between flex-col items-center mb-2">
            {isLoading ? (
              <>
                <div className="h-6 w-16 bg-gray-200 animate-pulse rounded-full"></div>
                <div className="h-6 w-16 bg-gray-200 animate-pulse rounded-full"></div>
              </>
            ) : (
              <div className="flex-col items-center ">
                <div className="bg-green-100 text-green-700 mb-1 text-xs md:text-sm font-bold px-1 py-1 rounded-full">
                  💰 {item?.price || "N/A"}
                </div>
                <div className="bg-yellow-100 inline text-yellow-700 text-xs md:text-sm font-bold px-2 py-1 rounded-full">
                  ⭐ {item?.rating || "N/A"}
                </div>
              </div>
            )}
          </div>

          {/* Location only on larger screens */}
           {isLoading ? (
            <div className="h-4 w-48 bg-gray-200 animate-pulse mb-2"></div>
          ) : (
            <p className="hidden md:block text-gray-600 text-sm md:text-base">
              <span className="font-medium">Location:</span> {item?.hotelAddress}
            </p>
          )}

          {isLoading ? (
            <div className="h-10 w-full bg-gray-200 animate-pulse mt-3 rounded-lg"></div>
          ) : (
            <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white text-sm md:text-base font-semibold py-2 rounded-lg transition-all">
              View on Google Maps
            </button>
          )}
        </div>
      </Link>
    </div>
  );
}

export default HotelCardItem;
