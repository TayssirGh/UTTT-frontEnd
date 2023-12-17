import { Component } from '@angular/core';
import {BigBoard} from "../../model/BigBoard";

@Component({
  selector: 'app-ttt',
  templateUrl: './ttt.component.html',
  styleUrl: './ttt.component.css'
})
export class TttComponent {
  board = new BigBoard();
  public click(){
    console.log(this.board.boards[0][0].board[0][1])
  }
}
