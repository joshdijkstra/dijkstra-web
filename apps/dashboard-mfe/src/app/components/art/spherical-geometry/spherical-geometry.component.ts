import { Component, Input, OnInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'dijkstra-web-spherical-geometry',
  templateUrl: './spherical-geometry.component.html',
  styleUrls: ['./spherical-geometry.component.css'],
})
export class SphericalGeometryComponent implements OnInit {
  @Input() speed = 1400;
  sw = 2;
  c = [];
  strokeColor = 0;

  ngOnInit() {
    const sketch = (s) => {
      s.setup = () => {
        const canvas2 = s.createCanvas(s.windowWidth, s.windowHeight, s.WEBGL);
        canvas2.parent('sketch-holder');
      };

      s.draw = () => {
        s.background(0);
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
        s.translate(s.width / 2, s.height / 2, -100);
        s.stroke(150);
        s.noFill();

        s.translate(240, 0, 0);
        s.push();
        s.pop();
        s.rotateX((s.TWO_PI * s.frameCount) / this.speed + 100);
        s.rotateZ((s.TWO_PI * s.frameCount) / this.speed);
        s.rotateY((s.TWO_PI * s.frameCount) / this.speed - 100);

        s.sphere(3100);
        s.sphere(1200);
      };

      s.mouseReleased = () => {
        this.strokeColor = (this.strokeColor + 1) % this.c.length;
        s.stroke(this.c[this.strokeColor]);
        console.log(`color is now ${this.c[this.strokeColor]}`);
      };

      s.keyPressed = () => {
        if (s.key === 'c') {
          window.location.reload();
        }
      };
    };

    const canvas = new p5(sketch);
  }
}
