using ArchiSyncServer.Core.Entities;
using ArchiSyncServer.Core.IRepositories;
using ArchiSyncServer.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiSyncServer.Data.Repositories
{
    public class ProjectOrFolderRepository : GenericRepository<ProjectOrFolder>, IProjectOrFolderRepository
    {
        public ProjectOrFolderRepository(ApplicationDbContext context) : base(context)
        {
        }

     
        public async Task<ProjectOrFolder> GetByIdAsync(int id)
        {
            return await _context.projectOrFolders
                .Include(p => p.Permissions) 
                .FirstOrDefaultAsync(p => p.Id == id);
        }
        public async Task<IEnumerable<ProjectOrFolder>> GetPublicProjectsAsync()
        {
            return await _context.projectOrFolders.Where(p => p.IsPublic).ToListAsync();
        }


        public async Task<ProjectOrFolder> GetByIdUserAccessibleAsync(int id,int userId)
        {
            return await _context.projectOrFolders.Where(p => p.IsPublic || p.Permissions.Any(perm => perm.UserId == userId))
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<ProjectOrFolder>> GetUserAccessibleProjectsAsync(int userId)
        {
            return await _context.projectOrFolders
                .Where(p => p.IsPublic || p.Permissions.Any(perm => perm.UserId == userId))
                .ToListAsync();
        }

        public async Task<IEnumerable<ProjectOrFolder>> GetArchitectProjectsAsync(int userId)
        {
            return await _context.projectOrFolders
                .Where(p => p.OwnerId ==userId)
                .ToListAsync();
        }

    }
}
