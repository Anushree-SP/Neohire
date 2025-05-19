import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, ArrowLeft, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecruiterManageJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [jobData, setJobData] = useState({});
  const recruiterId = localStorage.getItem("userId");

  useEffect(() => {
    if (recruiterId) fetchJobs();
  }, [recruiterId]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`https://localhost:7278/api/Recruiter/jobs-by-id/${recruiterId}`);
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await axios.delete(`https://localhost:7278/api/Recruiter/delete-job/${jobId}`);
      alert("Job deleted successfully!");
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const openEditModal = (job) => {
    setEditingJob(job);
    setJobData(job);
  };

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(`https://localhost:7278/api/Recruiter/update-job/${jobData.jobId}`, jobData);
      alert("Job updated successfully!");
      fetchJobs();
      setEditingJob(null);
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-extrabold text-blue-700 flex items-center gap-2">
          <Briefcase className="w-8 h-8" />
          Manage Jobs
        </h2>
        <button
          onClick={() => navigate("/recruiter-dashboard")}
          className="flex items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </button>
      </div>

      {jobs.length === 0 ? (
        <p className="text-gray-600 text-center mt-20 text-lg">No jobs found. Post a job to get started!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
       {jobs.map((job) => (
  <div
    key={job.jobId}
    className="bg-white p-6 rounded-2xl shadow-lg border hover:shadow-xl transition duration-300"
  >
    <div className="mb-4 space-y-1">
      <h3 className="text-lg font-semibold text-gray-700">
        <span className="font-bold text-gray-900">Job Title:</span> {job.jobTitle}
      </h3>
      <p className="text-sm text-gray-600">
        <span className="font-bold">Company:</span> {job.companyName}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-bold">Location:</span> {job.location}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-bold">CTC:</span> ₹{job.ctc}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-bold">Vacancies:</span> {job.vacancy}
      </p>
    </div>

    <div className="mb-4">
      <p className="text-gray-700 text-sm">
        <span className="font-bold">Job Description:</span> <br />
        <span className="line-clamp-4">{job.jobDescription}</span>
      </p>
    </div>

    <div className="flex gap-3 mt-4">
      <button
        onClick={() => openEditModal(job)}
        className="flex items-center bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600"
      >
        <Pencil className="w-4 h-4 mr-1" /> Edit
      </button>
      <button
        onClick={() => handleDelete(job.jobId)}
        className="flex items-center bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600"
      >
        <Trash2 className="w-4 h-4 mr-1" /> Delete
      </button>
    </div>
  </div>
))}

        </div>
      )}

{editingJob && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6">
      <h3 className="text-2xl font-bold text-blue-700 mb-6">Edit Job</h3>
      <div className="space-y-4 text-gray-800">
        <div>
          <label className="block text-blue-600 font-semibold mb-1">Salary (CTC)</label>
          <input
            type="number"
            name="ctc"
            value={jobData.ctc}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-blue-600 font-semibold mb-1">Vacancy</label>
          <input
            type="number"
            name="vacancy"
            value={jobData.vacancy}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-blue-600 font-semibold mb-1">Job Type</label>
          <input
            type="text"
            name="jobType"
            value={jobData.jobType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-blue-600 font-semibold mb-1">Required Skills</label>
          <input
            type="text"
            name="requiredSkills"
            value={jobData.requiredSkills}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={() => setEditingJob(null)}
          className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:opacity-90"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default RecruiterManageJobs;
