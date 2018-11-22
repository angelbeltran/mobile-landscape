import { useEffect, useState, RefObject } from 'react';
import Renderer, * as Shapes from './canvas';


// inserts a Renderer as "engine" and hooks it up with the canvas
export function useCanvas(canvasRef: RefObject<HTMLCanvasElement>) {
  let ctx: CanvasRenderingContext2D | null;
  const [engine, setEngine] = useState<Renderer | null>(null);

  useEffect(() => {
    if (!ctx && canvasRef.current) {
      ctx = canvasRef.current.getContext('2d');

      console.log('YOLO:', ctx);
      if (ctx) {
        const newEngine = new Renderer(ctx);
        newEngine.start();

        setEngine(newEngine);
        /*
        engine = new Renderer(ctx);
        engine.addShapes([
          new Shapes.Rect({
            x: 20,
            y: 20,
            h: 100,
            w: 100,
            fillStyle: 'red',
            strokeStyle: 'blue',
            rotation: Math.PI / 8,
            angularVelocity: 0.1,
          }),
          new Shapes.Text({
            x: 50,
            y: 50,
            text: 'Hello',
            font: 'arial',
            fontSize: 45, // in pt
            fillStyle: 'blue',
            strokeStyle: 'red',
            rotation: Math.PI / 8,
            //moments: [Math.PI / 100],
            angularVelocity: 0.2,
          }),
          new Shapes.Circle({
            x: 80,
            y: 100,
            radius: 20,
            fillStyle: 'green',
            strokeStyle: 'purple',
            rotation: 0,
          }),
          new Shapes.Line({
            x: 155,
            y: 125,
            dx: 50,
            dy: -80,
            fillStyle: 'orange',
            rotation: 0,
            //moments: [-Math.PI / 1000],
            angularVelocity: 0.5,
          }),
        ]);
        */

      }
    }

    if (ctx !== null) {
      ctx.fillStyle = 'red';
      ctx.fillRect(10, 10, 100, 100);
    }

    return () => {
      if (engine) {
        engine.stop();
      }
    };
  }, [canvasRef.current]);

  return engine;
}
