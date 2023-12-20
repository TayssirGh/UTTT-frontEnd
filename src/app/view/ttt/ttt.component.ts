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
    if (event.clientX>rect.left && event.clientX<rect.right
      && event.clientY<rect.bottom && event.clientY>rect.top
    ){
      const x = event.clientX ;
      const y = event.clientY ;
      console.log(`Clicked at coordinates (x: ${x}, y: ${y})`);
      console.log(`Boundries are (x: ${rect.bottom}, y: ${rect.top})`);
      // Add your logic here based on the clicked coordinates

    }
  }


}
