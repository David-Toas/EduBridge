"use client"
import React, { useState } from 'react';
import { Edit, Trash2 } from "lucide-react";
import axios from "axios";
import type { Module, Course } from "../../lib/types";

interface ModulesTabProps {
  modules: Module[];
  courses: Course[];
  fetchData: () => void;
  showNotification: (message: string, type: "success" | "error") => void;
  baseURL: string;
}

const ModulesTab = ({ modules, courses, fetchData, showNotification, baseURL }: ModulesTabProps) => {
  const [moduleForm, setModuleForm] = useState({
    courseId: "",
    title: "",
    description: "",
  });
  
  const handleModuleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token: string | null = localStorage.getItem("token");
      await axios.post(
        `${baseURL}/module/register`,
        moduleForm,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Reset form and reload data
      setModuleForm({
        courseId: "",
        title: "",
        description: "",
      });
      showNotification("Module created successfully!", "success");
      fetchData();
    } catch (err: unknown) {
      console.error("Error creating module:", err);
      showNotification("Failed to create module.", "error");
    }
  };

  const handleDeleteModule = async (moduleId: string) => {
    if (!window.confirm("Are you sure you want to delete this module?")) return;
    
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${baseURL}/module/${moduleId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showNotification("Module deleted successfully!", "success");
      fetchData();
    } catch (err) {
      console.error("Error deleting module:", err);
      showNotification("Failed to delete module.", "error");
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Create New Module</h2>
      <form
        onSubmit={handleModuleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
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
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
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
              setModuleForm({
                ...moduleForm,
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
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Create Module
          </button>
        </div>
      </form>
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
            {modules.map((module) => {
              const course = courses.find(
                (c) => c.id === module.courseId
              );
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
                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDeleteModule(module.id)}
                      >
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

export default ModulesTab;