import React from "react";
import { api } from "../APIs/api";
import { useNavigate } from "react-router";
import { isAxiosError } from "axios";
import Swal from "sweetalert2";

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    id: "",
    password: "",
  });

  const handleLogin: React.FormEventHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post("/admin/login", formData);

      const token = response.data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", "admin");

      navigate("/admin");
    } catch (error) {
      if (isAxiosError(error)) {
        Swal.fire({
          icon: "error",
          title: "Sorry!",
          text: error.response?.data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Sorry!",
          text: "An error occurred. Please try again later.",
        });
      }
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-6 rounded bg-white p-8 shadow-md">
        <h1 className="text-center text-2xl font-bold">Admin Login</h1>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="id"
              className="block text-sm font-medium text-gray-700"
            >
              Id
            </label>
            <input
              name="id"
              type="id"
              onChange={(e) =>
                setFormData({ ...formData, id: e.target.value })
              }
              value={formData.id}
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              value={formData.password}
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full rounded-md border border-transparent bg-orange-400 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
