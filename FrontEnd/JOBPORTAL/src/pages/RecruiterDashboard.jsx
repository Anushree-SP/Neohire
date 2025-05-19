import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Briefcase,
  Users,
  CheckCircle,
  XCircle,
  Hourglass,
  Menu,
  X,
} from "lucide-react";

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7278/api/Recruiter/AllJobs"
      );
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7278/api/ApplyJobApplications"
      );
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const acceptedCount = applications.filter(
    (app) => app.Status?.toLowerCase() === "accepted"
  ).length;
  const rejectedCount = applications.filter(
    (app) => app.Status?.toLowerCase() === "rejected"
  ).length;
  const pendingCount = applications.filter(
    (app) => app.Status?.toLowerCase() === "pending"
  ).length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed md:relative z-30 top-0 left-0 w-64 bg-blue-900 text-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-6 text-xl font-bold border-b border-blue-700">
          Recruiter Dashboard
        </div>
        <ul className="p-4 space-y-3">
          <li>
            <Link
              to="/recruiter-profile"
              className="block py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/recruiter-dashboard"
              className="block py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/recruiter-postjob"
              className="block py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Post a Job
            </Link>
          </li>
          <li>
            <Link
              to="/manage-jobs"
              className="block py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Manage Jobs
            </Link>
          </li>
          <li>
            <Link
              to="/applications"
              className="block py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Manage Applications
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-gray-700 mb-4"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Recruiter Dashboard
        </h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <DashboardCard
            icon={<Briefcase className="w-10 h-10" />}
            title="Jobs Posted"
            count={jobs.length}
            bg="from-blue-500 to-blue-700"
          />
          <DashboardCard
            icon={<Users className="w-10 h-10" />}
            title="Total Applications"
            count={applications.length}
            bg="from-green-500 to-green-700"
          />
          <DashboardCard
            icon={<CheckCircle className="w-10 h-10" />}
            title="Accepted"
            count={acceptedCount}
            bg="from-green-400 to-green-600"
          />
          <DashboardCard
            icon={<XCircle className="w-10 h-10" />}
            title="Rejected"
            count={rejectedCount}
            bg="from-red-400 to-red-600"
          />
          <DashboardCard
            icon={<Hourglass className="w-10 h-10" />}
            title="Pending"
            count={pendingCount}
            bg="from-yellow-400 to-yellow-600"
          />
        </div>
      </div>
    </div>
  );
};

// Reusable Card Component
const DashboardCard = ({ icon, title, count, bg }) => (
  <div
    className={`p-6 bg-gradient-to-r ${bg} text-white shadow-md rounded-lg flex items-center space-x-4`}
  >
    {icon}
    <div>
      <p className="text-2xl font-semibold">{count}</p>
      <p className="text-sm">{title}</p>
    </div>
  </div>
);

export default RecruiterDashboard;
