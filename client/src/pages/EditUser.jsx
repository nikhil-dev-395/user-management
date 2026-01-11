import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../utils/constant";

export const EditUser = () => {
  const { _id: id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    status: "active",
    role: "user",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =======================
     Fetch user details
  ======================== */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/user/${id}`, {
          withCredentials: true,
        });

        setFormData((prev) => ({
          ...prev,
          email: res.data.data.email,
          name: res.data.data.name,
          status: res.data.data.status,
          role: res.data.data.role,
        }));
      } catch (err) {
        console.log(err);
        setError("Failed to load user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  /* =======================
     Handle input change
  ======================== */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* =======================
     Submit update
  ======================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      await axios.put(
        `${API_BASE_URL}/api/user/${id}`,
        {
          email: formData.email,
          name: formData.name,
          password: formData.password || undefined, // optional update
          status: formData.status,
          role: formData.role,
        },
        { withCredentials: true }
      );

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-slate-200 text-xl font-bold">
        Update User
      </div>

      {error && (
        <p className="mt-4 text-center text-red-500 text-sm">{error}</p>
      )}

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-100">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-100">
              Name
            </label>
            <input
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-100">
              Password (optional)
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-100">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-100">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white"
            >
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-100">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white"
            >
              <option value="admin">admin</option>
              <option value="user">user</option>
            </select>
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-white hover:bg-indigo-400"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};
