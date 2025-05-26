using ArchiSyncServer.Core.Entities;
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
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; }

        public int? ParentId { get; set; }
        public virtual Project Parent { get; set; }
        public int? OwnerId { get; set; }
        public virtual User Owner { get; set; }
        public ProjectType Type { get; set; } 

        public ProjectStatus Status { get; set; } 
        public bool IsPublic { get; set; }
        public string Location { get; set; } = string.Empty;

        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }
        public DateTime UpdatedAt { get; set; }

        public int ClientId { get; set; }
        public User Client { get; set; }
        public string ProjectImage { get; set; }

        public virtual ICollection<ProjectArchitect> ProjectArchitects { get; set; } = new List<ProjectArchitect>();
        public virtual ICollection<File> Files { get; set; } = new List<File>();
        public virtual ICollection<ProjectPermission> Permissions { get; set; } = new List<ProjectPermission>();
    }
    public enum ProjectType
    {
        Residential,
        Commercial,
        Mixed
    }
    public enum ProjectStatus
    {
        Planning,
        InProgress,
        Completed,
        OnHold
    }
}
