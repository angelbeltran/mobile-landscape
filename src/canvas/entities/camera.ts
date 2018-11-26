import {
  Vector,
  stack as transformStack,
  Transform,
} from './math';


interface CameraProps {
  x?: number;
  y?: number;
  rotation?: number;
}

export class Camera {
  position: Vector = (new Vector());
  rotation: number = 0;

  constructor(props?: CameraProps) {
    if (props) {
      this.position.x = props.x || 0;
      this.position.y = props.y || 0;
      this.rotation = props.rotation || 0;
    }
  }

  setPerspective(t: Transform): void {
    transformStack[0] = t;
  }

  rotate(da: number = 0): void {
    this.rotation += da;
  }
}
