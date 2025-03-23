/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Mail, Shield, Settings, Check, AlertCircle } from "lucide-react";

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  id: string;
  role?: string;
}

function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

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

        const user = response.data.data;
        console.log("User data from API:", user);

        const actualRole = user.role;
        const updatedUser = {...user, role: actualRole};
      setUserData(updatedUser);
      localStorage.setItem("userRole", actualRole);


        setUserData(user);
        localStorage.setItem("userRole", user.role || "student");
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const showNotification = (message: string, type: string) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

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
    <div className="flex justify-center items-center min-h-full bg-gray-100 p-4">
      {notification.show && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-md shadow-md ${
            notification.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          } flex items-center gap-2 max-w-md z-50`}
        >
          {notification.type === "success" ? (
            <Check className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
          <p>{notification.message}</p>
        </div>
      )}

      <div className="max-w-3xl w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Sidebar / Profile Info */}
          <div className="md:w-1/3 bg-[#f6f8fa] p-6 flex flex-col items-center border-r border-gray-200">
            <div className="bg-[#82239d] rounded-full h-24 w-24 flex items-center justify-center text-white text-4xl font-bold mb-4">
              {userData?.first_name?.[0]}
              {userData?.last_name?.[0]}
            </div>
            <h1 className="text-xl font-bold text-gray-800 text-center">
              {userData?.first_name} {userData?.last_name}
            </h1>
            <div className="flex items-center mt-2 mb-4">
              <Mail className="h-4 w-4 text-gray-500 mr-2" />
              <p className="text-gray-700 text-sm">{userData?.email}</p>
            </div>

            <div className="w-full mt-4">
              <div className="flex items-center justify-between bg-[#eef2f6] p-3 rounded-md">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-[#82239d] mr-2" />
                  <span className="text-gray-700 font-medium">Role:</span>
                </div>
                {/* <span className="bg-[#82239d] text-white text-xs font-semibold px-2.5 py-1 rounded">
                  {userData?.role
                    ? userData.role.charAt(0).toUpperCase() +
                      userData.role.slice(1)
                    : "Student"}
                </span> */}

<span className="bg-[#82239d] text-white text-xs font-semibold px-2.5 py-1 rounded">
  {userData?.role 
    ? userData.role.charAt(0).toUpperCase() + userData.role.slice(1) 
    : "Student"}
</span>
              </div>
            </div>

            <button
              className="w-full mt-6 bg-[#82239d] hover:bg-[#6e1b85] text-white py-2 rounded-md transition duration-150"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
            >
              Log Out
            </button>
          </div>

          {/* Main Content */}
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Account Settings
              </h2>
              <Settings className="h-5 w-5 text-gray-500" />
            </div>

            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-2">
                  Profile Information
                </h3>
                <p className="text-sm text-gray-600">
                  Update your personal information and how it's displayed on
                  your account.
                </p>
                <button className="mt-3 text-[#82239d] hover:text-[#6e1b85] text-sm font-medium">
                  Edit Profile
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-2">
                  Account Security
                </h3>
                <p className="text-sm text-gray-600">
                  Manage your password and security settings to keep your
                  account secure.
                </p>
                <button className="mt-3 text-[#82239d] hover:text-[#6e1b85] text-sm font-medium">
                  Change Password
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-2">
                  Notification Settings
                </h3>
                <p className="text-sm text-gray-600">
                  Control how you receive notifications and updates from
                  EduBridge.
                </p>
                <button className="mt-3 text-[#82239d] hover:text-[#6e1b85] text-sm font-medium">
                  Manage Notifications
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
