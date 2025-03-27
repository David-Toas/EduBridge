// import React, { useState } from 'react';
// import { Edit, Trash2 } from "lucide-react";
// import axios from "axios";

// interface Course {
//   id: string;
//   title: string;
//   description: string;
//   instructor: string;
//   category: string;
//   subject: string;
// }

// interface CoursesTabProps {
//   courses: Course[];
//   fetchData: () => void;
//   showNotification: (message: string, type: "success" | "error") => void;
//   baseURL: string;
// }

// const CoursesTab = ({ courses, fetchData, showNotification, baseURL }: CoursesTabProps) => {
//   const [courseForm, setCourseForm] = useState({
//     title: "",
//     description: "",
//     instructor: "",
//     category: "",
//     subject: "",
//   });

//   const handleCourseSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const token: string | null = localStorage.getItem("token");
//       // Simplify the subject field in case it's too long
//       const simplifiedForm = {
//         ...courseForm,
//         subject:
//           courseForm.subject.length > 50
//             ? courseForm.subject.substring(0, 50)
//             : courseForm.subject,
//       };
//       await axios({
//         method: "post",
//         url: `${baseURL}/course/create`,
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         data: simplifiedForm,
//       });

//       // Reset form and reload data
//       setCourseForm({
//         title: "",
//         description: "",
//         instructor: "",
//         category: "",
//         subject: "",
//       });
//       showNotification("Course created successfully!", "success");
//       fetchData();
//     } catch (err: unknown) {
//       if (axios.isAxiosError(err)) {
//         console.error("Full error details:", err);
//         // Provide more context in the notification
//         const status = err.response?.status;
//         let errorMsg = "Unknown error occurred";
//         if (status === 401 || status === 403) {
//           errorMsg = "Permission denied. Your account may not have rights to create courses.";
//         } else if (status === 500) {
//           errorMsg = "Server error. The API might expect a different data format.";
//         }
//         showNotification(errorMsg, "error");
//       } else {
//         console.error("Error creating course:", err);
//         showNotification("Failed to create course.", "error");
//       }
//     }
//   };

//   const handleDeleteCourse = async (courseId: string) => {
//     if (!window.confirm("Are you sure you want to delete this course?")) return;

//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`${baseURL}/course/${courseId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       showNotification("Course deleted successfully!", "success");
//       fetchData();
//     } catch (err) {
//       console.error("Error deleting course:", err);
//       showNotification("Failed to delete course.", "error");
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-lg font-semibold mb-4">Create New Course</h2>
//       <form
//         onSubmit={handleCourseSubmit}
//         className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
//       >
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Title
//           </label>
//           <input
//             type="text"
//             className="w-full p-2 border border-gray-300 rounded-md"
//             value={courseForm.title}
//             onChange={(e) =>
//               setCourseForm({ ...courseForm, title: e.target.value })
//             }
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Instructor
//           </label>
//           <input
//             type="text"
//             className="w-full p-2 border border-gray-300 rounded-md"
//             value={courseForm.instructor}
//             onChange={(e) =>
//               setCourseForm({
//                 ...courseForm,
//                 instructor: e.target.value,
//               })
//             }
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Category
//           </label>
//           <input
//             type="text"
//             className="w-full p-2 border border-gray-300 rounded-md"
//             value={courseForm.category}
//             onChange={(e) =>
//               setCourseForm({ ...courseForm, category: e.target.value })
//             }
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Subject
//           </label>
//           <input
//             type="text"
//             className="w-full p-2 border border-gray-300 rounded-md"
//             value={courseForm.subject}
//             onChange={(e) =>
//               setCourseForm({ ...courseForm, subject: e.target.value })
//             }
//             required
//           />
//         </div>
//         <div className="md:col-span-2">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Description
//           </label>
//           <textarea
//             className="w-full p-2 border border-gray-300 rounded-md"
//             value={courseForm.description}
//             onChange={(e) =>
//               setCourseForm({
//                 ...courseForm,
//                 description: e.target.value,
//               })
//             }
//             rows={3}
//             required
//           />
//         </div>
//         <div className="md:col-span-2">
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             Create Course
//           </button>
//         </div>
//       </form>
//       <h2 className="text-lg font-semibold mb-4">Existing Courses</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b text-left">Title</th>
//               <th className="py-2 px-4 border-b text-left">Instructor</th>
//               <th className="py-2 px-4 border-b text-left">Category</th>
//               <th className="py-2 px-4 border-b text-left">Subject</th>
//               <th className="py-2 px-4 border-b text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {courses.map((course) => (
//               <tr key={course.id} className="hover:bg-gray-50">
//                 <td className="py-2 px-4 border-b">{course.title}</td>
//                 <td className="py-2 px-4 border-b">{course.instructor}</td>
//                 <td className="py-2 px-4 border-b">{course.category}</td>
//                 <td className="py-2 px-4 border-b">{course.subject}</td>
//                 <td className="py-2 px-4 border-b">
//                   <div className="flex space-x-2">
//                     <button className="text-blue-600 hover:text-blue-800">
//                       <Edit className="h-4 w-4" />
//                     </button>
//                     <button
//                       className="text-red-600 hover:text-red-800"
//                       onClick={() => handleDeleteCourse(course.id)}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CoursesTab;

