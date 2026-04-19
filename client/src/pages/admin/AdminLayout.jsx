import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <ul className="space-y-3">
          <li
            onClick={() => navigate("/admin/dashboard")}
            className="cursor-pointer hover:text-blue-400"
          >
            Dashboard
          </li>
          <li
            onClick={() => navigate("/admin/manage-services")}
            className="cursor-pointer hover:text-blue-400"
          >
            Services
          </li>
          <li
            onClick={() => navigate("/admin/manage-portfolios")}
            className="cursor-pointer hover:text-blue-400"
          >
            Portfolio
          </li>
          <li
            onClick={() => navigate("/admin/manage-bookings")}
            className="cursor-pointer hover:text-blue-400"
          >
            Bookings
          </li>
          <li
            onClick={() => navigate("/admin/manage-inquiries")}
            className="cursor-pointer hover:text-blue-400"
          >
            Inquiries
          </li>
          <li
            onClick={() => navigate("/admin/manage-blogs")}
            className="cursor-pointer hover:text-blue-400"
          >
            Blogs
          </li>
          <li onClick={logout} className="cursor-pointer text-red-400">
            Logout
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
