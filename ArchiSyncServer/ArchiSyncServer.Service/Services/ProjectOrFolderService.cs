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
    public class ProjectOrFolderService : IProjectOrFolderService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IProjectOrFolderRepository _projectOrFolderRepository;
        private readonly IMapper _mapper;

        public ProjectOrFolderService(IMapper mapper, IRepositoryManager repositoryManager, IProjectOrFolderRepository projectOrFolderRepository)
        {
            _mapper = mapper;
            _repositoryManager = repositoryManager;
            _projectOrFolderRepository = projectOrFolderRepository;
        }

        public async Task<ProjectOrFolderDTO> GetProjectAsync(int id)
        {
            if (id < 0)
            {
                throw new ArgumentException("Invalid project ID.");
            }

            var project = await _projectOrFolderRepository.GetByIdAsync(id);
            if (project == null)
            {
                return null; 
            }

            return _mapper.Map<ProjectOrFolderDTO>(project);
        }

        public async Task<ProjectOrFolderDTO> CreateProjectAsync(ProjectOrFolderDTO projectDto)
        {
            if (projectDto == null)
            {
                throw new ArgumentNullException(nameof(projectDto), "Project data cannot be null.");
            }

            var existingProject = await _projectOrFolderRepository.GetByIdAsync(projectDto.Id);
            if (existingProject != null)
            {
                throw new ArgumentException("Project already exists.");
            }

            var projectEntity = _mapper.Map<ProjectOrFolder>(projectDto);
            var createdProject = await _projectOrFolderRepository.CreateAsync(projectEntity);
            await _repositoryManager.SaveAsync();

            return _mapper.Map<ProjectOrFolderDTO>(createdProject);
        }

        public async Task UpdateProjectAsync(int id,ProjectOrFolderDTO projectDto)
        {
            if (projectDto == null)
            {
                throw new ArgumentNullException(nameof(projectDto), "Project data cannot be null.");
            }

            var existingProject = await _projectOrFolderRepository.GetByIdAsync(projectDto.Id);
            if (existingProject == null)
            {
                throw new ArgumentException("Project doesn't exist.");
            }

            if (projectDto.OwnerId != existingProject.OwnerId)
            {
                throw new UnauthorizedAccessException("You do not have permission to update this project.");
            }

            var updatedProject = _mapper.Map<ProjectOrFolder>(projectDto);
            await _projectOrFolderRepository.UpdateAsync(id,updatedProject);
            await _repositoryManager.SaveAsync();
        }

        public async Task<bool> DeleteProjectAsync(int projectId)
        {
            var project = await _projectOrFolderRepository.GetByIdAsync(projectId);
            if (project == null)
            {
                return false;
            }

            await _projectOrFolderRepository.DeleteAsync(projectId);
            await _repositoryManager.SaveAsync();
            return true;
        }
        public async Task<IEnumerable<ProjectOrFolderDTO>> GetAllProjectsAsync()
        {
            var projects = await _projectOrFolderRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<ProjectOrFolderDTO>>(projects);
        }

        public async Task<IEnumerable<ProjectOrFolderDTO>> GetArchitectProjectsAsync(int userId)
        {
            var projects = await _projectOrFolderRepository.GetArchitectProjectsAsync(userId);
            return _mapper.Map<IEnumerable<ProjectOrFolderDTO>>(projects);
        }

        public async Task<IEnumerable<ProjectOrFolderDTO>> GetUserAccessibleProjectsAsync(int userId)
        {
            var projects = await _projectOrFolderRepository.GetUserAccessibleProjectsAsync(userId);
            return _mapper.Map<IEnumerable<ProjectOrFolderDTO>>(projects);
        }
        public async Task<IEnumerable<ProjectOrFolderDTO>> GetPublicProjectsAsync()
        {
            var projects = await _projectOrFolderRepository.GetPublicProjectsAsync();
            return _mapper.Map<IEnumerable<ProjectOrFolderDTO>>(projects);
        }

    }
}
