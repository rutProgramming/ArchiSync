//using ArchiSyncServer.Core.IServices;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using System.Net.Http;
//using System.Text;
//using System.Threading.Tasks;
//using Newtonsoft.Json;
//using System.Net.Http.Headers;
//using Newtonsoft.Json.Linq;
//using ArchiSyncServer.Api.Models;
//using Amazon.Runtime.Internal.Endpoints.StandardLibrary;
//namespace ArchiSyncServer.Api.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class SketchController : ControllerBase
//    {
//        private readonly HttpClient _httpClient;
//        private readonly IConfiguration _configuration;
//        int numApi = 0;

//        public SketchController(HttpClient httpClient, IConfiguration configuration)
//        {
//            _httpClient = httpClient;
//            _configuration = configuration;
//        }

//        [HttpPost("convert")]
//        public async Task<IActionResult> ConvertSketch([FromBody] SketchRequest request)
//        {
//            Console.WriteLine(request.ImageUrl);
//            numApi++;
//            if (numApi > 100)
//                return StatusCode(429, "API call limit exceeded. Please try again later.");
//            if (request == null || string.IsNullOrEmpty(request.ImageUrl))
//                return BadRequest("Invalid request. Image URL is required.");
//            string apiKey = _configuration["REPLICATE_KEY"];

//            string apiUrl = "https://api.replicate.com/v1/predictions";

//            var requestData = new
//            {
//                version = "feb7325e48612a443356bff3d0e03af21a42570f87bee6e8ea4f275f2bd3e6f9",
//                input = new
//                {
//                    seed = 0,
//                    image = request.ImageUrl,
//                    scale = 2,
//                    prompt = request.Prompt,
//                    cn_Lineart_Strength = 1
//                }
//            };
//            Console.WriteLine("requestData: " + requestData + ", " + requestData.input.image);

//            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Token", apiKey);
//            var json = JsonConvert.SerializeObject(requestData);
//            var content = new StringContent(json, Encoding.UTF8, "application/json");
//            Console.WriteLine($"URL: {apiUrl}");
//            Console.WriteLine($"Content: {await content.ReadAsStringAsync()}");

//            foreach (var header in _httpClient.DefaultRequestHeaders)
//            {
//                Console.WriteLine($"Header: {header.Key} = {string.Join(",", header.Value)}");
//            }

//            try
//            {
//                Console.WriteLine(content + ", " + apiKey);
//                var response = await _httpClient.PostAsync(apiUrl, content);
//                Console.WriteLine(response);
//                var prediction = await response.Content.ReadAsStringAsync();
//                dynamic predictionData = JsonConvert.DeserializeObject(prediction);
//                string predictionId = predictionData.id;

//                string statusUrl = $"https://api.replicate.com/v1/predictions/{predictionId}";
//                Console.WriteLine(statusUrl);
//                while (true)
//                {
//                    var statusResponse = await _httpClient.GetAsync(statusUrl);
//                    var statusBody = await statusResponse.Content.ReadAsStringAsync();
//                    dynamic statusData = JsonConvert.DeserializeObject(statusBody);
//                    JObject jsonData = JObject.Parse(statusBody);

//                    string outputUrl = jsonData["output"]?.ToString();
//                    Console.WriteLine(outputUrl);
//                    if (statusData.status == "succeeded")
//                    {

//                        return Ok(new { imageUrl = outputUrl });
//                    }
//                    else if (statusData.status == "failed")
//                    {

//                        return StatusCode(500, "The prediction failed.");
//                    }

//                    await Task.Delay(5000);
//                }
//            }
//            catch (Exception ex)
//            {
//                Console.WriteLine(ex);
//                return StatusCode(500, $"Error: {ex.Message}");
//            }
//        }
//    }
//}




using ArchiSyncServer.Api.Models;
using ArchiSyncServer.Core.DTOs; 
using ArchiSyncServer.Core.Entities; 
using ArchiSyncServer.Core.IServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ArchiSyncServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SketchController : ControllerBase
    {
        private readonly ISketchJobQueueService _jobQueue;
        private readonly ILogger<SketchController> _logger;

        public SketchController(ISketchJobQueueService jobQueue, ILogger<SketchController> logger)
        {
            _jobQueue = jobQueue;
            _logger = logger;
        }

        [HttpPost("convert")]
        public IActionResult ConvertSketch([FromBody] SketchRequest request)
        {
            // אם לא נמסרה URL של תמונה
            if (string.IsNullOrEmpty(request.ImageUrl))
            {
                _logger.LogWarning("ImageUrl is required.");
                return BadRequest("ImageUrl is required");
            }

            // יצירת Job חדש עם ה-ImageUrl וה-Prompt שנמסרו בבקשה
            var job = new SketchJobDTO
            {
                ImageUrl = request.ImageUrl,
                Prompt = request.Prompt
            };

            try
            {
                // הוספת העבודה לתור
                _jobQueue.Enqueue(job);
                _logger.LogInformation($"Job added to the queue for image URL: {request.ImageUrl}");

                // מחזירים תגובה למשתמש שהבקשה בתהליך
                return Accepted("Your request is being processed.");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error occurred while adding job to the queue: {ex.Message}");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }
    }
}


