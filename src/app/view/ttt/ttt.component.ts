import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
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
    this.ctx = this.canvas?.nativeElement.getContext('2d');
    if (this.ctx) {
      this.draw.drawBoard(this.ctx, this.model);
    } else {
      console.error('Failed to get canvas context!');
    }
  }


}
