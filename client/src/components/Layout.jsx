import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Layout = ({ children, hide }) => {
  const [auth, setAuth] = useState(false);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  // Logout function clears the profile and authentication state
  const logout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include", // Send cookies with the request
      });
      setAuth(false);
      setProfile(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const getProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        credentials: "include", // Send cookies with the request
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data.user); 
        setAuth(true);
      } else {
        throw new Error("Failed to fetch profile");
      }
    } catch (error) {
      setAuth(false); 
      setProfile(null);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="w-full max-w-[800px] h-screen max-h-screen overflow-y-scroll">
      <div className="flex justify-between items-center py-3">
        <div className="flex items-center gap-3">
          <img src="./logo.jpeg" className="h-12 rounded-full" alt="" />
          {hide && <span className="text-2xl font-bold">Habits Tracker</span>}
        </div>

        {!hide && (
          <>
            {!auth ? (
              <Link to="/login">
                <button className="bg-gradient-to-br from-purple-500 to-orange-600 px-6 rounded-xl py-2">
                  Login
                </button>
              </Link>
            ) : (
              <div className="flex gap-3 items-center bg-gradient-to-br from-purple-500 to-orange-600 px-4 rounded-2xl py-2">
                <span className="text-lg bold text-black font-semibold">
                  {profile?.fullName || "User Name"}{" "}
                  {/* Display the user's name */}
                </span>
                <img
                  src="./defaultProfile.jpg"
                  alt=""
                  className="h-8 rounded-full"
                />
                <button onClick={logout}>
                  <i className="uil uil-sign-out-alt text-3xl text-black"></i>
                </button>
              </div>
            )}
          </>
        )}
      </div>
      {children}
    </div>
  );
};

export default Layout;
