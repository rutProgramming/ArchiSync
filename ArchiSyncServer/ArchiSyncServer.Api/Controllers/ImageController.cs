﻿using ArchiSyncServer.Core.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using Newtonsoft.Json.Linq;
using ArchiSyncServer.Api.Models;
namespace ArchiSyncServer.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SketchController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        int numApi = 0;

        public SketchController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpPost("convert")]
        public async Task<IActionResult> ConvertSketch([FromBody] SketchRequest request)
        {
            numApi++;
            if (numApi > 100)
                return StatusCode(429, "API call limit exceeded. Please try again later.");
            if (request == null || string.IsNullOrEmpty(request.ImageUrl))
                return BadRequest("Invalid request. Image URL is required.");
            string apiKey = Environment.GetEnvironmentVariable("REPLICATE_KEY");

            string apiUrl = "https://api.replicate.com/v1/predictions";

            var requestData = new
            {
                version = "feb7325e48612a443356bff3d0e03af21a42570f87bee6e8ea4f275f2bd3e6f9",
                input = new
                {
                    seed = 0,
                    image = request.ImageUrl,
                    scale = 2,
                    prompt = request.Prompt,
                    cn_Lineart_Strength = 1
                }
            };

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Token", apiKey);
            var json = JsonConvert.SerializeObject(requestData);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            try
            {
                var response = await _httpClient.PostAsync(apiUrl, content);
                var prediction = await response.Content.ReadAsStringAsync();
                dynamic predictionData = JsonConvert.DeserializeObject(prediction);
                string predictionId = predictionData.id;

                string statusUrl = $"https://api.replicate.com/v1/predictions/{predictionId}";
                while (true)
                {
                    var statusResponse = await _httpClient.GetAsync(statusUrl);
                    var statusBody = await statusResponse.Content.ReadAsStringAsync();
                    dynamic statusData = JsonConvert.DeserializeObject(statusBody);
                    JObject jsonData = JObject.Parse(statusBody);

                    string outputUrl = jsonData["output"]?.ToString();

                    if (statusData.status == "succeeded")
                    {

                        return Ok(new { imageUrl = outputUrl });
                    }
                    else if (statusData.status == "failed")
                    {

                        return StatusCode(500, "The prediction failed.");
                    }

                    await Task.Delay(5000);
                }
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
    }
}






