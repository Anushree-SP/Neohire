import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaTachometerAlt, FaListAlt, FaUsers } from "react-icons/fa";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md shadow-lg hover:bg-blue-700 transition"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-blue-900 text-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:min-h-screen`}
      >
        <div className="p-6 text-xl font-bold border-b border-blue-700">Admin Panel</div>
        <nav className="p-4 space-y-3">
          <Link
            to="/admin-dashboard"
            className="block py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            <div className="flex items-center gap-3">
              <FaTachometerAlt /> <span>Dashboard</span>
            </div>
          </Link>

          <Link
            to="/admin-dashboard/job-list"
            className="block py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            <div className="flex items-center gap-3">
              <FaListAlt /> <span>Job List</span>
            </div>
          </Link>

          <Link
            to="/admin-dashboard/ViewUserDashboard"
            className="block py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            <div className="flex items-center gap-3">
              <FaUsers /> <span>Show All Users</span>
            </div>
          </Link>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default AdminSidebar;
