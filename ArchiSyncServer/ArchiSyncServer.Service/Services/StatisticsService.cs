using ArchiSyncServer.Core.DTOs;
using ArchiSyncServer.Core.IRepositories;
using ArchiSyncServer.Core.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiSyncServer.Service.Services
{
    public class StatisticsService : IStatisticsService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IFileRepository _fileRepository;
        private readonly IUserRepository _userRepository;

        public StatisticsService(
            IProjectRepository projectRepository,
            IFileRepository fileRepository,
            IUserRepository userRepository)
        {
            _projectRepository = projectRepository;
            _fileRepository = fileRepository;
            _userRepository = userRepository;
        }

        public async Task<int> GetTotalProjectsAsync()
        {
            return await _projectRepository.CountAllAsync();
        }

        public async Task<Dictionary<string, int>> GetProjectTypeCountsAsync()
        {
            var allProjects = await _projectRepository.GetAllAsync();
            return allProjects
                .GroupBy(p => p.IsPublic ? "Public" : "Private")
                .ToDictionary(g => g.Key, g => g.Count());
        }

        public async Task<int> GetTotalFilesAsync()
        {
            return await _fileRepository.CountAllAsync();
        }
        public async Task<int> GetTotalUsersAsync()
        {
            return await _userRepository.CountUserTotal();
        }

        public async Task<List<DailyStatDto>> GetDailyLoginStatsAsync()
        {
            var logins = await _userRepository.GetLoginDatesAsync();
            return logins
                .GroupBy(date => date.Date)
                .Select(g => new DailyStatDto
                {
                    Date = g.Key,
                    Count = g.Count()
                })
                .OrderBy(d => d.Date)
                .ToList();
        }

        public async Task<List<DailyStatDto>> GetDailyProjectCreationsAsync()
        {
            var creations= await _projectRepository.GetCreateProjectDatesAsync();
            return creations
                .GroupBy(date => date.Date)
                .Select(g => new DailyStatDto
                {
                    Date = g.Key,
                    Count = g.Count()
                })
                .OrderBy(x => x.Date)
                .ToList();
        }

    }


}
