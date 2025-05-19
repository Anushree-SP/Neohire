import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Briefcase, Bookmark, Search, ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://localhost:7278/api/Recruiter/AllJobs")
      .then((response) => setJobs(response.data))
      .catch((error) => console.error("Error fetching jobs:", error));

    checkUserLoginStatus();
  }, []);

  const checkUserLoginStatus = () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const role = localStorage.getItem("role") || sessionStorage.getItem("role");

    // Only set isLoggedIn to true if role is '1' (User)
    setIsLoggedIn(!!token && role === "1");
  };

  const handleApplyClick = (jobId) => {
    const role = localStorage.getItem("role") || sessionStorage.getItem("role");

    if (!role || role !== "1") {
      toast.info("Only users can apply for jobs. Please login as a user.", {
        position: "top-center",
        autoClose: 3000
      });

      sessionStorage.setItem("intendedJobApplication", jobId);
      navigate("/login", {
        state: { from: "/jobs", message: "Please login as a user to apply for jobs" }
      });
      return;
    }

    navigate(`/apply/${jobId}`);
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === "salary") return b.ctc - a.ctc;
    if (sortBy === "company") return a.companyName.localeCompare(b.companyName);
    if (sortBy === "location") return a.location.localeCompare(b.location);
    if (sortBy === "jobTitle") return a.jobTitle.localeCompare(b.jobTitle);
    return 0;
  });

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-6xl px-4 mb-4">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleBackToHome}
          className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Home
        </motion.button>
      </div>

      <motion.div
        className="text-center mb-12 max-w-3xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4">
          Welcome to Neohire <span className="text-3xl">😊</span>
        </h1>
        <h2 className="text-xl md:text-2xl font-medium text-gray-800">
          <span className="text-blue-600 font-semibold">Search</span> ,
          <span className="text-purple-600 font-semibold"> Apply</span> &nbsp;
          <span className="text-orange-500 font-semibold">Get the right job for yourself</span>
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
          Find your dream job from thousands of job listings across industries, locations, and roles!
        </p>
      </motion.div>

      <div className="w-full max-w-5xl mb-10 flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center px-4">
        <div className="relative flex items-center w-full md:w-2/5">
          <input
            type="text"
            placeholder="Search jobs by title or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 pl-12 w-full border-2 border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-4 text-gray-400" size={20} />
        </div>

        <div className="flex items-center w-full md:w-1/3 justify-center md:justify-end">
          <label className="font-semibold mr-3 text-gray-700">Sort By:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 bg-white shadow-sm"
          >
            <option value="">Select</option>
            <option value="salary">Salary (High to Low)</option>
            <option value="company">Company Name</option>
            <option value="location">Location</option>
            <option value="jobTitle">Job Title</option>
          </select>
        </div>
      </div>

      <div className="w-full max-w-5xl mb-6 px-4">
        <p className="text-gray-600 font-medium">
          {sortedJobs.length} {sortedJobs.length === 1 ? "job" : "jobs"} found
          {searchTerm && ` for "${searchTerm}"`}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
        {sortedJobs.length > 0 ? (
          sortedJobs.map((job, index) => (
            <motion.div
              key={job.jobId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="text-blue-600 w-7 h-7" />
                </div>
                <Bookmark className="text-gray-300 hover:text-purple-600 cursor-pointer transition-colors duration-200" />
              </div>

              <h2 className="text-xl font-bold text-gray-800 mb-1 line-clamp-2">{job.jobTitle}</h2>
              <div className="flex items-center text-gray-600 text-sm mb-4">
                <span className="font-medium">{job.companyName}</span>
                <span className="mx-2">•</span>
                <span>{job.location}</span>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-3">
                {job.jobDescription.slice(0, 120)}...
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                  📌 {job.vacancy} Positions
                </span>
                <span className="bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-xs font-medium">
                  ⏳ {job.jobType}
                </span>
                <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                  💰 {job.ctc}
                </span>
              </div>

              <div className="flex gap-3 mt-auto">
                <Link
                  className="w-1/2 border-2 border-gray-200 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 text-center font-medium transition-colors duration-200"
                  to={`/job-details/${job.jobId}`}
                >
                  Details
                </Link>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2.5 rounded-lg hover:from-purple-700 hover:to-blue-700 font-medium shadow-sm"
                  onClick={() => handleApplyClick(job.jobId)}
                >
                  Apply Now
                </motion.button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No jobs found</h3>
            <p className="text-gray-500">Try adjusting your search terms or clear filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