// import React, { useState, useEffect } from 'react';
// import { Edit, Trash2, Search } from "lucide-react";
// import axios from "axios";

// interface Course {
//   id: string;
//   title: string;
//   description: string;
//   instructor: string;
//   category: string;
//   subject: string;
// }

// interface CoursesTabProps {
//   baseURL: string;
//   showNotification: (message: string, type: "success" | "error") => void;
// }

// const CoursesTab: React.FC<CoursesTabProps> = ({ baseURL, showNotification }) => {
//   // State for courses and form
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(false);

//   // Ensure courses is always an array
//   const safeCourses = Array.isArray(courses) ? courses : [];
//   const [courseForm, setCourseForm] = useState({
//     title: "",
//     description: "",
//     instructor: "",
//     category: "",
//     subject: "",
//   });

//   // State for filtering and searching
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterCategory, setFilterCategory] = useState("");

//   // Fetch courses method
//   const fetchCourses = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(`${baseURL}/course/all`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         params: {
//           search: searchTerm || undefined,
//           category: filterCategory || undefined,
//         },
//       });

//       setCourses(response.data);
//     } catch (err) {
//       console.error("Error fetching courses:", err);
//       showNotification("Failed to fetch courses", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Trigger fetch when search or filter changes
//   useEffect(() => {
//     fetchCourses();
//   }, [searchTerm, filterCategory]);

//   // Course creation method
//   const handleCourseSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");

//       // Validate and simplify form data
//       const simplifiedForm = {
//         ...courseForm,
//         subject: courseForm.subject.length > 50
//           ? courseForm.subject.substring(0, 50)
//           : courseForm.subject,
//       };

//       await axios.post(`${baseURL}/course/create`, simplifiedForm, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       // Reset form and refresh courses
//       setCourseForm({
//         title: "",
//         description: "",
//         instructor: "",
//         category: "",
//         subject: "",
//       });
//       showNotification("Course created successfully!", "success");
//       fetchCourses();
//     } catch (err: unknown) {
//       if (axios.isAxiosError(err)) {
//         console.error("Full error details:", err);
//         const status = err.response?.status;
//         let errorMsg = "Unknown error occurred";

//         if (status === 401 || status === 403) {
//           errorMsg = "Permission denied. Check your authentication.";
//         } else if (status === 500) {
//           errorMsg = "Server error. Please try again later.";
//         }

//         showNotification(errorMsg, "error");
//       } else {
//         showNotification("Failed to create course", "error");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete course method
//   const handleDeleteCourse = async (courseId: string) => {
//     if (!window.confirm("Are you sure you want to delete this course?")) return;

//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`${baseURL}/course/${courseId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       showNotification("Course deleted successfully!", "success");
//       fetchCourses();
//     } catch (err) {
//       console.error("Error deleting course:", err);
//       showNotification("Failed to delete course", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Categories for dropdown
//   const categories = [
//     "primary",
//     "secondary",
//     "soft_skill",
//     "exam_prep"
//   ];

