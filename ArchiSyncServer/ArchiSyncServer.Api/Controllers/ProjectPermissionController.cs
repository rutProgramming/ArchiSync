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
using ArchiSyncServer.Service.Services;

namespace ArchiSyncServer.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //============Used functions===============
    //============Unused functions for future extenion===============
    public class ProjectPermissionController : ControllerBase
    {
        private readonly IProjectPermissionService _projectPermissionService;
        private readonly IMapper _mapper;

        public ProjectPermissionController(IProjectPermissionService projectPermissionService, IMapper mapper)
        {
            _projectPermissionService = projectPermissionService;
            _mapper = mapper;
        }
        private int GetUserId() => int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");


        [Authorize(Policy = "UserAccess")]
        [HttpGet("{projectId}/check-permission")]
        public async Task<ActionResult<bool>> CheckUserAccess(int projectId)
        {
            var userId = GetUserId();
            if (userId == null)
            {
                return Unauthorized("User not authenticated");
            }

            var hasAccess = await _projectPermissionService.UserHasAccess(projectId, userId);
            return Ok(new { hasAccess });
        }

        [Authorize(Policy = "ArchitectOnly")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<MessageDTO>>> Post([FromBody] ProjectPermissionPostModel projectPermissionPostModel)
        {
            try
            {
                var projectPermissionDto = _mapper.Map<ProjectPermissionDTO>(projectPermissionPostModel);
                var createdProjectPermission = await _projectPermissionService.CreatePermissionAsync(projectPermissionDto);
                return Ok( new { id = createdProjectPermission.Id, createdProjectPermission });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

    }
}
