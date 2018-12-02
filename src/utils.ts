import { MouseEvent } from 'react';
import * as Canvas from './canvas';


// TODO: get rid of these eventually
export const TANK_X = Canvas.windowWidth / 2;
//const TANK_Y = 3 * Canvas.windowHeight / 4;
export const TANK_Y = Canvas.windowHeight / 2;

export function degreesToRadians(d: number): number {
  return (Math.PI * d) / 180;
}

export function addShapes(engine: Canvas.Renderer, ...shapes: Canvas.Shape[]) {
  engine.addShapes(...shapes);
}

export function getAngleInFrontOfTank(e: MouseEvent<HTMLCanvasElement>): number {
  const { x, y } = offsetByTank(e);

  return Math.atan2(y, x) + (Math.PI / 2);
}

export function offsetByTank(e: MouseEvent<HTMLCanvasElement>): { x: number, y: number } {
  return {
    x: e.clientX - Canvas.origin.x,
    y: e.clientY - Canvas.origin.y,
  };
}
