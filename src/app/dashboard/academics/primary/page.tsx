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

// const PrimaryCoursesPage: React.FC = () => {
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
//         // Fetch Primary Courses
//         const coursesResponse = await fetch(
//           "https://edubridge-uwk9.onrender.com/api/v1/course/primary"
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
//         <h1 className="text-2xl font-bold mb-6 text-gray-800">Primary Courses</h1>
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

// export default PrimaryCoursesPage;



"use client";

import React, { useState, useEffect } from "react";
import { 
  Book, 
  Clock, 
  UserCircle, 
  FileText,
  AlertTriangle
} from "lucide-react";
import axios from 'axios';

interface Lesson {
  id: string;
  title: string;
  content: string;
  resourceUrl: string;
  duration: string;
  category: string;
}

const PrimaryLessonsPage: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrimaryLessons = async () => {
      try {
        const BASE_URL = 'https://edubridge-uwk9.onrender.com/api/v1';

        // Fetch All Lessons
        const lessonsResponse = await axios.get(`${BASE_URL}/lesson/all`);
        const allLessons: Lesson[] = lessonsResponse.data.data;

        // Filter only primary category lessons
        const primaryLessons = allLessons.filter(lesson => 
          lesson.category === 'primary'
        );

        setLessons(primaryLessons);
        setLoading(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch lessons";
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchPrimaryLessons();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin">
          <UserCircle size={64} className="text-blue-500" />
        </div>
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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Lessons Sidebar */}
      <div className="w-1/3 bg-white shadow-lg p-6 border-r overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Primary Courses</h1>
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <div 
              key={lesson.id}
              onClick={() => setSelectedLesson(lesson)}
              className={`
                cursor-pointer p-4 rounded-lg transition-all duration-300
                ${selectedLesson?.id === lesson.id 
                  ? 'bg-blue-50 border-blue-500 border' 
                  : 'hover:bg-gray-100'}
              `}
            >
              <h2 className="font-semibold text-lg text-gray-800">{lesson.title}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Lesson Details */}
      <div className="w-2/3 p-6 overflow-y-auto">
        {selectedLesson ? (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center mb-6">
              <Book className="mr-4 text-blue-600" size={32} />
              <h2 className="text-2xl font-bold text-gray-800">{selectedLesson.title}</h2>
            </div>
            <p className="text-gray-600 mb-6 text-base leading-relaxed">
              {selectedLesson.content}
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500">
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
            <UserCircle size={64} className="mb-4 text-gray-300" />
            <p className="text-xl">Select a lesson to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrimaryLessonsPage;