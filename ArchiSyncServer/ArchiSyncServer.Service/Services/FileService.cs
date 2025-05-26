using ArchiSyncServer.Core.DTOs;
using ArchiSyncServer.Core.Entities;
using ArchiSyncServer.Core.IRepositories;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using File = ArchiSyncServer.Core.Entities.File;

namespace ArchiSyncServer.Service.Services
{
    public class FileService:IFileService
    {

        private readonly IFileRepository _fileRepository;
        private readonly IMapper _mapper;
        private readonly IRepositoryManager _repositoryManager;


        public FileService(IFileRepository fileRepository, IMapper mapper, IRepositoryManager repositoryManager)
        {
            _fileRepository = fileRepository;
            _mapper = mapper;
            _repositoryManager = repositoryManager;
        }

        public async Task<IEnumerable<FileDTO>> GetAllFilesAsync(int userId, int projectId)
        {
            var hasAcsses = await _repositoryManager.projectPermission.UserHasAccess(projectId, userId);
            Project project=await _repositoryManager.Project.GetByIdAsync(projectId);
            if (hasAcsses||project.IsPublic||project.OwnerId==userId)
            {
                var files = await _fileRepository.GetFilesInProjectAsync(projectId);
                return _mapper.Map<IEnumerable<FileDTO>>(files);
            }
            else
            {
                throw new UnauthorizedAccessException("You do not have permission to access this project.");
            }
        }

        public async Task<FileDTO> GetFileAsync(int id)
        {
            if (id < 0)
            {
                throw new ArgumentException("Invalid File ID.");
            }
            var file = await _fileRepository.GetByIdAsync(id);
            if (file == null)
            {
                throw new KeyNotFoundException("File not found.");
            }
            return _mapper.Map<FileDTO>(file);
        }

        public async Task<FileDTO> CreateFileAsync(FileDTO fileDto)
        {
            if (fileDto == null)
            {
                throw new ArgumentNullException(nameof(fileDto), "File data cannot be null.");
            }

            var existing = await _fileRepository.GetByIdAsync(fileDto.Id);
            if (existing != null)
            {
                throw new ArgumentException("File already exists.");
            }

            var file = _mapper.Map<File>(fileDto);
            file.CreatedAt = DateTime.UtcNow;
            file.UpdatedAt = DateTime.UtcNow;

            var createdFile = await _fileRepository.CreateAsync(file);
            await _repositoryManager.SaveAsync();

            return _mapper.Map<FileDTO>(createdFile);
        }
        public async Task<bool> DeleteFileAsync(int id)
        {
            
                var fileDto =await GetFileAsync(id);
                fileDto.IsDeleted = true;
                var file=_mapper.Map<File>(fileDto);
                await _fileRepository.UpdateAsync(id, file);
                await _repositoryManager.SaveAsync();
                return true;
            
        }

        
    }
}
