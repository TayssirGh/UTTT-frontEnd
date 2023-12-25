import { Injectable } from '@angular/core';
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private stompClient : any;

  constructor() {
    this.initConnectionSocket()
  }
  initConnectionSocket(){
    const url = "http://localhost:8080/topic/app";
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
  }
  ///TODO: Implement the methods
}
