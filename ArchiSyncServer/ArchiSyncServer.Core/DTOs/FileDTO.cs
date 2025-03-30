using ArchiSyncServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiSyncServer.Core.DTOs
{
    public class FileDTO
    {
        public int Id { get; set; }
        [MaxLength(255)]
        public string FileName { get; set; }
        [MaxLength(50)]
        public string FileType { get; set; }
        public long Size { get; set; }
        [MaxLength(500)]
        public string S3Key { get; set; }
        public int ProjectId { get; set; }
        public Project Project { get; set; }
        public int OwnerId { get; set; }
        public bool IsDeleted { get; set; }
    }
}
