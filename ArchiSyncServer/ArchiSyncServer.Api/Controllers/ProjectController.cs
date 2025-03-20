using Microsoft.AspNetCore.Authorization;
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

        // POST: api/Project
        [Authorize(Policy = "ArchitectOnly")]
        [HttpPost]
        public async Task<IActionResult> CreateProject([FromBody] ProjectPostModel projectPostModel)
        {
            try
            {
                projectPostModel.OwnerId = GetUserId();
                 
                if(!await _ProjectService.IsProjectNameUniqueAsync(projectPostModel.OwnerId, projectPostModel.Name))
                {
                    return Conflict("Project name already exists.");
                }
                var projectDto = _mapper.Map<ProjectDTO>(projectPostModel);
                var createdProject = await _ProjectService.CreateProjectAsync(projectDto);
                return CreatedAtAction(nameof(GetProject), new { id = createdProject.Id }, createdProject);
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

        // PUT: api/Project/{id}
        [Authorize(Roles = "admin,architect")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(int id, [FromBody] ProjectDTO projectPostModel)
        {
            try
            {
                if (projectPostModel.Id != id)
                {
                    return BadRequest("Project ID mismatch.");
                }

                var userId = GetUserId();
                var userRole = GetUserRole();

                if (userRole != "admin" && projectPostModel.OwnerId != userId)
                {
                    return Forbid("You do not have permission to update this project.");
                }

                var projectDto = _mapper.Map<ProjectDTO>(projectPostModel);
                await _ProjectService.UpdateProjectAsync(id,projectDto);
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

        // DELETE: api/Project/{id}
        [Authorize(Roles = "admin,architect")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            try
            {
                var userId = GetUserId();
                var userRole = GetUserRole();

                var project = await _ProjectService.GetProjectAsync(id);
                if (project == null)
                {
                    return NotFound("Project not found.");
                }

                if (userRole != "admin" && project.OwnerId != userId)
                {
                    return Forbid("You do not have permission to delete this project.");
                }

                await _ProjectService.DeleteProjectAsync(id);
                return NoContent();
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

        // GET: api/Project/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProject(int id)
        {
            try
            {
                var project = await _ProjectService.GetProjectAsync(id);
                if (project == null)
                {
                    return NotFound("Project not found.");
                }

                var userId = GetUserId();
                var userRole = GetUserRole();

                if (project.IsPublic || userRole == "admin" || project.OwnerId == userId)
                {
                    return Ok(project);
                }

                var accessibleProjects = await _ProjectService.GetUserAccessibleProjectsAsync(userId);
                if (accessibleProjects.Any(p => p.Id == id))
                {
                    return Ok(project);
                }

                return Forbid();
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        // GET: api/Project/all
        [Authorize(Policy = "AdminOnly")]
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

        // GET: api/Project/user
        [Authorize(Policy = "UserAccess")]
        [HttpGet("UserAccess")]

        public async Task<IActionResult> GetUserAccessibleProjects()
        {

            try
            {
                var projects = await _ProjectService.GetUserAccessibleProjectsAsync(GetUserId());
                return Ok(projects);
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }
        [HttpGet("public")]
        public async Task<IActionResult> GetPublicProjects()
        {
            try
            {
                var projects = await _ProjectService.GetPublicProjectsAsync();
                return Ok(projects);
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }
    }
}
