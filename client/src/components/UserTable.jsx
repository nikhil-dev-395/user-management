import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../utils/constant";
import { Link, useNavigate } from "react-router-dom";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/user/all`, {
        withCredentials: true,
      });
      setUsers(response.data.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        navigate("/login");
      }
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /*
     Delete user handler
 */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/user/${id}`, {
        withCredentials: true,
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed. Please try again.");
    }
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="px-4 py-5 sm:px-6 lg:px-8">
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

        <button
          onClick={handleLogout}
          className="mt-4 sm:mt-0 ml-4 inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
        >
          Logout
        </button>
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
