import {BigBoard} from "../../model/BigBoard";

export class Draw{
  private WIDTH = 800;

  private COLORS = {white: "rgba(255,255,251,0.78)", black: "#22223b", blue: "#9db4c0", red: "rgb(129, 43, 56)"};
  public drawBoard(ctx: CanvasRenderingContext2D, model: BigBoard){
    ctx.fillStyle = this.COLORS.white;
    ctx.fillRect(0, 0, this.WIDTH, this.WIDTH);

    ctx.lineWidth = 5;
    var squareSize = this.WIDTH/3;
    for (let i =0; i<3; i++){
      for (let j=0; j<3; j++){
        const startX =j * squareSize;
        const startY = i * squareSize;

        // Draw a rectangle for each small board
        ctx.strokeStyle = this.COLORS.black;
        ctx.strokeRect(startX, startY, squareSize, squareSize);
        this.drawSmallBoard(ctx, model.boards[i][j], startX, startY);
        ctx.lineWidth = 5
      }
    }
  }
  private drawSmallBoard(ctx: CanvasRenderingContext2D, smallBoard, startX, startY) {
    ctx.lineWidth = 1;
    const cellSize = this.WIDTH / 9 ;
    for (let i=0; i<3; i++){
      for (let j=0; j<3; j++){
        const cellX =  startX + j * cellSize;
        const cellY = startY + i * cellSize;
        ctx.strokeStyle = this.COLORS.blue;
        ctx.strokeRect(cellX, cellY, cellSize, cellSize);
      }
    }

  }
}
