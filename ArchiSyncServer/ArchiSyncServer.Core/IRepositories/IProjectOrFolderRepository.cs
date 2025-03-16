using ArchiSyncServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiSyncServer.Core.IRepositories
{
    public interface IProjectOrFolderRepository : IGenericRepository<ProjectOrFolder>
    {
        Task<ProjectOrFolder> GetByIdAsync(int id);
        Task<IEnumerable<ProjectOrFolder>> GetUserAccessibleProjectsAsync(int userId);
        Task<IEnumerable<ProjectOrFolder>> GetArchitectProjectsAsync(int userId);
        Task<ProjectOrFolder> GetByIdUserAccessibleAsync(int id, int userId);
        Task<IEnumerable<ProjectOrFolder>> GetPublicProjectsAsync();


    }

}
