using ArchiSyncServer.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiSyncServer.Core.IServices
{
    public interface IStatisticsService
    {
        Task<int> GetTotalProjectsAsync();
        Task<Dictionary<string, int>> GetProjectTypeCountsAsync(); 
        Task<int> GetTotalFilesAsync();
        Task<List<DailyStatDto>> GetDailyLoginStatsAsync();
        Task<List<DailyStatDto>> GetDailyProjectCreationsAsync();
        Task<int> GetTotalUsersAsync();
    }

}
