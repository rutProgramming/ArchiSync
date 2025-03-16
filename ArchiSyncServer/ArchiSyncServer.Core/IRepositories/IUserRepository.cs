using ArchiSyncServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiSyncServer.Core.IRepositories
{
    public interface IUserRepository : IGenericRepository<User>
    {
         Task<User> GetUserByUsernameAsync(string userName);
    }


}
