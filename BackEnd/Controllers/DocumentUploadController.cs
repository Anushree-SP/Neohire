using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Data.SqlClient;

namespace JobPortalForFreshers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentUploadController : ControllerBase
    {
        [HttpPost]
        [Route("UploadResumeFile")]
        public async Task<IActionResult> UploadFile(IFormFile file, string userId, int jobId)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("Invalid file.");
            }

            var filename = $"{Guid.NewGuid()}_{file.FileName}";
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads\\Documents", filename);

            try
            {

                if (!Directory.Exists(Path.GetDirectoryName(filePath)))
                {
                    Directory.CreateDirectory(Path.GetDirectoryName(filePath));
                }

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // Save file details in SQL Server
                using (SqlConnection conn = new SqlConnection("Server=ANU\\SQLEXPRESS;Database=JOBPORTAL;Integrated Security=True;Encrypt=True;Trust Server Certificate=True"))
                {
                    string query = "INSERT INTO ResumeFiles (UserId, JobId, FileName, FilePath) VALUES (@UserId, @JobId, @FileName, @FilePath)";
                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    {
                        cmd.Parameters.AddWithValue("@UserId", userId);
                        cmd.Parameters.AddWithValue("@JobId", jobId);
                        cmd.Parameters.AddWithValue("@FileName", filename);
                        cmd.Parameters.AddWithValue("@FilePath", filePath);

                        conn.Open();
                        cmd.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(new { FileName = filename, FilePath = filePath });
        }
        [HttpGet]
        [Route("DownloadResumeFile")]
        public async Task<IActionResult> DownloadFile(string userId, int jobId)
        {
            string filePath = string.Empty;
            string fileName = string.Empty;

            try
            {
                using (SqlConnection conn = new SqlConnection("Server=ANU\\SQLEXPRESS;Database=JOBPORTAL;Integrated Security=True;Trust Server Certificate=True"))

                {
                    string query = "SELECT FilePath, FileName FROM ResumeFiles WHERE UserId = @UserId AND JobId = @JobId";
                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    {
                        cmd.Parameters.AddWithValue("@UserId", userId);
                        cmd.Parameters.AddWithValue("@JobId", jobId);

                        conn.Open();
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                filePath = reader["FilePath"].ToString();
                                fileName = reader["FileName"].ToString();
                            }
                            else
                            {
                                return NotFound("Resume not found.");
                            }
                        }
                    }
                }

                var provider = new FileExtensionContentTypeProvider();
                if (!provider.TryGetContentType(filePath, out var contentType))
                {
                    contentType = "application/octet-stream";
                }

                var bytes = await System.IO.File.ReadAllBytesAsync(filePath);
                return File(bytes, contentType, fileName);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
