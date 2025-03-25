using ArchiSyncServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using File = ArchiSyncServer.Core.Entities.File;

namespace ArchiSyncServer.Core.DTOs
{
    public class ProjectDTO
    {
        public int Id { get; set; }

        [Required, MaxLength(255)]
        public string Name { get; set; }
        public string Description { get; set; }

        public int? ParentId { get; set; } 
        public virtual Project Parent { get; set; }

        public int OwnerId { get; set; }
        public virtual User Owner { get; set; }

        public bool IsPublic { get; set; } = true;

        public DateTime CreatedAt { get; set; } 
        public DateTime UpdatedAt { get; set; } 

       // public virtual ICollection<Project> Children { get; set; } = new List<Project>(); // תתי-תיקיות
       public virtual ICollection<File> Files { get; set; } // קבצים בתוך הפרויקט/תיקייה
        public virtual ICollection<ProjectPermission> Permissions { get; set; }  
    }


}
