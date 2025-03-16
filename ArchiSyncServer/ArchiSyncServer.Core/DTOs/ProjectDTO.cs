using ArchiSyncServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiSyncServer.Core.DTOs
{
  
        public class ProjectDTO
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public bool IsPublic { get; set; }
            public int OwnerId { get; set; }

            public DateTime CreatedAt { get; set; }
            public DateTime UpdatedAt { get; set; }
        }

    
}
