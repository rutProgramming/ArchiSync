using ArchiSyncServer.Core.Entities;
using System.ComponentModel.DataAnnotations;
using File = ArchiSyncServer.Core.Entities.File;

namespace ArchiSyncServer.API.Models
{
    public class ProjectPostModel
    {


        [Required, MaxLength(255)]
        public string Name { get; set; }
        public int OwnerId { get; set; }
        public bool IsPublic { get; set; } = true;
    }
}







