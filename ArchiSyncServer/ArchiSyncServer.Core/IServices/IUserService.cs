using ArchiSyncServer.Core.DTOs;
using ArchiSyncServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ArchiSyncServer.Core.Iservices
{
    public interface IUserService
    {
        Task<UserDTO> GetUserAsync(int id);
        Task<IEnumerable<UserDTO>> GetAllUsersAsync();
        Task<UserDTO> CreateUserAsync(UserDTO userDto,string roleName);
        Task UpdateUserAsync(int id,UserDTO userDto);
        Task DeleteUserAsync(int id);
        Task<UserRoles> Authenticate(string userName,string password);

    }
}
