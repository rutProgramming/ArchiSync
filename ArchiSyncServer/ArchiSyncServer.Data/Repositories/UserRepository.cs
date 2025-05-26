using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using ArchiSyncServer.Core.Entities;
using ArchiSyncServer.Data.Repositories;
using Microsoft.EntityFrameworkCore;
using ArchiSyncServer.Core.Entities;
using ArchiSyncServer.Core.IRepositories;

namespace ArchiSyncServer.Data.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
       
        public UserRepository(ApplicationDbContext context) : base(context)
        {
           
        }

        public async Task<List<DateTime>> GetLoginDatesAsync()
        {
            return await _context.Users
                .Where(u => u.LastLoginDate != null)
                .Select(u => u.LastLoginDate)
                .ToListAsync();
        }

        public async Task<User> GetUserByUserNameAsync(string userName)
        {
            return await _context.Users.SingleOrDefaultAsync(u => u.UserName == userName);
           
        }
        public async Task<List<User>> GetUsersByUserNamesAsync(IEnumerable<string> userNames)
        {
            return await _context.Users
                .Where(u => userNames.Contains(u.UserName))
                .ToListAsync();
        }

        public async Task<int> CountUserTotal()
        {
            return await _context.Users.CountAsync();
        }


    }


}
