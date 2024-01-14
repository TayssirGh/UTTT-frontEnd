import { Injectable } from '@angular/core';
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {HttpClient} from "@angular/common/http";
import {TwoPlayerResponse} from "../model/dto/TwoPlayerResponse";
import {OnePlayerResponse} from "../model/dto/OnePlayerResponse";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private stompClient : any;
  private backendUrl = "http://localhost:8080/game";

  constructor(private httpClient: HttpClient) {
    this.initConnectionSocket()
  }
// -------- connection to the game  ------------
  public initConnectionSocket(){
    console.log("connecting to the game");
    const url = this.backendUrl;
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
  }
  public createGame(){

  }
  public connectToGame(){

  }
  public connectToRandomGame(){
  }
  public sendMove(data: string) {
    const headers = {
      'Content-Type': 'application/json',
    };
    const moveEndpoint = `${this.backendUrl}/2pmove`;
    return this.httpClient.post<TwoPlayerResponse | OnePlayerResponse>(moveEndpoint, data,{ headers })

  }



}
