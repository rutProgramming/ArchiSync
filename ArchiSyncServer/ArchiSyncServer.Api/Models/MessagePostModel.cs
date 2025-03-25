using System.ComponentModel.DataAnnotations;

namespace ArchiSyncServer.API.Models
{
    public class MessagePostModel
    {
        public bool Approved { get; set; }
        public int UserId { get; set; }
        public int ProjectId { get; set; }
        public int ArchitectId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}

