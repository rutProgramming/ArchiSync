using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiSyncServer.Core.IRepositories
{
    public interface IRepositoryManager
    {
        IProjectRepository Project { get; }
        ICommentRepository Comment { get; }
        IUserRepository User { get; }
        IUserRolesRepository UserRoles { get; }
        IRolesRepository Roles { get; }
        IProjectPermissionRepository projectPermission { get; }
        IMessageRepository Message { get; }

        Task SaveAsync();
    }


}
