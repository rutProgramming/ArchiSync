using AutoMapper;
using ArchiSyncServer.Api.Models;
using ArchiSyncServer.API.Models;
using ArchiSyncServer.Core;
using ArchiSyncServer.Core.Entities;
using ArchiSyncServer.Core.Iservices;
using ArchiSyncServer.Service.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ArchiSyncServer.Core.DTOs;


namespace ArchiSyncServer.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;
        private readonly AuthService _authService;
        private readonly IMapper _mapper;
        private readonly IUserRolesService _userRolesService;
        public AuthController(IConfiguration configuration, IUserService userService,AuthService authService,IMapper mapper,IUserRolesService userRolesService)
        {
            _configuration = configuration;
            _userService = userService;
            _authService = authService;
            _mapper = mapper;
            _userRolesService = userRolesService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            try
            {
                var userRole = await _userService.Authenticate(model.UserName, model.Password);
                var roleName = userRole.Role.RoleName;
                if (roleName == "admin")
                {
                    var token = _authService.GenerateJwtToken(userRole.UserId, model.UserName,  "admin" );
                    return Ok(new { Token = token, User = userRole.User, RoleName = "admin" });
                }
                else if (roleName == "architect")
                {
                    var token = _authService.GenerateJwtToken(userRole.UserId, model.UserName, "architect" );
                    return Ok(new { Token = token, User = userRole.User, RoleName = "architect" });
                    }
                else if (roleName == "user")
                {
                    var token = _authService.GenerateJwtToken(userRole.UserId, model.UserName, "user" );
                    return Ok(new { Token = token, User = userRole.User, RoleName = "user" });
                }
                return Unauthorized();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }



        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (model == null)
            {
                return BadRequest("Invalid request data.");
            }
            try
            {
                var userDto = _mapper.Map<UserForCreationDTO>(model);
                var createdUser = await _userService.CreateUserAsync(userDto, model.RoleName);
                var token = _authService.GenerateJwtToken(createdUser.UserId, model.UserName,  model.RoleName );
                return Ok(new { Token = token, UserId = createdUser.UserId });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }

}



