import Shape from './shape';

/*
 * x, y, radius, 
 */
export default class Circle extends Shape {
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    if (this.fillStyle) {
      this.ctx.fill();
    }
    if (this.strokeStyle) {
      this.ctx.stroke();
    }
  }
}
