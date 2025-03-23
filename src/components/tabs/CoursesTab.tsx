import React, { useState } from 'react';
import { Edit, Trash2 } from "lucide-react";
import axios from "axios";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  subject: string;
}

interface CoursesTabProps {
  courses: Course[];
  fetchData: () => void;
  showNotification: (message: string, type: "success" | "error") => void;
  baseURL: string;
}

const CoursesTab = ({ courses, fetchData, showNotification, baseURL }: CoursesTabProps) => {
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    instructor: "",
    category: "",
    subject: "",
  });
  
  const handleCourseSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token: string | null = localStorage.getItem("token");
      // Simplify the subject field in case it's too long
      const simplifiedForm = {
        ...courseForm,
        subject:
          courseForm.subject.length > 50
            ? courseForm.subject.substring(0, 50)
            : courseForm.subject,
      };
      await axios({
        method: "post",
        url: `${baseURL}/course/create`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: simplifiedForm,
      });
      
      // Reset form and reload data
      setCourseForm({
        title: "",
        description: "",
        instructor: "",
        category: "",
        subject: "",
      });
      showNotification("Course created successfully!", "success");
      fetchData();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Full error details:", err);
        // Provide more context in the notification
        const status = err.response?.status;
        let errorMsg = "Unknown error occurred";
        if (status === 401 || status === 403) {
          errorMsg = "Permission denied. Your account may not have rights to create courses.";
        } else if (status === 500) {
          errorMsg = "Server error. The API might expect a different data format.";
        }
        showNotification(errorMsg, "error");
      } else {
        console.error("Error creating course:", err);
        showNotification("Failed to create course.", "error");
      }
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${baseURL}/course/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showNotification("Course deleted successfully!", "success");
      fetchData();
    } catch (err) {
      console.error("Error deleting course:", err);
      showNotification("Failed to delete course.", "error");
    }
  };

  return (
    <div>
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
            Instructor
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={courseForm.instructor}
            onChange={(e) =>
              setCourseForm({
                ...courseForm,
                instructor: e.target.value,
              })
            }
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={courseForm.category}
            onChange={(e) =>
              setCourseForm({ ...courseForm, category: e.target.value })
            }
            required
          />
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            value={courseForm.description}
            onChange={(e) =>
              setCourseForm({
                ...courseForm,
                description: e.target.value,
              })
            }
            rows={3}
            required
          />
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Course
          </button>
        </div>
      </form>
      <h2 className="text-lg font-semibold mb-4">Existing Courses</h2>
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
    </div>
  );
};

export default CoursesTab;