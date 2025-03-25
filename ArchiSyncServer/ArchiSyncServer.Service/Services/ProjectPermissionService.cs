using AutoMapper;
using ArchiSyncServer.Core;
using ArchiSyncServer.Core.DTOs;
using ArchiSyncServer.Core.Entities;
using ArchiSyncServer.Core.Iservices;
using ArchiSyncServer.Core.IRepositories;
using ArchiSyncServer.Core.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;


namespace ArchiSyncServer.Service.Services
{
    public class ProjectPermissionService : IProjectPermissionService
    {
        private readonly IProjectPermissionRepository _projectPermissionRepository;
        public ProjectPermissionService(IProjectPermissionRepository projectPermissionRepository)
        {
            _projectPermissionRepository = projectPermissionRepository;
        }

        public async Task<bool> UserHasAccess(int userId, int projectId)
        {
            return await _projectPermissionRepository.UserHasAccess(userId, projectId);
        }
    }
}
