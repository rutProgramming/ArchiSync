using AutoMapper;
using ArchiSyncServer.Core;
using ArchiSyncServer.Core.DTOs;
using ArchiSyncServer.Core.Entities;
using ArchiSyncServer.Core.Iservices;
using ArchiSyncServer.Core.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;


namespace ArchiSyncServer.Service.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public ProjectService(IProjectRepository projectRepository, IMapper mapper, IRepositoryManager repositoryManager)
        {
            _projectRepository = projectRepository;
            _mapper = mapper;
            _repositoryManager = repositoryManager;
        }

        public async Task<ProjectDTO> GetProjectAsync(int id)
        {
            if (id < 0)
            {
                throw new ArgumentException("Invalid user ID.");
            }
            var project = await _projectRepository.GetByIdAsync(id);
            return _mapper.Map<ProjectDTO>(project);
        }

        public async Task<IEnumerable<ProjectDTO>> GetAllProjectsAsync()
        {
            var projects = await _projectRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<ProjectDTO>>(projects);
        }

        public async Task<ProjectDTO> CreateProjectAsync(ProjectDTO projectDto)
        {
            if (projectDto == null)
            {
                throw new ArgumentNullException(nameof(projectDto), "Project data cannot be null.");
            }

            var existingProject = await _projectRepository.GetByIdAsync(projectDto.Id);
            if (existingProject != null)
            {
                throw new ArgumentException("Project already exists.");
            }
            var project = _mapper.Map<Project>(projectDto);
            var createdProgect= await _projectRepository.CreateAsync(project);
            await _repositoryManager.SaveAsync();
            return _mapper.Map<ProjectDTO>(createdProgect);
        }
        

        public async Task UpdateProjectAsync(int id,ProjectDTO projectDto)
        {
            var project = _mapper.Map<Project>(projectDto);
            await _projectRepository.UpdateAsync(id,project);
            await _repositoryManager.SaveAsync();
        }

        public async Task DeleteProjectAsync(int id)
        {
            var project = await _projectRepository.GetByIdAsync(id);
            await _projectRepository.DeleteAsync(id);
        }
    }


  

}
