using ArchiSyncServer.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiSyncServer.Service.Services
{
    public interface IFileService
    {
        Task<IEnumerable<FileDTO>> GetAllFilesAsync(int userId, int projectId,bool isPublic);
        Task<FileDTO> GetFileAsync(int id);
        Task<FileDTO> CreateFileAsync(FileDTO fileDto);
        Task<bool> DeleteFileAsync(int id);
    }
}
