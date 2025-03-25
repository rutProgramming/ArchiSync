using AutoMapper;
using ArchiSyncServer.Core.Entities;
using ArchiSyncServer.Core.IServices;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ArchiSyncServer.Core.DTOs;
using ArchiSyncServer.Core.IRepositories;

namespace ArchiSyncServer.Service.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IProjectRepository _ProjectRepository;
        private readonly IMapper _mapper;

        public ProjectService(IMapper mapper, IRepositoryManager repositoryManager, IProjectRepository ProjectRepository)
        {
            _mapper = mapper;
            _repositoryManager = repositoryManager;
            _ProjectRepository = ProjectRepository;
        }

        public async Task<ProjectDTO> GetProjectAsync(int id)
        {
            if (id < 0)
            {
                throw new ArgumentException("Invalid project ID.");
            }

            var project = await _ProjectRepository.GetByIdAsync(id);
            if (project == null)
            {
                return null; 
            }

            return _mapper.Map<ProjectDTO>(project);
        }

        public async Task<ProjectDTO> CreateProjectAsync(ProjectDTO projectDto)
        {
            if (projectDto == null)
            {
                throw new ArgumentNullException(nameof(projectDto), "Project data cannot be null.");
            }

            var existingProject = await _ProjectRepository.GetByIdAsync(projectDto.Id);
            if (existingProject != null)
            {
                throw new ArgumentException("Project already exists.");
            }

            var projectEntity = _mapper.Map<Project>(projectDto);
            var createdProject = await _ProjectRepository.CreateProjectAsync(projectEntity);
            await _repositoryManager.SaveAsync();

            return _mapper.Map<ProjectDTO>(createdProject);
        }

        public async Task UpdateProjectAsync(int id,ProjectDTO projectDto)
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
            await _ProjectRepository.UpdateAsync(id,updatedProject);
            await _repositoryManager.SaveAsync();
        }

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
