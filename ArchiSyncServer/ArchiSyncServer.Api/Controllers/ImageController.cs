using ArchiSyncServer.Core.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ArchiSyncServer.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {




        private readonly IHuggingFaceService _huggingFaceService;

        public ImageController(IHuggingFaceService huggingFaceService)
        {
            _huggingFaceService = huggingFaceService;
        }

        [HttpPost("generate")]
        public async Task<IActionResult> GenerateImage([FromBody] string imagePath)
        {
            var imageBytes = await _huggingFaceService.GenerateImageAsync(imagePath);
            return File(imageBytes, "image/png");
        }
    }
}

