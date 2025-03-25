using ArchiSyncServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security;
using System.Text;
using System.Threading.Tasks;

namespace ArchiSyncServer.Core.Entities
{
    public class RolePermissions
    {
        [Key]
        public int Id { get; set; }
        public int PermissionId { get; set; }
      //  public IPermission Permission { get; set; }

        public int RoleId { get; set; }
        public Roles Role { get; set; }
    }

  

}
