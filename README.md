# Google Docs Lite (GDL)

A real-time collaborative text editor built with Angular + .NET (SignalR).

## Tech Stack
- **Frontend:** Angular, Quill, Yjs
- **Backend:** ASP.NET Core 9, SignalR
- **Database (later):** PostgreSQL / SQL Server
- **Collaboration:** Operational Transform (via SignalR) + CRDT (Yjs)

## Project Structure
GDL/
├── backend/ # ASP.NET Core Web API + SignalR
└── frontend/ # Angular App
