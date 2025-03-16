using AutoMapper;
using ArchiSyncServer.Core;
using ArchiSyncServer.Core.DTOs;
using ArchiSyncServer.Core.Entities;
using ArchiSyncServer.Core.Iservices;
using ArchiSyncServer.Core.IRepositories;
using ArchiSyncServer.Core.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;


namespace ArchiSyncServer.Service.Services
{
    public class UserRolesService : IUserRolesService
    {
        private readonly IMapper _mapper;
        private readonly IUserRolesRepository _userRolesRepository;
        private readonly IRolesRepository _rolesRepository;

        public UserRolesService(IMapper mapper, IUserRolesRepository userRolesRepository,IRolesRepository rolesRepository)
        {
            _mapper = mapper;
            _userRolesRepository = userRolesRepository;
            _rolesRepository = rolesRepository;
        }


        public async Task<UserRolesDTO> CreateUserRolesAsync(int userId, string roleName)
        {
            var role = await _rolesRepository.GetRoleByNameAsync(roleName);
            if (role == null)
            {
                throw new ArgumentException("Role does not exist.");
            }
            UserRolesDTO userRoleDto = new UserRolesDTO()
            {
                userId = userId,
                RoleId = role.Id
            };
            var userRole = _mapper.Map<UserRoles>(userRoleDto);
            var createdUser = await _userRolesRepository.CreateAsync(userRole);
            return _mapper.Map<UserRolesDTO>(createdUser);

        }

        public Task<UserRolesDTO> CreateUserRolesAsync(UserRolesDTO userRolesDto)
        {
            throw new NotImplementedException();
        }

        public Task DeleteUserRolesAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<UserRolesDTO>> GetAllUserRolesAsync()
        {
            throw new NotImplementedException();
        }

        public Task<UserRolesDTO> GetUserRolesAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateUserRolesAsync(UserRolesDTO userRolesDto)
        {
            throw new NotImplementedException();
        }
    }
}
