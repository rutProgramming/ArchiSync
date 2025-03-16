using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using ArchiSyncServer.API.Models;
using ArchiSyncServer.Core.DTOs;
using ArchiSyncServer.Core.IServices;
using System;

namespace ArchiSyncServer.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DocumentController : ControllerBase
    {
        private readonly IDocumentService _documentService;
        private readonly IMapper _mapper;

        public DocumentController(IDocumentService documentService, IMapper mapper)
        {
            _documentService = documentService;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DocumentDTO>> Get(int id)
        {
            try
            {
                var document = await _documentService.GetDocumentAsync(id);
                return Ok(document);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Document not found." });
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DocumentDTO>>> Get()
        {
            var documents = await _documentService.GetAllDocumentsAsync();
            return Ok(documents);
        }

        [HttpPost]
        public async Task<ActionResult<DocumentDTO>> Post([FromBody] DocumentPostModel documentPostModel)
        {
            try
            {
                var documentDto = _mapper.Map<DocumentDTO>(documentPostModel);
                var createdDocument = await _documentService.CreateDocumentAsync(documentDto);
                return CreatedAtAction(nameof(Get), new { id = createdDocument.DocumentId }, createdDocument);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] DocumentPostModel documentPostModel)
        {
            try
            {
                var documentDto = _mapper.Map<DocumentDTO>(documentPostModel);
                //await _documentService.UpdateDocumentAsync(id, documentDto);
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Document not found." });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _documentService.DeleteDocumentAsync(id);
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Document not found." });
            }
        }
    }
}
