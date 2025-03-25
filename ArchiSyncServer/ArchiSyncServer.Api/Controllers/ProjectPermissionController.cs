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
    public class ProjectPermissionController : ControllerBase
    {
        private readonly IProjectPermissionService _projectPermissionService;

        public ProjectPermissionController(IProjectPermissionService projectPermissionService)
        {
            _projectPermissionService = projectPermissionService;
        }
        private int GetUserId() => int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");


       [Authorize(Policy = "UserAccess")]
        [HttpGet("{projectId}/check-permission")]
        public async Task<ActionResult<bool>> CheckUserAccess( int projectId)
        {
            var userId = GetUserId();
            if (userId == null)
            {
                return Unauthorized("User not authenticated");
            }

            var hasAccess = await _projectPermissionService.UserHasAccess(projectId, userId);
            return Ok(new { hasAccess });
        }

    }
}
