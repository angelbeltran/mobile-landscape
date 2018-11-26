import Shape, { ShapeProps } from './shape';

/*
 * x, y, dx dy, strokeStyle
 */
export default class Line extends Shape {
  dx: number;
  dy: number;

  constructor(props: ShapeProps) {
    super(props);

    this.dx = (<any>this).dx || 0;
    this.dy = (<any>this).dy || 0;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(- this.dx / 2, - this.dy / 2);
    this.ctx.lineTo(this.dx / 2, this.dy / 2);
    this.ctx.stroke();
  }
}
