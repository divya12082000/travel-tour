import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/admin/users";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  // API functions
  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

  const updateUser = async (userId, userData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };

  // Load users on component mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Failed to load users:", error);
      }
    };

    loadUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setFormData({ name: user.name, email: user.email, phone: user.phone });
  };

  const handleSaveClick = async () => {
    try {
      await updateUser(editingUserId, formData);
      setEditingUserId(null);
      const updatedUsers = await fetchUsers();
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleDeleteClick = async (userId) => {
    try {
      await deleteUser(userId);
      const updatedUsers = await fetchUsers();
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Phone</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 px-4 py-2">
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border p-1"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border p-1"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="border p-1"
                  />
                ) : (
                  user.phone
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {editingUserId === user.id ? (
                  <button onClick={handleSaveClick} className="bg-green-500 text-white px-2 py-1 rounded">
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(user)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDeleteClick(user.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
