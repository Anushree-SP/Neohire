import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminJoblist = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    axios
      .get("https://localhost:7278/api/Recruiter/AllJobs")
      .then((response) => setJobs(response.data))
      .catch((error) => console.error("Error fetching jobs:", error));
  };

  const handleDelete = (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      axios
        .delete(`https://localhost:7278/api/Recruiter/delete-job/${jobId}`)
        .then(() => {
          alert("Job deleted successfully!");
          fetchJobs();
        })
        .catch((error) => console.error("Error deleting job:", error));
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 px-2 sm:px-4 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700 mb-6 text-center">
        Job Listings
      </h1>

      {/* Table for md and above */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-blue-600 text-white text-base">
            <tr>
              <th className="p-4 text-left font-medium">Job ID</th>
              <th className="p-4 text-left font-medium">Title</th>
              <th className="p-4 text-left font-medium">Company</th>
              <th className="p-4 text-left font-medium">Salary</th>
              <th className="p-4 text-left font-medium">Vacancies</th>
              <th className="p-4 text-left font-medium">Skills</th>
              <th className="p-4 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <tr
                  key={job.jobId}
                  className="border-b hover:bg-blue-50 transition-all"
                >
                  <td className="p-4">{job.jobId}</td>
                  <td className="p-4">{job.jobTitle}</td>
                  <td className="p-4">{job.companyName}</td>
                  <td className="p-4">${job.ctc}</td>
                  <td className="p-4">{job.vacancy}</td>
                  <td className="p-4">{job.requiredSkills}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(job.jobId)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-500">
                  No jobs available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card list for small screens */}
      <div className="md:hidden space-y-4">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div
              key={job.jobId}
              className="bg-white rounded-lg shadow p-4 space-y-2"
            >
              <div>
                <strong>Job ID:</strong> {job.jobId}
              </div>
              <div>
                <strong>Title:</strong> {job.jobTitle}
              </div>
              <div>
                <strong>Company:</strong> {job.companyName}
              </div>
              <div>
                <strong>Salary:</strong> ${job.ctc}
              </div>
              <div>
                <strong>Vacancies:</strong> {job.vacancy}
              </div>
              <div>
                <strong>Skills:</strong> {job.requiredSkills}
              </div>
              <div>
                <button
                  onClick={() => handleDelete(job.jobId)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-6 text-gray-500">No jobs available.</div>
        )}
      </div>
    </div>
  );
};

export default AdminJoblist;
