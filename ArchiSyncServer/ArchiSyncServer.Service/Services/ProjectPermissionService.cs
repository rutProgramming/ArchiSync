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
        private readonly IMapper _mapper;
        private readonly IRepositoryManager _repositoryManager;
        public ProjectPermissionService(IProjectPermissionRepository projectPermissionRepository, IMapper mapper, IRepositoryManager repositoryManager)
        {
            _projectPermissionRepository = projectPermissionRepository;
            _mapper = mapper;
            _repositoryManager = repositoryManager;
        }

        public async Task<bool> UserHasAccess(int userId, int projectId)
        {
            return await _projectPermissionRepository.UserHasAccess(userId, projectId);
        }
        public async Task<ProjectPermissionDTO> GetprojectPermissionAsync(int id)
        {
            if (id < 0)
            {
                throw new ArgumentException("Invalid projectPermission ID.");
            }
            var projectPermission = await _projectPermissionRepository.GetByIdAsync(id);
            if (projectPermission == null)
            {
                throw new KeyNotFoundException("ProjectPermission not found.");
            }
            return _mapper.Map<ProjectPermissionDTO>(projectPermission);
        }
        public async Task<ProjectPermissionDTO> CreatePermissionAsync(ProjectPermissionDTO projectPermissionDto)
        {
            if (projectPermissionDto == null)
            {
                throw new ArgumentNullException(nameof(projectPermissionDto), "ProjectPermission data cannot be null.");
            }

            var existingPermission = await _projectPermissionRepository.GetByIdAsync(projectPermissionDto.Id);
            if (existingPermission != null)
            {
                throw new ArgumentException("Permission already exists.");
            }

            var projectPermission = _mapper.Map<ProjectPermission>(projectPermissionDto);
            projectPermission.CreatedAt = DateTime.UtcNow;
            projectPermission.UpdatedAt = DateTime.UtcNow;

            var createdProjectPermission = await _repositoryManager.projectPermission.CreateAsync(projectPermission);

            await _repositoryManager.SaveAsync();

            return _mapper.Map<ProjectPermissionDTO>(createdProjectPermission);
        }

    }
}
