import { Shape, Camera, origin } from './entities';
import { getCameraTransform } from './entities/math';


export class Renderer {
  ctx: CanvasRenderingContext2D;
  camera: Camera = (new Camera());
  shapes: {
    [key: string]: Shape;
  } = {};
  running: boolean = false;
  intervalId: number | undefined;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  addShapes(...shapes: Shape[]): void {
    for (let shape of shapes) {
      this.shapes[shape.id] = shape;
      shape.ctx = this.ctx;
    }
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
    this.ctx.setTransform.apply(this.ctx, getCameraTransform());

    const { x, y } = this.camera.position;
    const w = this.ctx.canvas.width;
    const h = this.ctx.canvas.height;
    const d = Math.sqrt((w * w) + (h * h));

    this.ctx.clearRect(x - d / 2, y - d / 2, d, d);
  }
}
