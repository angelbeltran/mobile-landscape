import Shape from './shape';

/*
 * x, y, text, font, fillStyle, strokeStyle, width, textAlign, baseline, direction
 */
export default class Text extends Shape {
  draw() {
    const width = this.ctx.measureText(this.text).width;
    const height = this.fontSize;

    if (this.fillStyle) {
      this.ctx.fillText(this.text, -width / 2, height / 2, this.maxWidth);
    }
    if (this.strokeStyle) {
      this.ctx.strokeText(this.text, -width / 2, height / 2, this.maxWidth);
    }
  }
}
