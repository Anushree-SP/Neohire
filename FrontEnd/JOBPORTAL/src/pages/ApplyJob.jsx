import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Briefcase,
  Upload,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

const ApplyJob = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [job, setJob] = useState({});
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("No file chosen");

  const programmingLanguages = [
    "C", "C++", "C#", "Java", "JavaScript", "Python", "Go", "Ruby",
    "PHP", "Swift", "Kotlin", "Rust", "Perl", "Scala", "TypeScript",
    "Objective-C", "R", "Dart", "Shell", "MATLAB", "SQL"
  ];

  const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500";

  const [formData, setFormData] = useState({
    jobID: jobId || "",
    userID: "",
    firstName: "",
    lastName: "",
    qualification: "",
    phoneNumber: "",
    skills: [],
    cgpa: "",
    gender: "",
    location: "",
    email: "",
    appliedDate: new Date().toISOString(),
    status: "Pending",
    companyName: "",
    jobTitle: "",
    jobType: "",
    resumePath: "",
  });

  useEffect(() => {
    if (jobId) {
      setLoading(true);
      axios
        .get(`https://localhost:7278/api/Recruiter/Job/${jobId}`)
        .then((response) => {
          setJob(response.data);
          setFormData((prev) => ({
            ...prev,
            jobID: jobId,
            jobTitle: response.data.jobTitle,
            companyName: response.data.companyName,
            jobType: response.data.jobType,
          }));
        })
        .catch(() => {
          setError("Failed to load job details. Please try again later.");
        })
        .finally(() => setLoading(false));
    }
  }, [jobId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleSkill = (lang) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(lang)
        ? prev.skills.filter((s) => s !== lang)
        : [...prev.skills, lang],
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      setError("Please upload a resume.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const fileData = new FormData();
      fileData.append("file", resumeFile);

      const uploadResponse = await axios.post(
        `https://localhost:7278/api/DocumentUpload/UploadResumeFile?userId=${formData.userID}&jobId=${formData.jobID}`,
        fileData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const uploadedResumePath = uploadResponse.data.filePath;

      await axios.post("https://localhost:7278/api/ApplyJobApplications", {
        ...formData,
        resumePath: uploadedResumePath,
        skills: formData.skills.join(", "),
      });

      setSuccess(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError("Failed to apply. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl p-6 md:p-10 relative border border-gray-200">
        <button
          onClick={() => navigate("/jobs")}
          className="absolute top-4 left-4 flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft className="mr-2" size={18} />
          Back
        </button>

        <div className="mb-8 text-center">
          <div className="flex justify-center items-center gap-2 text-indigo-600 mb-2">
            <Briefcase size={28} />
            <h1 className="text-2xl font-semibold">
              Apply for <span className="text-indigo-800">{job.jobTitle || "Job"}</span>
            </h1>
          </div>
          <p className="text-gray-600 text-sm">
            Company: {job.companyName} | Job Type: {job.jobType}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          <div className="space-y-4">
            <input name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="First Name" className={inputClass} />
            <input name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Last Name" className={inputClass} />
            <input name="email" value={formData.email} onChange={handleChange} required placeholder="Email" type="email" className={inputClass} />
            <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required placeholder="Phone Number" className={inputClass} />
            <input name="userID" value={formData.userID} onChange={handleChange} required placeholder="User ID" className={inputClass} />
            <select name="gender" value={formData.gender} onChange={handleChange} required className={inputClass}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input name="location" value={formData.location} onChange={handleChange} required placeholder="Location" className={inputClass} />
            <input name="qualification" value={formData.qualification} onChange={handleChange} required placeholder="Qualification" className={inputClass} />
            <input name="cgpa" value={formData.cgpa} onChange={handleChange} required placeholder="CGPA" type="number" min="0" max="10" step="0.01" className={inputClass} />
          </div>

          <div>
            <label className="font-medium text-gray-700 mb-2 block">Programming Skills</label>
            <div className="flex flex-wrap gap-2">
              {programmingLanguages.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => toggleSkill(lang)}
                  className={`px-3 py-1 text-sm rounded-full border transition ${
                    formData.skills.includes(lang)
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 border-2 border-dashed p-6 rounded-lg bg-gray-50 flex flex-col items-center text-center">
            <Upload className="text-indigo-500 mb-2" size={30} />
            <label className="font-medium text-gray-700">Upload Resume</label>
            <label className="mt-2 cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
              Choose File
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
            </label>
            <p className="mt-2 text-sm text-gray-500">{fileName}</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center bg-indigo-100 text-indigo-700 p-3 rounded">
              <div className="animate-spin h-5 w-5 border-2 border-indigo-600 border-t-transparent rounded-full mr-2"></div>
              Submitting...
            </div>
          ) : success ? (
            <div className="flex items-center bg-green-100 text-green-700 p-3 rounded">
              <CheckCircle className="mr-2" size={20} />
              Application submitted! Redirecting...
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Submit Application
            </motion.button>
          )}

          {error && (
            <div className="flex items-center bg-red-100 text-red-700 p-3 mt-3 rounded">
              <AlertCircle className="mr-2" size={20} />
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ApplyJob;
