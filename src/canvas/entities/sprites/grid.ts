import Shape, { ShapeProps } from '../shapes/shape';
import Line from '../shapes/line';


export default class Grid extends Shape {
  constructor(props: ShapeProps) {
    super(props);

    for (let x = - this.w / 2; x <= this.w / 2; x += 50) {
      this.shapes.push(
        new Line({
          x,
          y: 0,
          dx: 0,
          dy: this.h,
          strokeStyle: 'black',
          rotation: 0,
        })
      );
    }

    for (let y = - this.h / 2; y <= this.h / 2; y += 50) {
      this.shapes.push(
        new Line({
          x: 0,
          y,
          dx: this.w,
          dy: 0,
          strokeStyle: 'black',
          rotation: 0,
        })
      );
    }
  }

  draw() {
    // parent shape
  }
}

