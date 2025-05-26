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
using ArchiSyncServer.Api.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ArchiSyncServer.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class FileController : ControllerBase
    {
        private readonly IFileService _fileService;
        private readonly IMapper _mapper;

        public FileController(IFileService fileService, IMapper mapper)
        {
            _fileService = fileService;
            _mapper = mapper;
        }

        [Authorize(Policy = "ArchitectOnly")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FileDTO>>> GetAllFiles(int projectId,bool isPublic=false, int userId = 0)
        {
            try
            {
                var files = await _fileService.GetAllFilesAsync(userId,projectId);
                return Ok(files);
            }
            catch (UnauthorizedAccessException ex) {
                return Unauthorized(new { message = ex.Message });
            }
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<FileDTO>> GetFileById(int id)
        {
            try
            {
                var file = await _fileService.GetFileAsync(id);
                return Ok(file);
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

        [Authorize(Policy = "ArchitectOnly")]
        [HttpPost]
        public async Task<ActionResult<FileDTO>> CreateFile([FromBody] FilePostModel fileModel)
        {
            try
            {
                var fileDto = _mapper.Map<FileDTO>(fileModel);
                var createdFile = await _fileService.CreateFileAsync(fileDto);
                return CreatedAtAction(nameof(GetFileById), new { id = createdFile.Id }, createdFile);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [Authorize(Policy = "ArchitectOnly")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFile(int id)
        {
            try
            {
                var success = await _fileService.DeleteFileAsync(id);
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
    }
}


