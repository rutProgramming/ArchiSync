using AutoMapper;
using ArchiSyncServer.Core.Entities;
using ArchiSyncServer.Core.IServices;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ArchiSyncServer.Core.DTOs;
using ArchiSyncServer.Core.IRepositories;
using System.Globalization;

namespace ArchiSyncServer.Service.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IProjectRepository _ProjectRepository;
        private readonly IUserRepository _userRepository;
        private readonly IProjectPermissionService _projectPermissionService;
        private readonly IMapper _mapper;


        public ProjectService(IMapper mapper, IRepositoryManager repositoryManager, IProjectRepository ProjectRepository, IUserRepository userRepository,IProjectPermissionService projectPermissionService)
        {
            _mapper = mapper;
            _repositoryManager = repositoryManager;
            _ProjectRepository = ProjectRepository;
            _userRepository = userRepository;
            _projectPermissionService = projectPermissionService;
        }

        public async Task<ProjectDTO> GetProjectAsync(int id, int userId, string roleName)
        {
            if (id < 0)
            {
                throw new ArgumentException("Invalid project ID.");
            }

            var project = await _ProjectRepository.GetProjectByIdAsync(id);
            if (project == null)
            {
                throw new KeyNotFoundException("Project not found");
            }
            var hasAccess = await this.IsProjectAccessible(project, userId, roleName);
            if (!hasAccess)
            {
                throw new UnauthorizedAccessException("You do not have permission to access this project.");
            }
            return _mapper.Map<ProjectDTO>(project);
        }
        private async Task<bool> IsProjectAccessible(Project project, int userId, string roleName)
        {

            if (project.IsPublic || project.OwnerId == userId || roleName == RoleNames.Admin)
            {
                return true;
            }
            if (project.ProjectArchitects.Any(a => a.UserId == userId))
            {
                return true;
            }
            var accessibleProjects = await GetUserAccessibleProjectsAsync(userId);
            return accessibleProjects.Any(p => p.Id == project.Id);
        }

        public async Task<ProjectDTO> CreateProjectAsync(ProjectDTO projectDto, int ownerId)
        {
            if (projectDto == null)
                throw new ArgumentNullException(nameof(projectDto));

            var existingProject = await _ProjectRepository.GetByIdAsync(projectDto.Id);
            if (existingProject != null)
                throw new ArgumentException("Project already exists.");

            var projectEntity = _mapper.Map<Project>(projectDto);
            projectEntity.StartDate = DateTime.UtcNow;
            projectEntity.UpdatedAt = DateTime.UtcNow;

            projectEntity.EndDate = projectEntity.EndDate.HasValue
                ? TimeZoneInfo.ConvertTimeToUtc(projectEntity.EndDate.Value)
                : (DateTime?)null;
            var client = await _userRepository.GetUserByUserNameAsync(projectDto.ClientUserName);
            if (client == null)
                throw new ArgumentException("Client not found.");
            projectEntity.Client = client;

            var owner = await _userRepository.GetByIdAsync(ownerId);
            if (owner == null)
                throw new ArgumentException("Owner not found.");
            projectEntity.Owner = owner;

            if (projectDto.ArchitectUserNames != null && projectDto.ArchitectUserNames.Any())
            {
                var architects = await _userRepository.GetUsersByUserNamesAsync(projectDto.ArchitectUserNames);

                projectEntity.ProjectArchitects = architects.Select(a => new ProjectArchitect
                {
                    UserId = a.UserId,
                    Project = projectEntity
                }).ToList();
            }

            var createdProject = await _ProjectRepository.CreateAsync(projectEntity);
            await _repositoryManager.SaveAsync();
            
            await AddPermissionsToProjectAsync(createdProject.Id, client.UserId, projectEntity.ProjectArchitects.Select(pa => pa.UserId).ToList());

            return _mapper.Map<ProjectDTO>(createdProject);
        }

        private async Task AddPermissionsToProjectAsync(int projectId, int clientId, ICollection<int>? architectsIds)
        {
            await _projectPermissionService.CreatePermissionAsync(new ProjectPermissionDTO
            {
                UserId = clientId,
                ProjectId = projectId
            });

            if (architectsIds != null)
            {
                foreach (var architectId in architectsIds)
                {
                    await _projectPermissionService.CreatePermissionAsync(new ProjectPermissionDTO
                    {
                        UserId = architectId,
                        ProjectId = projectId
                    });
                }
            }
        }

        //unuse
        public async Task UpdateProjectAsync(int id, ProjectDTO projectDto)
        {
            if (projectDto == null)
            {
                throw new ArgumentNullException(nameof(projectDto), "Project data cannot be null.");
            }

            var existingProject = await _ProjectRepository.GetByIdAsync(projectDto.Id);

            if (existingProject == null)
            {
                throw new ArgumentException("Project doesn't exist.");
            }

            if (projectDto.OwnerId != existingProject.OwnerId)
            {
                throw new UnauthorizedAccessException("You do not have permission to update this project.");
            }

            var updatedProject = _mapper.Map<Project>(projectDto);
            updatedProject.UpdatedAt = DateTime.UtcNow;
            await _ProjectRepository.UpdateAsync(id, updatedProject);
            await _repositoryManager.SaveAsync();
        }

        //add delete files
        public async Task<bool> DeleteProjectAsync(int projectId)
        {
            var project = await _ProjectRepository.GetByIdAsync(projectId);
            if (project == null)
            {
                return false;
            }

            await _ProjectRepository.DeleteAsync(projectId);
            await _repositoryManager.SaveAsync();
            return true;
        }
        public async Task<IEnumerable<ProjectDTO>> GetAllProjectsAsync()
        {
            var projects = await _ProjectRepository.GetAllProjectsAsync();
            return _mapper.Map<IEnumerable<ProjectDTO>>(projects);
        }

        public async Task<IEnumerable<ProjectDTO>> GetArchitectProjectsAsync(int userId)
        {
            var projects = await _ProjectRepository.GetArchitectProjectsAsync(userId);
            return _mapper.Map<IEnumerable<ProjectDTO>>(projects);
             
        }

        public async Task<IEnumerable<ProjectDTO>> GetUserAccessibleProjectsAsync(int userId)
        {
            var projects = await _ProjectRepository.GetUserAccessibleProjectsAsync(userId);
            return _mapper.Map<IEnumerable<ProjectDTO>>(projects);
        }

        //if.. uncccery
        public async Task<IEnumerable<ProjectDTO>> GetPublicProjectsAsync()
        {
            var projects = await _ProjectRepository.GetPublicProjectsAsync();
            return _mapper.Map<IEnumerable<ProjectDTO>>(projects);
        }
        public async Task<bool> IsProjectNameUniqueAsync(int userId, string projectName)
        {
            return await _ProjectRepository.IsProjectNameUniqueAsync(userId, projectName);
        }


    }
}
