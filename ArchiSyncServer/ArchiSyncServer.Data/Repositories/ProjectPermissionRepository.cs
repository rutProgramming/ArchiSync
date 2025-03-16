
using ArchiSyncServer.Core.Entities;
using ArchiSyncServer.Core.IRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ArchiSyncServer.Data.Repositories
{
    public class ProjectPermissionRepository : GenericRepository<ProjectPermission>, IProjectPermissionRepository
    {
        public ProjectPermissionRepository(ApplicationDbContext context) : base(context)
        {
        }
        public async Task<bool> UserHasAccess(int userId, int projectId)
        {
            return await _context.ProjectPermissions
                .AnyAsync(p => p.UserId == userId && p.ProjectOrFolderId == projectId);
        }
    }

}
