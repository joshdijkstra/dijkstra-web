import { Component, Input } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'dijkstra-web-benzine',
  templateUrl: './benzine.component.html',
  styleUrls: ['./benzine.component.css'],
})
export class BenzineComponent {
  @Input() speed = 1400;
  sw = 2;
  c = [];
  strokeColor = 0;

  ngOnInit() {
    const sketch = (s: any) => {
      s.setup = () => {
        const canvas2 = s.createCanvas(s.windowWidth, s.windowHeight, s.WEBGL);
        canvas2.parent('sketch-holder');
      };

      s.draw = () => {
        s.background(0);
        s.rotateY(s.PI + s.frameCount * 0.01);

        for (let j = 0; j < 8; j++) {
          s.push();
          for (let i = 0; i < 10; i++) {
            s.translate(
              s.sin(s.frameCount * 0.001 + j) * 100,
              s.sin(s.frameCount * 0.001 + j) * 100,
              i * 0.1
            );
            s.rotateZ(s.frameCount * 0.002);
            s.push();
            s.stroke(255);
            s.noFill();
            s.sphere(8, 6, 4);
            s.pop();
          }
          s.pop();
        }
        s.camera(
          s.width * 0.33,
          s.height / 2,
          s.height / 2 / s.tan(s.PI / 6),
          s.width * 0.33,
          s.height / 2,
          0,
          0,
          1,
          0
        );
      };
    };

    const canvas = new p5(sketch);
  }
}
