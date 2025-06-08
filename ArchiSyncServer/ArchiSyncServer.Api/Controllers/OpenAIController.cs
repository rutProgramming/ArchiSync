using ArchiSyncServer.Api.Models;
using ArchiSyncServer.Core.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ArchiSyncServer.Api.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class OpenAIController : ControllerBase
    {
        private readonly IOpenAIService _openAIService;

        public OpenAIController(IOpenAIService openAIService)
        {
            _openAIService = openAIService;
        }

        [HttpPost("ask")]
        public async Task<IActionResult> Ask([FromBody] OpenAIRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Message))
                return BadRequest("Message is required.");
            try
            {
                var response = await _openAIService.GetAIResponseAsync(request.Message);

                return Ok(new { Response = response });
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, $"{ex.Message}");
            }
            
        }
    }
}
