import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

export interface ChatMessage {
  user: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection!: signalR.HubConnection;

  public startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5028/documentHub') // backend URL
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR connected'))
      .catch(err => console.error('SignalR error: ', err));
  }

  public addReceiveMessageListener(callback: (msg: ChatMessage) => void): void {
    this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
      callback({ user, text: message });
    });
  }

  public sendMessage(user: string, message: string): void {
    this.hubConnection.invoke('SendMessage', user, message)
      .catch(err => console.error(err));
  }
}
