using ArchiSyncServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiSyncServer.Core.DTOs
{
    public class UserRolesDTO
    {
        public int Id { get; set; }
        public int userId { get; set; }
        public int RoleId { get; set; }
    }

}

