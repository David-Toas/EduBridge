"use client"
import React, { useState } from "react";
import axios from "axios";
import { Edit, Trash2 } from "lucide-react";

// interface LessonTabProps {
//   lessons: Lesson[];
//   modules: Module[];
//   courses: Course[];
//   fetchData: () => void;
//   showNotification: (message: string, type: "success" | "error") => void;
// }

interface LessonTabProps {
    lessons: Lesson[];
    modules: Module[];
    courses: Course[];
    fetchData: () => Promise<void>;
    showNotification: (message: string, type: "success" | "error") => void;
    baseURL: string;
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

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  subject: string;
}

const LessonsTab: React.FC<LessonTabProps> = ({ 
  lessons, 
  modules, 
  courses, 
  fetchData, 
  showNotification 
}) => {
  const [lessonForm, setLessonForm] = useState({
    moduleId: "",
    title: "",
    content: "",
    resourceUrl: "",
    duration: "",
  });

  const baseURL = "https://edubridge-uwk9.onrender.com/api/v1";

  const handleLessonSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token: string | null = localStorage.getItem("token");
      await axios.post(
        `${baseURL}/lesson/create`,
        lessonForm,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Reset form and reload data
      setLessonForm({
        moduleId: "",
        title: "",
        content: "",
        resourceUrl: "",
        duration: "",
      });
      showNotification("Lesson created successfully!", "success");
      fetchData();
    } catch (err: unknown) {
      console.error("Error creating lesson:", err);
      showNotification("Failed to create lesson.", "error");
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Create New Lesson</h2>
      <form
        onSubmit={handleLessonSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Module
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={lessonForm.moduleId}
            onChange={(e) =>
              setLessonForm({ ...lessonForm, moduleId: e.target.value })
            }
            required
          >
            <option value="">Select a module</option>
            {modules.map((module) => {
              const course = courses.find(
                (c) => c.id === module.courseId
              );
              return (
                <option key={module.id} value={module.id}>
                  {module.title} {course ? `(${course.title})` : ""}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={lessonForm.title}
            onChange={(e) =>
              setLessonForm({ ...lessonForm, title: e.target.value })
            }
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            value={lessonForm.content}
            onChange={(e) =>
              setLessonForm({ ...lessonForm, content: e.target.value })
            }
            rows={5}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Resource URL
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={lessonForm.resourceUrl}
            onChange={(e) =>
              setLessonForm({
                ...lessonForm,
                resourceUrl: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duration
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={lessonForm.duration}
            onChange={(e) =>
              setLessonForm({ ...lessonForm, duration: e.target.value })
            }
            placeholder="e.g. 25 minutes"
            required
          />
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Create Lesson
          </button>
        </div>
      </form>
      <h2 className="text-lg font-semibold mb-4">Existing Lessons</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Title</th>
              <th className="py-2 px-4 border-b text-left">Module</th>
              <th className="py-2 px-4 border-b text-left">Duration</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson) => {
              const moduleItem = modules.find(
                (m) => m.id === lesson.moduleId
              );
              return (
                <tr key={lesson.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{lesson.title}</td>
                  <td className="py-2 px-4 border-b">
                    {moduleItem ? moduleItem.title : "Unknown"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {lesson.duration}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LessonsTab;