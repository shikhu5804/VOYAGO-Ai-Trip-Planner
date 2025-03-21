import { db } from "../service/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "../component/InfoSection";
import Hotels from "@/component/Hotels";
import TripPlace from "@/component/TripPlace";
import Footer from "@/component/Footer";

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);

  const GetTripData = async () => {
    const docRef = doc(db, "AiTrips", tripId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const tripData = docSnap.data();
      setTrip(tripData);
      // Set document title to the name of the place
      document.title = tripData.userSelection?.location || "Voyage | Trip Details";
    } else {
      toast("No trip found!");
    }
  };

  useEffect(() => {
    if (tripId) {
      GetTripData();
    }
    window.scrollTo(0, 0);
  }, [tripId]);

  return (
    <div className="p-12 md:px-25 lg:px-44 xl:px:56">
      <InfoSection trip={trip} />
      <Hotels trip={trip} />
      <TripPlace trip={trip} />
    </div>
  );
}

export default ViewTrip;