//   return (
//     <div className="p-4">
//       {/* Search and Filter Section */}
//       <div className="mb-4 flex space-x-2">
//         <div className="relative flex-grow">
//           <input
//             type="text"
//             placeholder="Search courses..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full p-2 pl-8 border border-gray-300 rounded-md"
//           />
//           <Search className="absolute left-2 top-3 text-gray-400 h-5 w-5" />
//         </div>
//         <select
//           value={filterCategory}
//           onChange={(e) => setFilterCategory(e.target.value)}
//           className="p-2 border border-gray-300 rounded-md"
//         >
//           <option value="">All Categories</option>
//           {categories.map((cat) => (
//             <option key={cat} value={cat}>{cat}</option>
//           ))}
//         </select>
//       </div>

//       {/* Course Creation Form */}
//       <h2 className="text-lg font-semibold mb-4">Create New Course</h2>
//       <form
//         onSubmit={handleCourseSubmit}
//         className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
//       >
//         {/* Form inputs remain the same as in previous implementation */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Title
//           </label>
//           <input
//             type="text"
//             className="w-full p-2 border border-gray-300 rounded-md"
//             value={courseForm.title}
//             onChange={(e) =>
//               setCourseForm({ ...courseForm, title: e.target.value })
//             }
//             required
//           />
//         </div>
//         {/* ... other form inputs ... */}
//         <div className="md:col-span-2">
//           <button
//             type="submit"
//             disabled={loading}
//             className={`px-4 py-2 text-white rounded-md ${
//               loading
//                 ? 'bg-blue-400 cursor-not-allowed'
//                 : 'bg-blue-600 hover:bg-blue-700'
//             }`}
//           >
//             {loading ? 'Creating...' : 'Create Course'}
//           </button>
//         </div>
//       </form>

//       {/* Courses List */}
//       <h2 className="text-lg font-semibold mb-4">
//         Existing Courses
//         {filterCategory && ` (${filterCategory} category)`}
//         {searchTerm && ` (Searching: ${searchTerm})`}
//       </h2>

//       {loading ? (
//         <div className="text-center py-4">Loading courses...</div>
//       ) : courses.length === 0 ? (
//         <div className="text-center py-4">No courses found</div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200">
//             <thead>
//               <tr>
//                 <th className="py-2 px-4 border-b text-left">Title</th>
//                 <th className="py-2 px-4 border-b text-left">Instructor</th>
//                 <th className="py-2 px-4 border-b text-left">Category</th>
//                 <th className="py-2 px-4 border-b text-left">Subject</th>
//                 <th className="py-2 px-4 border-b text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {courses.map((course) => (
//                 <tr key={course.id} className="hover:bg-gray-50">
//                   <td className="py-2 px-4 border-b">{course.title}</td>
//                   <td className="py-2 px-4 border-b">{course.instructor}</td>
//                   <td className="py-2 px-4 border-b">{course.category}</td>
//                   <td className="py-2 px-4 border-b">{course.subject}</td>
//                   <td className="py-2 px-4 border-b">
//                     <div className="flex space-x-2">
//                       <button className="text-blue-600 hover:text-blue-800">
//                         <Edit className="h-4 w-4" />
//                       </button>
//                       <button
//                         className="text-red-600 hover:text-red-800"
//                         onClick={() => handleDeleteCourse(course.id)}
//                         disabled={loading}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CoursesTab;

"use client";
import React, { useState, useEffect } from "react";
import { Edit, Trash2, Search } from "lucide-react";
import axios from "axios";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  subject: string;
}

// interface CoursesTabProps {
//   baseURL: string;
//   showNotification: (message: string, type: "success" | "error") => void;
// }

interface CoursesTabProps {
  courses: Course[];
  fetchData: () => Promise<void>;
  showNotification: (message: string, type: "success" | "error") => void;
  baseURL: string;
}

