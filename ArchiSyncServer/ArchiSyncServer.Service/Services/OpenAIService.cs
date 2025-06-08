using ArchiSyncServer.Core.IServices;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;
using System.Net.Http.Headers;
using Amazon.Runtime.Internal.Util;
using Microsoft.Extensions.Logging;

namespace ArchiSyncServer.Service.Services
{


    public class OpenAIService : IOpenAIService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private readonly ILogger<OpenAIService> _logger;


        public OpenAIService(IConfiguration configuration, ILogger<OpenAIService> logger)
        {
            _httpClient = new HttpClient();
            _apiKey = configuration["OPEN_AI_KEY"];
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);
            _logger = logger;
        }

        public async Task<string> GetAIResponseAsync(string message)
        {
            var payload = new
            {
                model = "gpt-3.5-turbo",
                messages = new[]
                {
                new { role = "user", content = message }
            }
            };

            var content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("https://api.openai.com/v1/chat/completions", content);
            Console.WriteLine(response.StatusCode + "ai:  " + _apiKey);
            _logger.LogInformation("API KEY: {key}", _apiKey);

            if (!response.IsSuccessStatusCode)
                throw new HttpRequestException("Error contacting OpenAI");
            

            var responseString = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(responseString);
            return doc.RootElement.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();
        }
    }



}
