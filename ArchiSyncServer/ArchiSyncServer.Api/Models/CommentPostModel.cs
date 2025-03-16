using System.ComponentModel.DataAnnotations;

namespace ArchiSyncServer.API.Models
{

    public class CommentPostModel
    {
        public string Content { get; set; }
        public int ProjectId { get; set; }
        public int UserId { get; set; }
    }

}