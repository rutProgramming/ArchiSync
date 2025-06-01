using ArchiSyncServer.Core.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ArchiSyncServer.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class StatisticsController : ControllerBase
    {
        private readonly IStatisticsService _statisticsService;
        
        public StatisticsController(IStatisticsService statisticsService)
        {
            _statisticsService = statisticsService;
        }

        [HttpGet("total-projects")]
        public async Task<IActionResult> GetTotalProjects()
        {
            var count = await _statisticsService.GetTotalProjectsAsync();
            return Ok(count);
        }

        [HttpGet("total-files")]
        public async Task<IActionResult> GetTotalFiles()
        {
            var count = await _statisticsService.GetTotalFilesAsync();
            return Ok(count);
        }
        [HttpGet("total-users")]
        public async Task<IActionResult> GetTotalUsers()
        {
            var count = await _statisticsService.GetTotalUsersAsync();
            return Ok(count);
        }

        [HttpGet("daily-logins")]
        public async Task<IActionResult> GetDailyLogins()
        {
            try
            {
                var data = await _statisticsService.GetDailyLoginStatsAsync();
                return Ok(data);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetDailyLogins: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("daily-projects")]
        public async Task<IActionResult> GetDailyProjectCreations()
        {
            var data = await _statisticsService.GetDailyProjectCreationsAsync();
            return Ok(data);
        }


        [HttpGet("projects-by-type")]
        public async Task<IActionResult> GetProjectTypeCounts()
        {
            var data = await _statisticsService.GetProjectTypeCountsAsync();
            return Ok(data);
        }

    }

}
