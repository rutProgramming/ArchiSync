using ArchiSyncServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiSyncServer.Core.DTOs
{
    public class MessageDTO
    {
        public int Id { get; set; }
        public bool IsRead { get; set; }
        public bool Approved { get; set; }
        public int UserId { get; set; }
        public int ProjectId { get; set; }
        public int ArchitectId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

    }
}
