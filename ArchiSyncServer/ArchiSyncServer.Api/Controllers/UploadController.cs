using Amazon.S3;
using Amazon.S3.Model;
using ArchiSyncServer.Core.IServices;
using Microsoft.AspNetCore.Mvc;
namespace ArchiSyncServer.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IS3Service _s3Service;
        public UploadController(IS3Service s3Server)
        {
            _s3Service = s3Server;
        }

        // ⬆️ שלב 1: קבלת URL להעלאת קובץ ל-S3
        [HttpGet("upload-url")]
        public async Task<IActionResult> GetUploadUrl([FromQuery] string parentId, [FromQuery] string projectName, [FromQuery] string fileName, [FromQuery] string contentType)
        {
            if (string.IsNullOrEmpty(parentId) || string.IsNullOrEmpty(fileName) || string.IsNullOrEmpty(projectName))
                return BadRequest("Missing userId or fileName");

            var url = await _s3Service.GeneratePresignedUrlAsync(parentId,projectName, fileName, contentType);
            return Ok(new { url });
        }

        // ⬇️ שלב 2: קבלת URL להורדת קובץ מה-S3
        [HttpGet("download-url")]
        public async Task<IActionResult> GetDownloadUrl([FromQuery] string parentId, [FromQuery] string projectName, string fileName)
        {
            var url = await _s3Service.GetDownloadUrlAsync(parentId,projectName, fileName);
            return Ok(new { downloadUrl = url });
        }
    }
}