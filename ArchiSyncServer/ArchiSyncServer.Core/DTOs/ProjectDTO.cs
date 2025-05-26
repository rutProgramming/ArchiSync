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
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; }

        public int? ParentId { get; set; } 
        //public virtual Project Parent { get; set; }

        public int OwnerId { get; set; }
        public  UserDTO Owner { get; set; }

        public bool IsPublic { get; set; }
        public ProjectType Type { get; set; }

        public ProjectStatus Status { get; set; }
        public string Location { get; set; } = string.Empty;
        public string ProjectImage { get; set; }

        public int ClientId { get; set; }
        public string ClientUserName { get; set; }

        public UserDTO Client { get; set; }


        public DateTime StartDate { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime? EndDate { get; set; }

        public virtual ICollection<File> Files { get; set; }
        public virtual ICollection<ProjectPermission> Permissions { get; set; }
        public List<string> ArchitectUserNames { get; set; } = new List<string>();

        public ICollection<User> Architects { get; set; }

    }


}

