using System.ComponentModel.DataAnnotations;

namespace ArchiSyncServer.API.Models
{
    public class DocumentPostModel
    {
        public string FilePath { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int ProjectId { get; set; }
    }
}

