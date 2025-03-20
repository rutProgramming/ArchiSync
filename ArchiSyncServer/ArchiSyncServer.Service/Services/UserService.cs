﻿using AutoMapper;
using ArchiSyncServer.Core;
using ArchiSyncServer.Core.DTOs;
using ArchiSyncServer.Core.Entities;
using ArchiSyncServer.Core.Iservices;
using ArchiSyncServer.Core.IRepositories;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace ArchiSyncServer.Service.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IUserRolesRepository _userRolesRepository;
        private readonly IRolesRepository _rolesRepository;
        private readonly IRepositoryManager _repositoryManager;

        public UserService(IUserRepository userRepository, IMapper mapper, IUserRolesRepository userRolesRepository, IRolesRepository rolesRepository, IRepositoryManager repositoryManager)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _userRolesRepository = userRolesRepository;
            _rolesRepository = rolesRepository;
            _repositoryManager = repositoryManager;
        }

        public async Task<UserDTO> GetUserAsync(int id)
        {
            if (id < 0)
            {
                throw new ArgumentException("Invalid user ID.");
            }

            var user = await _userRepository.GetByIdAsync(id);
            return _mapper.Map<UserDTO>(user);
        }

        public async Task<IEnumerable<UserDTO>> GetAllUsersAsync()
        {
            var users = await _userRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<UserDTO>>(users);
        }

        public async Task<UserDTO> CreateUserAsync(UserDTO userDto, string roleName)
        {
            if (userDto == null)
            {
                throw new ArgumentNullException(nameof(userDto), "User data cannot be null.");
            }

            var existingUser = await _userRepository.GetUserByUsernameAsync(userDto.UserName);
            if (existingUser != null)
            {
                throw new ArgumentException("User already exists.");
            }

            var user = _mapper.Map<User>(userDto);
            user.PasswordHash = PasswordHasher.HashPassword(userDto.PasswordHash);
            user.CreatedAt = DateTime.UtcNow;
            user.UpdatedAt = DateTime.UtcNow;

            Project createMainFolderProjects = null;

            if (roleName == "architect")
            {
                createMainFolderProjects = new Project()
                {
                    Name = "Main Folder",
                    Owner = user,  
                    Description = "main folder",
                    IsPublic = false,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                user.MainFolder = createMainFolderProjects;
            }

            var createdUser = await _repositoryManager.User.CreateAsync(user);

            var role = await _rolesRepository.GetRoleByNameAsync(roleName);
            var createdUserRole = await _repositoryManager.UserRoles.CreateAsync(new UserRoles() { User = createdUser, Role = role });

            if (createdUserRole == null || createdUser == null)
            {
                throw new ArgumentException("User creation failed.");
            }

            await _repositoryManager.SaveAsync();
            return _mapper.Map<UserDTO>(createdUser);
        }

        public async Task UpdateUserAsync(int id, UserDTO userDto)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
            {
                throw new KeyNotFoundException($"User with ID {id} not found.");
            }
            user = _mapper.Map<User>(userDto);
            user.PasswordHash = PasswordHasher.HashPassword(userDto.PasswordHash);
            user.UpdatedAt = DateTime.UtcNow;
            await _repositoryManager.User.UpdateAsync(id, user);
            await _repositoryManager.SaveAsync();
        }

        public async Task DeleteUserAsync(int id)
        {
            var user = await GetUserAsync(id);
            await _userRepository.DeleteAsync(id);
        }

        public async Task<UserRoles> Authenticate(string userName, string password)
        {
            var user = await _userRepository.GetUserByUsernameAsync(userName);
            
            if (user == null || !PasswordHasher.VerifyPassword(password, user.PasswordHash))
                throw new ArgumentException("Invalid user details.");

            var userRole = await _userRolesRepository.GetRoleByUsernameAsync(user.UserName);

            if (userRole == null)
                return null;

            return userRole;
        }


    }
}
