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
        private readonly IUserRolesRepository _userRolesRepository;
        private readonly IRolesRepository _rolesRepository;
        public UserRepository(ApplicationDbContext context) : base(context)
        {
           
        }

       

        public async Task<User> GetUserByUsernameAsync(string userName)
        {
            return await _context.Users.SingleOrDefaultAsync(u => u.UserName == userName);
           
        }

        
    }


}
