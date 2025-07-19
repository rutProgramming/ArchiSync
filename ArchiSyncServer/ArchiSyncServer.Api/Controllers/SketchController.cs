using ArchiSyncServer.Api.Models;
using ArchiSyncServer.Core.DTOs;
using ArchiSyncServer.Core.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ArchiSyncServer.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SketchController : ControllerBase
    {
        private readonly ISketchJobQueueService _jobQueue;
       
        public SketchController(ISketchJobQueueService jobQueue)
        {
            _jobQueue = jobQueue;
        }

        [Authorize(Policy = "ArchitectOnly")]
        [HttpPost("convert")]
        public IActionResult ConvertSketch([FromBody] SketchRequest request)
        {
            try
            {
                Console.WriteLine("in ai convert");
                if (string.IsNullOrEmpty(request.ImageUrl) || string.IsNullOrEmpty(request.ConnectionId))
                    return BadRequest("ImageUrl and ConnectionId are required");

                var job = new SketchJobDTO
                {
                    ImageUrl = request.ImageUrl,
                    Prompt = request.Prompt,
                    ConnectionId = request.ConnectionId
                };

                _jobQueue.Enqueue(job);
                return Accepted(new
                {
                    message = "Your request is being processed.",

                });
            }
            catch(InvalidOperationException ex)
            {
                return StatusCode(429, new { error = ex.Message });
            }
        }
    }
}

