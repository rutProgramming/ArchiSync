using System.ComponentModel.DataAnnotations;

namespace ArchiSyncServer.API.Models
{
    public class UserPostModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
       

    }
}
