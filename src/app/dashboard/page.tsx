/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BookOpen, Users, Layers, FileText, Calendar } from "lucide-react";

const Dashboard = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const baseURL = "https://edubridge-uwk9.onrender.com/api/v1";

  useEffect(() => {
    fetchUserData();
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedSubject || selectedCategory) {
      fetchFilteredCourses();
    }
  }, [selectedSubject, selectedCategory]);

  interface Course {
    id: string;
    title: string;
    description: string;
    instructor: string;
    category: string;
    subject: string;
  }

  interface Module {
    id: string;
    courseId: string;
    title: string;
    description: string;
  }

  interface Lesson {
    id: string;
    moduleId: string;
    title: string;
    content: string;
    resourceUrl: string;
    duration: string;
  }

  interface Enrollment {
    id: string;
    courseId: string;
    userId: string;
    enrollment_date: string;
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
      // setUser(response.data.data);
      setUser(response.data.data || {});
      console.log("Raw user data:", response.data);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to fetch user data.");
    }
  };
  
  const fetchFilteredCourses = async () => {
    try {
      const url = `${baseURL}/course/all`;
      const params: Record<string, string> = {};
      
      if (selectedSubject) {
        params.subject = selectedSubject;
      }
      if (selectedCategory) {
        params.category = selectedCategory;
      }
      
      const response = await axios.get<ApiResponse<Course>>(url, { params });
      setCourses(response.data.data || []);
    } catch (err) {
      console.error("Error fetching filtered courses:", err);
    }
  };

  const fetchCoursesBySubject = async () => {
    try {
      // Based on the Postman collection, there's a "Courses by subject group" endpoint
      const response = await axios.get<ApiResponse<Record<string, Course[]>>>(`${baseURL}/course/by-subject`);
      
      // The response format might be different, adjust as needed
      const subjectGroups = response.data.data || {};
      return subjectGroups;
    } catch (err) {
      console.error("Error fetching courses by subject:", err);
      return {};
    }
  };

  const fetchData = async (): Promise<void> => {
    setLoading(true);
    try {
      // Using Promise.allSettled to prevent one failed request from blocking others
      const results = await Promise.allSettled([
        axios.get<ApiResponse<Course>>(`${baseURL}/course/all`),
        axios.get<ApiResponse<Module>>(`${baseURL}/module/all`),
        axios.get<ApiResponse<Lesson>>(`${baseURL}/lesson/all`),
        axios.get<ApiResponse<User>>(`${baseURL}/user/all`),
        axios.get<ApiResponse<Enrollment>>(`${baseURL}/enrollment/all`),
      ]);
      
      // Process the results safely
      if (results[0].status === 'fulfilled') {
        console.log("Courses response:", results[0].value);
        setCourses(Array.isArray(results[0].value.data) ? results[0].value.data : 
                   (Array.isArray(results[0].value.data.data) ? results[0].value.data.data : []));
      }
      
      if (results[1].status === 'fulfilled') {
        setModules(results[1].value.data.data || []);
      }
      
      if (results[2].status === 'fulfilled') {
        setLessons(results[2].value.data.data || []);
      }
      
      if (results[3].status === 'fulfilled') {
        setUsers(results[3].value.data.data || []);
      }
      
      if (results[4].status === 'fulfilled') {
        setEnrollments(results[4].value.data.data || []);
      }
      
      // Load subject-grouped courses if needed
      const subjectGroups = await fetchCoursesBySubject();
      
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Please try again later.");
      setLoading(false);
    }
  };

  // Get user's enrolled courses
  const getUserEnrollments = () => {
    if (!user) return [];
    return enrollments.filter(enrollment => enrollment.userId === user.id);
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const resetFilters = () => {
    setSelectedSubject("");
    setSelectedCategory("");
    fetchData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
      </div>
    );
  }
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  const userEnrollments = getUserEnrollments();
  
  // Get unique subjects from courses for the filter dropdown
  const uniqueSubjects = Array.from(new Set(courses.map(course => course.subject))).filter(Boolean);
  
  // Get unique categories from courses for the filter dropdown
  const uniqueCategories = Array.from(new Set(courses.map(course => course.category))).filter(Boolean);

  return (
    <div className="p-6 bg-gray-100 min-h-full rounded-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
        Welcome, {user && user.first_name ? user.first_name : "User"} 👋
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

      {/* Filters Section */}
      <div className="mt-8 bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Filter Courses</h2>
        <div className="flex flex-wrap gap-4">
          <div className="w-full md:w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <select
              value={selectedSubject}
              onChange={handleSubjectChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">All Subjects</option>
              {uniqueSubjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">All Categories</option>
              {uniqueCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/4 flex items-end">
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* My Enrollments Section */}
      {user && userEnrollments.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold">My Enrollments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {userEnrollments.map((enrollment) => {
              const course = courses.find(c => c.id === enrollment.courseId);
              return course ? (
                <div key={enrollment.id} className="p-4 bg-white rounded-lg shadow-md border-l-4 border-blue-500">
                  <h3 className="text-lg font-medium text-gray-800">{course.title}</h3>
                  <p className="text-gray-600 text-sm">{course.description}</p>
                  <p className="text-gray-500 text-xs mt-2">Enrolled: {new Date(enrollment.enrollment_date).toLocaleDateString()}</p>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}

      {/* Courses Section */}
      <h2 className="text-xl font-semibold mt-8">Available Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {courses.map((course) => (
          <div key={course.id} className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-800">
              {course.title}
            </h3>
            <p className="text-gray-600 text-sm">{course.description}</p>
            <div className="flex justify-between mt-2">
              <p className="text-gray-500 text-xs">
                Instructor: {course.instructor}
              </p>
              <div className="flex gap-2">
                {course.subject && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">{course.subject}</span>
                )}
                {course.category && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">{course.category}</span>
                )}
              </div>
            </div>
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