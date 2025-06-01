using ArchiSyncServer.core;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using ArchiSyncServer.API.Models;
using AutoMapper;
using System;
using ArchiSyncServer.Core.Iservices;
using ArchiSyncServer.Core.DTOs;
using ArchiSyncServer.Api.Models;

namespace ArchiSyncServer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UserController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserRolesDTO>>> Get()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var user = await _userService.GetUserAsync(id);
                return Ok(user);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "User not found." });
            }
        }


        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] RegisterModel userPostModel)
        {
            try
            {
                var userDto = _mapper.Map<UserForCreationDTO>(userPostModel);
                await _userService.UpdateUserAsync(id, userDto);
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "User not found." });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                await _userService.DeleteUserAsync(id);
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "User not found." });
            }
        }
    }
}
