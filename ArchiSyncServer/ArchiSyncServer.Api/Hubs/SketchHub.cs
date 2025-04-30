using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace ArchiSyncServer.Api.Hubs
{

    public class SketchHub : Hub
    {
        public async Task<string> GetConnectionId()
        {
            return Context.ConnectionId;
        }

        public async Task SendImageToClient(string connectionId, string imageUrl)
        {
            await Clients.Client(connectionId).SendAsync("ReceiveImage", imageUrl);
        }
    }


}


