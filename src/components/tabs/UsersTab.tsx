import React from "react";

interface UserTabProps {
  users: User[];
  updateUserRole: (userId: string, newRole: string) => Promise<void>;
  handleRoleChange: (userId: string, newRole: string) => void;
  fetchData: () => Promise<void>;
  showNotification: (message: string, type: "success" | "error") => void;
  baseURL: string;
}

interface User {
  id: string;
  first_name: string;
  last_name: string;
  role: string;
  email: string;
}

const UsersTab: React.FC<UserTabProps> = ({ users, updateUserRole }) => {
  const [localUsers, setLocalUsers] = React.useState(users);

  const handleRoleChange = (id: string, newRole: string) => {
    setLocalUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, role: newRole } : user
      )
    );
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Role</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {localUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{`${user.first_name} ${user.last_name}`}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">
                  <select
                   value={user.role || "Student"}
                   onChange={(e) => {
                    const newRole = e.target.value;
                    handleRoleChange(user.id, newRole);
                  }}
                  className="p-2 border rounded"
                >                
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Admin">Admin</option>
                  </select>
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => updateUserRole(user.id, user.role)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTab;
