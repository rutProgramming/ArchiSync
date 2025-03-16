using ArchiSyncServer.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ArchiSyncServer.Core.IServices
{
    public interface IDocumentService
    {
        Task<DocumentDTO> GetDocumentAsync(int id);
        Task<IEnumerable<DocumentDTO>> GetAllDocumentsAsync();
        Task<DocumentDTO> CreateDocumentAsync(DocumentDTO documentDto);
        Task UpdateDocumentAsync(DocumentDTO documentDto);
        Task DeleteDocumentAsync(int id);
    }
}
