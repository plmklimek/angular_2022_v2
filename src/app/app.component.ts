import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from './web-socket-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  public text: string = "";
  public stompClient: any;
  constructor(private route: Router, private webSocketService: WebSocketService) {
    // Open connection with server socket
    this.stompClient = this.webSocketService.connect();
    this.stompClient.connect({}, (frame: any) => {
      // Subscribe to notification topic
      console.log("connected");
      this.stompClient.subscribe('/topic/notification', (notifications: any) => {
        console.log(";;");
        console.log(notifications);
        // Update notifications attribute with the recent messsage sent from the server
        this.text = notifications.body;
      })
    });
  }

  title = 'angular14';

  isLogged = localStorage.getItem("auth") != undefined;

  isMenuVisible = true;

  ngDoCheck(): void {
    const currentRoute = this.route.url;
    if (currentRoute == "/login") {
      this.isMenuVisible = false;
    }
    else {
      this.isMenuVisible = true;
    }
  }
  test() {
    this.stompClient.send("/app/notify", {}, JSON.stringify({ "message": "Test231321321312321312" }));
  }
}