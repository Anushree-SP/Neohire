import { useEffect, useState } from "react";
import axios from "axios";

const UserApplicationView = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      setError("User ID not found. Please log in.");
      setLoading(false);
      return;
    }

    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7278/api/ApplyJobApplications/${userId}`
        );
        setApplications(response.data);
      } catch (err) {
        setError(err.response?.data || "Failed to fetch applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [userId]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-600 animate-pulse text-base md:text-lg">Loading your applications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
          <p className="text-red-700 text-sm md:text-base">{error}</p>
        </div>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <div className="bg-blue-50 p-6 rounded-lg shadow-md">
          <h3 className="text-lg md:text-xl font-semibold text-blue-800 mb-2">No Applications Found</h3>
          <p className="text-blue-600 text-sm md:text-base">You haven't submitted any job applications yet.</p>
          <button className="mt-4 px-5 py-2 text-sm md:text-base bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Browse Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center text-blue-900">
        Your Job Applications
      </h2>

      {applications.map((app, index) => (
        <div
          key={index}
          className="bg-white p-4 md:p-6 rounded-lg shadow-md border-l-4 border-blue-500 mb-4"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-blue-900">{app.JobTitle}</h3>
              <p className="text-blue-700 text-sm md:text-base">{app.CompanyName}</p>
            </div>
            <span
              className={`inline-block w-fit px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${
                app.Status === "Accepted"
                  ? "bg-green-200 text-green-800"
                  : app.Status === "Rejected"
                  ? "bg-red-200 text-red-800"
                  : "bg-yellow-200 text-yellow-800"
              }`}
            >
              {app.Status}
            </span>
          </div>

          {app.AppliedDate && (
            <p className="mt-2 text-gray-500 text-sm">
              Applied on: {new Date(app.AppliedDate).toLocaleDateString()}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserApplicationView;
