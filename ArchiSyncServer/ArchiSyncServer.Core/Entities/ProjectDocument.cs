using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiSyncServer.Core.Entities
{
    public class ProjectDocument
    {
        [Key]
        public int ProjectDocumentId { get; set; }
        public int ProjectId { get; set; }
        public int DocumentId { get; set; }
    }
}
