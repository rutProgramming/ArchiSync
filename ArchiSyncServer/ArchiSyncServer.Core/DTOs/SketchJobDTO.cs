using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiSyncServer.Core.DTOs
{
    public class SketchJobDTO
    {
        public string ImageUrl { get; set; }
        public string Prompt { get; set; }
        public string PredictionId { get; set; }
    }


}
