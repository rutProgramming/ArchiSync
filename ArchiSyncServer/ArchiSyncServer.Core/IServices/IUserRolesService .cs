using ArchiSyncServer.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ArchiSyncServer.Core.Iservices

{
    public interface IUserRolesService
    {
        Task<UserRolesDTO> CreateUserRolesAsync(int userId, string roleName);
    }
    

}
