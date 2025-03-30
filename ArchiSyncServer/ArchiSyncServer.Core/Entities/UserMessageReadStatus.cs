using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiSyncServer.Core.Entities
{
    public class UserMessageReadStatus
    {

        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public int MessageId { get; set; }
        public bool IsRead { get; set; }
        public User User { get; set; }
        public Message Message { get; set; }
    }
}



