using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using ArchiSyncServer.API.Models;
using ArchiSyncServer.Core.DTOs;
using ArchiSyncServer.Core.IServices;
using System;
using ArchiSyncServer.Core.Entities;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace ArchiSyncServer.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessageController : ControllerBase
    {
        private readonly IMessageService _messageService;
        private readonly IMapper _mapper;

        public MessageController(IMessageService messageService, IMapper mapper)
        {
            _messageService = messageService;
            _mapper = mapper;
        }
        private int GetUserId() => int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");


        //============Used functions===============
       
        [Authorize(Policy = "ArchitectOnly")]
        [HttpGet("architect")]
        public async Task<ActionResult<IEnumerable<MessageDTO>>> GetArchitectMessages()
        {
            int architectId = GetUserId();
            var messages = await _messageService.GetAllArchitectMessagesAsync(architectId);
            return Ok(messages);
        }


        [Authorize(Policy = "UserAccess")]
        [HttpGet("user")]
        public async Task<ActionResult<IEnumerable<MessageDTO>>> GetUserMessages()
        {
            int userId = GetUserId();
            var messages = await _messageService.GetAllUserMessagesAsync(userId);
            return Ok(messages);
        }

        [Authorize(Policy = "UserAccess")]
        [HttpPost]
        public async Task<ActionResult<MessageDTO>> Post([FromBody] MessagePostModel messagePostModel)
        {
            try
            {
                var messageDto = _mapper.Map<MessageDTO>(messagePostModel);
                messageDto.CreatedAt = DateTime.UtcNow;
                messageDto.UpdatedAt = DateTime.UtcNow;

                var createdMessage = await _messageService.CreateMessageAsync(messageDto);
                return CreatedAtAction(nameof(Get), new { id = createdMessage.Id, createdMessage });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize(Policy = "UserAccess")]
        [HttpGet("unread-count")]
        public async Task<IActionResult> GetUnreadMessagesCount()
        {
            try
            {
                var roleName = User.FindFirst(ClaimTypes.Role)?.Value;
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                int unreadCount = await _messageService.GetUnreadMessagesCountAsync(userId, roleName);
                return Ok(new { unreadMessages = unreadCount });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        //============Unused functions for future extenion===============


        [Authorize(Policy ="AdminOnly")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MessageDTO>>> Get()
        {
            var messages = await _messageService.GetAllMessagesAsync();
            return Ok(messages);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MessageDTO>> Get(int id)
        {
            try
            {
                var message = await _messageService.GetMessageAsync(id);
                return Ok(message);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }


        [Authorize(Policy = "UserAccess")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] MessageDTO messageDto)
        {
            try
            {
                await _messageService.UpdateMessageAsync(id, messageDto);
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }


        [Authorize(Policy = "UserAccess")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _messageService.DeleteMessageAsync(id);
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message});
            }
        }
       
      
    }
}
