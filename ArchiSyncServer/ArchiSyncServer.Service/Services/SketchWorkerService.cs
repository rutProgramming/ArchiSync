using ArchiSyncServer.Core.IServices;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using System.Threading.Tasks;



namespace ArchiSyncServer.Service.Services
{
    public class SketchWorkerService : BackgroundService
    {
        private readonly ISketchJobQueueService _jobQueue;
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;
        private readonly ILogger<SketchWorkerService> _logger;
        private readonly ISketchNotifier _notifier;

        public SketchWorkerService(
            ISketchJobQueueService jobQueue,
            HttpClient httpClient,
            IConfiguration config,
            ILogger<SketchWorkerService> logger,
            ISketchNotifier notifier)
        {
            _jobQueue = jobQueue;
            _httpClient = httpClient;
            _config = config;
            _logger = logger;
            _notifier = notifier;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                var job = await _jobQueue.DequeueAsync(stoppingToken);

                try
                {
                    var requestData = new
                    {
                        version = "feb7325e48612a443356bff3d0e03af21a42570f87bee6e8ea4f275f2bd3e6f9",
                        input = new
                        {
                            seed = 0,
                            image = job.ImageUrl,
                            scale = 2,
                            prompt = job.Prompt,
                            cn_Lineart_Strength = 1
                        }
                    };

                    var json = JsonConvert.SerializeObject(requestData);
                    var content = new StringContent(json, Encoding.UTF8, "application/json");

                    _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Token", _config["REPLICATE_KEY"]);
                    var response = await _httpClient.PostAsync("https://api.replicate.com/v1/predictions", content);
                    var result = await response.Content.ReadAsStringAsync();
                    var prediction = JsonConvert.DeserializeObject<dynamic>(result);
                    var predictionId = prediction.id;

                    string statusUrl = $"https://api.replicate.com/v1/predictions/{predictionId}";

                    while (true)
                    {
                        var statusRes = await _httpClient.GetAsync(statusUrl);
                        var statusBody = await statusRes.Content.ReadAsStringAsync();
                        var statusData = JsonConvert.DeserializeObject<dynamic>(statusBody);

                        if (statusData.status == "succeeded")
                        {
                            string outputUrl = statusData.output;
                            _logger.LogInformation($"Prediction succeeded. URL: {outputUrl}");
                            await _notifier.NotifySketchCompletedAsync(job.ConnectionId, outputUrl);
                            break;
                        }
                        else if (statusData.status == "failed")
                        {
                            _logger.LogError("Prediction failed.");
                            break;
                        }

                        await Task.Delay(5000, stoppingToken);
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError($"❗ Error handling sketch job: {ex.Message}");
                }
            }
        }
    }
}

