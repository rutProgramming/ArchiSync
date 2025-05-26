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
        Task<User> GetUserByUserNameAsync(string userName);
        Task<List<DateTime>> GetLoginDatesAsync();
        Task<int> CountUserTotal();
        Task<List<User>> GetUsersByUserNamesAsync(IEnumerable<string> userNames);

    }


}
