"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen, Clock, FileText } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  subject: string;
  resourceUrl?: string;
  duration?: string;
}

const ExamPrep = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const baseURL = "https://edubridge-uwk9.onrender.com/api/v1";

  useEffect(() => {
    const fetchExamPrepCourses = async () => {
      try {
        const response = await axios.get(`${baseURL}/course/exam-prep`);
        
        // Handle different possible response structures
        const responseData = response.data?.data || response.data;
        const coursesData = Array.isArray(responseData) ? responseData : [];
        
        setCourses(coursesData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching exam prep courses:", err);
        setError("Failed to load exam preparation courses. Please try again later.");
        setLoading(false);
      }
    };

    fetchExamPrepCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-gray-600">Loading Exam Preparation Courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-500">
        <p className="text-lg mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Exam Preparation Courses</h1>
        <p className="text-gray-600">
          Prepare for your exams with our comprehensive study materials and resources.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Courses"
          value={courses.length}
          icon={BookOpen}
          color="bg-blue-500"
        />
        <StatCard
          title="Subjects Covered"
          value={new Set(courses.map(course => course.subject)).size}
          icon={FileText}
          color="bg-green-500"
        />
        {courses.some(course => course.duration) && (
          <StatCard
            title="Average Duration"
            value={`${Math.round(
              courses.reduce((acc, course) => acc + (parseInt(course.duration || '0')), 0) / 
              courses.filter(course => course.duration).length
            )} hrs`}
            icon={Clock}
            color="bg-purple-500"
          />
        )}
      </div>

      {courses.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">No exam preparation courses available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">{course.title}</h2>
                <p className="text-gray-600 mb-4">{course.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {course.subject}
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {course.category}
                  </span>
                  {course.duration && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                      {course.duration} hours
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    Instructor: <span className="font-medium">{course.instructor}</span>
                  </p>
                  {course.resourceUrl && (
                    <a
                      href={course.resourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Resources
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
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
  value: string | number;
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

export default ExamPrep;