import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {BigBoard} from "../../model/BigBoard";
import {Draw} from "../draw/Draw";
import {State} from "../../model/State";
import {WebsocketService} from "../../service/websocket.service";
import {OnePlayerResponse} from "../../model/dto/OnePlayerResponse";
import {TwoPlayerResponse} from "../../model/dto/TwoPlayerResponse";

@Component({
  selector: 'app-ttt',
  templateUrl: './ttt.component.html',
  styleUrl: './ttt.component.css'
})
export class TttComponent implements OnInit{
  @ViewChild('canvasElt', {static : true}) canvas : ElementRef<HTMLCanvasElement>
  private ctx: CanvasRenderingContext2D ;
  private model : BigBoard = new BigBoard();
  private draw : Draw = new Draw();
  private click = false;
  private count = 0;
  private tworesp = new TwoPlayerResponse();
  private oneresp = new OnePlayerResponse();
  visible: boolean;
  onePlayerMode : boolean;
  twoPlayerMode : boolean;


  constructor(private wsService : WebsocketService ) {
  }

  ngOnInit(): void {
    this.canvas.nativeElement.width = 800;
    this.canvas.nativeElement.height = 800;
    this.ctx = this.canvas?.nativeElement.getContext('2d');
    this.visible = true
    if (this.ctx) {
      this.draw.drawBoard(this.ctx, this.model);
    } else {
      console.error('Failed to get canvas context!');
    }
  }
  public chooseMode(id: string){
    if(id==="1p"){
      this.onePlayerMode = true;
      this.twoPlayerMode = false;
    }
    else if(id === "2p"){
      this.onePlayerMode = false;
      this.twoPlayerMode = true;
    }
    this.count ++;
    this.visible = false;
  }
  @HostListener('click', ['$event'])
  canvasClick(event: MouseEvent): void {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = event.clientX  - rect.left;
    const y = event.clientY - rect.top;
    //============================================MVP-2PLAYER===================================================
    if(this.twoPlayerMode ){
      this.count ++;
      if (this.count>2){
        ///TODO: send the mouse click and the positionMap and change the model (backend!!!)
        let s = this.draw.evaluatePosition(x!,y!);
        if(!this.draw.gameStart){
          this.draw.gameStart = true;
          this.click = !this.click;
          // this.wsService.sendMove(s);
          // let res = this.makeMove(s);
          this.wsService.sendMove(s).subscribe(
          (response )=>{
            console.log("hello", response)
            // this.tworesp = response;

          });
          console.log("test1")
          this.model.boards[parseInt(s[0])][parseInt(s[1])].
            board[parseInt(s[2])][parseInt(s[3])] = this.changePlayer(this.click);
          this.draw.enableRow = parseInt(s[2]);
          this.draw.enableCol = parseInt(s[3]);
          this.draw.drawBoard(this.ctx, this.model)
        }
        else {
          if(this.model.boards[parseInt(s[0])][parseInt(s[1])].board[parseInt(s[2])][parseInt(s[3])] == State.NULL
            && this.model.boards[parseInt(s[0])][parseInt(s[1])].winner == State.NULL
          ){
            if(this.model.boards[this.draw.enableRow][this.draw.enableCol].winner == State.NULL){
              if (parseInt(s[0]) == this.draw.enableRow && parseInt(s[1]) == this.draw.enableCol){
                this.click = !this.click;
                // this.wsService.sendMove(s)
                // this.makeMove(s)
                this.wsService.sendMove(s).subscribe(
                  (response )=>{
                    console.log("hello", response)
                    if(response.board[parseInt(s[0])][parseInt(s[1])]=="x"){
                      this.model.boards[parseInt(s[0])][parseInt(s[1])].winner = State.X;
                    }
                    else if(response.board[parseInt(s[0])][parseInt(s[1])]=="o"){
                      this.model.boards[parseInt(s[0])][parseInt(s[1])].winner = State.O;
                    }
                    else if(response.board[parseInt(s[0])][parseInt(s[1])]=="x/o"){
                      this.model.boards[parseInt(s[0])][parseInt(s[1])].winner = State.DRAW;
                    }
                    if (response.value === "x"){
                      this.model.winner = State.X
                    }
                    else if(response.value === "o"){
                      this.model.winner = State.O
                    }
                    else if(response.value === "x/o"){
                      this.model.winner = State.DRAW;
                    }
                    this.draw.drawBoard(this.ctx, this.model)
                  });
                console.log("test2")
                this.draw.enableRow = parseInt(s[2]);
                this.draw.enableCol = parseInt(s[3]);
                this.model.boards[parseInt(s[0])][parseInt(s[1])].
                  board[parseInt(s[2])][parseInt(s[3])] = this.changePlayer(this.click);
                this.draw.drawBoard(this.ctx, this.model)
              }
            }
            else {
              this.click = !this.click;
              // this.wsService.sendMove(s)
              // this.makeMove(s);
              this.wsService.sendMove(s).subscribe(
                (response )=>{
                  console.log("hello", response)
                  if(response.board[parseInt(s[0])][parseInt(s[1])]=="x"){
                    this.model.boards[parseInt(s[0])][parseInt(s[1])].winner = State.X;
                  }
                  else if(response.board[parseInt(s[0])][parseInt(s[1])]=="o"){
                    this.model.boards[parseInt(s[0])][parseInt(s[1])].winner = State.O;
                  }
                  else if(response.board[parseInt(s[0])][parseInt(s[1])]=="x/o"){
                    this.model.boards[parseInt(s[0])][parseInt(s[1])].winner = State.DRAW;
                  }
                  if (response.value === "x"){
                    this.model.winner = State.X
                  }
                  else if(response.value === "o"){
                    this.model.winner = State.O
                  }
                  else if(response.value === "x/o"){
                    this.model.winner = State.DRAW;
                  }
                  this.draw.drawBoard(this.ctx, this.model)
                  // this.tworesp = response;
                });
              console.log("test3")
              this.draw.enableRow = parseInt(s[2]);
              this.draw.enableCol = parseInt(s[3]);
              this.model.boards[parseInt(s[0])][parseInt(s[1])].
                board[parseInt(s[2])][parseInt(s[3])] = this.changePlayer(this.click);
              this.draw.drawBoard(this.ctx, this.model)
            }
          }
        }
      }
    }
    //===============================================MVP-1PLAYER=================================================
    else if(this.onePlayerMode){
      this.count ++;
      if (this.count>2){
        let s = this.draw.evaluatePosition(x!,y!);

      }
    }


  }
  public changePlayer(cl : boolean){
    return  cl?State.O:State.X;
  }



}
