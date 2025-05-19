import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserCircle, FaEnvelope, FaIdBadge, FaUserTag, FaArrowLeft } from "react-icons/fa";

const RecruiterProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userEmail) {
      setError("User email not found. Please log in.");
      setLoading(false);
      return;
    }

    axios
      .get(`https://localhost:7278/api/FetchProfile/profile/${userEmail}`)
      .then((response) => {
        console.log("✅ API Response:", response.data);
        if (response.data && response.data.profile) {
          setProfile(response.data.profile);
        } else {
          setError("Profile data not found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ API Error:", err);
        setError(err.response?.data?.message || "Failed to fetch profile");
        setLoading(false);
      });
  }, [userEmail]);

  const handleBack = () => {
    navigate("/recruiter-dashboard"); // Replace with your actual recruiter dashboard route
  };

  if (loading)
    return <div className="text-center text-blue-500 text-lg font-semibold">Loading...</div>;

  if (error)
    return <div className="text-center text-red-500 text-lg font-semibold">{error}</div>;

  return (
    <div className="flex justify-center items-center min-h-screen py-10 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl transition-transform transform hover:scale-105">
        
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <FaArrowLeft className="mr-2" /> Back to Dashboard
        </button>

        <div className="flex flex-col items-center">
          <FaUserCircle className="text-blue-500 text-6xl mb-3" />
          <h2 className="text-xl font-bold text-blue-700">Recruiter Profile</h2>
        </div>

        <div className="mt-5 space-y-4 text-sm">
          {profile ? (
            <>
              <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow-md">
                <FaIdBadge className="text-blue-500 text-lg mr-3" />
                <p className="text-gray-700 font-medium">ID: {profile.id}</p>
              </div>

              <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow-md">
                <FaUserTag className="text-blue-500 text-lg mr-3" />
                <p className="text-gray-700 font-medium">User ID: {profile.userId}</p>
              </div>

              <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow-md">
                <FaUserCircle className="text-blue-500 text-lg mr-3" />
                <p className="text-gray-700 font-medium">Name: {profile.firstName} {profile.lastName}</p>
              </div>

              <div className="flex  items-center bg-gray-100 p-3 rounded-lg shadow-md">
                <FaEnvelope className="text-blue-500 text-lg mr-3" />
                <p className="text-gray-700 font-medium">Email: {profile.gmail}</p>
              </div>

              <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow-md">
                <FaUserTag className="text-blue-500 text-lg mr-3" />
                <p className="text-gray-700 font-medium">
                  Role: {profile.logginAs === 1 ? "User" : profile.logginAs === 2 ? "Recruiter" : "Admin"}
                </p>
              </div>
            </>
          ) : (
            <p className="text-red-500 text-center font-semibold">No profile data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;
