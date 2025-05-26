using ArchiSyncServer.Core.Entities;
using System.ComponentModel.DataAnnotations;
using File = ArchiSyncServer.Core.Entities.File;

namespace ArchiSyncServer.API.Models
{
    public class ProjectPostModel
    {


        [Required, MaxLength(255)]
        public string Title { get; set; }
        public string Description { get; set; }
        public int OwnerId { get; set; }
        public bool IsPublic { get; set; } = true;
        public int? ParentId { get; set; }

        [Required]
        public ProjectType Type { get; set; }

        [Required]
        public ProjectStatus Status { get; set; }

        public string Location { get; set; }

        public DateTime? EndDate { get; set; }

        [Required]
        public string ClientUserName { get; set; }
        public string ProjectImage { get; set; }
        public List<string> ArchitectUserNames { get; set; }

    }
}







