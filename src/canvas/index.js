export * from './shapes';


export default class Renderer {
  constructor(ctx) {
    this.ctx = ctx;
    this.shapes = {};
    this.running = false;
  }

  addShapes() {
    for (let i = 0; i < arguments.length; i += 1) {
      const arg = arguments[i];

      if (Array.isArray(arg)) {
        this.addShapes.apply(this, arg);
      } else {
        this.shapes[arg.id] = arg;
        arg.ctx = this.ctx;
      }
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
      this.intervalId = setInterval(() => this.render(), dt)
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
      s.render();
    })
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}
