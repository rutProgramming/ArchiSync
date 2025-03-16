using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using ArchiSyncServer.API.Models;
using ArchiSyncServer.Core.DTOs;
using ArchiSyncServer.Core.Iservices;
using System;

namespace ArchiSyncServer.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;
        private readonly IMapper _mapper;

        public ProjectController(IProjectService projectService, IMapper mapper)
        {
            _projectService = projectService;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectDTO>> Get(int id)
        {
            try
            {
                var project = await _projectService.GetProjectAsync(id);
                return Ok(project);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Project not found." });
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectDTO>>> Get()
        {
            var projects = await _projectService.GetAllProjectsAsync();
            return Ok(projects);
        }

        [HttpPost]
        public async Task<ActionResult<ProjectDTO>> Post([FromBody] ProjectPostModel projectPostModel)
        {
            try
            {
                var projectDto = _mapper.Map<ProjectDTO>(projectPostModel);
                var createdProject = await _projectService.CreateProjectAsync(projectDto);
                return CreatedAtAction(nameof(Get), new { id = createdProject.Id }, createdProject);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] ProjectPostModel projectPostModel)
        {
            try
            {
                var projectDto = _mapper.Map<ProjectDTO>(projectPostModel);
                //await _projectService.UpdateProjectAsync(id, projectDto);
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Project not found." });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _projectService.DeleteProjectAsync(id);
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Project not found." });
            }
        }
    }
}
