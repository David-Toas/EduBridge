/* eslint-disable @next/next/no-assign-module-variable */
// "use client";

// import React, { useState, useEffect } from "react";
// import { 
//   Book, 
//   Clock, 
//   UserCircle, 
//   FileText,
//   AlertTriangle
// } from "lucide-react";

// interface Course {
//   id: string;
//   title: string;
//   description: string;
//   instructor: string;
//   category: string;
//   subject: string;
// }

// interface Lesson {
//   id: string;
//   moduleId: string;
//   title: string;
//   content: string;
//   resourceUrl: string;
//   duration: string;
// }

// interface Module {
//   id: string;
//   courseId: string;
//   title: string;
//   description: string;
// }

// const SecondaryCoursesPage: React.FC = () => {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [modules, setModules] = useState<Module[]>([]);
//   const [lessons, setLessons] = useState<Lesson[]>([]);
//   const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
//   const [selectedModule, setSelectedModule] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch Secondary Courses
//         const coursesResponse = await fetch(
//           "https://edubridge-uwk9.onrender.com/api/v1/course/secondary"
//         );
        
//         if (!coursesResponse.ok) {
//           throw new Error(`Failed to fetch courses: ${coursesResponse.status}`);
//         }
        
//         const coursesData = await coursesResponse.json();
//         setCourses(Array.isArray(coursesData?.data) ? coursesData.data : []);

//         // Fetch Modules
//         const modulesResponse = await fetch(
//           "https://edubridge-uwk9.onrender.com/api/v1/module/all"
//         );
        
//         if (!modulesResponse.ok) {
//           throw new Error(`Failed to fetch modules: ${modulesResponse.status}`);
//         }
        
//         const modulesData = await modulesResponse.json();
//         setModules(Array.isArray(modulesData?.data) ? modulesData.data : []);

//         // Fetch Lessons
//         const lessonsResponse = await fetch(
//           "https://edubridge-uwk9.onrender.com/api/v1/lesson/all"
//         );
        
//         if (!lessonsResponse.ok) {
//           throw new Error(`Failed to fetch lessons: ${lessonsResponse.status}`);
//         }
        
//         const lessonsData = await lessonsResponse.json();
//         setLessons(Array.isArray(lessonsData?.data) ? lessonsData.data : []);

//         setLoading(false);
//       } catch (err) {
//         const errorMessage = err instanceof Error ? err.message : "Failed to fetch data";
//         setError(errorMessage);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const getCourseLessons = (courseId: string) => {
//     const courseModules = modules.filter((module) => module.courseId === courseId);
//     return lessons.filter((lesson) =>
//       courseModules.some((module) => module.id === lesson.moduleId)
//     );
//   };

