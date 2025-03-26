﻿
using ArchiSyncServer.Core.Entities;
using ArchiSyncServer.Core.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using File = ArchiSyncServer.Core.Entities.File;


namespace ArchiSyncServer.Data.Repositories
{
    public class FileRepository : GenericRepository<File>, IFileRepository
    {
        public FileRepository(ApplicationDbContext context) : base(context)
        {
            
        }
        public async Task<IEnumerable<File>> GetFilesInProjectAsync(int projectId)
        {
            return _context.File
           .Where(f => f.ProjectId == projectId && !f.IsDeleted)
           .ToList();
        }

    }

}
