using ArchiSyncServer.Core.DTOs;
using ArchiSyncServer.Core.IServices;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchiSyncServer.Service.Services
{
    public class SketchJobQueueService : ISketchJobQueueService
    {


        private readonly ConcurrentQueue<SketchJobDTO> _jobs = new();
        private readonly SemaphoreSlim _signal = new(0);

        public void Enqueue(SketchJobDTO job)
        {
            _jobs.Enqueue(job);
            _signal.Release();
        }

        public async Task<SketchJobDTO> DequeueAsync(CancellationToken cancellationToken)
        {
            await _signal.WaitAsync(cancellationToken);
            _jobs.TryDequeue(out var job);
            return job!;
        }

    }

}

