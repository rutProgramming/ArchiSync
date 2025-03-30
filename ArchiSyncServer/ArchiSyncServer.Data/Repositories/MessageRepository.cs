
using ArchiSyncServer.Core.DTOs;
using ArchiSyncServer.Core.Entities;
using ArchiSyncServer.Core.IRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ArchiSyncServer.Data.Repositories
{
    public class MessageRepository : GenericRepository<Message>, IMessageRepository
    {
        public MessageRepository(ApplicationDbContext context) : base(context)
        {
        }
        public async Task<IEnumerable<Message>> GetAllArchitectMessagesAsync(int architectId)
        {
            return await _context.Messages
                   .Where(m => m.ArchitectId == architectId)
                   .ToListAsync();
        }
        public async Task<IEnumerable<Message>> GetAllUserMessagesAsync(int userId)
        {
            return await _context.Messages
                .Where(m => m.UserId == userId)
                .ToListAsync();
        }
        public async Task<int> GetUsernreadMessagesCountAsync(int userId)
        {
            return await _context.Messages
               .Where(m => m.UserId == userId&&!m.UserIsRead).CountAsync();
        }

        public async Task<int> GetArchitectnreadMessagesCountAsync(int userId)
        {
            return await _context.Messages
               .Where(m => m.ArchitectId == userId && !m.ArchitectIsRead).CountAsync();
        }


    }

}


