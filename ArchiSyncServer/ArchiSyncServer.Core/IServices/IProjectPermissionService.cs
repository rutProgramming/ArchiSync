using ArchiSyncServer.Core.DTOs;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ArchiSyncServer.Core.IServices
{
    public interface IProjectPermissionService
    {
        Task<bool> UserHasAccess(int userId, int projectId);
        Task<ProjectPermissionDTO> GetprojectPermissionAsync(int id);

        Task<ProjectPermissionDTO> CreatePermissionAsync(ProjectPermissionDTO projectPermission);


    }
}
