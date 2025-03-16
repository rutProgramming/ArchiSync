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
    public class ProjectOrFolderController : ControllerBase
    {
        private readonly IProjectOrFolderService _projectOrFolderService;
        private readonly IMapper _mapper;

        public ProjectOrFolderController(IProjectOrFolderService projectOrFolderService, IMapper mapper)
        {
            _projectOrFolderService = projectOrFolderService;
            _mapper = mapper;
        }

        private int GetUserId() => int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
        private string GetUserRole() => User.FindFirst(ClaimTypes.Role)?.Value ?? "";

        // POST: api/ProjectOrFolder
        [Authorize(Roles = "admin,architect")]
        [HttpPost]
        public async Task<IActionResult> CreateProject([FromBody] ProjectOrFolderPostModel projectPostModel)
        {
            try
            {
                projectPostModel.OwnerId = GetUserId();
                var projectDto = _mapper.Map<ProjectOrFolderDTO>(projectPostModel);
                var createdProject = await _projectOrFolderService.CreateProjectAsync(projectDto);
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

        // PUT: api/ProjectOrFolder/{id}
        [Authorize(Roles = "admin,architect")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(int id, [FromBody] ProjectOrFolderDTO projectPostModel)
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

                var projectDto = _mapper.Map<ProjectOrFolderDTO>(projectPostModel);
                await _projectOrFolderService.UpdateProjectAsync(id,projectDto);
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

        // DELETE: api/ProjectOrFolder/{id}
        [Authorize(Roles = "admin,architect")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            try
            {
                var userId = GetUserId();
                var userRole = GetUserRole();

                var project = await _projectOrFolderService.GetProjectAsync(id);
                if (project == null)
                {
                    return NotFound("Project not found.");
                }

                if (userRole != "admin" && project.OwnerId != userId)
                {
                    return Forbid("You do not have permission to delete this project.");
                }

                await _projectOrFolderService.DeleteProjectAsync(id);
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

        // GET: api/ProjectOrFolder/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProject(int id)
        {
            try
            {
                var project = await _projectOrFolderService.GetProjectAsync(id);
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

                var accessibleProjects = await _projectOrFolderService.GetUserAccessibleProjectsAsync(userId);
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

        // GET: api/ProjectOrFolder/all
        [Authorize(Policy = "AdminOnly")]
        [HttpGet("all")]
        public async Task<IActionResult> GetAllProjects()
        {
            try
            {
                var projects = await _projectOrFolderService.GetAllProjectsAsync();
                return Ok(projects);
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        // GET: api/ProjectOrFolder/architect
        [Authorize(Policy = "ArchitectOnly")]
        [HttpGet("architect")]
        public async Task<IActionResult> GetArchitectProjects()
        {
            try
            {
                var projects = await _projectOrFolderService.GetArchitectProjectsAsync(GetUserId());
                return Ok(projects);
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        // GET: api/ProjectOrFolder/user
        [Authorize(Policy = "UserAccess")]
        [HttpGet("UserAccess")]

        public async Task<IActionResult> GetUserAccessibleProjects()
        {

            try
            {
                var projects = await _projectOrFolderService.GetUserAccessibleProjectsAsync(GetUserId());
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
                var projects = await _projectOrFolderService.GetPublicProjectsAsync();
                return Ok(projects);
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }
    }
}