//   const getModuleLessons = (moduleId: string) => {
//     return lessons.filter((lesson) => lesson.moduleId === moduleId);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin">
//           <UserCircle size={64} className="text-blue-500" />
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen text-red-500">
//         <div className="text-center">
//           <AlertTriangle size={64} className="mx-auto mb-4" />
//           <p className="text-xl">{error}</p>
//           <p className="text-sm mt-2">Please try again later</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       {/* Courses Sidebar */}
//       <div className="w-1/4 bg-white shadow-lg p-6 border-r overflow-y-auto">
//         <h1 className="text-2xl font-bold mb-6 text-gray-800">Secondary Courses</h1>
//         <div className="space-y-4">
//           {courses.map((course) => (
//             <div 
//               key={course.id}
//               onClick={() => {
//                 setSelectedCourse(course.id);
//                 setSelectedModule(null);
//               }}
//               className={`
//                 cursor-pointer p-4 rounded-lg transition-all duration-300
//                 ${selectedCourse === course.id 
//                   ? 'bg-blue-50 border-blue-500 border' 
//                   : 'hover:bg-gray-100'}
//               `}
//             >
//               <h2 className="font-semibold text-lg text-gray-800">{course.title}</h2>
//               <p className="text-sm text-gray-500 mt-1">{course.instructor}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Modules Section */}
//       <div className="w-1/4 bg-gray-100 p-6 border-r overflow-y-auto">
//         {selectedCourse && (
//           <div>
//             <h2 className="text-xl font-bold mb-4 text-gray-800">Modules</h2>
//             <div className="space-y-3">
//               {modules
//                 .filter((module) => module.courseId === selectedCourse)
//                 .map((module) => (
//                   <div 
//                     key={module.id}
//                     onClick={() => setSelectedModule(module.id)}
//                     className={`
//                       cursor-pointer p-4 rounded-lg transition-all duration-300
//                       ${selectedModule === module.id 
//                         ? 'bg-green-50 border-green-500 border' 
//                         : 'hover:bg-gray-200'}
//                     `}
//                   >
//                     <h3 className="font-semibold text-gray-800">{module.title}</h3>
//                     <p className="text-sm text-gray-500">{module.description}</p>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Lesson Details */}
//       <div className="w-1/2 p-6 overflow-y-auto">
//         {selectedModule && (
//           <div>
//             <h2 className="text-2xl font-bold mb-6 text-gray-800">Lessons</h2>
//             <div className="space-y-4">
//               {getModuleLessons(selectedModule).map((lesson) => (
//                 <div 
//                   key={lesson.id} 
//                   className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all"
//                 >
//                   <div className="flex items-center mb-4">
//                     <Book className="mr-3 text-blue-600" size={24} />
//                     <h3 className="text-lg font-semibold text-gray-800">{lesson.title}</h3>
//                   </div>
//                   <p className="text-gray-600 mb-4">{lesson.content}</p>
//                   <div className="flex justify-between items-center text-sm text-gray-500">
//                     <div className="flex items-center">
//                       <Clock className="mr-2 text-green-600" size={16} />
//                       <span>{lesson.duration || 'Not specified'}</span>
//                     </div>
//                     {lesson.resourceUrl && (
//                       <a 
//                         href={lesson.resourceUrl} 
//                         target="_blank" 
//                         rel="noopener noreferrer"
//                         className="text-blue-600 hover:underline flex items-center"
//                       >
//                         <FileText className="mr-2" size={16} />
//                         View Resources
//                       </a>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {!selectedModule && (
//           <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
//             <UserCircle size={64} className="mb-4 text-gray-300" />
//             <p className="text-xl">Select a course and module to view lessons</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SecondaryCoursesPage;


"use client";

import React, { useState, useEffect } from "react";
import { 
  Book, 
  Clock, 
  FileText,
  AlertTriangle,
  Loader2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import axios from 'axios';

interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  content: string;
  resourceUrl: string;
  duration?: string;
  category: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
}

