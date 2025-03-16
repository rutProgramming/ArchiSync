using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using ArchiSyncServer.Data.Repositories;
using ArchiSyncServer.Core.Entities;
using ArchiSyncServer.Core.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace ArchiSyncServer.Data.Repositories
{
    public class RolesRepository : GenericRepository<Roles>, IRolesRepository
    {
        public RolesRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<Roles> GetRoleByNameAsync(string roleName)
        {
            var role= await _context.Roles.SingleOrDefaultAsync(r => r.RoleName == roleName);
            return role;
        }
    }


}
