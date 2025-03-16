using ArchiSyncServer.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ArchiSyncServer.Core.IServices
{
    public interface ICommentService
    {
        Task<CommentDTO> GetCommentAsync(int id);
        Task<IEnumerable<CommentDTO>> GetAllCommentsAsync();
        Task<CommentDTO> CreateCommentAsync(CommentDTO commentDto);
        Task UpdateCommentAsync(int id,CommentDTO commentDto);
        Task DeleteCommentAsync(int id);
    }
}
