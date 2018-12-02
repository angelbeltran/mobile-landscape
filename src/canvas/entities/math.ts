import { windowWidth, windowHeight } from './constants';


export class Vector {
  x: number;
  y: number;

  constructor(x?: number, y?: number) {
    this.x = x || 0;
    this.y = y || 0;
  }

  add(other: Vector) {
    return new Vector(this.x + other.x, this.y + other.y);
  }

  scale(k: number) {
    return new Vector(this.x * k, this.y * k);
  }
}

export type Transform = [number, number, number, number, number, number];

export const origin = new Vector(windowWidth / 2, windowHeight / 2);
// TODO: don't export this!
export const stack: Transform[] = [
  // camera transform:
  // translate to center of screen (origin)
  [1, 0, 0, 1, origin.x, origin.y],
];

export function setCameraTransform(t: Transform): void {
  for (let i = 0; i < 6; i += 1) {
    stack[0][i] = t[i];
  }
}
export function getCameraTransform(): Transform {
  return copyTransform(stack[0]);
}

function copyTransform(t: Transform): Transform {
  const u: Transform = [0, 0, 0, 0, 0, 0];

  for (let i = 0; i < 6; i += 1) {
    u[i] = t[i];
  }

  return u;
}

// a * b
export function composeTransforms(a: Transform, b: Transform): Transform {
  return [
    (a[0] * b[0]) + (a[2] * b[1]),
    (a[1] * b[0]) + (a[3] * b[1]),
    (a[0] * b[2]) + (a[2] * b[3]),
    (a[1] * b[2]) + (a[3] * b[3]),
    (a[0] * b[4]) + (a[2] * b[5]) + a[4],
    (a[1] * b[4]) + (a[3] * b[5]) + a[5],
  ];
}

export function computeTransform(rotation: number, v: Vector): Transform {
  const c = Math.cos(rotation);
  const s = Math.sin(rotation);
  const { x, y } = v;

  return [ c, s, -s, c, x, y ];
}

export function oppositeTransform(rotation: number, v: Vector): Transform {
  return composeTransforms(
    computeTransform(0, new Vector(-v.x, -v.y)),
    computeTransform(-rotation, new Vector()),
  );
}

export function inverseTransform(rotation: number, v: Vector): Transform {
  return composeTransforms(
    computeTransform(-rotation, new Vector()),
    computeTransform(0, new Vector(-v.x, -v.y)),
  );
}
