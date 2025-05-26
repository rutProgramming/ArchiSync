using ArchiSyncServer.Core.Entities;
using ArchiSyncServer.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiSyncServer.Core.IRepositories
{

    public interface IMessageRepository : IGenericRepository<Message>
    {
        Task<IEnumerable<Message>> GetAllArchitectMessagesAsync(int archirectId);
        Task<IEnumerable<Message>> GetAllUserMessagesAsync(int userId);
        Task<int> GetUsernreadMessagesCountAsync(int userId);
        Task<int> GetArchitectnreadMessagesCountAsync(int userId);


    }


}
