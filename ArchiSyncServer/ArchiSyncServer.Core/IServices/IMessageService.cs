using ArchiSyncServer.Core.DTOs;
using ArchiSyncServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ArchiSyncServer.Core.IServices
{
    public interface IMessageService
    {
        Task<MessageDTO> GetMessageAsync(int id);
        Task<IEnumerable<MessageDTO>> GetAllMessagesAsync();
        Task<MessageDTO> CreateMessageAsync(MessageDTO MessageDto);
        Task UpdateMessageAsync(int id, MessageDTO messageDto);
        Task DeleteMessageAsync(int id);
        Task<IEnumerable<MessageDTO>> GetAllArchitectMessagesAsync(int architectId);
        Task<IEnumerable<MessageDTO>> GetAllUserMessagesAsync(int userId);
        Task<int> GetUnreadMessagesCountAsync(int userId,string roleName);


    }
}
