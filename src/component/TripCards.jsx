import React from "react";
import { Link } from "react-router-dom";

function TripCards({ trip }) {
    return (
        <Link to={`/view-trip/${trip?.id}`}>
            <div className="hover:scale-105 transition-all hover:shadow-sm">
                <img
                    src={trip.imageUrl}
                    alt="Trip"
                    className="rounded-xl h-[250px] w-full object-cover"
                />
                <div className="mt-3">
                    <h2 className="font-medium text-lg">
                        {trip?.userSelection?.location}
                    </h2>
                    <h2 className="text-sm text-gray-600">
                        {trip?.userSelection?.totalDays} Days trip with{" "}
                        {trip?.userSelection?.budget}
                    </h2>
                </div>
            </div>
        </Link>
    );
}

export default TripCards;
