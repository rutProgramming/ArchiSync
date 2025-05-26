
using ArchiSyncServer.Core.DTOs;
using ArchiSyncServer.Core.Entities;
using ArchiSyncServer.Core.IRepositories;
using ArchiSyncServer.Core.IServices;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;


namespace ArchiSyncServer.Service.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public CommentService(ICommentRepository commentRepository, IMapper mapper, IRepositoryManager repositoryManager)
        {
            _commentRepository = commentRepository;
            _mapper = mapper;
            _repositoryManager = repositoryManager;
        }

        //uneccery
        public async Task<CommentDTO> GetCommentAsync(int id)
        {
            if (id < 0)
            {
                throw new ArgumentException("Invalid user ID.");
            }
            var comment = await _commentRepository.GetByIdAsync(id);
            return _mapper.Map<CommentDTO>(comment);
        }

        public async Task<IEnumerable<CommentDTO>> GetAllCommentsAsync()
        {
            var comments = await _commentRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<CommentDTO>>(comments);
        }

        public async Task<CommentDTO> CreateCommentAsync(CommentDTO commentDto)
        {
            if (commentDto == null)
            {
                throw new ArgumentNullException(nameof(commentDto), "Commet data cannot be null.");
            }

            var existingCommet = await _commentRepository.GetByIdAsync(commentDto.CommentId);
            if (existingCommet != null)
            {
                throw new ArgumentException("commet already exists.");
            }
            var comment = _mapper.Map<Comment>(commentDto);
            var createdComment = await _commentRepository.CreateAsync(comment);
            await _repositoryManager.SaveAsync();
            return _mapper.Map<CommentDTO>(createdComment);
        }

        //uneccery
        public async Task UpdateCommentAsync(int id,CommentDTO commentDto)
        {
            var comment = _mapper.Map<Comment>(commentDto);
            await _commentRepository.UpdateAsync(id,comment);
            await _repositoryManager.SaveAsync();
        }

        //unceccery
        public async Task DeleteCommentAsync(int id)
        {
            var comment = await _commentRepository.GetByIdAsync(id);
            await _commentRepository.DeleteAsync(id);
        }
    }

}

