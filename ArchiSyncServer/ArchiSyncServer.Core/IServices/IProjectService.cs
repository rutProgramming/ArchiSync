using ArchiSyncServer.Core.DTOs;
using ArchiSyncServer.Core.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ArchiSyncServer.Core.IServices
{
    public interface IProjectService
    {

        Task<ProjectDTO> GetProjectAsync(int id,int userId,string roleName);
        Task<ProjectDTO> CreateProjectAsync(ProjectDTO project,int ownerId);
        Task UpdateProjectAsync(int id,ProjectDTO project);
        Task<bool> DeleteProjectAsync(int projectId);
        Task<IEnumerable<ProjectDTO>> GetAllProjectsAsync();

        Task<IEnumerable<ProjectDTO>> GetArchitectProjectsAsync(int userId);

        Task<IEnumerable<ProjectDTO>> GetUserAccessibleProjectsAsync(int userId);
        Task<IEnumerable<ProjectDTO>> GetPublicProjectsAsync();
        Task<bool> IsProjectNameUniqueAsync(int userId, string projectName);



    }

}
