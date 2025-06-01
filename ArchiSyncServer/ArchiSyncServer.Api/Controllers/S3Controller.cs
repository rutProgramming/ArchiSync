using Amazon.S3;
using Amazon.S3.Model;
using ArchiSyncServer.Core.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
namespace ArchiSyncServer.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class S3Controller : ControllerBase
    {
       
        private readonly IS3Service _s3Service;
        public S3Controller(IS3Service s3Server)
        {
            _s3Service = s3Server;
        }

        [Authorize(Policy = "ArchitectOnly")]
        [HttpGet("upload-url")]
        public async Task<IActionResult> GetUploadUrl( [FromQuery] string projectName, [FromQuery] string fileName, [FromQuery] string contentType)
        {
            if ( string.IsNullOrEmpty(fileName) || string.IsNullOrEmpty(projectName))
                return BadRequest("Missing userId or fileName");

            var url = await _s3Service.GeneratePresignedUrlAsync(projectName, fileName, contentType);
            return Ok(new { url });
        }

        [Authorize(Policy = "UserAccess")]
        [HttpGet("download-url")]
        public async Task<IActionResult> GetDownloadUrl([FromQuery] string S3key)
            {
            var url = await _s3Service.GetDownloadUrlAsync(S3key);
            return Ok( url);
        }

        [Authorize(Policy = "UserAccess")]
        [HttpGet("download")]
        public async Task<IActionResult> DownloadFileFromUrl([FromQuery] string fileUrl)
        {
            if (string.IsNullOrEmpty(fileUrl))
                return BadRequest("File URL is required.");

            try
            {
                var (content, contentType, fileName) = await _s3Service.DownloadFileAsync(fileUrl);
                return File(content, contentType, fileName);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (HttpRequestException ex)
            {
                return StatusCode((int)(ex.StatusCode ?? HttpStatusCode.InternalServerError), ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Server error: {ex.Message}");
            }
        }
    }
}