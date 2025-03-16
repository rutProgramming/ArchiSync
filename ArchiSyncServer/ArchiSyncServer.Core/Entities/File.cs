using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace ArchiSyncServer.Core.Entities
{
    public class File
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(255)]
        public string FileName { get; set; }
        [MaxLength(50)]
        public string FileType { get; set; }

        public long Size { get; set; }
        [MaxLength(500)]
        public string S3Key { get; set; }
        public int ProjectOrFolderId { get; set; } // לאיזה פרויקט/תיקייה הקובץ שייך
        public virtual ProjectOrFolder ProjectOrFolder { get; set; }
        public int OwnerId { get; set; }
        public User Owner { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool IsDeleted { get; set; }

    }
}


