import { Vector } from './math';


export default class Shape {
  constructor(props) {
    props = props || {};
    Object.keys(props).forEach(key => {
      this[key] = props[key];
    });

    this.id = Shape.getNextId();
    this.forces = this.forces || [];
    this.moments = this.moments || [];
    this.velocity = this.velocity || new Vector();
    this.angularVelocity = this.angularVelocity || 0;
    this.position = new Vector(props.x || 0, props.y || 0);
    this.rotation = this.rotation || 0;
  }

  render() {
    if (!this.ctx) {
      return;
    }

    this.prepareContext();
    this.applyTransform();
    this.draw();
    this.resetTransform();
  }

  prepareContext() {
    this.applyGlobalDefaults();

    contextProps.forEach(prop => {
      this.ctx[prop] = this[prop] || this.ctx[prop];
    })

    // font is broken into two parts, font family and size
    if (this.font && this.fontSize) {
      this.ctx.font = this.fontSize + 'pt ' + this.font;
    }
  }

  applyGlobalDefaults() {
    Object.keys(globalDefaults).forEach(key => {
      if (key === undefined || this.ctx[key] !== undefined) {
        delete this.ctx[key];
      } else {
        this.ctx[key] = globalDefaults[key];
      }
    });
  }

  applyTransform() {
    this.ctx.setTransform(
      Math.cos(this.rotation),
      Math.sin(this.rotation),
      - Math.sin(this.rotation),
      Math.cos(this.rotation),
      this.position.x,
      this.position.y,
    );
  }

  draw() {
    console.error('draw was not implemented!');
  }

  resetTransform() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  move() {
    this.applyForces();
    this.applyMoments();
    this.rotation += this.angularVelocity * dt;
    this.position = this.position.add(
      this.velocity.scale(dt)
    );
    this.checkBounds();
  }

  applyForces() {
    this.velocity = this.velocity.add(
      this.forces.reduce(
        (sum, force) => sum.add(force),
        new Vector(0, 0)
      ).scale(dt)
    )
  }

  applyMoments() {
    this.angularVelocity += dt * this.moments
      .reduce((sum, moment) => sum + moment, 0)
  }

  checkBounds() {
    if (this.position.x < 0) {
      this.position.x = 0;
      this.velocity.x = 0;
    } else if (this.position.x > this.ctx.canvas.width) {
      this.position.x = this.ctx.canvas.width;
      this.velocity.x = 0;
    }

    if (this.position.y < 0) {
      this.position.y = 0;
      this.velocity.y = 0;
    } else if (this.position.y > this.ctx.canvas.height) {
      this.position.y = this.ctx.canvas.height;
      this.velocity.y = 0;
    }
  }
}


let nextId = 0;
Shape.getNextId = function getNextId() {
  const id = nextId;

  nextId += 1;

  return id;
}


/*
 * Constants / Globals
 */
const globalDefaults = {
  direction: 'inherit',
  fillStyle: undefined,
  filter: undefined,
  font: undefined,
  globalAlpha: undefined,
  globalCompositeOperation: undefined,
  imageSmoothingEnabled: undefined,
  imageSmoothingQuality: undefined,
  lineCap: undefined,
  lineDashOffset: undefined,
  lineJoin: undefined,
  miterLimit: undefined,
  shadowBlur: undefined,
  shadowColor: undefined,
  shadowOffsetX: undefined,
  shadowOffsetY: undefined,
  strokeStyle: undefined,
  textAlign: undefined,
  textBaseline: undefined,
};
const contextProps = [
  'direction',
  'fillStyle',
  'filter',
  'font',
  'globalAlpha',
  'globalCompositeOperation',
  'imageSmoothingEnabled',
  'imageSmoothingQuality',
  'lineCap',
  'lineDashOffset',
  'lineJoin',
  'miterLimit',
  'shadowBlur',
  'shadowColor',
  'shadowOffsetX',
  'shadowOffsetY',
  'strokeStyle',
  'textAlign',
  'textBaseline',
]
const dt = 1; // TODO: tweak this to get the forces we want

