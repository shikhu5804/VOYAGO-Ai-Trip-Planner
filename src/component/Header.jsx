import React from "react";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate(); 

  const handleLogout = () => {
    logout(); 
    navigate("/"); 
  };

  return (
    <div className="px-6 py-4 shadow-md bg-white flex justify-between items-center w-full z-50">
      <Link to={"/"} className="flex items-center gap-2">
        <img className="w-[160px]" src="/logoo.png" alt="Voyage Logo" />
      </Link>

      <div className="flex items-center gap-6">
        {user ? (
          <div className="flex items-center gap-4">
            <Link to={"/create-trip"}>
              <Button className="rounded-full hidden md:block px-5 py-2">Create Trip</Button>
            </Link>

            <Link to={"/my-trips"}>
              <Button className="rounded-full px-5 py-2">My Trips</Button>
            </Link>

            <Popover>
              <PopoverTrigger className="focus:outline-none">
                <img
                  src={user.picture}
                  alt="Profile"
                  className="rounded-full w-12 h-12 object-cover border-2 border-gray-300 hover:border-gray-500 transition duration-300"
                />
              </PopoverTrigger>
              <PopoverContent className="w-72 bg-white rounded-lg shadow-lg p-5 mr-2 border border-gray-200">
                <div className="flex items-center gap-4">
                  <img
                    src={user.picture}
                    alt="Profile"
                    className="rounded-full w-16 h-16 object-cover border-2 border-gray-300"
                  />
                  <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {user.name}
                    </h2>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>

                <div className="mt-4 border-t pt-4">
                  <Button
                    onClick={handleLogout}
                    variant="destructive"
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg transition"
                  >
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={login}>Sign In</Button>
        )}
      </div>
    </div>
  );
};

export default Header;
