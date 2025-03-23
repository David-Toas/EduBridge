// EnrollmentsTab.tsx
import React from "react";
import { Trash2 } from "lucide-react";

interface EnrollmentTabProps {
    enrollments: Enrollment[];
    users: User[];
    courses: Course[];
    fetchData: () => Promise<void>;
    showNotification: (message: string, type: "success" | "error") => void;
    baseURL: string;
  }

interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrollment_date: string;
}

interface User {
  id: string;
  first_name: string;
  last_name: string;
  role: string;
  email: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  subject: string;
}

const EnrollmentsTab: React.FC<EnrollmentTabProps> = ({ 
  enrollments, 
  users, 
  courses 
}) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Enrollments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">User</th>
              <th className="py-2 px-4 border-b text-left">Course</th>
              <th className="py-2 px-4 border-b text-left">
                Enrollment Date
              </th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((enrollment) => {
              const user = users.find(
                (u) => u.id === enrollment.userId
              );
              const course = courses.find(
                (c) => c.id === enrollment.courseId
              );
              return (
                <tr key={enrollment.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">
                    {user
                      ? `${user.first_name} ${user.last_name}`
                      : "Unknown"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {course ? course.title : "Unknown"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(
                      enrollment.enrollment_date
                    ).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 className="h-4 w-4" />
                    </button>
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

export default EnrollmentsTab;