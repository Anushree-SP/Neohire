using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using JobPortalForFreshers.Madals;

namespace JobPortalForFreshers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplyJobApplicationsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly string _resumeFolderPath = "C:\\Users\\praka\\OneDrive\\Desktop\\StoreProjectResume"; // Folder to store resumes

        public ApplyJobApplicationsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private SqlConnection GetConnection()
        {
            return new SqlConnection(_configuration.GetConnectionString("jobportal"));
        }

        [HttpGet]
        public IActionResult GetAllApplications()
        {
            using (SqlConnection conn = GetConnection())
            {
                using (SqlCommand cmd = new SqlCommand("sp_ManageUserJobApplication1", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Action", "SELECT_ALL");

                    DataTable dt = new DataTable();
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    da.Fill(dt);

                    List<Dictionary<string, object>> applications = new List<Dictionary<string, object>>();

                    foreach (DataRow row in dt.Rows)
                    {
                        Dictionary<string, object> rowData = new Dictionary<string, object>();
                        foreach (DataColumn col in dt.Columns)
                        {
                            rowData[col.ColumnName] = row[col];
                        }
                        applications.Add(rowData);
                    }

                    return Ok(applications);
                }
            }
        }

        [HttpGet("GetUserAppliedJobs")]
        public IActionResult GetUserAppliedJobsStatus(int UserId)
        {
            List<object> applications = new List<object>();

            using (SqlConnection conn = GetConnection())
            {
                using (SqlCommand cmd = new SqlCommand("SELECT JobTitle, CompanyName, Status FROM JobApplications WHERE UserID = @UserID", conn))
                {
                    cmd.Parameters.AddWithValue("@UserID", UserId);

                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var application = new
                            {
                                JobTitle = reader["JobTitle"]?.ToString(),
                                CompanyName = reader["CompanyName"]?.ToString(),
                                Status = reader["Status"]?.ToString()
                            };
                            applications.Add(application);
                        }
                    }
                }
            }

            return Ok(applications);
        }

        [HttpGet("{UserID}")]
        public IActionResult GetApplicationById(int UserID)
        {
            using (SqlConnection conn = GetConnection())
            {
                using (SqlCommand cmd = new SqlCommand("sp_ManageUserJobApplication1", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Action", "SELECT_ONE");
                    cmd.Parameters.AddWithValue("@UserID", UserID);

                    DataTable dt = new DataTable();
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    da.Fill(dt);

                    if (dt.Rows.Count == 0)
                        return NotFound("Application not found.");

                    var applications = new List<Dictionary<string, object>>();

                    foreach (DataRow row in dt.Rows)
                    {
                        var application = new Dictionary<string, object>();
                        foreach (DataColumn col in dt.Columns)
                        {
                            application[col.ColumnName] = row[col] == DBNull.Value ? null : row[col];
                        }
                        applications.Add(application);
                    }

                    return Ok(applications);
                }
            }
        }

        [HttpPost]
        public IActionResult ApplyForJob([FromBody] JobApply model)
        {
            using (SqlConnection conn = GetConnection())
            {
                using (SqlCommand cmd = new SqlCommand("sp_ManageUserJobApplication1", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Action", "INSERT");
                    cmd.Parameters.AddWithValue("@JobID", model.JobID);
                    cmd.Parameters.AddWithValue("@UserID", model.UserID);
                    cmd.Parameters.AddWithValue("@FirstName", model.FirstName);
                    cmd.Parameters.AddWithValue("@LastName", model.LastName);
                    cmd.Parameters.AddWithValue("@Qualification", model.Qualification);
                    cmd.Parameters.AddWithValue("@PhoneNumber", model.PhoneNumber);
                    cmd.Parameters.AddWithValue("@Skills", model.Skills);
                    cmd.Parameters.AddWithValue("@CGPA", model.CGPA);
                    cmd.Parameters.AddWithValue("@Gender", model.Gender);
                    cmd.Parameters.AddWithValue("@Location", model.Location);
                    cmd.Parameters.AddWithValue("@Email", model.Email);
                    cmd.Parameters.AddWithValue("@ResumePath", model.ResumePath);
                    cmd.Parameters.AddWithValue("@Status", model.Status);
                    cmd.Parameters.AddWithValue("@CompanyName", model.CompanyName);
                    cmd.Parameters.AddWithValue("@JobTitle", model.JobTitle);
                    cmd.Parameters.AddWithValue("@JobType", model.JobType);

                    conn.Open();
                    cmd.ExecuteNonQuery();
                    conn.Close();

                    return Ok("Job application submitted successfully.");
                }
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteJobApplication(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(GetConnectionString()))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("EXEC DeleteJobApplication @ApplicationID", con))
                    {
                        cmd.Parameters.AddWithValue("@ApplicationID", id);
                        cmd.ExecuteNonQuery();
                    }
                }
                return Ok(new { message = "Job application deleted successfully!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateJobApplication(int id, [FromBody] JobApply application)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(GetConnectionString()))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("EXEC UpdateJobApplication @ApplicationID, @FirstName, @LastName, @Qualification, @PhoneNumber, @Skills, @CGPA, @Gender, @Location, @Email, @ResumePath, @Status, @CompanyName, @JobTitle, @JobType", con))
                    {
                        cmd.Parameters.AddWithValue("@ApplicationID", id);
                        cmd.Parameters.AddWithValue("@FirstName", application.FirstName);
                        cmd.Parameters.AddWithValue("@LastName", application.LastName);
                        cmd.Parameters.AddWithValue("@Qualification", application.Qualification);
                        cmd.Parameters.AddWithValue("@PhoneNumber", application.PhoneNumber);
                        cmd.Parameters.AddWithValue("@Skills", application.Skills);
                        cmd.Parameters.AddWithValue("@CGPA", application.CGPA);
                        cmd.Parameters.AddWithValue("@Gender", application.Gender);
                        cmd.Parameters.AddWithValue("@Location", application.Location);
                        cmd.Parameters.AddWithValue("@Email", application.Email);
                        cmd.Parameters.AddWithValue("@ResumePath", application.ResumePath);
                        cmd.Parameters.AddWithValue("@Status", application.Status);
                        cmd.Parameters.AddWithValue("@CompanyName", application.CompanyName);
                        cmd.Parameters.AddWithValue("@JobTitle", application.JobTitle);
                        cmd.Parameters.AddWithValue("@JobType", application.JobType);

                        cmd.ExecuteNonQuery();
                    }
                }
                return Ok(new { message = "Job application updated successfully!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        private string GetConnectionString()
        {
            return _configuration.GetConnectionString("jobportal");
        }
    }
}
