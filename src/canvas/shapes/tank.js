import Shape from './shape';
import Rect from './rect';
import Circle from './circle';


/*
 * body(Rect): x, y, fillStyle, strokeStyle
 */
export default class Tank extends Shape {
  constructor(props) {
    super(props);

    const bodySpecs = {
      width: 30,
      height: 70,
    };
    const trackSpecs = {
      width: 10,
      height: bodySpecs.height,
    };


    const body = new Rect({
      w: bodySpecs.width,
      h: bodySpecs.height,
      fillStyle: 'green',
      //strokeStyle: 'black',
    });
    const leftTrack = new Rect({
      x: - (bodySpecs.width + trackSpecs.width) / 2,
      w: trackSpecs.width,
      h: trackSpecs.height,
      fillStyle: 'rgb(100, 100, 100)',
      //strokeStyle: 'black',
    });
    const rightTrack = new Rect({
      x: (bodySpecs.width + trackSpecs.width) / 2,
      w: trackSpecs.width,
      h: trackSpecs.height,
      fillStyle: 'rgb(100, 100, 100)',
      //strokeStyle: 'black',
    });
    this.turret = new Turret({ y: 7 });

    this.shapes = [ body, leftTrack, rightTrack, this.turret ];
  }

  draw() {
    // parent shape has no implementation
  }

  rotateTurret(da = 0) {
    this.turret.rotate(da);
  }

  setTurretRotation(a = 0) {
    this.turret.rotation = a;
  }
}


class Turret extends Shape {
  constructor(props) {
    super(props);

    const turret = new Circle({
      radius: 12,
      fillStyle: 'rgb(0, 100, 0)',
      //strokeStyle: 'rgb(0, 50, 0)',
    });
    const barrel = new Rect({
      y: -22,
      w: 8,
      h: 20,
      fillStyle: 'rgb(70, 100, 70)',
      //strokeStyle: 'black',
    });

    this.shapes = [ turret, barrel ];
  }

  draw() {
    // parent shape has no implementation
  }
}
