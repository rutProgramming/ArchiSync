//using AutoMapper;
//using ArchiSyncServer.Core;
//using ArchiSyncServer.Core.DTOs;
//using ArchiSyncServer.Core.Entities;
//using ArchiSyncServer.Core.IRepositories;
//using ArchiSyncServer.Core.IServices;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;


using ArchiSyncServer.Core.DTOs;

//using AutoMapper;
//using ArchiSyncServer.Core;
//using ArchiSyncServer.Core.DTOs;
//using ArchiSyncServer.Core.Entities;
//using ArchiSyncServer.Core.IRepositories;
//using ArchiSyncServer.Core.IServices;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;


using ArchiSyncServer.Core.IServices;

namespace ArchiSyncServer.Service.Services
{
    public class DocumentService : IDocumentService
    {
        //        private readonly IProjectOrFolderService _documentRepository;
        //        private readonly IRepositoryManager _repositoryManager;
        //        private readonly IMapper _mapper;

        //        public DocumentService(IDocumentRepository documentRepository, IMapper mapper, IRepositoryManager repositoryManager)
        //        {
        //            _documentRepository = documentRepository;
        //            _mapper = mapper;
        //            _repositoryManager = repositoryManager;
        //        }

        //        public async Task<DocumentDTO> GetDocumentAsync(int id)
        //        {
        //            if (id < 0)
        //            {
        //                throw new ArgumentException("Invalid user ID.");
        //            }
        //            var document = await _documentRepository.GetByIdAsync(id);
        //            return _mapper.Map<DocumentDTO>(document);
        //        }

        //        public async Task<IEnumerable<DocumentDTO>> GetAllDocumentsAsync()
        //        {
        //            var documents = await _documentRepository.GetAllAsync();
        //            return _mapper.Map<IEnumerable<DocumentDTO>>(documents);
        //        }

        //        public async Task<DocumentDTO> CreateDocumentAsync(DocumentDTO documentDto)
        //        {
        //            if (documentDto == null)
        //            {
        //                throw new ArgumentNullException(nameof(documentDto), "Document data cannot be null.");
        //            }

        //            var existingDocument = await _documentRepository.GetByIdAsync(documentDto.DocumentId);
        //            if (existingDocument != null)
        //            {
        //                throw new ArgumentException("Document already exists.");
        //            }
        //            var document = _mapper.Map<Document>(documentDto);
        //            var createdDocument= await _documentRepository.CreateAsync(document);
        //            await _repositoryManager.SaveAsync();
        //            return _mapper.Map<DocumentDTO>(createdDocument);
        //        }
        //        public async Task UpdateDocumentAsync(DocumentDTO documentDto)
        //        {
        //            var document = _mapper.Map<Document>(documentDto);
        //            await _documentRepository.UpdateAsync(document);
        //            await _repositoryManager.SaveAsync();
        //        }

        //        public async Task DeleteDocumentAsync(int id)
        //        {
        //            var document = await _documentRepository.GetByIdAsync(id);
        //            await _documentRepository.DeleteAsync(id);
        //        }
        public Task<DocumentDTO> CreateDocumentAsync(DocumentDTO documentDto)
        {
            throw new NotImplementedException();
        }

        public Task DeleteDocumentAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<DocumentDTO>> GetAllDocumentsAsync()
        {
            throw new NotImplementedException();
        }

        public Task<DocumentDTO> GetDocumentAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateDocumentAsync(DocumentDTO documentDto)
        {
            throw new NotImplementedException();
        }
    }

}
