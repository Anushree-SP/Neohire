import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Edit, ArrowLeft, FileText, Search, Filter, X, ChevronDown } from "lucide-react";

const RecruiterManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [editingApp, setEditingApp] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://localhost:7278/api/ApplyJobApplications");
      setApplications(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching applications:", error);
      setError("Failed to load applications. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (app) => {
    setEditingApp(app);
    setEditedStatus(app.Status);
  };

  const handleEditChange = (e) => {
    setEditedStatus(e.target.value);
  };

 const saveEdit = async () => {
  if (!editingApp) return;
  console.log("Saving status:", editedStatus); // Debug

  try {
    await axios.post(`https://localhost:7278/api/Recruiter/update-application-status`, {
      ApplicationID: editingApp.ApplicationID,
      Status: editedStatus
    });

    setApplications(applications.map(app =>
      app.ApplicationID === editingApp.ApplicationID ? { ...app, Status: editedStatus } : app
    ));
    setEditingApp(null);
  } catch (error) {
    console.error("Error updating application:", error);
    alert("Failed to update application status. Please try again.");
  }
};

  const viewResume = (userId, jobId) => {
    const resumeUrl = `https://localhost:7278/api/DocumentUpload/DownloadResumeFile?userId=${userId}&jobId=${jobId}`;
    window.open(resumeUrl, "_blank");
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch =
      (app.FirstName?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
      (app.LastName?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
      (app.Email?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
      (app.CompanyName?.toLowerCase().includes(searchTerm.toLowerCase()) || '');

    const matchesStatus = statusFilter === "All" || app.Status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case "Pending": return "bg-amber-100 text-amber-800 border-amber-200";
      case "Accepted": return "bg-green-100 text-green-800 border-green-200";
      case "Rejected": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const pendingCount = applications.filter(app => app.Status === "Pending").length;
  const acceptedCount = applications.filter(app => app.Status === "Accepted").length;
  const rejectedCount = applications.filter(app => app.Status === "Rejected").length;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <button
              onClick={() => navigate("/recruiter-dashboard")}
              className="mr-4 bg-white p-2 rounded-full shadow-sm hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900">Manage Applications</h2>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="py-2 pl-10 pr-4 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative">
              <button 
                className="bg-white px-4 py-2 rounded-md border border-gray-300 shadow-sm hover:bg-gray-50 flex items-center"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter size={18} className="mr-2 text-gray-500" />
                Filter
                <ChevronDown size={16} className="ml-2 text-gray-500" />
              </button>

              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1">
                    {["All", "Pending", "Accepted", "Rejected"].map(status => (
                      <button 
                        key={status}
                        className={`block px-4 py-2 text-sm text-left w-full hover:bg-gray-100 ${statusFilter === status ? "font-semibold bg-blue-50" : ""}`}
                        onClick={() => { setStatusFilter(status); setIsFilterOpen(false); }}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatusCard title="Total Applications" count={applications.length} color="text-gray-900" />
          <StatusCard title="Pending" count={pendingCount} color="text-amber-600" />
          <StatusCard title="Accepted" count={acceptedCount} color="text-green-600" />
          <StatusCard title="Rejected" count={rejectedCount} color="text-red-600" />
        </div>

        {/* Loading / Error / Applications Table */}
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchApplications} />
        ) : filteredApplications.length === 0 ? (
          <EmptyState />
        ) : (
          <ApplicationsTable
            applications={filteredApplications}
            getStatusColor={getStatusColor}
            viewResume={viewResume}
            openEditModal={openEditModal}
          />
        )}
      </div>

      {/* Edit Status Modal */}
      {editingApp && (
        <EditStatusModal
          editingApp={editingApp}
          editedStatus={editedStatus}
          handleEditChange={handleEditChange}
          saveEdit={saveEdit}
          closeModal={() => setEditingApp(null)}
        />
      )}
    </div>
  );
};

// Small Components

const StatusCard = ({ title, count, color }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
    <p className="text-sm font-medium text-gray-500">{title}</p>
    <p className={`text-2xl font-bold ${color}`}>{count}</p>
  </div>
);

const LoadingState = () => (
  <div className="bg-white shadow-sm rounded-lg p-8 text-center">
    <div className="mx-auto w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 border-l-gray-200 border-r-gray-200 rounded-full animate-spin mb-4"></div>
    <h3 className="text-lg font-semibold text-gray-900 mb-1">Loading applications...</h3>
    <p className="text-gray-500">Please wait while we fetch the data</p>
  </div>
);

const ErrorState = ({ message, onRetry }) => (
  <div className="bg-white shadow-sm rounded-lg p-8 text-center">
    <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
      <X size={24} className="text-red-500" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-1">Error loading applications</h3>
    <p className="text-gray-500">{message}</p>
    <button 
      onClick={onRetry}
      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      Try Again
    </button>
  </div>
);

const EmptyState = () => (
  <div className="bg-white shadow-sm rounded-lg p-8 text-center">
    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <Search size={24} className="text-gray-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-1">No applications found</h3>
    <p className="text-gray-500">Try adjusting your search or filter criteria</p>
  </div>
);

const ApplicationsTable = ({ applications, getStatusColor, viewResume, openEditModal }) => (
  <div className="bg-white shadow-sm rounded-lg overflow-x-auto border border-gray-200">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {applications.map(app => (
          <tr key={app.ApplicationID} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-800 font-medium">
                    {app.FirstName?.charAt(0)}
                    {app.LastName?.charAt(0)}
                  </span>
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">{app.FirstName} {app.LastName}</div>
                  <div className="text-sm text-gray-500">App #{app.ApplicationID}</div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 text-sm text-gray-900">{app.CompanyName}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{app.Email}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{app.JobTitle}</td>
            <td className="px-6 py-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(app.Status)}`}>
                {app.Status}
              </span>
            </td>
            <td className="px-6 py-4 text-right text-sm font-medium">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => viewResume(app.UserID, app.JobID)}
                  className="text-blue-600 hover:text-blue-900 flex items-center"
                >
                  <FileText size={16} className="mr-1" /> Resume
                </button>
                <button
                  onClick={() => openEditModal(app)}
                  className="text-indigo-600 hover:text-indigo-900 flex items-center"
                >
                  <Edit size={16} className="mr-1" /> Status
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const EditStatusModal = ({ editingApp, editedStatus, handleEditChange, saveEdit, closeModal }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h3 className="text-lg font-medium text-gray-900">Update Application Status</h3>
        <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">
          <X size={20} />
        </button>
      </div>

      <div className="px-6 py-4">
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1">Candidate</p>
          <p className="font-medium">{editingApp.FirstName} {editingApp.LastName}</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={editedStatus}
            onChange={handleEditChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
          >
            <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
        <button
          type="button"
          className="py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          type="button"
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          onClick={saveEdit}
        >
          Save
        </button>
      </div>
    </div>
  </div>
);

export default RecruiterManageApplications;
