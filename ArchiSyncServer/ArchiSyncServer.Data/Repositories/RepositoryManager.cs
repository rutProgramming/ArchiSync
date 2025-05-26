using ArchiSyncServer.Core.Entities;
using ArchiSyncServer.Core.IRepositories;
using ArchiSyncServer.Data.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiSyncServer.Data.Repositories
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly ApplicationDbContext _context;
        private readonly IProjectRepository _ProjectRepository;
        private readonly IProjectPermissionRepository _projectPermission;
        private readonly ICommentRepository _commentRepository;
        private readonly IUserRepository _userRepository;
        private readonly IRolesRepository _rolesRepository;
        private readonly IUserRolesRepository _userRolesRepository;
        private readonly IMessageRepository _messageRepository;

        public RepositoryManager(ApplicationDbContext context)
        {
            _context = context;
            _ProjectRepository = new ProjectRepository(context);
            _projectPermission = new ProjectPermissionRepository(context);
            _commentRepository = new CommentRepository(context);
            _userRepository = new UserRepository(context);
            _rolesRepository = new RolesRepository(context);
            _userRolesRepository = new UserRolesRepository(context);
            _messageRepository = new MessageRepository(context);
        }

        public IProjectRepository Project => _ProjectRepository;
        public IProjectPermissionRepository projectPermission => _projectPermission;
        public ICommentRepository Comment => _commentRepository;
        public IUserRepository User => _userRepository;
        public IRolesRepository Roles => _rolesRepository;
        public IUserRolesRepository UserRoles => _userRolesRepository;
        public IMessageRepository Message => _messageRepository;


        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }

}
