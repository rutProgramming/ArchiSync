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

        //public async Task<Project> CreateProjectAsync(Project project)
        //{

        //    _dbSet.Add(project);
        //    return project;
        //}

        public async Task<Project> GetProjectByIdAsync(int id)
        {
            return await _context.Projects
                .Include(p => p.Permissions)
                .Include(p => p.Owner)
                .Include(p => p.Client)
                .Include(p => p.ProjectArchitects)
                .ThenInclude(pa => pa.Architect)
                .FirstOrDefaultAsync(p => p.Id == id);
        }
        //יהיה מיתר אם יוסיפו בריאקט
        public async Task<IEnumerable<Project>> GetPublicProjectsAsync()
        {
            return await _context.Projects.Where(p => p.IsPublic).Include(p => p.Owner).ToListAsync();
        }

        public async Task<bool> IsProjectNameUniqueAsync(int userId, string projectTitle)
        {
            return !await _context.Projects.AnyAsync(p => p.OwnerId == userId && p.Title == projectTitle);
        }
        //הוספתי את הבעלים לא בטוח שצריך
        //int the tow following function
        public async Task<Project> GetByIdUserAccessibleAsync(int id, int userId)
        {
            return await _context.Projects.Where(p => p.IsPublic || p.Permissions.Any(perm => perm.UserId == userId || p.OwnerId == userId))
                .FirstOrDefaultAsync(p => p.Id == id);
        }
        public async Task<IEnumerable<Project>> GetUserAccessibleProjectsAsync(int userId)
        {
            return await _context.Projects
                .Where(p => p.IsPublic || p.Permissions.Any(perm => perm.UserId == userId) | p.OwnerId == userId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Project>> GetArchitectProjectsAsync(int userId)
        {
            return await _context.Projects
                .Where(p => p.OwnerId == userId || p.ProjectArchitects.Any(pa => pa.UserId == userId))
                .Include(p => p.Owner)
                .Include(p=>p.Client)
                .Include(p => p.ProjectArchitects)
                .ThenInclude(pa => pa.Architect)  
                .ToListAsync();
        }

        public async Task<IEnumerable<Project>> GetAllProjectsAsync()
        {
            return await _context.Projects.Include(p => p.Owner).Include(p => p.ProjectArchitects).ThenInclude(a=>a.Architect).ToListAsync();
        }
        public async Task DeleteProjectsByOwner(int ownerId)
        {
            var projects = _context.Projects.Where(p => p.OwnerId == ownerId);

            _context.Projects.RemoveRange(projects);

        }

        public async Task<int> CountAllAsync()
        {
            return await _context.Projects.CountAsync();
        }
        public async Task<List<DateTime>> GetCreateProjectDatesAsync()
        {
            return await _context.Projects
                           .Where(u => u.StartDate != null)
                           .Select(u => u.StartDate)
                           .ToListAsync();
        }
    }
}
