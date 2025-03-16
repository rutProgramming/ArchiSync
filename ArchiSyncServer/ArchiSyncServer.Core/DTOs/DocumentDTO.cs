using ArchiSyncServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiSyncServer.Core.DTOs
{
    public class DocumentDTO
    {
        public int DocumentId { get; set; }
        public int UserId { get; set; }

        public string Title { get; set; }
        public string FileName { get; set; }
        public string Description { get; set; }

        public string FilePath { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

    }
}
