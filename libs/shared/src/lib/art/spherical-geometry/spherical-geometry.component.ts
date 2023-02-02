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
    const sketch = (s: {
      setup: () => void;
      createCanvas: (arg0: any, arg1: any, arg2: any) => any;
      windowWidth: any;
      windowHeight: any;
      WEBGL: any;
      draw: () => void;
      background: (arg0: number) => void;
      camera: (
        arg0: number,
        arg1: number,
        arg2: number,
        arg3: number,
        arg4: number,
        arg5: number,
        arg6: number,
        arg7: number,
        arg8: number
      ) => void;
      width: number;
      height: number;
      tan: (arg0: number) => number;
      PI: number;
      translate: (arg0: number, arg1: number, arg2: number) => void;
      stroke: (arg0: number) => void;
      noFill: () => void;
      push: () => void;
      pop: () => void;
      rotateX: (arg0: number) => void;
      TWO_PI: number;
      frameCount: number;
      rotateZ: (arg0: number) => void;
      rotateY: (arg0: number) => void;
      sphere: (arg0: number) => void;
      mouseReleased: () => void;
      keyPressed: () => void;
      key: string;
    }) => {
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
