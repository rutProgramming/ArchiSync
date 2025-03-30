//using ArchiSyncServer.Core.IServices;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.Mvc;
//using System.Net.Http;
//using System.Text;
//using System.Threading.Tasks;
//using Newtonsoft.Json;
//namespace ArchiSyncServer.Api.Controllers
//{


//    [Route("api/[controller]")]
//    [ApiController]
//    public class ImageController : ControllerBase
//    {
//        private readonly HttpClient _httpClient;

//        public ImageController(HttpClient httpClient)
//        {
//            _httpClient = httpClient;
//        }

//        [HttpPost("generate")]
//        public async Task<IActionResult> GenerateImage([FromBody] ImageRequest request)
//        {
//            var nodeJsUrl = "http://localhost:3000/generate-image";

//            var json = JsonConvert.SerializeObject(request);
//            var content = new StringContent(json, Encoding.UTF8, "application/json");

//            var response = await _httpClient.PostAsync(nodeJsUrl, content);
//            var responseString = await response.Content.ReadAsStringAsync();

//            return Ok(responseString);
//        }
//    }

//    public class ImageRequest
//    {
//        public string Image { get; set; }
//        public int Scale { get; set; }
//        public string Prompt { get; set; }
//        public int Cn_Lineart_Strength { get; set; }
//    }

//}

using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
namespace ArchiSyncServer.Api.Controllers
{

    [ApiController]
    [Route("api")]
    public class ApiController : ControllerBase
    {
        private static int apiCallCount = 0;
        private const int maxApiCalls = 100;
        private readonly HttpClient _httpClient;

        public ApiController()
        {
            _httpClient = new HttpClient();
        }

        [HttpPost("generate-image")]
        public async Task<IActionResult> GenerateImage([FromBody] GenerateImageRequest request)
        {
            if (apiCallCount >= maxApiCalls)
            {
                return StatusCode(429, new { error = "API call limit exceeded. Please try again later." });
            }

            try
            {
                Console.WriteLine("🔄 Sending request to Replicate...");

                var replicateApiKey = Environment.GetEnvironmentVariable("REPLICATE_API_KEY") ;
                var replicateUrl = "https://api.replicate.com/v1/predictions";

                var payload = new
                {
                    version = "feb7325e48612a443356bff3d0e03af21a42570f87bee6e8ea4f275f2bd3e6f9",
                    input = new
                    {
                        image = request.Image,
                        scale = request.Scale,
                        prompt = request.Prompt,
                        cn_lineart_strength = request.CnLineartStrength
                    }
                };

                var jsonPayload = JsonConvert.SerializeObject(payload);
                var httpContent = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

                _httpClient.DefaultRequestHeaders.Add("Authorization", $"Token {replicateApiKey}");
                var response = await _httpClient.PostAsync(replicateUrl, httpContent);

                if (!response.IsSuccessStatusCode)
                {
                    Console.WriteLine("Error generating image:", response.ReasonPhrase);
                    return StatusCode(500, new { error = "Error generating image" });
                }

                var responseContent = await response.Content.ReadAsStringAsync();
                var responseData = JsonConvert.DeserializeObject<Dictionary<string, object>>(responseContent);

                apiCallCount++;
                Console.WriteLine("Image generated! Here is the link:", responseData["output"]);

                return Ok(new { imageUrl = responseData["output"] });
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error generating image:", ex.Message);
                return StatusCode(500, new { error = "Error generating image" });
            }
        }
    }

    public class GenerateImageRequest
    {
        public string Image { get; set; }
        public double Scale { get; set; }
        public string Prompt { get; set; }
        public double CnLineartStrength { get; set; }
    }
}