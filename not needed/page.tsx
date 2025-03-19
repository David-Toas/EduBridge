/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
}

interface User {
  first_name: string;
  // Add other user properties as needed
  email: string;
  last_name: string;
  role: string;
  _id: string;
}

const baseURL = "https://edubridge-uwk9.onrender.com/api/v1";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Dashboard Data
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication required. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch user data
        // const userRes = await axios.get(`${baseURL}/user/all`, { headers });
        // setUser(userRes.data?.data[0]);

        const userRes = await axios.get(`${baseURL}/user/all`, { headers });
        const userEmail = localStorage.getItem("userEmail");
        const currentUser = userRes.data?.data.find(
          (u: User) => u.email === userEmail
        );
        setUser(currentUser);

        // Fetch courses
        const coursesRes = await axios.get(`${baseURL}/course/all`, {
          headers,
        });
        setCourses(coursesRes.data?.data || []);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
        console.error("Dashboard Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* User Welcome Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, {user?.first_name} 👋
        </h1>
        <p className="text-gray-600">
          Explore available courses and start learning.
        </p>
      </div>

      {/* Courses Section */}
      <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
      {courses.length === 0 ? (
        <p className="text-gray-500">No courses available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-800">
                {course.title}
              </h3>
              <p className="text-gray-600 text-sm">{course.description}</p>
              <p className="text-gray-500 text-xs mt-2">
                Instructor: {course.instructor}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
