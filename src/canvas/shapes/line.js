import Shape from './shape';

/*
 * x, y, dx dy, strokeStyle
 */
export default class Line extends Shape {
  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(- this.dx / 2, - this.dy / 2);
    this.ctx.lineTo(this.dx / 2, this.dy / 2);
    this.ctx.stroke();
  }
}
