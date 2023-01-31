import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dijkstra-web-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  innerWidth: any;
  innerHeight: any;
  numX: any;
  numY: any;
  px: any;
  py: any;
  board: any;

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    console.log(this.innerHeight, this.innerWidth);
    this.numY = Math.round(this.innerHeight / 100);
    this.numX = Math.round(this.innerWidth / 100);
    this.px = this.innerWidth / this.numX;
    this.py = this.innerHeight / this.numY;

    this.board = Array(this.numX).fill(Array(this.numY).fill(0));
  }
}
