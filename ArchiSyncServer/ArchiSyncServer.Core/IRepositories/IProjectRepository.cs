using ArchiSyncServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiSyncServer.Core.IRepositories
{

    public interface IProjectRepository : IGenericRepository<Project>
    {
        // הוספת מתודולוגיות ספציפיות לפרויקטים אם יש צורך
    }


}
