using ArchiSyncServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiSyncServer.Core.IRepositories
{
    public interface IProjectRepository : IGenericRepository<Project>
    {
        Task<Project> GetProjectByIdAsync(int id);
        Task<IEnumerable<Project>> GetUserAccessibleProjectsAsync(int userId);
        Task<IEnumerable<Project>> GetArchitectProjectsAsync(int userId);
        Task<Project> GetByIdUserAccessibleAsync(int id, int userId);
        Task<IEnumerable<Project>> GetPublicProjectsAsync();
        Task<IEnumerable<Project>> GetAllProjectsAsync();
        Task<bool> IsProjectNameUniqueAsync(int userId, string projectTitle);
        Task<int> CountAllAsync();
        Task<List<DateTime>> GetCreateProjectDatesAsync();



    }

}
