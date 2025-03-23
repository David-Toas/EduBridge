"use client";

import React, { useEffect, useState } from "react";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  subject: string;
}

const Page = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const url =
  "https://edubridge-uwk9.onrender.com/api/v1/course/all?category=curriculum";

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (Array.isArray(data)) {
        setCourses(data);
      } else if (data.data && Array.isArray(data.data)) {
        setCourses(data.data);
      } else if (data.courses && Array.isArray(data.courses)) {
        setCourses(data.courses);
      } else {
        console.error("Unexpected API response format:", data);
        setCourses([]);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Curriculum Courses</h1>

      {courses.length === 0 ? (
        <p className="text-gray-500">No courses found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="border rounded-lg overflow-hidden shadow-lg"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="text-sm">
                  <p className="mb-1">
                    <span className="font-medium">Instructor:</span>{" "}
                    {course.instructor}
                  </p>
                  <p className="mb-1">
                    <span className="font-medium">Category:</span>{" "}
                    {course.category}
                  </p>
                  <p className="mb-1">
                    <span className="font-medium">Subject:</span>{" "}
                    {course.subject}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
