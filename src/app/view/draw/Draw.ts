import {BigBoard} from "../../model/BigBoard";
import {State} from "../../model/State";

export class Draw{
  private WIDTH = 800;
  private posMap: Map<string, { x1: number, x2: number, y1: number, y2: number }> = new Map();
  gameStart : boolean = false;
  enableRow : number = null;
  enableCol : number = null;
  private COLORS = {beige : "#fdf0d5",redLight: "rgb(176,109,113)",white: "rgba(255,255,251,0.78)", draw: "#edede9", black: "#22223b", darkBlue: "#003049", blue: "#9db4c0", red: "rgb(129, 43, 56)"};
  public evaluatePosition(x: number, y:number){
    let s = ""
    this.posMap?.forEach((coordinates, key) => {
      const startX = coordinates.x1;
      const endX = coordinates.x2;
      const startY = coordinates.y1;
      const endY = coordinates.y2;

      if (x >= startX && x <= endX && y >= startY && y <= endY) {
        console.log("you clicked on cell : "+key)
        s = key;
      }
    });
    return s;

  }

  private generateKey(bigBoardRow: number, bigBoardCol: number, smallBoardRow: number, smallBoardCol: number): string {
    const key = `${bigBoardRow}${bigBoardCol}${smallBoardRow}${smallBoardCol}`;
    return (key.padStart(4, '0'));
  }
  public logPosMap() {
    console.log("ahla")
    this.posMap.forEach((value, key) => {
      console.log(`POS: ${key} -> x1: ${value.x1}, x2: ${value.x2}, y1: ${value.y1}, y2: ${value.y2}`);
    });
  }
  public drawBoard(ctx: CanvasRenderingContext2D, model: BigBoard){
    ctx.fillStyle = this.COLORS.white;
    ctx.fillRect(0, 0, this.WIDTH, this.WIDTH);

    ctx.lineWidth = 5;
    const squareSize = this.WIDTH / 3;
    for (let i =0; i<3; i++){
      for (let j=0; j<3; j++){
        let bigBoardCol = j;
        const startX =j * squareSize;
        const startY = i * squareSize;
        if(this.enableRow ==i && this.enableCol == j){
          ctx.fillStyle = this.COLORS.beige
          ctx.globalAlpha = 0.2;
          ctx.fillRect(startX, startY, squareSize, squareSize);
        }
        ctx.strokeStyle = this.COLORS.black;
        ctx.strokeRect(startX, startY, squareSize, squareSize);
        this.drawSmallBoard({ctx: ctx, smallBoard: model.boards[i][j], startX: startX, startY: startY, bigBoardRow:i, bigBoardCol : bigBoardCol});
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
  private drawSmallBoard({ctx, smallBoard, startX, startY, bigBoardRow, bigBoardCol}: {
    ctx: CanvasRenderingContext2D,
    smallBoard: any,
    startX: number,
    startY: number,
    bigBoardRow : number,
    bigBoardCol : number
  }) {
    ctx.lineWidth = 1;
    const cellSize = this.WIDTH / 9 ;
    for (let i=0; i<3; i++){
      for (let j=0; j<3; j++){
        let smallBoardCol = j;
        const cellX =  startX + j * cellSize;
        const cellY = startY + i * cellSize;

        ctx.strokeStyle = this.COLORS.blue;
        ctx.strokeRect(cellX, cellY, cellSize, cellSize);
        this.posMap.set(this.generateKey(bigBoardRow, bigBoardCol, i, smallBoardCol),{x1:cellX, x2:cellX+cellSize, y1:cellY, y2:cellY+cellSize} )
        // console.log(this.generateKey(bigBoardRow, bigBoardCol, i, smallBoardCol) + "\n");
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
  ///TODO: draw winners!!

}
