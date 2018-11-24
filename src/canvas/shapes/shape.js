import { Vector } from './math';


const transformStack = [
  [1, 0, 0, 1, 0, 0],
];

// a * b
function composeTransforms(a, b) {
  const res = [
    (a[0] * b[0]) + (a[2] * b[1]),
    (a[1] * b[0]) + (a[3] * b[1]),
    (a[0] * b[2]) + (a[2] * b[3]),
    (a[1] * b[2]) + (a[3] * b[3]),
    (a[0] * b[4]) + (a[2] * b[5]) + a[4],
    (a[1] * b[4]) + (a[3] * b[5]) + a[5],
  ];

  return res;
}


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
    this.transformOutdated = true;
    this.transform = null;

    this._shapes = this._shapes || [];
    this._shapes.forEach(s => {
      if (this.ctx) {
        s.ctx = this.ctx;
      }

      s.parent = this;
    });
  }

  get ctx() {
    if (!this._ctx) {
      throw new Error(`No context exists on this ${this.constructor.name}!\n${JSON.stringify(this)}\nEnsure the shape has been added to the rendering engine`);
    }

    return this._ctx;
  }

  set ctx(ctx) {
    this._ctx = ctx; // never explicitly set the _ctx property of a shape
    if (this.shapes) {
      this.shapes.forEach(s => { s.ctx = ctx });
    }
  }

  set position(v) {
    this._position = v;
    this.transformOutdated = true;
  }

  get position() {
    return this._position;
  }

  set rotation(a) {
    this._a = a;
    this.transformOutdated = true;
  }

  get rotation() {
    return this._a;
  }

  get shapes() {
    return this._shapes;
  }

  set shapes(shapes = []) {
    this._shapes = shapes;
    
    shapes.forEach(s => {
      s.parent = this;
    });
  }

  move() {
    this.applyForces();
    this.applyMoments();
    this.rotation += this.angularVelocity * dt;
    this.position = this.position.add(
      this.velocity.scale(dt)
    );

    if (!this.parent) {
      // sub shapes only have local coordinates
      this.checkBounds();
    }

    this.shapes.forEach(s => s.move());
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

  render() {
    if (!this.ctx) {
      return;
    }

    this.prepareContext();
    this.applyTransform();
    this.draw();

    this.shapes.forEach(s => s.render());
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
    const globalTransform = transformStack[transformStack.length - 1];
    const localTransform = this.computeTransform();
    const nextTransform = composeTransforms(globalTransform, localTransform);

    transformStack.push(nextTransform);

    this.ctx.setTransform.apply(this.ctx, nextTransform);
  }

  computeTransform() {
    if (this.transformOutdated) {
      this.transform = [
        Math.cos(this.rotation),
        Math.sin(this.rotation),
        - Math.sin(this.rotation),
        Math.cos(this.rotation),
        this.position.x,
        this.position.y
      ];

      this.transformOutdated = false;
    }

    return this.transform;
  }

  draw() {
    console.error('draw was not implemented!');
  }

  resetTransform() {
    transformStack.pop();

    this.ctx.setTransform.apply(this.ctx, transformStack[transformStack.length - 1]);
  }

  rotate(da = 0) {
    this.rotation += da;

    this.transformOutdated = true;
  }

  translate(dx = 0, dy = 0) {
    this.position.x += dx;
    this.position.y += dy;

    this.transformOutdated = true;
  }

  translateX(dx = 0) {
    this.translate(dx, 0);
  }

  translateY(dy = 0) {
    this.translate(0, dy);
  }

  translateRel(dx = 0, dy = 0) {
    let transform = this.computeTransform();
    let shape = this;

    while (shape.parent) {
      transform = composeTransforms(transform, shape.parent.computeTransform());
      shape = this.parent;
    }

    const x = (dx * transform[0]) + (dy * transform[2]);
    const y = (dx * transform[1]) + (dy * transform[3]);

    this.translate(x, y);
  }

  translateRelX(dx = 0) {
    this.translateRel(dx, 0);
  }

  translateRelY(dy = 0) {
    this.translateRel(0, dy);
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

