import { db } from "@/service/firebaseConfig";
import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { FaTrash } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function MyTrips() {
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const apiKey = import.meta.env.VITE_GOMAP_API_KEY;

  useEffect(() => {
    document.title = "Voyage | My Trips";
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigation("/");
      return;
    }
    setUserTrips([]);
    setLoading(true);

    const q = query(
      collection(db, "AiTrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);

    const trips = [];

    for (const doc of querySnapshot.docs) {
      const tripData = doc.data();
      const imageUrl = await fetchImageUrl(tripData.userSelection.location);

      trips.push({
        id: doc.id,
        ...tripData,
        imageUrl,
      });
    }

    // Ensure uniqueness based on trip details
    const uniqueTrips = trips.reduce((acc, trip) => {
      const key = `${trip.userSelection.location}-${trip.userSelection.totalDays}-${trip.userSelection.budget}-${trip.userSelection.withWhom}`;
      if (!acc[key]) {
        acc[key] = trip; // Add trip if it doesn't already exist
      }
      return acc;
    }, {});

    // Convert the unique trips object back to an array
    setUserTrips(Object.values(uniqueTrips));
    setLoading(false);
  };

  const fetchImageUrl = async (location) => {
    try {
      const placeDetailsUrl = `https://maps.gomaps.pro/maps/api/place/textsearch/json?query=${encodeURIComponent(
        location
      )}&key=${apiKey}`;

      const response = await fetch(placeDetailsUrl);
      const data = await response.json();

      if (data.results && data.results[0]?.photos) {
        const landscapePhoto = data.results[0].photos.find(
          (photo) => photo.width > photo.height
        );

        const photoRef = landscapePhoto
          ? landscapePhoto.photo_reference
          : data.results[0].photos[0].photo_reference;

        return `https://maps.gomaps.pro/maps/api/place/photo?photo_reference=${photoRef}&maxwidth=800&key=${apiKey}`;
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }

    return "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1931&auto=format&fit=crop";
  };

  const handleOpenDialog = (trip) => {
    setSelectedTrip(trip);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    if (selectedTrip) {
      try {
        await deleteDoc(doc(db, "AiTrips", selectedTrip.id));
        setUserTrips((prevTrips) =>
          prevTrips.filter((trip) => trip.id !== selectedTrip.id)
        );
        setOpenDialog(false);
        setSelectedTrip(null);
      } catch (error) {
        console.error("Error deleting trip:", error);
      }
    }
  };

  return (
    <div className="px-4 mb-10 sm:px-8 md:px-16 lg:px-32 xl:px-48 mt-12">
      <h2 className="font-bold text-3xl mb-10">My Trips</h2>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="h-[250px] w-full bg-slate-200 animate-pulse rounded-xl"
              ></div>
            ))}
        </div>
      ) : userTrips.length === 0 ? (
        <div className="flex justify-center items-center h-[300px]">
          <p className="text-gray-500 text-xl">No trips found. 🌍</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userTrips.map((trip) => (
            <Link
              to={`/trip/${trip.id}`} // Add Link to navigate to trip details
              key={trip.id}
              className="bg-white rounded-xl hover:scale-105 shadow-lg overflow-hidden"
            >
              <img
                src={trip.imageUrl}
                alt={trip.userSelection.location}
                className="w-full h-60 object-cover"
              />

              <div className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">
                    {trip.userSelection.location}
                  </h3>
                  <p className="text-gray-600 text-sm ">
                    {trip?.userSelection?.totalDays} Days trip with a budget of{" "}
                    {trip?.userSelection?.budget} {/* Include budget in description */}
                    <br />
                    with: {trip?.userSelection?.people} 
                  </p>
                </div>

                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent Link navigation
                    handleOpenDialog(trip);
                  }}
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p className="text-gray-700">
            Are you sure you want to delete this trip?
          </p>
          <DialogFooter className="flex justify-end">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MyTrips;