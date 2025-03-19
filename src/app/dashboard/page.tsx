/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BookOpen, Users, Layers, FileText, Plus, Search } from 'lucide-react';

// const DashboardMain = () => {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [modules, setModules] = useState<Module[]>([]);
//   const [lessons, setLessons] = useState<Lesson[]>([]);
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const baseURL = 'https://edubridge-uwk9.onrender.com/api/v1';

//   useEffect(() => {
//     fetchData();
//   }, []);

//   interface Course {
//     id?: string;
//     title: string;
//     instructor: string;
//     category?: string;
//   }

//   interface Module {
//     id?: string;
//   }

//   interface Lesson {
//     id?: string;
//   }

//   interface User {
//     id?: string;
//     first_name: string;
//     last_name: string;
//     email: string;
//   }

//   interface ApiResponse<T> {
//     data: T[];
//   }

//   const fetchData = async (): Promise<void> => {
//     setLoading(true);
//     try {
//       const [coursesRes, modulesRes, lessonsRes, usersRes] = await Promise.all([
//         axios.get<ApiResponse<Course>>(`${baseURL}/course/all`),
//         axios.get<ApiResponse<Module>>(`${baseURL}/module/all`),
//         axios.get<ApiResponse<Lesson>>(`${baseURL}/lesson/all`),
//         axios.get<ApiResponse<User>>(`${baseURL}/user/all`)
//       ]);

//       setCourses(coursesRes.data.data || []);
//       setModules(modulesRes.data.data || []);
//       setLessons(lessonsRes.data.data || []);
//       setUsers(usersRes.data.data || []);
//       setLoading(false);
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setError('Failed to fetch data. Please try again later.');
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-50">
//         <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-50">
//         <div className="bg-red-100 p-4 rounded-md">
//           <p className="text-red-700">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-6 px-8">
//       <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
//       {/* Dashboard Content */}
//     </div>
//   );
// };

// export default DashboardMain;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { BookOpen, Users, Layers, FileText } from "lucide-react";

const Dashboard = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const baseURL = "https://edubridge-uwk9.onrender.com/api/v1";

  useEffect(() => {
    fetchUserData();
    fetchData();
  }, []);

  interface Course {
    id: string;
    title: string;
    description: string;
    instructor: string;
  }

  interface Module {
    id?: string;
  }

  interface Lesson {
    id?: string;
  }

  interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  }

  interface ApiResponse<T> {
    data: T[];
  }

  // const fetchUserData = async () => {
  //   const token = localStorage.getItem("token");
  //   const userId = localStorage.getItem("userId");
  //   if (!token || !userId) return;

  //   try {
  //     const response = await axios.get(`${baseURL}/user/one/${userId}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setUser(response.data);
  //   } catch (err) {
  //     console.error("Error fetching user data:", err);
  //     setError("Failed to fetch user data.");
  //   }
  // };

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
  
    if (!token || !userId) {
      console.warn("No token or user ID found. User might not be logged in.");
      return;
    }
  
    try {
      const response = await axios.get(`${baseURL}/user/one/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("User Data Response:", response.data);
      setUser(response.data.data);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to fetch user data.");
    }
  };
  

  const fetchData = async (): Promise<void> => {
    setLoading(true);
    try {
      const [coursesRes, modulesRes, lessonsRes, usersRes] = await Promise.all([
        axios.get<ApiResponse<Course>>(`${baseURL}/course/all`),
        axios.get<ApiResponse<Module>>(`${baseURL}/module/all`),
        axios.get<ApiResponse<Lesson>>(`${baseURL}/lesson/all`),
        axios.get<ApiResponse<User>>(`${baseURL}/user/all`),
      ]);

      setCourses(coursesRes.data.data || []);
      setModules(modulesRes.data.data || []);
      setLessons(lessonsRes.data.data || []);
      setUsers(usersRes.data.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Please try again later.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
      </div>
    );
  }
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, {user?.first_name} 👋
        </h1>
        <p className="text-gray-600">
          Explore available courses and start learning.
        </p>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <StatCard
          title="Courses"
          value={courses.length}
          icon={BookOpen}
          color="bg-blue-500"
        />
        <StatCard
          title="Modules"
          value={modules.length}
          icon={Layers}
          color="bg-green-500"
        />
        <StatCard
          title="Lessons"
          value={lessons.length}
          icon={FileText}
          color="bg-purple-500"
        />
        <StatCard
          title="Users"
          value={users.length}
          icon={Users}
          color="bg-orange-500"
        />
      </div>

      {/* Courses Section */}
      <h2 className="text-xl font-semibold mt-8">Available Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
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
    </div>
  );
};

const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
}) => (
  <div className="bg-white rounded-lg shadow p-6 flex justify-between items-center">
    <div>
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
    <div className={`p-3 rounded-full ${color}`}>
      <Icon className="h-6 w-6 text-white" />
    </div>
  </div>
);

export default Dashboard;
