using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using ArchiSyncServer.Core.Entities;
using ArchiSyncServer.Data.Repositories;
using ArchiSyncServer.Core.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace ArchiSyncServer.Data.Repositories
{
    public class UserRolesRepository : GenericRepository<UserRoles>, IUserRolesRepository
    {
        public UserRolesRepository(ApplicationDbContext context) : base(context)
        { }

        public async Task<UserRoles> GetRoleByUsernameAsync(string userName)
        {
            return await _dbSet.Include(ur => ur.User).Include(ur => ur.Role).FirstOrDefaultAsync(ur => ur.User.UserName == userName);
        }

    }
}



