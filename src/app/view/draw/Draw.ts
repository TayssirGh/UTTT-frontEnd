import {BigBoard} from "../../model/BigBoard";
import {State} from "../../model/State";

export class Draw{
  private WIDTH = 800;

  private COLORS = {redLight: "rgb(176,109,113)",white: "rgba(255,255,251,0.78)", draw: "#edede9", black: "#22223b", darkBlue: "#003049", blue: "#9db4c0", red: "rgb(129, 43, 56)"};
  public evaluatePosition(x: number, y:number){

  }
  public drawBoard(ctx: CanvasRenderingContext2D, model: BigBoard){
    ctx.fillStyle = this.COLORS.white;
    ctx.fillRect(0, 0, this.WIDTH, this.WIDTH);

    ctx.lineWidth = 5;
    var squareSize = this.WIDTH/3;
    for (let i =0; i<3; i++){
      for (let j=0; j<3; j++){
        const startX =j * squareSize;
        const startY = i * squareSize;

        ctx.strokeStyle = this.COLORS.black;
        ctx.strokeRect(startX, startY, squareSize, squareSize);
        this.drawSmallBoard({ctx: ctx, smallBoard: model.boards[i][j], startX: startX, startY: startY});
        ctx.lineWidth = 5

        if (model.boards[i][j].winner == State.O){
          ctx.fillStyle = this.COLORS.redLight;
          ctx.globalAlpha = 0.4;
          ctx.fillRect(startX, startY, squareSize, squareSize);
          ctx.font = `${squareSize}px Arial`;
          ctx.fillText("O", startX + squareSize/6, startY+squareSize/1.1, )
        }
        else if(model.boards[i][j].winner == State.X){
          ctx.fillStyle = this.COLORS.blue;
          ctx.globalAlpha = 0.4;
          ctx.fillRect(startX, startY, squareSize, squareSize);
          ctx.font = `${squareSize}px Arial`;
          ctx.fillText("X", startX + squareSize/6, startY+squareSize/1.1, )
        }
        else if(model.boards[i][j].winner == State.DRAW){
          ctx.fillStyle = this.COLORS.draw;
          ctx.globalAlpha = 0.4;
          ctx.fillRect(startX, startY, squareSize, squareSize);
        }
        ctx.globalAlpha = 1;
      }
    }
  }
  private drawSmallBoard({ctx, smallBoard, startX, startY}: {
    ctx: CanvasRenderingContext2D,
    smallBoard: any,
    startX: any,
    startY: any
  }) {
    ctx.lineWidth = 1;
    const cellSize = this.WIDTH / 9 ;
    for (let i=0; i<3; i++){
      for (let j=0; j<3; j++){
        const cellX =  startX + j * cellSize;
        const cellY = startY + i * cellSize;
        ctx.strokeStyle = this.COLORS.blue;
        ctx.strokeRect(cellX, cellY, cellSize, cellSize);
        this.drawXO(ctx, smallBoard.board[i][j], cellX, cellY, cellSize);

      }
    }

  }
  private drawXO(ctx: CanvasRenderingContext2D, state: State, x: number, y: number, size: number) {
    const halfSize = size / 1.5;

    ctx.font = `${halfSize}px Arial`;
    if (state === State.X) {

      ctx.fillStyle = this.COLORS.darkBlue;
      ctx.fillText("X", x + halfSize / 2, y + size - halfSize / 4);
    } else if (state === State.O) {
      ctx.fillStyle = this.COLORS.red;
      ctx.fillText("O", x + halfSize / 2, y + size - halfSize / 4);
    }
  }
}
