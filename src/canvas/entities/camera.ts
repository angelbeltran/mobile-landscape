import {
  setCameraTransform,
  Vector,
  Transform,
  computeTransform,
  inverseTransform,
  origin,
} from './math';
import { Entity } from './entity';


export default class Camera extends Entity {
  setPerspective(): void {
    setCameraTransform(this.computeTransform());
  }

  computeTransform(rotation: number = this.rotation, position: Vector = this.position): Transform {
    if (this.transformOutdated) {
      this.transform = inverseTransform(this.rotation, this.position);
      this.transform[4] += origin.x;
      this.transform[5] += origin.y;

      this.transformOutdated = false;
    }

    return this.transform;
  }

  translateRel(dx: number = 0, dy: number = 0): void {
    let transform = computeTransform(this.rotation, this.position);

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
