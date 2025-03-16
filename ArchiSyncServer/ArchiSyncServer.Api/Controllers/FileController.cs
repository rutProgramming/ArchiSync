using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ArchiSyncServer.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {


        [HttpGet("admin-only")]
        [Authorize(Policy = "AdminOnly")] // רק Admin יכול לגשת
        public IActionResult AdminOnly()
        {
            return Ok("This is accessible only by Admins.");
        }

        [HttpGet("editor-or-admin")]
        [Authorize(Policy = "EditorOrAdmin")] // Editor או Admin יכולים לגשת
        public IActionResult EditorOrAdmin()
        {
            return Ok("This is accessible by Editors and Admins.");
        }

        [HttpGet("viewer-only")]
        [Authorize(Policy = "ViewerOnly")] // רק Viewer יכול לגשת
        public IActionResult ViewerOnly()
        {
            return Ok("This is accessible only by Viewers.");
        }

        [HttpGet("authenticated-only")]
        [Authorize] // כל משתמש מאומת יכול לגשת
        public IActionResult AuthenticatedOnly()
        {
            return Ok("This is accessible by any authenticated user.");
        }
    }

}
