﻿
using ArchiSyncServer.Core.DTOs;
using ArchiSyncServer.Core.Entities;
using ArchiSyncServer.Core.IRepositories;
using ArchiSyncServer.Core.IServices;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;


namespace ArchiSyncServer.Service.Services
{
    public class MessageService : IMessageService
    {
        private readonly IMessageRepository _messageRepository;
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public MessageService(IMessageRepository messageRepository, IMapper mapper, IRepositoryManager repositoryManager)
        {
            _messageRepository = messageRepository;
            _mapper = mapper;
            _repositoryManager = repositoryManager;
        }


        public async Task<MessageDTO> GetMessageAsync(int id)
        {
            if (id < 0)
            {
                throw new ArgumentException("Invalid message ID.");
            }
            var message = await _messageRepository.GetByIdAsync(id);
            if (message == null)
            {
                throw new KeyNotFoundException("Message not found.");
            }
            return _mapper.Map<MessageDTO>(message);
        }
        public async Task<IEnumerable<MessageDTO>> GetAllMessagesAsync()
        {
            var messages = await _messageRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<MessageDTO>>(messages);
        }
        public async Task<IEnumerable<MessageDTO>> GetAllArchitectMessagesAsync(int architectId)
        {
            var messages = await _messageRepository.GetAllArchitectMessagesAsync(architectId);
            return _mapper.Map<IEnumerable<MessageDTO>>(messages);
        }
        public async Task<IEnumerable<MessageDTO>> GetAllUserMessagesAsync(int userId)
        {
            var messages = await _messageRepository.GetAllUserMessagesAsync(userId);
            return _mapper.Map<IEnumerable<MessageDTO>>(messages);
        }
        public async Task<MessageDTO> CreateMessageAsync(MessageDTO messageDto)
        {
            if (messageDto == null)
            {
                throw new ArgumentNullException(nameof(messageDto), "Message data cannot be null.");
            }
            var existing = await _messageRepository.GetByIdAsync(messageDto.Id);
            if (existing != null)
            {
                throw new ArgumentException("Messsage already exists.");
            }

            var message = _mapper.Map<Message>(messageDto);
            message.CreatedAt = DateTime.UtcNow;
            message.UpdatedAt = DateTime.UtcNow;

            var createdMessage = await _messageRepository.CreateAsync(message);
            await _repositoryManager.SaveAsync();

            return _mapper.Map<MessageDTO>(createdMessage);
        }
        //וncerry
        public async Task UpdateMessageAsync(int id, MessageDTO messageDto)
        {
          
                await GetMessageAsync(id);
                var message = _mapper.Map<Message>(messageDto);
                message.UpdatedAt = DateTime.UtcNow;
                await _messageRepository.UpdateAsync(id, message);
                await _repositoryManager.SaveAsync();
           
        }

        public async Task DeleteMessageAsync(int id)
        {
            try
            {
                await GetMessageAsync(id);
                var message = await _messageRepository.GetByIdAsync(id);
                await _messageRepository.DeleteAsync(id);
            }
            catch (Exception ex)
            {
                throw new Exception("Error deleting message.", ex);
            }
        }

        public async Task<int> GetUnreadMessagesCountAsync(int userId, string roleName)
        {
            if (roleName == "architect")
            {
                return await _messageRepository.GetArchitectnreadMessagesCountAsync(userId);
            }
            else
            {
                return await _messageRepository.GetUsernreadMessagesCountAsync(userId);
            }
        }



    }
}

