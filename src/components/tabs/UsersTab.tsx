import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

interface UserTabProps {
  users: User[];
  updateUserRole: (userId: string, newRole: string) => Promise<void>;
  handleRoleChange: (userId: string, newRole: string) => void;
  fetchData: () => Promise<void>;
  showNotification: (message: string, type: "success" | "error") => void;
  baseURL: string;
  deleteUser: (userId: string) => Promise<void>;
}

interface User {
  id: string;
  first_name: string;
  last_name: string;
  role: string;
  email: string;
}

const UsersTab: React.FC<UserTabProps> = ({ 
  users, 
  updateUserRole,
  handleRoleChange,
  fetchData,
  showNotification,
  baseURL
}) => {
  const [localUsers, setLocalUsers] = useState(users);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<{[key: string]: string}>({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Initialize selected roles
  React.useEffect(() => {
    const roles: {[key: string]: string} = {};
    users.forEach(user => {
      roles[user.id] = user.role || "Student";
    });
    setSelectedRole(roles);
  }, [users]);

  // Handle clicks outside the modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleDeleteCancel();
      }
    };

    if (showDeleteModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDeleteModal]);

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    setDeletingId(userToDelete.id);
    setShowDeleteModal(false);
    const token = localStorage.getItem("token");
    const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      // Try to delete user - replace with your actual endpoint when available
      await axios.delete(
        `${baseURL}/user/delete/${userToDelete.id}`,
        { headers: authHeader }
      );

      // If successful, update local state
      setLocalUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete.id));
      showNotification("User deleted successfully", "success");
      
      // Refresh data from server
      await fetchData();
    } catch (err) {
      console.error("Error deleting user:", err);
      showNotification(
        err instanceof Error ? err.message : "Failed to delete user", 
        "error"
      );
    } finally {
      setDeletingId(null);
      setUserToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const handleRoleSelect = (userId: string, newRole: string) => {
    setSelectedRole(prev => ({
      ...prev,
      [userId]: newRole
    }));
    handleRoleChange(userId, newRole);
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
                    value={selectedRole[user.id] || "Student"}
                    onChange={(e) => handleRoleSelect(user.id, e.target.value)}
                    className="p-2 border rounded"
                  >
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Admin">Admin</option>
                  </select>
                </td>
                <td className="py-2 px-4 border-b space-x-2">
                  <button
                    onClick={() => updateUserRole(user.id, selectedRole[user.id])}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Save Role
                  </button>
                  <button
                    onClick={() => handleDeleteClick(user)}
                    disabled={deletingId === user.id}
                    className={`px-3 py-1 rounded ${
                      deletingId === user.id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700 text-white"
                    }`}
                  >
                    {deletingId === user.id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && userToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
          >
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">
              Are you sure you want to delete user:{" "}
              <span className="font-semibold">
                {userToDelete.first_name} {userToDelete.last_name}
              </span>?
              <br />
              <span className="text-red-600">This action cannot be undone.</span>
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTab;