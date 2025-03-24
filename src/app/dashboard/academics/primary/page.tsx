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

interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  content: string;
  resourceUrl: string;
  duration: string;
}

interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
}

const Page = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
    fetchModules();
    fetchLessons();
  }, []);

  const fetchCourses = async () => {
    try {
      const url = "https://edubridge-uwk9.onrender.com/api/v1/course/all?category=primary";
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      setCourses(Array.isArray(data?.data) ? data.data : []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to fetch courses");
    }
  };

  const fetchModules = async () => {
    try {
      const response = await fetch("https://edubridge-uwk9.onrender.com/api/v1/module/all");
      if (!response.ok) throw new Error("Failed to fetch modules");
      
      const data = await response.json();
      setModules(Array.isArray(data?.data) ? data.data : []);
    } catch (err) {
      console.error("Error fetching modules:", err);
    }
  };

  const fetchLessons = async () => {
    try {
      const response = await fetch("https://edubridge-uwk9.onrender.com/api/v1/lesson/all");
      if (!response.ok) throw new Error("Failed to fetch lessons");
      
      const data = await response.json();
      setLessons(Array.isArray(data?.data) ? data.data : []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching lessons:", err);
      setLoading(false);
    }
  };

  const getCourseLessons = (courseId: string) => {
    // Get modules for this course
    const courseModules = modules.filter(module => module.courseId === courseId);
    
    // Get lessons for these modules
    return lessons.filter(lesson => 
      courseModules.some(module => module.id === lesson.moduleId)
    );
  };

  const toggleCourseExpand = (courseId: string) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      Loading...
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen text-red-500">
      Error: {error}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Primary Courses</h1>

      {courses.length === 0 ? (
        <p className="text-gray-500">No courses found.</p>
      ) : (
        <div className="space-y-6">
          {courses.map((course) => {
            const courseLessons = getCourseLessons(course.id);
            const hasLessons = courseLessons.length > 0;
            
            return (
              <div key={course.id} className="border rounded-lg overflow-hidden shadow-lg">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                      <p className="text-gray-600 mb-4">{course.description}</p>
                      <div className="text-sm">
                        <p className="mb-1">
                          <span className="font-medium">Instructor:</span> {course.instructor}
                        </p>
                        <p className="mb-1">
                          <span className="font-medium">Category:</span> {course.category}
                        </p>
                        <p className="mb-1">
                          <span className="font-medium">Subject:</span> {course.subject}
                        </p>
                      </div>
                    </div>
                    {hasLessons && (
                      <button
                        onClick={() => toggleCourseExpand(course.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        {expandedCourse === course.id ? 'Hide Lessons' : 'Show Lessons'}
                      </button>
                    )}
                  </div>

                  {expandedCourse === course.id && hasLessons && (
                    <div className="mt-4 border-t pt-4">
                      <h3 className="text-lg font-medium mb-3">Lessons</h3>
                      <div className="space-y-3">
                        {courseLessons.map((lesson) => (
                          <div key={lesson.id} className="bg-gray-50 p-3 rounded">
                            <h4 className="font-medium">{lesson.title}</h4>
                            <p className="text-sm text-gray-600 line-clamp-2">{lesson.content}</p>
                            <div className="flex justify-between items-center mt-2 text-xs">
                              <span>Duration: {lesson.duration}</span>
                              {lesson.resourceUrl && (
                                <a 
                                  href={lesson.resourceUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline"
                                >
                                  View Resources
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Page;