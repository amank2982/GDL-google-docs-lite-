import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-document-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.css']
})
export class DocumentEditorComponent implements OnInit {
  documentContent: string = '';
  currentUser: string = 'aman'; // later make this dynamic
  private hubConnection!: signalR.HubConnection;

  ngOnInit(): void {
    this.startConnection();
  }

  private startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5028/documentHub') // ⚠️ match backend port
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start()
      .then(() => console.log('✅ Connected to SignalR hub'))
      .catch(err => console.error('❌ Error while starting SignalR connection: ', err));

    // Listen for updates from hub
    this.hubConnection.on('ReceiveDocumentUpdate', (user: string, content: string) => {
      console.log(`📩 ${user} updated document`);
      this.documentContent = content;
    });
  }

  onContentChange() {
    console.log("✏️ Sending update:", this.documentContent);
    this.hubConnection.invoke('UpdateDocument', this.currentUser, this.documentContent)
      .catch(err => console.error('❌ Error while sending message:', err));
  }
}
