import Shape from './shape';

/*
 * x, y, w, h, fillStyle, strokeStyle
 */
export default class Rect extends Shape {
  draw() {
    if (this.fillStyle) {
      this.ctx.fillRect(- this.w / 2, - this.h / 2, this.w, this.h);
    }
    if (this.strokeStyle) {
      this.ctx.strokeRect(- this.w / 2, - this.h / 2, this.w, this.h);
    }
  }
}
