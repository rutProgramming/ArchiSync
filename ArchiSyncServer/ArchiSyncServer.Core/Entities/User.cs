using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiSyncServer.Core.Entities
{

    [Index(nameof(Email),nameof(UserName), IsUnique = true)]
    public class User
    {
        [Key]
        public int UserId { get; set; }

        public string UserName { get; set; }
        public string PasswordHash { get; set; }

        public string Email { get; set; }
        [ForeignKey("MainFolder")]
        public int? MainFolderId { get; set; }  

        public virtual Project MainFolder { get; set; } 
        public DateTime CreatedAt { get; set; } 
        public DateTime UpdatedAt { get; set; } 
    }

}

