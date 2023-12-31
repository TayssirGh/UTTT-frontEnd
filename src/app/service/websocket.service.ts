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
// -------- connection to the game  ------------
  public initConnectionSocket(){
    console.log("connecting to the game");
    const url = "http://localhost:8080/game";
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
  }
  public createGame(){

  }
  public connectToGame(){

  }
  public connectToRandomGame(){

  }

}