const CoursesTab: React.FC<CoursesTabProps> = ({
  baseURL,
  showNotification,
}) => {
  // State for courses and form
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    instructor: "",
    category: "",
    subject: "",
  });

  // State for filtering and searching
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  // Fetch courses method
  const fetchCourses = React.useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseURL}/course/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          search: searchTerm || undefined,
          category: filterCategory || undefined,
        },
      });

      // Handle different response structures
      const responseData = response.data?.data || response.data;
      const coursesData = Array.isArray(responseData) ? responseData : [];

      setCourses(coursesData);
    } catch (err) {
      console.error("Error fetching courses:", err);
      showNotification("Failed to fetch courses", "error");
      setCourses([]); // Ensure courses is always an array
    } finally {
      setLoading(false);
    }
  }, [baseURL, searchTerm, filterCategory, showNotification]);

  // Trigger fetch when search or filter changes
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // Rest of your component remains the same...
  // Course creation method
  const handleCourseSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const simplifiedForm = {
        ...courseForm,
        subject:
          courseForm.subject.length > 50
            ? courseForm.subject.substring(0, 50)
            : courseForm.subject,
      };

      await axios.post(`${baseURL}/course/create`, simplifiedForm, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setCourseForm({
        title: "",
        description: "",
        instructor: "",
        category: "",
        subject: "",
      });
      showNotification("Course created successfully!", "success");
      fetchCourses();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Full error details:", err);
        const status = err.response?.status;
        let errorMsg = "Unknown error occurred";

        if (status === 401 || status === 403) {
          errorMsg = "Permission denied. Check your authentication.";
        } else if (status === 500) {
          errorMsg = "Server error. Please try again later.";
        }

        showNotification(errorMsg, "error");
      } else {
        showNotification("Failed to create course", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  // Delete course method
  const handleDeleteCourse = async (courseId: string) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${baseURL}/course/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      showNotification("Course deleted successfully!", "success");
      fetchCourses();
    } catch (err) {
      console.error("Error deleting course:", err);
      showNotification("Failed to delete course", "error");
    } finally {
      setLoading(false);
    }
  };

  // Categories for dropdown
  const categories = ["primary", "secondary", "soft_skill", "exam_prep"];

  return (
    <div className="p-4">
      {/* Search and Filter Section */}
      <div className="mb-4 flex space-x-2">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-8 border border-gray-300 rounded-md"
          />
          <Search className="absolute left-2 top-3 text-gray-400 h-5 w-5" />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Course Creation Form */}
      <h2 className="text-lg font-semibold mb-4">Create New Course</h2>
      <form
        onSubmit={handleCourseSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={courseForm.title}
            onChange={(e) =>
              setCourseForm({ ...courseForm, title: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={courseForm.description}
            onChange={(e) =>
              setCourseForm({ ...courseForm, description: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Instructor
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={courseForm.instructor}
            onChange={(e) =>
              setCourseForm({ ...courseForm, instructor: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={courseForm.category}
            onChange={(e) =>
              setCourseForm({ ...courseForm, category: e.target.value })
            }
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={courseForm.subject}
            onChange={(e) =>
              setCourseForm({ ...courseForm, subject: e.target.value })
            }
            required
          />
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 text-white rounded-md ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Creating..." : "Create Course"}
          </button>
        </div>
      </form>

      {/* Courses List */}
      <h2 className="text-lg font-semibold mb-4">
        Existing Courses
        {filterCategory && ` (${filterCategory} category)`}
        {searchTerm && ` (Searching: ${searchTerm})`}
      </h2>

      {loading ? (
        <div className="text-center py-4">Loading courses...</div>
      ) : courses.length === 0 ? (
        <div className="text-center py-4">No courses found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Title</th>
                <th className="py-2 px-4 border-b text-left">Instructor</th>
                <th className="py-2 px-4 border-b text-left">Category</th>
                <th className="py-2 px-4 border-b text-left">Subject</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{course.title}</td>
                  <td className="py-2 px-4 border-b">{course.instructor}</td>
                  <td className="py-2 px-4 border-b">{course.category}</td>
                  <td className="py-2 px-4 border-b">{course.subject}</td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDeleteCourse(course.id)}
                        disabled={loading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CoursesTab;
