using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using ArchiSyncServer.API.Models;
using ArchiSyncServer.Core.DTOs;
using ArchiSyncServer.Core.IServices;
using System;
using Microsoft.AspNetCore.Authorization;

namespace ArchiSyncServer.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;
        private readonly IMapper _mapper;

        public CommentController(ICommentService commentService, IMapper mapper)
        {
            _commentService = commentService;
            _mapper = mapper;
        }
        [Authorize(Policy = "UserAccess")]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var comment = await _commentService.GetCommentAsync(id);
                return Ok(comment);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Comment not found." });
            }
        }
        [Authorize(Policy = "UserAccess")]

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommentDTO>>> Get()
        {
            var comments = await _commentService.GetAllCommentsAsync();
            return Ok(comments);
        }
        [Authorize(Policy = "UserAccess")]

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CommentPostModel commentPostModel)
        {
            try
            {
                var commentDto = _mapper.Map<CommentDTO>(commentPostModel);
                var createdComment = await _commentService.CreateCommentAsync(commentDto);
                return CreatedAtAction(nameof(Get), new { id = createdComment.CommentId }, createdComment);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [Authorize(Policy = "UserAccess")]

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] CommentPostModel commentPostModel)
        {
            try
            {
                var commentDto = _mapper.Map<CommentDTO>(commentPostModel);
                await _commentService.UpdateCommentAsync(id, commentDto);
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Comment not found." });
            }
        }
        [Authorize(Policy = "UserAccess")]

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _commentService.DeleteCommentAsync(id);
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Comment not found." });
            }
        }
    }
}
