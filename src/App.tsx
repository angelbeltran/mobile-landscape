import React, { useEffect, useState, useRef, RefObject } from 'react';
import Renderer, * as Shapes from './canvas';


const words = [
  'hello',
  'today',
  'tomorrow',
  'sunshine',
  'moonshine',
]; 
const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'black',
  'brown',
]

const random = {
  number() {
    return (100 * Math.random()) + 1;
  },

  text() {
    return words[Math.floor(words.length * Math.random())];
  },

  color() {
    return colors[Math.floor(colors.length * Math.random())];
  },

  Rect() {
    return new Shapes.Rect({
      x: 3 * random.number(),
      y: 2 * random.number(),
      h: random.number(),
      w: random.number(),
      fillStyle: random.color(),
      strokeStyle: random.color(),
      rotation: random.number() * Math.PI / random.number(),
      angularVelocity: random.number() / 100,
    })
  },

  Text() {
    return new Shapes.Text({
      x: 3 * random.number(),
      y: 2 * random.number(),
      text: random.text(),
      font: 'arial',
      fontSize: random.number(), // in pt
      fillStyle: random.color(),
      strokeStyle: random.color(),
      rotation: random.number() * Math.PI / random.number(),
      //moments: [Math.PI / 100],
      angularVelocity: random.number() / 100,
    });
  },

  Circle() {
    return new Shapes.Circle({
      x: 3 * random.number(),
      y: 2 * random.number(),
      radius: random.number() / 2,
      fillStyle: random.color(),
      strokeStyle: random.color(),
      rotation: 0,
    });
  },

  Line() {
    return new Shapes.Line({
      x: 3 * random.number(),
      y: 2 * random.number(),
      dx: random.number(),
      dy: random.number(),
      strokeStyle: random.color(),
      rotation: random.number(),
      //moments: [-Math.PI / 1000],
      angularVelocity: random.number() / 100,
    });
  }
};


function addShapes(engine: Renderer, ...shapes: Shapes.Shape[]) {
  engine.addShapes(shapes);
}


function App() {
  const canvasRef: RefObject<HTMLCanvasElement> = useRef(null);
  const [engine, setEngine] = useState<Renderer | null>(null);

  // create rendering engine once ref is set
  useEffect(() => {
    if (!engine && canvasRef.current) {
      setEngine(new Renderer(canvasRef.current.getContext('2d')));
    }
  }, [canvasRef.current]);

  // start rendering engine once engine is created
  useEffect(() => {
    if (engine && !engine.running) {
      engine.start(100);
    }

    return () => {
      if (engine) {
        engine.stop();
      }
    };
  }, [engine]);

  return (
    <>
      <canvas ref={canvasRef} />
      <div>
        <button disabled={!engine} onClick={() => engine && engine.addShapes(random.Rect())}>
          Rect
        </button>
        <button disabled={!engine} onClick={() => engine && engine.addShapes(random.Circle())}>
          Circle
        </button>
        <button disabled={!engine} onClick={() => engine && engine.addShapes(random.Line())}>
          Line
        </button>
        <button disabled={!engine} onClick={() => engine && engine.addShapes(random.Text())}>
          Text
        </button>
      </div>
    </>
  );
}


export default App;
