import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const apiKey = import.meta.env.VITE_GOMAP_API_KEY;

  useEffect(() => {
    if (place?.placeName) {
      GetPlaceImg();
    }
  }, [place]);

  const GetPlaceImg = async () => {
    try {
      setIsLoading(true);
      const placeDetailsUrl = `https://maps.gomaps.pro/maps/api/place/textsearch/json?query=${encodeURIComponent(
        place.placeName
      )}&key=${apiKey}`;

      const response = await fetch(placeDetailsUrl);
      const data = await response.json();

      if (data.results && data.results[0]?.photos) {
        const photoRef = data.results[0].photos[0].photo_reference;
        const photoUrl = `https://maps.gomaps.pro/maps/api/place/photo?photo_reference=${photoRef}&maxwidth=600&key=${apiKey}`;
        setPhotoUrl(photoUrl);
      } else {
        setPhotoUrl(
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop"
        );
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
      setPhotoUrl(
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-4">
      <Link
        to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName},${place?.geoCoordinates}`}
        target="_blank"
      >
        <div className="group bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer border border-gray-100 hover:border-orange-200">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Image Section */}
            <div className="w-full md:w-1/3">
              {isLoading ? (
                <div className="w-full h-48 md:h-32 rounded-lg bg-gray-200 animate-pulse"></div>
              ) : (
                <img
                  src={photoUrl}
                  alt={place.placeName}
                  className="w-full h-48 md:h-32 rounded-lg object-cover shadow-sm transition-transform duration-300 hover:scale-105"
                />
              )}
            </div>

            {/* Details Section */}
            <div className="flex flex-col justify-between flex-grow">
              <div>
                {isLoading ? (
                  <>
                    <div className="h-4 w-20 bg-gray-200 animate-pulse mb-2"></div>
                    <div className="h-6 w-48 bg-gray-200 animate-pulse mb-2"></div>
                    <div className="h-4 w-64 bg-gray-200 animate-pulse"></div>
                  </>
                ) : (
                  <>
                    <h2 className="font-medium text-sm text-orange-600 mb-1">
                      {place.time}
                    </h2>
                    <h2 className="font-bold text-lg md:text-xl text-gray-800">
                      {place.placeName}
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 mt-1">
                      {place.placeDetails}
                    </p>
                  </>
                )}
              </div>

              {/* Additional Info */}
              <div className="mt-2">
                {isLoading ? (
                  <>
                    <div className="h-4 w-24 bg-gray-200 animate-pulse mb-2"></div>
                    <div className="h-4 w-16 bg-gray-200 animate-pulse"></div>
                  </>
                ) : (
                  <>
                    <p className="text-sm md:text-base inline bg-green-100 text-green-700 font-medium">
                      {place.ticketPricing}
                    </p>
                    <div className="flex items-center gap-1">
                      <span className="text-sm md:text-base bg-yellow-100 inline text-yellow-700">
                        ⭐{place.rating}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Location Button */}
            <div className="flex items-center justify-center md:justify-end">
              {isLoading ? (
                <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full"></div>
              ) : (
                <Button
                  variant="outline"
                  className="p-2 rounded-full border-gray-300 hover:bg-orange-50 hover:border-orange-300 transition-colors"
                >
                  <FaLocationDot className="text-orange-500 text-lg md:text-xl" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PlaceCardItem;
