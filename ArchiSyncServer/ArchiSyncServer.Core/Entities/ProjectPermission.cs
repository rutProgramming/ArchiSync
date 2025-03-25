using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiSyncServer.Core.Entities
{
    public class ProjectPermission
    {
        [Key]
        public int Id { get; set; }

        public int ProjectId { get; set; }
        public virtual Project Project { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }

    }
}
