"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Mail } from "lucide-react";

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  id: string;
}

function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const baseURL = "https://edubridge-uwk9.onrender.com/api/v1";

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        setError("No user logged in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${baseURL}/user/one/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData(response.data.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-b-4 border-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-full bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center">
          <div className="bg-[#82239d] rounded-full h-24 w-24 flex items-center justify-center text-white text-4xl font-bold mb-4">
            {userData?.first_name[0]}
            {userData?.last_name[0]}
          </div>
          <h1 className="text-xl font-bold text-gray-800">
            {userData?.first_name} {userData?.last_name}
          </h1>
          {/* <p className="text-gray-500 text-sm mb-4">User ID: {userData?.id}</p> */}
        </div>
        <div className="mt-6">
          <div className="flex items-center mb-4">
            <Mail className="h-5 w-5 text-gray-500 mr-2" />
            <p className="text-gray-700">{userData?.email}</p>
          </div>
          <div className="flex items-center">
            <User className="h-5 w-5 text-gray-500 mr-2" />
            <p className="text-gray-700">
              Welcome, {userData?.first_name} {userData?.last_name}!
            </p>
          </div>
        </div>
        <div className="mt-6">
          <button
            className="w-full bg-[#82239d] hover:bg-blue-600 text-white py-2 rounded-md transition duration-150"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login"; // Redirect to login page
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
