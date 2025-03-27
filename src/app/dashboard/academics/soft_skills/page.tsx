"use client";

import React, { useState, useEffect } from "react";
import { 
  Book, 
  Clock, 
  UserCircle, 
  FileText,
  AlertTriangle,
  Menu,
  X
} from "lucide-react";

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

const SecondaryCoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Soft Skills Courses
        const coursesResponse = await fetch(
          "https://edubridge-uwk9.onrender.com/api/v1/course/soft-skills"
        );
        
        if (!coursesResponse.ok) {
          throw new Error(`Failed to fetch courses: ${coursesResponse.status}`);
        }
        
        const coursesData = await coursesResponse.json();
        setCourses(Array.isArray(coursesData?.data) ? coursesData.data : []);

        // Fetch Modules
        const modulesResponse = await fetch(
          "https://edubridge-uwk9.onrender.com/api/v1/module/all"
        );
        
        if (!modulesResponse.ok) {
          throw new Error(`Failed to fetch modules: ${modulesResponse.status}`);
        }
        
        const modulesData = await modulesResponse.json();
        setModules(Array.isArray(modulesData?.data) ? modulesData.data : []);

        // Fetch Lessons
        const lessonsResponse = await fetch(
          "https://edubridge-uwk9.onrender.com/api/v1/lesson/all"
        );
        
        if (!lessonsResponse.ok) {
          throw new Error(`Failed to fetch lessons: ${lessonsResponse.status}`);
        }
        
        const lessonsData = await lessonsResponse.json();
        setLessons(Array.isArray(lessonsData?.data) ? lessonsData.data : []);

        setLoading(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch data";
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getModuleLessons = (moduleId: string) => {
    return lessons.filter((lesson) => lesson.moduleId === moduleId);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const selectCourseAndCloseMenu = (courseId: string) => {
    setSelectedCourse(courseId);
    setSelectedModule(null);
    setIsMobileMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="animate-pulse">
          <UserCircle size={64} className="text-blue-500" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-50 text-red-600">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <AlertTriangle size={64} className="mx-auto mb-4 text-red-500" />
          <p className="text-2xl font-bold mb-2">Oops! Something went wrong</p>
          <p className="text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile Navigation */}
      <div className="lg:hidden bg-white shadow-md p-4 flex justify-between items-center z-50">
        <h1 className="text-2xl font-bold text-gray-800">Soft Skills Courses</h1>
        <button 
          onClick={toggleMobileMenu}
          className="text-blue-600 hover:text-blue-800"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Overlay Menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMobileMenu}
        >
          <div 
            className="w-3/4 bg-white h-full p-6 overflow-y-auto shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Courses</h2>
            <div className="space-y-4">
              {courses.map((course) => (
                <div 
                  key={course.id}
                  onClick={() => selectCourseAndCloseMenu(course.id)}
                  className="cursor-pointer p-4 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <h3 className="font-semibold text-lg text-gray-800">{course.title}</h3>
                  <p className="text-sm text-gray-500">{course.instructor}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Courses Sidebar (Desktop) */}
        <div className="hidden lg:block w-1/4 bg-white border-r overflow-y-auto">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Soft Skills</h1>
            <div className="space-y-4">
              {courses.map((course) => (
                <div 
                  key={course.id}
                  onClick={() => setSelectedCourse(course.id)}
                  className={`
                    cursor-pointer p-4 rounded-lg transition-all duration-300
                    ${selectedCourse === course.id 
                      ? 'bg-blue-50 border-blue-500 border' 
                      : 'hover:bg-gray-100'}
                    group
                  `}
                >
                  <h2 className={`
                    font-semibold text-lg 
                    ${selectedCourse === course.id ? 'text-blue-600' : 'text-gray-800'}
                    group-hover:text-blue-600
                  `}>{course.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">{course.instructor}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modules Section */}
        <div className="w-full lg:w-1/4 bg-gray-100 border-r overflow-y-auto">
          {selectedCourse && (
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Modules</h2>
              <div className="space-y-3">
                {modules
                  .filter((module) => module.courseId === selectedCourse)
                  .map((module) => (
                    <div 
                      key={module.id}
                      onClick={() => setSelectedModule(module.id)}
                      className={`
                        cursor-pointer p-4 rounded-lg transition-all duration-300
                        ${selectedModule === module.id 
                          ? 'bg-green-50 border-green-500 border' 
                          : 'hover:bg-gray-200'}
                        group
                      `}
                    >
                      <h3 className={`
                        font-semibold 
                        ${selectedModule === module.id ? 'text-green-600' : 'text-gray-800'}
                        group-hover:text-green-600
                      `}>{module.title}</h3>
                      <p className="text-sm text-gray-500">{module.description}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {!selectedCourse && (
            <div className="flex items-center justify-center h-full text-center p-6">
              <p className="text-gray-500">Select a course to view modules</p>
            </div>
          )}
        </div>

        {/* Lesson Details */}
        <div className="flex-1 overflow-y-auto p-6">
          {selectedModule && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Lessons</h2>
              <div className="space-y-4">
                {getModuleLessons(selectedModule).map((lesson) => (
                  <div 
                    key={lesson.id} 
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6"
                  >
                    <div className="flex items-center mb-4">
                      <Book className="mr-3 text-blue-600" size={24} />
                      <h3 className="text-lg font-semibold text-gray-800">{lesson.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{lesson.content}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="mr-2 text-green-600" size={16} />
                        <span>{lesson.duration || 'Not specified'}</span>
                      </div>
                      {lesson.resourceUrl && (
                        <a 
                          href={lesson.resourceUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center"
                        >
                          <FileText className="mr-2" size={16} />
                          View Resources
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!selectedModule && (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
              <UserCircle size={64} className="mb-4 text-gray-300" />
              <p className="text-xl">Select a course and module to view lessons</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecondaryCoursesPage;