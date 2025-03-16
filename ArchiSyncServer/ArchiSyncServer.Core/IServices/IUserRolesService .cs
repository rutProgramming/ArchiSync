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
        Task<UserRolesDTO> GetUserRolesAsync(int id);
        Task<IEnumerable<UserRolesDTO>> GetAllUserRolesAsync();
        Task<UserRolesDTO> CreateUserRolesAsync(UserRolesDTO userRolesDto);
        Task UpdateUserRolesAsync(UserRolesDTO userRolesDto);
        Task DeleteUserRolesAsync(int id);
    }
    

}
