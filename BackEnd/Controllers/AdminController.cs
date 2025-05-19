using JobPortalForFreshers.BusinessLayer;
using JobPortalForFreshers.Madals;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace JobPortalForFreshers.Controllers
{
    [Route("api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly RegisterFormBL _registerFormBL;

        public AdminController(RegisterFormBL registerFormBL)
        {
            _registerFormBL = registerFormBL;
        }

        // Get All Users
        [HttpGet("users")]
        public IActionResult GetAllUsers()
        {
            var users = _registerFormBL.GetAllUsers(); // Ensure this method is implemented
            return Ok(users);
        }

        // Get User by ID
        [HttpGet("users/{userid}")]
        public IActionResult GetUserById(string userid)
        {
            var user = _registerFormBL.GetUserById(userid);
            if (user == null)
                return NotFound("User Not Found");
            return Ok(user);
        }

        // Update User
        [HttpPut("users/{userid}")]
        public IActionResult UpdateUser(string userid, [FromBody] RegisterForm registerForm)
        {
            if (userid != registerForm.UserId)
                return BadRequest("User ID Mismatch");

            string result = _registerFormBL.UpdateUser(registerForm);
            return Ok(result);
        }

        //// Delete User
        //[HttpDelete("users/{id}")]
        //public IActionResult DeleteUser(int id)
        //{
        //    string result = _registerFormBL.DeleteUser(id);
        //    return Ok(result);
        //}



        [HttpDelete]
        [Route("Delete")]
        public IActionResult DeleteCustomerDetials([FromQuery] string userId)
        {
            #region Declaration
            SqlConnection sqlConnection = new SqlConnection();
            SqlCommand sqlCommand = new SqlCommand();
            string sqlConnectionString = "Server=ANU\\SQLEXPRESS;Database=JOBPORTAL;Trusted_Connection=True;TrustServerCertificate=true;";
            #endregion

            try
            {
                sqlConnection.ConnectionString = sqlConnectionString;
                sqlConnection.Open();

                // Delete customer data using userId
                string deleteCustomerQuery = "DELETE FROM REGISTERFORM WHERE UserId = @UserId";

                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText = deleteCustomerQuery;
                sqlCommand.CommandType = System.Data.CommandType.Text;
                sqlCommand.Parameters.AddWithValue("@UserId", userId);  // Using parameterized query to prevent SQL injection
                int count = sqlCommand.ExecuteNonQuery();

                if (count > 0)
                {
                    return Ok("Customer details deleted successfully.");
                }
                else
                {
                    return NotFound("Customer not found.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }



    }
}

