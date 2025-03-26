using ArchiSyncServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using File = ArchiSyncServer.Core.Entities.File;

namespace ArchiSyncServer.Core.IRepositories
{
    public interface IFileRepository : IGenericRepository<File>
    {
        Task<IEnumerable<File>> GetFilesInProjectAsync(int projectId);

    }


}
