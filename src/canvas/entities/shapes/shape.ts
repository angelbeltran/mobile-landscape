import {
  Vector,
  stack as transformStack,
  composeTransforms,
  computeTransform,
} from '../math';
import { Entity, EntityProps } from '../entity';
import {
  ContextProp,
  globalDefaults,
  contextProps,
  DT,
} from '../constants';


export interface ShapeProps extends EntityProps {
  shapes?: Shape[];
  w?: number;
  h?: number;
  font?: string;
  fontSize?: number;
  fillStyle?: string;
  strokeStyle?: string;
  [key: string]: any;
}

export default class Shape extends Entity {
  private _ctx?: CanvasRenderingContext2D;
  private _shapes: Shape[];
  w: number = 0;
  h: number = 0;
  font: string = '';
  fontSize: number = 0;
  fillStyle: string = '';
  strokeStyle: string = '';

  constructor(props: ShapeProps = {}) {
    super(props);
    Object.keys(props).forEach((key: keyof ShapeProps) => {
      (<any>this)[key] = props[key]; // TODO: types!
    });

    this._shapes = props.shapes || [];
    this._shapes.forEach(s => {
      if (this.ctx) {
        s.ctx = this.ctx;
      }

      s.parent = this;
    });
  }

  get ctx(): CanvasRenderingContext2D {
    if (!this._ctx) {
      throw new Error(`No context exists on this ${(<any>this).constructor.name}!\n${JSON.stringify(this)}\nEnsure the shape has been added to the rendering engine`);
    }

    return this._ctx;
  }

  set ctx(ctx: CanvasRenderingContext2D) {
    this._ctx = ctx; // never explicitly set the _ctx property of a shape

    if (this.shapes) {
      this.shapes.forEach(s => { s.ctx = ctx });
    }
  }

  get shapes() {
    return this._shapes || [];
  }

  set shapes(shapes: Shape[]) {
    this._shapes = shapes || [];
    
    shapes.forEach(s => {
      s.parent = this;
    });
  }

  move() {
    this.applyForces();
    this.applyMoments();
    this.rotation += this.angularVelocity * DT;
    this.position = this.position.add(
      this.velocity.scale(DT)
    );

    /*
    if (!this.parent) {
      // sub shapes only have local coordinates
      this.checkBounds();
    }
    */

    this.shapes.forEach(s => s.move());
  }

  applyForces() {
    this.velocity = this.velocity.add(
      this.forces.reduce(
        (sum: Vector, force) => sum.add(force),
        new Vector(0, 0)
      ).scale(DT)
    )
  }

  applyMoments() {
    this.angularVelocity += DT * this.moments
      .reduce((sum, moment) => sum + moment, 0)
  }

  /*
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
  */

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

    contextProps.forEach((prop: ContextProp) => {
      this.ctx[prop] = (<any>this)[prop] || this.ctx[prop];
    })

    // font is broken into two parts, font family and size
    if (this.font && this.fontSize) {
      this.ctx.font = this.fontSize + 'px ' + this.font;
    }
  }

  applyGlobalDefaults() {
    contextProps.forEach((key: ContextProp) => {
      if (key === undefined || this.ctx[key] !== undefined) {
        delete this.ctx[key];
      } else {
        const prop = globalDefaults[key];

        if (prop) {
          this.ctx[key] = prop;
        }
      }
    });
  }

  draw() {
    console.error('draw was not implemented!');
  }

  applyTransform() {
    const globalTransform = transformStack[transformStack.length - 1];
    const localTransform = this.computeTransform();
    const nextTransform = composeTransforms(globalTransform, localTransform);

    transformStack.push(nextTransform);

    this.ctx.setTransform.apply(this.ctx, nextTransform);
  }

  resetTransform() {
    transformStack.pop();

    this.ctx.setTransform.apply(this.ctx, transformStack[transformStack.length - 1]);
  }
}
