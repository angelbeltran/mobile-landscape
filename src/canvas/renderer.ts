import { Shape } from './entities';


export class Renderer {
  ctx: CanvasRenderingContext2D;
  shapes: {
    [key: string]: Shape;
  }
  running: boolean;
  intervalId: number | undefined;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.shapes = {};
    this.running = false;
  }

  addShapes(...shapes: Shape[]): void {
    for (let shape of shapes) {
      this.shapes[shape.id] = shape;
      shape.ctx = this.ctx;
    }
    /*
    for (let i = 0; i < arguments.length; i += 1) {
      const arg = arguments[i];

      if (Array.isArray(arg)) {
        this.addShapes.apply(this, arg);
      } else {
        this.shapes[arg.id] = arg;
        arg.ctx = this.ctx;
      }
    }
    */
  }

  removeShapes() {
    for (let i = 0; i < arguments.length; i += 1) {
      const arg = arguments[i];

      if (Array.isArray(arg)) {
        this.removeShapes.apply(this, arg);
      } else {
        delete this.shapes[arguments[i].id];
      }
    }
  }

  start(dt = 1000 / 60) {
    if (!this.intervalId) {
      this.intervalId = window.setInterval(() => this.render(), dt)
      this.running = true;
    }
  }

  stop() {
    clearInterval(this.intervalId);
    this.running = false;
  }

  render() {
    this.clearCanvas();
    Object.keys(this.shapes).map(k => this.shapes[k]).forEach(s => {
      s.move();
    })
    Object.keys(this.shapes).map(k => this.shapes[k]).forEach(s => {
      s.render();
    })
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}
