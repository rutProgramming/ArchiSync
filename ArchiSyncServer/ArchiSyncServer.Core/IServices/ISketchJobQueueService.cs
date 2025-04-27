using ArchiSyncServer.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiSyncServer.Core.IServices
{
    public interface ISketchJobQueueService
    {

        void Enqueue(SketchJobDTO job);
        Task<SketchJobDTO> DequeueAsync(CancellationToken cancellationToken);

    }
}
