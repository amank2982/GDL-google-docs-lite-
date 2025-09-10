using Microsoft.AspNetCore.SignalR;

namespace GDL.Api.Hubs
{
    public class DocumentHub : Hub
    {
        // Broadcast document changes to ALL clients (including sender)
        public async Task UpdateDocument(string user, string content)
        {
            await Clients.All.SendAsync("ReceiveDocumentUpdate", user, content);
        }
    }
}
