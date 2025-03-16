using ArchiSyncServer.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ArchiSyncServer.Core.Iservices

{
    public interface IProjectService
    {
        Task<ProjectDTO> GetProjectAsync(int id);
        Task<IEnumerable<ProjectDTO>> GetAllProjectsAsync();
        Task<ProjectDTO> CreateProjectAsync(ProjectDTO projectDto);
        Task UpdateProjectAsync(int id, ProjectDTO projectDto);
        Task DeleteProjectAsync(int id);
    }


}
