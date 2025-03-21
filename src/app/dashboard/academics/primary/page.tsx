// /* eslint-disable @next/next/no-img-element */
// "use client";

// import React, { useState, useEffect } from "react";

// const CoursesPage = () => {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   interface Lesson {
//     id: number;
//     title: string;
//     description: string;
//     media_url?: string;
//   }
  
//   interface Course {
//     id: number;
//     name: string;
//   }
  
//   const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
//   const [lessons, setLessons] = useState<Lesson[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchCourses();
//   }, []);


//   // const response = await fetch("https://edubridge-uwk9.onrender.com/api/v1/course/all?category=primary");

  
//   const fetchCourses = async () => {
//     setLoading(true);
//     try {
//       // const response = await fetch("https://open.tertiary.africa/api/v1/courses");
//       const response = await fetch("https://edubridge-uwk9.onrender.com/api/v1/course/all");

//       const data = await response.json();
//       setCourses(data);
//       setFilteredCourses(data);
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//     }
//     setLoading(false);
//   };

//   const handleCourseSelect = async (course: Course) => {
//     setSelectedCourse(course);
//     setLoading(true);
//     try {
//       const response = await fetch(`https://open.tertiary.africa/api/v1/courses/${course.id}/modules`);
//       const data = await response.json();
//       setLessons(data); // Assuming lessons are inside modules
//     } catch (error) {
//       console.error("Error fetching lessons:", error);
//     }
//     setLoading(false);
//   };

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);
//     const filtered = courses.filter((course: Course) => 
//       course.name.toLowerCase().includes(query)
//     );
//     setFilteredCourses(filtered);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
//       <h1 className="text-2xl font-bold text-center mb-6">Explore African Courses</h1>

//       {/* Search Bar for Courses */}
//       <div className="mb-4">
//         <label className="block text-gray-400 text-sm mb-1">Search Courses</label>
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={handleSearch}
//           placeholder="Type to search..."
//           className="w-full p-2 bg-gray-800 text-white rounded"
//         />
//       </div>

//       {/* Course Selection */}
//       <div className="mb-4">
//         <label className="block text-gray-400 text-sm mb-1">Select Course</label>
//         <select
//           onChange={(e) => handleCourseSelect(JSON.parse(e.target.value))}
//           className="w-full p-2 bg-gray-800 text-white rounded"
//         >
//           <option value="">-- Select a Course --</option>
//           {filteredCourses.map((course) => (
//             <option key={course.id} value={JSON.stringify(course)}>
//               {course.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Lessons Display */}
//       {selectedCourse && (
//         <div className="mt-6">
//           <h2 className="text-xl font-bold">{selectedCourse.name} Lessons</h2>
//           {loading ? (
//             <p className="text-gray-400">Loading lessons...</p>
//           ) : lessons.length > 0 ? (
//             <ul className="mt-4 space-y-4">
//               {lessons.map((lesson) => (
//                 <li key={lesson.id} className="bg-gray-800 p-4 rounded-lg flex flex-col items-center">
//                   {/* Display Image or Video */}
//                   {lesson.media_url ? (
//                     lesson.media_url.endsWith(".mp4") ? (
//                       <video controls className="w-full rounded-md">
//                         <source src={lesson.media_url} type="video/mp4" />
//                         Your browser does not support the video tag.
//                       </video>
//                     ) : (
//                       <img src={lesson.media_url} alt="Lesson" className="w-full h-40 object-cover rounded-md" />
//                     )
//                   ) : (
//                     <div className="w-full h-40 bg-gray-700 flex items-center justify-center text-gray-400 rounded-md">
//                       No media available
//                     </div>
//                   )}

//                   {/* Lesson Details */}
//                   <h3 className="font-semibold mt-3">{lesson.title}</h3>
//                   <p className="text-gray-400 text-sm text-center">{lesson.description}</p>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-400">No lessons available for this course.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CoursesPage;


"use client"

import React, { useEffect, useState } from 'react';

interface Course {
  id: number;
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
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://edubridge-uwk9.onrender.com/api/v1/course/all');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCourses(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Courses</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <p><strong>Instructor:</strong> {course.instructor}</p>
            <p><strong>Category:</strong> {course.category}</p>
            <p><strong>Subject:</strong> {course.subject}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
