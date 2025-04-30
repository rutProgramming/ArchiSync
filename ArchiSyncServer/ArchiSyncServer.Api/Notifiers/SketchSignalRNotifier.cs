using ArchiSyncServer.Api.Hubs;
using ArchiSyncServer.Core.IServices;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace ArchiSyncServer.Api.Notifiers
{
    public class SketchSignalRNotifier : ISketchNotifier
    {
        private readonly IHubContext<SketchHub> _hubContext;

        public SketchSignalRNotifier(IHubContext<SketchHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task NotifySketchCompletedAsync(string connectionId, string outputUrl)
        {
            await _hubContext.Clients.Client(connectionId).SendAsync("SketchCompleted", new { outputUrl });
        }
    }
}


