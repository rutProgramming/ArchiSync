using System.ComponentModel.DataAnnotations;

namespace ArchiSyncServer.Api.Models
{
    public class RegisterModel
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public string RoleName { get; set; } 
    }
}
