using ArchiSyncServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiSyncServer.Core.IRepositories
{

    public interface ICommentRepository : IGenericRepository<Comment>
    {
        // הוספת מתודולוגיות ספציפיות להערות אם יש צורך
    }


}
