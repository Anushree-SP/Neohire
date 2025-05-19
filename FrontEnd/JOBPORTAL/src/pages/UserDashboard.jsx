import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaBriefcase, FaSignOutAlt } from "react-icons/fa";
import UserProfile from "./UserProfile";
import UserApplicationView from "./UserApplicationView";

const UserDashboard = () => {
  const [view, setView] = useState("profile");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white p-5 space-y-6 hidden md:block">
        <h2 className="text-2xl font-bold text-center">Dashboard</h2>
        <nav className="mt-10 space-y-4">
          <button
            className={`flex items-center px-4 py-3 w-full rounded-lg transition duration-300 ${view === "profile" ? "bg-blue-600" : "hover:bg-blue-700"}`}
            onClick={() => setView("profile")}
          >
            <FaUser className="mr-3" /> Profile
          </button>
          <button
            className={`flex items-center px-4 py-3 w-full rounded-lg transition duration-300 ${view === "applications" ? "bg-blue-600" : "hover:bg-blue-700"}`}
            onClick={() => setView("applications")}
          >
            <FaBriefcase className="mr-3" /> Applications
          </button>
          <button
            className="flex items-center px-4 py-3 w-full rounded-lg hover:bg-red-600 transition duration-300"
            onClick={() => setShowLogoutModal(true)} // Show modal instead of direct logout
          >
            <FaSignOutAlt className="mr-3" /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Mobile Toggle */}
        <div className="md:hidden flex justify-center mb-4 space-x-4">
          <button
            className={`px-4 py-2 rounded-lg ${view === "profile" ? "bg-blue-600 text-white" : "bg-gray-300 text-black"}`}
            onClick={() => setView("profile")}
          >
            Profile
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${view === "applications" ? "bg-blue-600 text-white" : "bg-gray-300 text-black"}`}
            onClick={() => setView("applications")}
          >
            Applications
          </button>
        </div>

        {/* Content */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {view === "profile" ? <UserProfile /> : <UserApplicationView />}
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-6 text-gray-700">Are you sure you want to logout?</p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
