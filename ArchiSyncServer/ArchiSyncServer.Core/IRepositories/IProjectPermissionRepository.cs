using ArchiSyncServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiSyncServer.Core.IRepositories
{

    public interface IProjectPermissionRepository : IGenericRepository<ProjectPermission>
    {
        Task<bool> UserHasAccess(int userId, int projectId);

    }

}
