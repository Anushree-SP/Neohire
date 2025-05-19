using JobPortalForFreshers.common;
using JobPortalForFreshers.DataLayer;
using JobPortalForFreshers.Madals;
using Microsoft.Data.SqlClient;
using System.Data;

namespace JobPortalForFreshers.BusinessLayer
{
    public class RegisterFormBL
    {
        SqlDBServer dBServer = new SqlDBServer();

        #region register form
        public string InsertCredentials(RegisterForm registerForm)
        {
            try
            {
                ValidatePassword(registerForm.Password);

                string userId = GenerateUniqueUserId(); 
                string hashedPassword = registerForm.Password;


                int result = dBServer.ExecuteOnlyQuery("SP_REGISTERFORM_CRUD", CommandType.StoredProcedure,
                    new SqlParameter("@Action", "INSERT"),
                    new SqlParameter("@UserId", userId),
                    new SqlParameter("@FirstName", registerForm.FirstName),
                    new SqlParameter("@LastName", registerForm.LastName),
                    new SqlParameter("@Gmail", registerForm.Gmail),
                    new SqlParameter("@LogginAs", registerForm.LogginAs),
                    new SqlParameter("@Password", hashedPassword)
                );

                if (result > 0)
                {
                    return "Registered Successfully!";
                }
                else
                {
                    return "Oops! Something went wrong!!!!!";
                }
            }
            catch (Exception e)
            {
                return "Error: " + e.Message;  
            }
        }

        //password length and complexity before hashing
        private void ValidatePassword(string password)
        {
            if (password.Length < 8 ||
                !password.Any(char.IsDigit) ||
                !password.Any(char.IsUpper) ||
                !password.Any(char.IsLower) ||
                !password.Any(ch => !char.IsLetterOrDigit(ch)))
            {
                throw new Exception("Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.");
            }
        }

        private string GenerateUniqueUserId()
        {
            #region generating a user id 
            return Guid.NewGuid().ToString("N").Substring(0, 12);

            #endregion

        }

        public int GetUserType(string userId)
        {
            var result = dBServer.GetDataTable("SP_REGISTERFORM_CRUD", CommandType.StoredProcedure,
                new SqlParameter("@Action", "GET_USER_TYPE"),
                new SqlParameter("@UserId", userId));

            if (result == null || result.Rows.Count == 0)
            {
                return -1; 
            }

            return Convert.ToInt32(result.Rows[0]["LogginAs"]);
        }

        #endregion

        #region Login 
        public bool ValidateUser(string gmail, string password)
        {
            var result = dBServer.GetDataTable("SP_REGISTERFORM_CRUD", CommandType.StoredProcedure,
                new SqlParameter("@Action", "VALIDATE_LOGIN"),
                new SqlParameter("@Gmail", gmail),
                new SqlParameter("@Password", password));

            if (result == null || result.Rows.Count == 0)
            {
                return false;  
            }

            return Convert.ToInt32(result.Rows[0]["UserExists"]) > 0; 
        }


        #endregion

        public List<RegisterForm> GetAllUsers(DataRow row)
        {
            List<RegisterForm> users = new List<RegisterForm>();
            DataTable dt = dBServer.ExecuteQuery("SP_REGISTERFORM_CRUD", CommandType.StoredProcedure,
                new SqlParameter("@Action", "SELECT_ALL"));

            foreach (DataRow dataRow in dt.Rows)
            {
                users.Add(new RegisterForm
                {
                    UserId = row["UserId"].ToString(),
                    FirstName = row["FirstName"].ToString(),
                    LastName = row["LastName"].ToString(),
                    Gmail = row["Gmail"].ToString(),
                    LogginAs = Enum.Parse<EnumUserRole>(row["LogginAs"].ToString())
                });
            }
            return users;
        }

        // Get User By ID
        public RegisterForm GetUserById(string userId)
        {
            DataTable dt = dBServer.ExecuteQuery("SP_REGISTERFORM_CRUD", CommandType.StoredProcedure,
                new SqlParameter("@Action", "SELECT_ONE"),
                new SqlParameter("@UserId", userId));

            if (dt.Rows.Count == 0) return null;

            DataRow row = dt.Rows[0];
            return new RegisterForm
            {
                UserId = row["UserId"].ToString(),
                FirstName = row["FirstName"].ToString(),
                LastName = row["LastName"].ToString(),
                Gmail = row["Gmail"].ToString(),
                LogginAs = Enum.Parse<EnumUserRole>(row["LogginAs"].ToString())
            };
        }

        // Update User Role or Email
        public string UpdateUser(RegisterForm registerForm)
        {
            int result = dBServer.ExecuteOnlyQuery("SP_REGISTERFORM_CRUD", CommandType.StoredProcedure,
                new SqlParameter("@Action", "UPDATE"),
                new SqlParameter("@UserId", registerForm.UserId),
                new SqlParameter("@FirstName", registerForm.FirstName),
                new SqlParameter("@LastName", registerForm.LastName),
                new SqlParameter("@Gmail", registerForm.Gmail),
                new SqlParameter("@LogginAs", registerForm.LogginAs),
                new SqlParameter("@Password", registerForm.Password)
            );

            return result > 0 ? "User Updated Successfully!" : "Update Failed!";
        }

        // Delete User
        public string DeleteUser(int Id)
        {
            int result = dBServer.ExecuteOnlyQuery("SP_REGISTERFORM_CRUD", CommandType.StoredProcedure,
                new SqlParameter("@Action", "DELETE"),
                new SqlParameter("@Id", Id));

            return result > 0 ? "User Deleted Successfully!" : "Delete Failed!";
        }

        public List<RegisterForm> GetAllUsers()
        {
            List<RegisterForm> users = new List<RegisterForm>();

            DataTable dt = dBServer.ExecuteQuery("SP_REGISTERFORM_CRUD", CommandType.StoredProcedure,
                new SqlParameter("@Action", "SELECT_ALL"));

            foreach (DataRow dataRow in dt.Rows)
            {
                users.Add(new RegisterForm
                {
                    UserId = Convert.ToString(dataRow["UserId"]),
                    FirstName = Convert.ToString(dataRow["FirstName"]),
                    LastName = Convert.ToString(dataRow["LastName"]),
                    Gmail = Convert.ToString(dataRow["Gmail"]),
                    LogginAs = Enum.TryParse<EnumUserRole>(Convert.ToString(dataRow["LogginAs"]), out var role) ? role : EnumUserRole.User
                });
            }

            return users;
        }
    }

}
