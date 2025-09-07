using Microsoft.AspNetCore.SignalR;

namespace GDL.Api.Hubs
{
    public class DocumentHub : Hub
    {
        // Just a test method
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
