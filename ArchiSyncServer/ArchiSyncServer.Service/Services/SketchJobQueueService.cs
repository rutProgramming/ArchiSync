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

        private const int MaxTotalJobs = 50;
        private int _totalJobsSubmitted = 0;

        public void Enqueue(SketchJobDTO job)
        {
            if (_totalJobsSubmitted >= MaxTotalJobs)
            {
                throw new InvalidOperationException("Limit of 50 sketch generations has been reached.");
            }

            _jobs.Enqueue(job);
            _signal.Release();
            _totalJobsSubmitted++;
        }

        public async Task<SketchJobDTO> DequeueAsync(CancellationToken cancellationToken)
        {
            await _signal.WaitAsync(cancellationToken);
            _jobs.TryDequeue(out var job);
            return job!;
        }

    }

}

