import { useEffect, useState } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!userEmail) {
      setError("User email not found. Please log in.");
      setLoading(false);
      return;
    }

    axios
      .get(`https://localhost:7278/api/FetchProfile/profile/${userEmail}`)
      .then((response) => {
        if (response.data && response.data.profile) {
          setProfile(response.data.profile);
        } else {
          setError("Profile data not found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to fetch profile");
        setLoading(false);
      });
  }, [userEmail]);

  if (loading)
    return (
      <div className="text-center text-blue-500 text-lg font-semibold py-10 px-4">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 text-lg font-semibold py-10 px-4">
        {error}
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl transition-transform duration-300 hover:scale-[1.02]">
        <div className="flex flex-col items-center mb-6 text-center">
          <FaUserCircle className="text-purple-600 text-6xl md:text-7xl mb-3" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">User Profile</h2>
        </div>

        <div className="bg-gray-50 p-5 md:p-6 rounded-lg shadow-sm border border-gray-200 space-y-3">
          {profile ? (
            <>
              <p className="text-sm md:text-lg text-gray-700">
                <strong>ID:</strong> {profile.id}
              </p>
              <p className="text-sm md:text-lg text-gray-700">
                <strong>User ID:</strong> {profile.userId}
              </p>
              <p className="text-sm md:text-lg text-gray-700">
                <strong>Name:</strong> {profile.firstName} {profile.lastName}
              </p>
              <p className="text-sm md:text-lg text-gray-700">
                <strong>Email:</strong> {profile.gmail}
              </p>
              <p className="text-sm md:text-lg text-gray-700">
                <strong>Role:</strong>{" "}
                {profile.logginAs === 1
                  ? "User"
                  : profile.logginAs === 2
                  ? "Recruiter"
                  : "Admin"}
              </p>
            </>
          ) : (
            <p className="text-red-500 text-center font-semibold">
              No profile data available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
