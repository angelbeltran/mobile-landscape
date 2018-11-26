import Shape from './shape';


interface Props {
  radius: number;
  [key: string]: any;
}

/*
 * x, y, radius, 
 */
export default class Circle extends Shape {
  radius: number;

  constructor(props: Props) {
    super(props);

    this.radius = props.radius;
  }

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
