import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../utils/constant";
import { Link } from "react-router-dom";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* =======================
     Fetch all users
  ======================== */
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/user/all`, {
        withCredentials: true,
      });
      setUsers(response.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* =======================
     Delete user handler
  ======================== */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/user/${id}`, {
        withCredentials: true,
      });

      // ✅ Update UI immediately after delete
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-blue-200">Dashboard</h1>
        </div>
        <Link
          to={"/add-user"}
          className="mt-4 sm:mt-0 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          Add user
        </Link>
      </div>

      {/* Table */}
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-300">
                    Name
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">
                    Email
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">
                    Status
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">
                    Role
                  </th>
                  <th className="relative py-3.5 pl-3 pr-4">
                    <span className="sr-only">Edit</span>
                    <span className="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 bg-white">
                {users.map((user) => (
                  <tr key={user._id}>
                    {/* Name */}
                    <td className="whitespace-nowrap py-4 pl-4 pr-3">
                      <div className="flex items-center gap-4">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={user.image}
                          alt={user.name}
                        />
                        <div>
                          <div className="font-medium text-gray-900">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="whitespace-nowrap px-3 py-4">
                      <div className="text-gray-900">{user.email}</div>
                    </td>

                    {/* Status */}
                    <td className="whitespace-nowrap px-3 py-4">
                      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                        {user.status}
                      </span>
                    </td>

                    {/* Role */}
                    <td className="whitespace-nowrap px-3 py-4 text-gray-900">
                      {user.role}
                    </td>

                    {/* Edit & Delete */}
                    <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium flex gap-2 justify-end">
                      <Link
                        to={`/edit/${user._id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
