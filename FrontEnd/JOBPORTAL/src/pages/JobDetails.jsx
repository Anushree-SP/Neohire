import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function JobDetails() {
  const { JobID } = useParams(1);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://localhost:7278/api/Recruiter/Job/${JobID}`)
      .then((response) => {
        console.log("Fetched Job Details:", response.data); // Debugging
        setJob(response.data);
      })
      .catch((error) => {
        console.error("Error fetching job details:", error);
        setError("Job details not found.");
      })
      .finally(() => setLoading(false));
  }, [JobID]);
  
  // Handle navigation back to jobs page
  const handleBackToJobs = () => {
    navigate('/jobs');
  };

  if (loading) return <p className="text-blue-600 text-center text-xl font-medium my-16">Loading job details...</p>;
  if (error) return <p className="text-red-600 text-center text-xl font-medium my-16">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 border border-gray-200">
      
      <button 
        onClick={handleBackToJobs}
        className="flex items-center text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 mb-6 group"
      >
        <ArrowLeft className="mr-2 group-hover:transform group-hover:-translate-x-1 transition-transform" size={20} />
        Back to Jobs
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">{job?.jobTitle || "No Title Available"}</h1>
      <p className="text-blue-600 text-lg font-semibold mb-1">{job?.companyName || "No Company Name"}</p>
      <p className="text-gray-500 text-sm mb-4 border-b pb-4">{job?.JobID}</p>
      
      <div className="mt-6 space-y-3 bg-gray-50 p-4 rounded-md">
        <p className="text-gray-700 flex items-center"><span className="w-40 inline-block font-medium">📍 Location:</span> {job?.location || "Not specified"}</p>
        <p className="text-gray-700 flex items-center"><span className="w-40 inline-block font-medium">💰 Salary:</span> {job?.ctc ? `${job.ctc} ` : "Not specified"}</p>
        <p className="text-gray-700 flex items-center"><span className="w-40 inline-block font-medium">💰 jobId:</span> {job?.ctc ? `${job.jobId} ID` : "Not specified"}</p>
        <p className="text-gray-700 flex items-center"><span className="w-40 inline-block font-medium">🔹 Type:</span> {job?.jobType || "Not specified"}</p>
        <p className="text-gray-700 flex items-center"><span className="w-40 inline-block font-medium">📌 Positions:</span> {job?.vacancy || "Not specified"}</p>
        <p className="text-gray-700 flex items-start"><span className="w-40 inline-block font-medium">🛠 Skills Required:</span> {job?.requiredSkills || "Not specified"}</p>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">Job Description</h2>
        <div className="bg-gray-50 p-5 rounded-md border border-gray-200">
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">{job?.jobDescription || "No description available."}</p>
        </div>
      </div>
    </div>
  );
}