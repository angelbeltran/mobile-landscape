import {
  Vector,
  Transform,
  composeTransforms,
  computeTransform,
} from './math';


export interface EntityProps {
  parent?: Entity;
  x?: number;
  y?: number;
  rotation?: number;
  velocity?: Vector;
  angularVelocity?: number;
  forces?: Vector[];
  moments?: number[];
}

export class Entity {
  id: number = Entity.getNextId();
  protected parent?: Entity;
  transform: Transform = [1, 0, 0, 1, 0, 0];
  transformOutdated: boolean = true;
  private _position: Vector = (new Vector());
  private _rotation: number = 0;
  velocity: Vector = (new Vector());
  angularVelocity: number = 0;
  forces: Vector[] = [];
  moments: number[] = [];

  constructor(props: EntityProps) {
    this.position.x = props.x || this.position.x;
    this.position.y = props.y || this.position.y;
    this.rotation = props.rotation || this.rotation;
    this.velocity = props.velocity || this.velocity;
    this.angularVelocity = props.angularVelocity || this.angularVelocity;
    this.forces = props.forces || this.forces;
    this.moments = props.moments || this.moments;
  }

  static nextId = 0;
  static getNextId() {
    const id = Entity.nextId;

    Entity.nextId += 1;

    return id;
  }

  set position(v: Vector) {
    this._position = v;
    this.transformOutdated = true;
  }

  get position(): Vector {
    return this._position;
  }

  set rotation(a: number) {
    this._rotation = a;
    this.transformOutdated = true;
  }

  get rotation(): number {
    return this._rotation;
  }

  computeTransform(): Transform {
    if (this.transformOutdated) {
      this.transform = computeTransform(this.rotation, this.position);
      this.transformOutdated = false;
    }

    return this.transform;
  }

  rotate(da: number = 0): void {
    this.rotation += da;

    this.transformOutdated = true;
  }

  translate(dx: number = 0, dy: number = 0): void {
    this.position.x += dx;
    this.position.y += dy;

    this.transformOutdated = true;
  }

  translateX(dx: number = 0): void {
    this.translate(dx, 0);
  }

  translateY(dy: number = 0): void {
    this.translate(0, dy);
  }

  translateRel(dx: number = 0, dy: number = 0): void {
    let transform = this.computeTransform();
    let shape: Entity = this;

    while (Boolean(shape.parent)) {
      if (shape.parent) {
        transform = composeTransforms(transform, shape.parent.computeTransform());
        shape = shape.parent;
      }
    }

    const x = (dx * transform[0]) + (dy * transform[2]);
    const y = (dx * transform[1]) + (dy * transform[3]);

    this.translate(x, y);
  }

  translateRelX(dx: number = 0): void {
    this.translateRel(dx, 0);
  }

  translateRelY(dy: number = 0): void {
    this.translateRel(0, dy);
  }
}
