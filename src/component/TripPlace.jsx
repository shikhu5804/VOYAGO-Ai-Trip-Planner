import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function TripPlace({ trip }) {
  const itineraryArray = trip?.tripData?.itinerary
    ? Object.entries(trip.tripData.itinerary).sort(([a], [b]) => {
        const dayNumA = parseInt(a.replace("day", ""), 10); // Extract day number from key
        const dayNumB = parseInt(b.replace("day", ""), 10); // Extract day number from key
        return dayNumA - dayNumB;
      })
    : [];

  console.log("Itinerary Array:", itineraryArray);

  return (
    <div className="my-4">
      <h2 className="font-bold mt-10 text-xl mb-5">Places to Visit</h2>
      <div>
        {itineraryArray.map(([key, plans], i) => {
          // Extract the day number from the key
          let dayNumber;
          if (key.startsWith("day")) {
            // For keys like 'day1', 'day2', etc.
            dayNumber = parseInt(key.replace("day", ""), 10);
          } else {
            // For keys like '0', '1', etc.
            dayNumber = parseInt(key, 10) + 1;
          }

          // Extract the plans array
          const validPlans = Array.isArray(plans?.plan)
            ? plans.plan
            : Array.isArray(plans)
            ? plans
            : [];

          console.log(`Key: ${key}, Day: ${dayNumber}, Plans:`, validPlans);

          return (
            <div key={`day-${dayNumber}-${i}`}>
              <h2 className="font-semibold text-l capitalize">{`Day ${dayNumber}`}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {validPlans.map((place, index) => (
                  <PlaceCardItem place={place} key={`place-${index}-${i}`} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TripPlace;