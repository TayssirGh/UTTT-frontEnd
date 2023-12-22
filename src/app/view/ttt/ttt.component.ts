import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {BigBoard} from "../../model/BigBoard";
import {Draw} from "../draw/Draw";

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

  ngOnInit(): void {
    this.canvas.nativeElement.width = 800;
    this.canvas.nativeElement.height = 800;
    this.ctx = this.canvas?.nativeElement.getContext('2d');
    if (this.ctx) {
      this.draw.drawBoard(this.ctx, this.model);
    } else {
      console.error('Failed to get canvas context!');
    }
  }
  @HostListener('click', ['$event'])
  canvasClick(event: MouseEvent): void {
    const rect = this.canvas.nativeElement.getBoundingClientRect();

    const x = event.clientX  - rect.left;
    const y = event.clientY - rect.top;
    ///TODO: send the mouse click and the positionMap and change the model
    this.draw.evaluatePosition(x,y);

  }


}
