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
    public class ProjectRepository : GenericRepository<Project>, IProjectRepository
    {
        public ProjectRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<Project> CreateProjectAsync(Project project)
        {
           // project.ParentId = project.OwnerId;
            project.CreatedAt = DateTime.Now;
            project.UpdatedAt = DateTime.Now;
            _dbSet.Add(project);
            return project;
        }

        public async Task<Project> GetByIdAsync(int id)
        {
            return await _context.Projects
                .Include(p => p.Permissions) 
                .FirstOrDefaultAsync(p => p.Id == id);
        }
        public async Task<IEnumerable<Project>> GetPublicProjectsAsync()
        {
            return await _context.Projects.Where(p => p.IsPublic).ToListAsync();
        }

        public async Task<bool> IsProjectNameUniqueAsync(int userId, string projectName)
        {
            return !await _context.Projects.AnyAsync(p => p.OwnerId == userId && p.Name == projectName);
        }
        public async Task<Project> GetByIdUserAccessibleAsync(int id,int userId)
        {
            return await _context.Projects.Where(p => p.IsPublic || p.Permissions.Any(perm => perm.UserId == userId))
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<Project>> GetUserAccessibleProjectsAsync(int userId)
        {
            return await _context.Projects
                .Where(p => p.IsPublic || p.Permissions.Any(perm => perm.UserId == userId))
                .ToListAsync();
        }

        public async Task<IEnumerable<Project>> GetArchitectProjectsAsync(int userId)
        {
            return await _context.Projects
                .Where(p => p.OwnerId ==userId)
                .ToListAsync();
        }
        public async Task<IEnumerable<Project>> GetAllProjectsAsync()
        {
            return await _context.Projects
                .Where(p => p.Name != "Main Folder")
                .ToListAsync();
        }
    }
}
