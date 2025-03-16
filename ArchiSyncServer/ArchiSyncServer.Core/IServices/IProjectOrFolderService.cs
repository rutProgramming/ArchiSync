using ArchiSyncServer.Core.DTOs;
using ArchiSyncServer.Core.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ArchiSyncServer.Core.IServices
{
    public interface IProjectOrFolderService
    {
        Task<ProjectOrFolderDTO> GetProjectAsync(int id);
        Task<ProjectOrFolderDTO> CreateProjectAsync(ProjectOrFolderDTO project);
        Task UpdateProjectAsync(int id,ProjectOrFolderDTO project);
        Task<bool> DeleteProjectAsync(int projectId);
        Task<IEnumerable<ProjectOrFolderDTO>> GetAllProjectsAsync();

        Task<IEnumerable<ProjectOrFolderDTO>> GetArchitectProjectsAsync(int userId);

        Task<IEnumerable<ProjectOrFolderDTO>> GetUserAccessibleProjectsAsync(int userId);
        Task<IEnumerable<ProjectOrFolderDTO>> GetPublicProjectsAsync();


    }

}
