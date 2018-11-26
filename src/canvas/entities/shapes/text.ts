import Shape, { ShapeProps } from './shape';


/*
 * x, y, text, font, fillStyle, strokeStyle, textAlign, baseline, direction
 */
export default class Text extends Shape {
  _text: string = '';
  maxWidth: number = 0;
  textBaseline: CanvasTextBaseline = 'middle';
  textAlign: CanvasTextAlign = 'center';

  constructor(props: ShapeProps) {
    super(props);
    this.maxWidth = props.maxWidth || 10;
    this.textBaseline = props.textBaseline || 'middle';
    this.textAlign = props.textAlign || 'center';
  }

  draw() {
    this.ctx.textBaseline = this.textBaseline;
    this.ctx.textAlign = this.textAlign;

    if (this.fillStyle) {
      this.ctx.fillText(this.text, 0, 0, this.maxWidth);
    }
    if (this.strokeStyle) {
      this.ctx.strokeText(this.text, 0, 0, this.maxWidth);
    }

    delete this.ctx.textBaseline;
    delete this.ctx.textAlign;
  }

  get text(): string {
    return this._text;
  }

  set text(s: string) {
    if (s !== this._text) {
      this._text = s;
      this.transformOutdated = true;
    }
  }
}
