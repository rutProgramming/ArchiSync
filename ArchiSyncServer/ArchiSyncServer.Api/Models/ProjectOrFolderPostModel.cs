using ArchiSyncServer.Core.Entities;
using System.ComponentModel.DataAnnotations;
using File = ArchiSyncServer.Core.Entities.File;

namespace ArchiSyncServer.API.Models
{
    public class ProjectOrFolderPostModel
    {


        public int Id { get; set; }

        [Required, MaxLength(255)]
        public string Name { get; set; }

        public int? ParentId { get; set; }
        public virtual ProjectOrFolder Parent { get; set; }

        public int OwnerId { get; set; }
        public virtual User Owner { get; set; }

        public bool IsPublic { get; set; } = true;

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        //??public virtual ICollection<ProjectOrFolder> Children { get; set; } = new List<ProjectOrFolder>(); // תתי-תיקיות
        public virtual ICollection<File> Files { get; set; } = new List<File>(); // קבצים בתוך הפרויקט/תיקייה
        public virtual ICollection<ProjectPermission> Permissions { get; set; } = new List<ProjectPermission>(); // הרשאות
    }
}







