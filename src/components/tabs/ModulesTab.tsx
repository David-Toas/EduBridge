"use client";
import React, { useState, useEffect } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import axios from "axios";
import type { Module, Course, Lesson } from "../../lib/types";

interface ModulesTabProps {
  modules: Module[];
  courses: Course[];
  fetchData: () => Promise<void>;
  showNotification: (message: string, type: "success" | "error") => void;
  baseURL: string;
}

interface ModuleForm {
  courseId: string;
  title: string;
  description: string;
}

interface LessonForm {
  moduleId: string;
  title: string;
  content: string;
  resourceUrl?: string;
}

const ModulesTab = ({
  // fetchData,
  showNotification,
  baseURL,
}: ModulesTabProps) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [modules, setModules] = useState<Module[]>([]);

  const [moduleForm, setModuleForm] = useState<ModuleForm>({
    courseId: "",
    title: "",
    description: "",
  });

  const [lessonForm, setLessonForm] = useState<LessonForm>({
    moduleId: "",
    title: "",
    content: "",
    resourceUrl: "",
  });

  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseURL}/course/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(response.data.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
      showNotification("Failed to fetch courses", "error");
    }
  };

  // Fetch all modules
  const fetchModules = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseURL}/module/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setModules(response.data.data);
    } catch (err) {
      console.error("Error fetching modules:", err);
      showNotification("Failed to fetch modules", "error");
    }
  };

  // Combined fetch for initial data
  const initializePage = async () => {
    try {
      setIsLoading(true);
      await fetchCourses();
      await fetchModules();
    } catch (error) {
      console.error("Error initializing page:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize data on component mount
  useEffect(() => {
    initializePage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch lessons for a specific module
  const fetchModuleLessons = async (moduleId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${baseURL}/lesson/all?moduleId=${moduleId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLessons(response.data.data);
    } catch (err) {
      console.error("Error fetching lessons:", err);
      showNotification("Failed to fetch lessons", "error");
    }
  };

  // Handle Module Creation/Update
  const handleModuleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (isEditMode && selectedModule) {
        // Update existing module
        await axios.put(`${baseURL}/module/${selectedModule.id}`, moduleForm, {
          headers: { Authorization: `Bearer ${token}` },
        });
        showNotification("Module updated successfully!", "success");
      } else {
        // Create new module
        await axios.post(`${baseURL}/module/register`, moduleForm, {
          headers: { Authorization: `Bearer ${token}` },
        });
        showNotification("Module created successfully!", "success");
      }

      // Reset form and fetch updated data
      setModuleForm({ courseId: "", title: "", description: "" });
      setIsEditMode(false);
      setSelectedModule(null);
      await initializePage();
    } catch (err) {
      console.error("Error saving module:", err);
      showNotification("Failed to save module", "error");
    }
  };

  // Handle Module Deletion
  const handleDeleteModule = async (moduleId: string) => {
    if (!window.confirm("Are you sure you want to delete this module?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${baseURL}/module/${moduleId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showNotification("Module deleted successfully!", "success");
      await initializePage();
    } catch (err) {
      console.error("Error deleting module:", err);
      showNotification("Failed to delete module", "error");
    }
  };

  // Handle Lesson Creation/Update
  const handleLessonSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      // Prepare form data for lesson creation
      const formData = new FormData();
      formData.append("moduleId", lessonForm.moduleId);
      formData.append("title", lessonForm.title);
      formData.append("content", lessonForm.content);
      if (lessonForm.resourceUrl) {
        formData.append("resourceUrl", lessonForm.resourceUrl);
      }

      await axios.post(`${baseURL}/lesson/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      showNotification("Lesson created successfully!", "success");

      // Reset form and close modal
      setLessonForm({ moduleId: "", title: "", content: "", resourceUrl: "" });
      setIsLessonModalOpen(false);

      // Refresh lessons for the current module
      if (selectedModule) {
        fetchModuleLessons(selectedModule.id);
      }
    } catch (err) {
      console.error("Error creating lesson:", err);
      showNotification("Failed to create lesson", "error");
    }
  };

  // Open Lesson Modal for a Specific Module
  const openLessonModal = (module: Module) => {
    setSelectedModule(module);
    setLessonForm((prev) => ({ ...prev, moduleId: module.id }));
    fetchModuleLessons(module.id);
    setIsLessonModalOpen(true);
  };

  // Edit Module Preparation
  const prepareModuleEdit = (module: Module) => {
    setSelectedModule(module);
    setModuleForm({
      courseId: module.courseId,
      title: module.title,
      description: module.description,
    });
    setIsEditMode(true);
  };

  return (
    <div className="space-y-6">
      {/* Module Creation/Edit Form */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">
          {isEditMode ? "Edit Module" : "Create New Module"}
        </h2>
        <form
          onSubmit={handleModuleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course
            </label>

            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={moduleForm.courseId}
              onChange={(e) =>
                setModuleForm({ ...moduleForm, courseId: e.target.value })
              }
              required
            >
              <option value="">Select a course</option>
              {isLoading ? (
                <option disabled>Loading courses...</option>
              ) : (
                Array.isArray(courses) &&
                courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))
              )}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={moduleForm.title}
              onChange={(e) =>
                setModuleForm({ ...moduleForm, title: e.target.value })
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
              value={moduleForm.description}
              onChange={(e) =>
                setModuleForm({ ...moduleForm, description: e.target.value })
              }
              rows={3}
              required
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {isEditMode ? "Update Module" : "Create Module"}
            </button>
            {isEditMode && (
              <button
                type="button"
                className="ml-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                onClick={() => {
                  setIsEditMode(false);
                  setSelectedModule(null);
                  setModuleForm({ courseId: "", title: "", description: "" });
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Existing Modules Table */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Existing Modules</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Title</th>
                <th className="py-2 px-4 border-b text-left">Course</th>
                <th className="py-2 px-4 border-b text-left">Description</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="py-2 px-4 text-center">
                    Loading modules...
                  </td>
                </tr>
              ) : (
                Array.isArray(modules) &&
                modules.map((module) => {
                  const course = courses.find((c) => c.id === module.courseId);
                  return (
                    <tr key={module.id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">{module.title}</td>
                      <td className="py-2 px-4 border-b">
                        {course ? course.title : "Unknown"}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {module.description}
                      </td>
                      <td className="py-2 px-4 border-b">
                        <div className="flex space-x-2">
                          <button
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => prepareModuleEdit(module)}
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-800"
                            onClick={() => handleDeleteModule(module.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button
                            className="text-green-600 hover:text-green-800"
                            onClick={() => openLessonModal(module)}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lesson Modal */}
      {isLessonModalOpen && selectedModule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                Lessons for Module: {selectedModule.title}
              </h2>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={() => setIsLessonModalOpen(false)}
              >
                Close
              </button>
            </div>

            {/* Lesson Creation Form */}
            <form onSubmit={handleLessonSubmit} className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lesson Title
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lesson Content
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={lessonForm.content}
                  onChange={(e) =>
                    setLessonForm({ ...lessonForm, content: e.target.value })
                  }
                  rows={4}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resource URL (Optional)
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
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Create Lesson
              </button>
            </form>

            {/* Existing Lessons List */}
            <div>
              <h3 className="text-md font-semibold mb-4">Existing Lessons</h3>
              {lessons.length === 0 ? (
                <p className="text-gray-500">
                  No lessons found for this module.
                </p>
              ) : (
                <ul className="space-y-2">
                  {lessons.map((lesson) => (
                    <li
                      key={lesson.id}
                      className="border p-3 rounded-md bg-gray-50 flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-medium">{lesson.title}</h4>
                        <p className="text-sm text-gray-600">
                          {lesson.content}
                        </p>
                      </div>
                      {lesson.resourceUrl && (
                        <a
                          href={lesson.resourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Resource
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModulesTab;
