import { useState, useEffect } from "react";

export default function AdminViewUsers() {
  const [users, setUsers] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://localhost:7278/api/admin/users");
      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`);
      }
      const data = await response.json();

      const userList = data.filter(user => parseInt(user.logginAs) === 1);
      const recruiterList = data.filter(user => parseInt(user.logginAs) === 2);
      const adminList = data.filter(user => parseInt(user.logginAs) === 3);

      setUsers(userList);
      setRecruiters(recruiterList);
      setAdmins(adminList);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) return;

    try {
      const response = await fetch(`https://localhost:7278/api/admin/Delete?userId=${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("User deleted successfully");
        fetchUsers();
      } else {
        const result = await response.json();
        alert(result.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while trying to delete the user. Please try again.");
    }
  };

  const renderTable = (title, dataList, canDelete) => (
    <div className="w-full mb-12">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-blue-800">
          {title} <span className="text-gray-500 text-lg ml-2">({dataList.length})</span>
        </h3>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        {isLoading ? (
          <div className="text-center p-8 text-gray-500">Loading {title.toLowerCase()}...</div>
        ) : error ? (
          <div className="text-center p-8 text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm lg:text-base">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <th className="px-4 py-3 text-left font-medium">User ID</th>
                  <th className="px-4 py-3 text-left font-medium">First Name</th>
                  <th className="px-4 py-3 text-left font-medium">Last Name</th>
                  <th className="px-4 py-3 text-left font-medium">Email</th>
                  {canDelete && (
                    <th className="px-4 py-3 text-center font-medium">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {dataList.length > 0 ? (
                  dataList.map((user, index) => (
                    <tr
                      key={user.userId}
                      className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50 transition-colors duration-150`}
                    >
                      <td className="border-t border-gray-200 px-4 py-3">{user.userId}</td>
                      <td className="border-t border-gray-200 px-4 py-3">{user.firstName}</td>
                      <td className="border-t border-gray-200 px-4 py-3">{user.lastName}</td>
                      <td className="border-t border-gray-200 px-4 py-3">{user.gmail}</td>
                      {canDelete && (
                        <td className="border-t border-gray-200 px-4 py-3 text-center">
                          <button
                            onClick={() => deleteUser(user.userId, `${user.firstName} ${user.lastName}`)}
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors duration-150 text-sm flex items-center mx-auto"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={canDelete ? 5 : 4} className="text-center p-6 text-gray-500">
                      No {title.toLowerCase()} found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-blue-800 text-center">
            Admin Dashboard - User Management
          </h2>
          <p className="text-gray-600 text-center mt-2">
            View and manage all registered users in the system
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {renderTable("Users", users, true)}
          {renderTable("Recruiters", recruiters, true)}
          {renderTable("Admins", admins, false)}
        </div>
      </div>
    </div>
  );
}