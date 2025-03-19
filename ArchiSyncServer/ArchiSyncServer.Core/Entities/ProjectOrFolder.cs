using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiSyncServer.Core.Entities
{ 
        public class Project
        {
            [Key]
            public int Id { get; set; }

            [Required, MaxLength(255)]
            public string Name { get; set; }

            public int? ParentId { get; set; } 
            public virtual Project Parent { get; set; }
            public int OwnerId { get; set; }
            public virtual User Owner { get; set; }
            public bool IsPublic { get; set; } = true;
            public DateTime CreatedAt { get; set; } 
            public DateTime UpdatedAt { get; set; } 
            public virtual ICollection<File> Files { get; set; } = new List<File>(); 
            public virtual ICollection<ProjectPermission> Permissions { get; set; } = new List<ProjectPermission>(); 
        }
    }




