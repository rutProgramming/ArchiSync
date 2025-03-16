using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ArchiSyncServer.API.Models
{
    
        public class ProjectPostModel
        {
            public string Title { get; set; }
            public string Description { get; set; }
            public int UserId { get; set; }
        }
    

}
