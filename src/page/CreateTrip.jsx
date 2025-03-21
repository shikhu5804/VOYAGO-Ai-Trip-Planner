import { Input } from "@/components/ui/input";
import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelList,
} from "../constant/option";
import { Button } from "@/components/ui/button";
import { chatSession } from "@/service/AIModel";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth

const DestinationSearch = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFromData] = useState({
    location: "",
    totalDays: "",
    budget: "",
    people: "",
  });
  const [opendialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const suggestionsRef = useRef(null);
  const navigate = useNavigate();
  const { user, login } = useAuth(); // Use useAuth for user and login

  const handleInputChange = (name, value) => {
    setFromData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (user) {
      setOpenDialog(false); // Close the dialog when user is logged in
    }
  }, [user]);

  useEffect(() => {
    document.title = "Voyage | Create Trip";
  }, [formData]);

  const onGenerateTrip = async () => {
    if (
      !formData?.location ||
      !formData?.totalDays ||
      !formData?.budget ||
      !formData?.people
    ) {
      toast.error("Please fill in all the fields before generating the trip.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (isNaN(formData?.totalDays)) {
      toast.error("Please enter a valid number for total days.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (formData?.totalDays > 5) {
      toast.error("Please enter a value less than or equal to 5!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!user) {
      setOpenDialog(true); // Open the dialog if the user is not logged in
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{totalDays}", formData?.totalDays)
      .replace("{people}", formData?.people)
      .replace("{budget}", formData?.budget);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      setLoading(false);
      SaveAiTrip(result?.response?.text());
    } catch (error) {
      console.error("Error generating trip:", error);
      setLoading(false);
      toast.error("Failed to generate the trip. Please try again.");
    }
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    try {
      const tripData = JSON.parse(TripData);
      await setDoc(doc(db, "AiTrips", docId), {
        userSelection: formData,
        tripData: tripData,
        userEmail: user?.email,
        id: docId,
      });
      setLoading(false);
      navigate("/view-trip/" + docId);
    } catch (error) {
      console.error("Error parsing trip data:", error);
      setLoading(false);
      toast.error("Failed to save the trip. Please try again.");
    }
  };

  const fetchPlaces = async (input) => {
    if (!input.trim()) {
      setSuggestions([]);
      return;
    }

    const apiKey = import.meta.env.VITE_GOMAP_API_KEY;
    const url = `https://maps.gomaps.pro/maps/api/place/queryautocomplete/json?input=${input}&key=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSuggestions(data.predictions || []);
    } catch (error) {
      console.error("Error fetching autocomplete results:", error);
    }
  };

  const handleSelectPlace = (place) => {
    setQuery(place.description);
    setFromData({
      ...formData,
      location: place.description,
    });
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : 0
      );
    } else if (e.key === "Enter" && activeSuggestionIndex >= 0) {
      e.preventDefault();
      handleSelectPlace(suggestions[activeSuggestionIndex]);
    }
  };

  useEffect(() => {
    if (suggestionsRef.current && activeSuggestionIndex >= 0) {
      const activeItem = suggestionsRef.current.children[activeSuggestionIndex];
      if (activeItem) {
        activeItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [activeSuggestionIndex]);

  const handleLoginSuccess = async (tokenInfo) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      );

      const userData = response.data;
      localStorage.setItem("user", JSON.stringify(userData)); // Store user in localStorage
      await login(userData); // Update user state in context

      setOpenDialog(false);
      onGenerateTrip();
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to sign in. Please try again.");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: (error) => {
      console.error("Google login error:", error);
      toast.error("Failed to sign in with Google. Please try again.");
    },
  });

  return (
    <>
      <div className="flex flex-col">
        <div className="px-5 mt-12 sm:px-10 md:px-32 lg:px-56 xl:px-72">
          <div>
            <h2 className="font-bold text-3xl ">
              Tell us your travel preferences 🌍✈️🌴
            </h2>
            <p className="mt-3 md:text-md  text-gray-600 text-md">
              Just provide some basic information, and our trip planner will
              generate a customized itinerary based on your preferences.
            </p>
          </div>
          <div className="mt-20 relative">
            <label className="text-xl mb-3 font-semibold">
              What is destination of choice?
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                fetchPlaces(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              className="border p-2 w-full mt-2"
              placeholder="Enter a location..."
            />
            {suggestions.length > 0 && query.trim() && (
              <div
                ref={suggestionsRef}
                className="absolute w-full bg-white border mt-1 shadow-md rounded-md z-10"
              >
                {suggestions.map((place, index) => (
                  <div
                    key={place.place_id}
                    className={`p-2 border-b hover:bg-gray-100 cursor-pointer ${
                      index === activeSuggestionIndex ? "bg-gray-100" : ""
                    }`}
                    onClick={() => handleSelectPlace(place)}
                  >
                    {place.description}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="px-5 mt-12 sm:px-10 md:px-32 lg:px-56 xl:px-72">
          <label className="text-xl font-medium">
            How many days are you planning your trip?
          </label>
          <Input
            placeholder={"ex.3"}
            type="number"
            min="1"
            onChange={(e) => handleInputChange("totalDays", e.target.value)}
          />
        </div>

        <div className="px-5 mt-12 sm:px-10 md:px-32 lg:px-56 xl:px-72">
          <label className="text-xl my-3 font-medium">
            What is Your Budget?
          </label>
          <p>
            The budget is exclusively allocated for activities and dining
            purposes.{" "}
          </p>
          <div className="grid grid-cols-3 gap-5 mt-5 mb-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg
                  ${
                    formData?.budget == item.title &&
                    "shadow-lg border-neutral-950"
                  }
                  `}
              >
                <h2 className="text-3xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 mt-12 sm:px-10 md:px-32 lg:px-56 xl:px-72">
          <label className="text-xl my-3 font-medium">
            Who do you plan on traveling with on your next adventure?{" "}
          </label>
          <div className="grid grid-cols-3 gap-5 mt-5 mb-5">
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("people", item.title)}
                className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg
                  ${
                    formData?.people == item.title &&
                    "shadow-lg border-neutral-950"
                  }
                  `}
              >
                <h2 className="text-3xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="my-10 flex justify-center ">
          <Button onClick={onGenerateTrip} disabled={loading}>
            {" "}
            {loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>

        <Dialog
          open={opendialog}
          onOpenChange={(open) => {
            if (!open) {
              setOpenDialog(false);
            }
          }}
        >
          <DialogContent>
            <DialogHeader>
              {/* Move the img and h2 outside of DialogDescription */}
              <img className="w-[20vh]" src="/logoo.png" alt="Logo" />
              <h2 className="font-bold text-lg mt-6">Sign In with Google</h2>
              {/* Only include text content inside DialogDescription */}
              <DialogDescription>
                Sign In to the App with Google authentication securely
              </DialogDescription>
              {/* Move the Button outside of DialogDescription */}
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <ToastContainer />
    </>
  );
};

export default DestinationSearch;