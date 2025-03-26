using System.ComponentModel.DataAnnotations;

namespace ArchiSyncServer.Api.Models
{
    public class FilePostModel
    {
        [MaxLength(255)]
        public string FileName { get; set; }
        [MaxLength(50)]
        public string FileType { get; set; }
        public long Size { get; set; }
        [MaxLength(500)]
        public string S3Key { get; set; }
        public int ProjectId { get; set; }
        public int OwnerId { get; set; }
        public bool IsDeleted { get; set; }
    }
}
