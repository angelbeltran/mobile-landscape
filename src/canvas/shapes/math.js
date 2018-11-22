export class Vector {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  add(other) {
    return new Vector(this.x + other.x, this.y + other.y);
  }

  scale(k) {
    return new Vector(this.x * k, this.y * k);
  }
}