const SecondaryLessonsPage: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchSecondaryLessons = async () => {
      try {
        const BASE_URL = 'https://edubridge-uwk9.onrender.com/api/v1';

        // Fetch all lessons and modules in parallel
        const [lessonsResponse, modulesResponse] = await Promise.all([
          axios.get(`${BASE_URL}/lesson/all`),
          axios.get(`${BASE_URL}/module/all`)
        ]);

        // Ensure we always have arrays, even if the response structure is different
        const allLessons: Lesson[] = Array.isArray(lessonsResponse.data?.data) 
          ? lessonsResponse.data.data 
          : [];
        
        const allModules: Module[] = Array.isArray(modulesResponse.data?.data) 
          ? modulesResponse.data.data 
          : [];

        // Filter only secondary category lessons
        const secondaryLessons = allLessons.filter(lesson => 
          lesson.category?.toLowerCase() === 'secondary'
        );

        setLessons(secondaryLessons);
        setModules(allModules);
        
        // Automatically select the first lesson on mobile
        if (secondaryLessons.length > 0 && window.innerWidth < 640) {
          setSelectedLesson(secondaryLessons[0]);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : "Failed to fetch lessons");
        setLoading(false);
      }
    };

    fetchSecondaryLessons();

    // Add resize listener to handle sidebar on mobile
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // const getModuleTitle = (moduleId: string) => {
  //   if (!Array.isArray(modules)) return 'Unknown Module';
  //   const module = modules.find(m => m?.id === moduleId);
  //   return module?.title || 'Unknown Module';
  // };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleLessonSelect = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    if (window.innerWidth < 640) {
      setIsMobileSidebarOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <div className="text-center">
          <AlertTriangle size={64} className="mx-auto mb-4" />
          <p className="text-xl">{error}</p>
          <p className="text-sm mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col sm:flex-row relative">
      {/* Mobile Sidebar Toggle */}
      <button
              onClick={toggleMobileSidebar}
              className="sm:hidden fixed top-2 left-2 z-50 bg-white shadow-md p-2 rounded-full"
              aria-label="Toggle Sidebar"
            >
              {isMobileSidebarOpen ? (
                <ChevronLeft size={24} />
              ) : (
                <ChevronRight size={24} />
              )}
            </button>

      {/* Lessons Sidebar - Mobile & Desktop */}
      <div className={`
        fixed inset-0 z-40 w-full sm:w-1/3 bg-white shadow-lg p-6 
        border-r overflow-y-auto transform transition-transform duration-300
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        sm:translate-x-0 sm:relative sm:block
      `}>
        <h1 className="text-2xl font-bold mb-6 text-gray-800 flex items-center justify-center">Secondary Lessons</h1>
        {lessons.length === 0 ? (
          <p className="text-gray-500">No secondary lessons available.</p>
        ) : (
          <div className="space-y-4">
            {lessons.map((lesson) => (
              <div 
                key={lesson.id}
                onClick={() => handleLessonSelect(lesson)}
                className={`
                  cursor-pointer p-4 rounded-lg transition-all duration-300
                  ${selectedLesson?.id === lesson.id 
                    ? 'bg-blue-50 border-blue-500 border' 
                    : 'hover:bg-gray-100'}
                `}
              >
                <h2 className="font-semibold text-lg text-gray-800">{lesson.title}</h2>
                {/* <p className="text-sm text-gray-500 mt-1">
                  {getModuleTitle(lesson.moduleId)}
                </p> */}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lesson Details - Mobile & Desktop */}
      <div className={`
        w-full sm:w-2/3 p-4 sm:p-6 overflow-y-auto 
        ${isMobileSidebarOpen ? 'hidden sm:block' : 'block'}
      `}>
        {selectedLesson ? (
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
            <div className="flex items-center mb-6">
              <Book className="mr-4 text-blue-600" size={32} />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedLesson.title}</h2>
                {/* <p className="text-gray-500 text-sm">
                  Module: {getModuleTitle(selectedLesson.moduleId)}
                </p> */}
              </div>
            </div>
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6 text-base leading-relaxed">
                {selectedLesson.content}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-500 mt-8 space-y-4 sm:space-y-0">
              <div className="flex items-center">
                <Clock className="mr-2 text-green-600" size={20} />
                <span className="text-base">
                  Duration: {selectedLesson.duration || 'Not specified'}
                </span>
              </div>
              {selectedLesson.resourceUrl && (
                <a 
                  href={selectedLesson.resourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center text-base"
                >
                  <FileText className="mr-2" size={20} />
                  View Resources
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <Book size={64} className="mb-4 text-gray-300" />
            <p className="text-xl">Select a lesson to view details</p>
            {lessons.length > 0 && (
              <p className="text-sm mt-2">{lessons.length} lessons available</p>
            )}
          </div>
        )}
      </div>

      {/* Mobile Overlay when Sidebar is Open */}
      {isMobileSidebarOpen && (
        <div 
          onClick={toggleMobileSidebar}
          className="fixed inset-0 z-30 bg-black bg-opacity-50 sm:hidden"
        />
      )}
    </div>
  );
};

export default SecondaryLessonsPage;