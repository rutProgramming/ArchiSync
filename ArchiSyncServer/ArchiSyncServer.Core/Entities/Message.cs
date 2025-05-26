using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiSyncServer.Core.Entities
{
    public class Message
    {
        [Key]
        public int Id { get; set; }
        public bool UserIsRead { get; set; }
        public bool ArchitectIsRead { get; set; }
        public bool Approved { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int ProjectId { get; set; }
        public Project Project { get; set; }
        //public string MessageText { get; set; }

        [ForeignKey("user")]
        public int ArchitectId { get; set; }
        public User Architect { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
