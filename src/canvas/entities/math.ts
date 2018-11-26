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

export const stack: Transform[] = [
  [1, 0, 0, 1, 0, 0],
];

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

export function computeTransform(rotation: number, { x, y }: Vector): Transform {
  const c = Math.cos(rotation);
  const s = Math.sin(rotation);

  return [ c, s, -s, c, x, y ];
}
