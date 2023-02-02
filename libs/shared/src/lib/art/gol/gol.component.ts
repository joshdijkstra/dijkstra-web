import { Component, Input } from '@angular/core';
import { josh } from './textarray';
import * as p5 from 'p5';

@Component({
  selector: 'dijkstra-web-gol',
  templateUrl: './gol.component.html',
  styleUrls: ['./gol.component.css'],
})
export class GolComponent {
  @Input() speed = 1400;
  sw = 2;
  c = [];
  strokeColor = 0;
  w: any;
  columns: any;
  rows: any;
  board: any;
  next: any;
  run: any;

  ngOnInit() {
    const sketch = (s: any) => {
      s.setup = () => {
        s.frameRate(20);
        const canvas2 = s.createCanvas(s.windowWidth, s.windowHeight);
        canvas2.parent('sketch-holder');
        this.w = 20;
        this.columns = s.floor(s.width / this.w);
        this.rows = s.floor(s.height / this.w);
        console.log(this.columns, this.rows);
        this.board = new Array(this.columns);
        this.run = false;
        for (let i = 0; i < this.columns; i++) {
          this.board[i] = new Array(this.rows);
        }
        this.next = new Array(this.columns);
        for (let i = 0; i < this.columns; i++) {
          this.next[i] = new Array(this.rows);
        }

        s.init();
      };

      s.draw = () => {
        s.background(0);
        if (this.run) {
          s.generate();
        }
        for (let i = 0; i < this.columns; i++) {
          for (let j = 0; j < this.rows; j++) {
            if (this.board[i][j] == 1) s.fill(255);
            else s.fill(0);
            s.stroke(0);
            s.rect(i * this.w, j * this.w, this.w - 1, this.w - 1);
          }
        }
      };

      function shiftUp() {
        const te = josh;
        for (let j = 0; j < josh.length; j++) {
          for (let i = 0; i < 5; i++) {
            te[j].shift();
            te[j].push(0);
          }
        }
        console.log(te);
      }

      s.mouseWheel = () => {
        console.log('');
        this.run = true;
      };

      // reset board when mouse is pressed
      s.mousePressed = () => {
        // s.init();
        console.log(
          s.floor((s.mouseX * this.columns) / s.width),
          s.floor((s.mouseY * this.rows) / s.height)
        );
        this.board[s.floor((s.mouseX * this.columns) / s.width)][
          s.floor((s.mouseY * this.rows) / s.height)
        ] =
          this.board[s.floor((s.mouseX * this.columns) / s.width)][
            s.floor((s.mouseY * this.rows) / s.height)
          ] === 1
            ? 0
            : 1;
        console.log(this.board);
      };

      // Fill board randomly
      s.init = () => {
        for (let i = 0; i < this.columns; i++) {
          for (let j = 0; j < this.rows; j++) {
            // Lining the edges with 0s
            if (i == 0 || j == 0 || i == this.columns - 1 || j == this.rows - 1)
              this.board[i][j] = 0;
            // Filling the rest randomly
            // else this.board[i][j] = s.floor(s.random(2));
            else this.board[i][j] = 0;
            this.next[i][j] = 0;
          }
        }
        this.board = josh;
      };

      // The process of creating the new generation
      s.generate = () => {
        // Loop through every spot in our 2D array and check spots neighbors
        for (let x = 1; x < this.columns - 1; x++) {
          for (let y = 1; y < this.rows - 1; y++) {
            // Add up all the states in a 3x3 surrounding grid
            let neighbors = 0;
            for (let i = -1; i <= 1; i++) {
              for (let j = -1; j <= 1; j++) {
                neighbors += this.board[x + i][y + j];
              }
            }

            // A little trick to subtract the current cell's state since
            // we added it in the above loop
            neighbors -= this.board[x][y];
            // Rules of Life
            if (this.board[x][y] == 1 && neighbors < 2)
              this.next[x][y] = 0; // Loneliness
            else if (this.board[x][y] == 1 && neighbors > 3)
              this.next[x][y] = 0; // Overpopulation
            else if (this.board[x][y] == 0 && neighbors == 3)
              this.next[x][y] = 1; // Reproduction
            else this.next[x][y] = this.board[x][y]; // Stasis
          }
        }
        // Swap!
        const temp = this.board;
        // this.board = this.next;
        this.next = temp;
      };
    };
    const canvas = new p5(sketch);
  }
}
