﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ArchiSyncServer.Core.DTOs;
using ArchiSyncServer.Core.IServices;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using ArchiSyncServer.API.Models;
using AutoMapper;

namespace ArchiSyncServer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _ProjectService;
        private readonly IMapper _mapper;

        public ProjectController(IProjectService ProjectService, IMapper mapper)
        {
            _ProjectService = ProjectService;
            _mapper = mapper;
        }

        private int GetUserId() => int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
        private string GetUserRole() => User.FindFirst(ClaimTypes.Role)?.Value ?? "";


        //============Used functions===============

        [Authorize(Policy = "ArchitectOnly")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ProjectPostModel projectPostModel)
        {
            try
            {
                int ownerId = GetUserId();

                if (!await _ProjectService.IsProjectNameUniqueAsync(ownerId, projectPostModel.Title))
                {
                    return Conflict("Project name already exists.");
                }

                var projectDto = _mapper.Map<ProjectDTO>(projectPostModel);

                var createdProject = await _ProjectService.CreateProjectAsync(projectDto, ownerId);

                return CreatedAtAction(nameof(Get), new { id = createdProject.Id }, createdProject);
            }
            catch (ArgumentNullException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (ArgumentException ex)
            {
                return Conflict(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }


        [Authorize(Policy = "UserAccess")]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var userId = GetUserId();
                var userRole = GetUserRole();

                var project = await _ProjectService.GetProjectAsync(id, userId, userRole);
                return Ok(project);

            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        [Authorize(Policy = "UserAccess")]
        [HttpGet("all")]
        public async Task<IActionResult> GetAllProjects()
        {
            try
            {
                var projects = await _ProjectService.GetAllProjectsAsync();
                return Ok(projects);
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        // GET: api/Project/architect
        [Authorize(Policy = "ArchitectOnly")]
        [HttpGet("architect")]
        public async Task<IActionResult> GetArchitectProjects()
        {
            try
            {
                var projects = await _ProjectService.GetArchitectProjectsAsync(GetUserId());
                return Ok(projects);
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }






        //============Unused functions for future extension===============

        [Authorize(Policy = "ArchitectOnly")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] ProjectDTO projectDto)
        {
            try
            {
                if (projectDto.Id != id)
                {
                    return BadRequest("Project ID mismatch.");
                }

                var userId = GetUserId();
                var userRole = GetUserRole();

                if (userRole != "admin" && projectDto.OwnerId != userId)
                {
                    return Forbid("You do not have permission to update this project.");
                }

                await _ProjectService.UpdateProjectAsync(id, projectDto);
                return NoContent();
            }
            catch (ArgumentNullException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }
    }
    }
