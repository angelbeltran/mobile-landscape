import React, {
  useEffect,
  useState,
  useRef,
  RefObject,
  MouseEvent,
} from 'react';
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


const TANK_X = Shapes.windowWidth / 2;
//const TANK_Y = 3 * Shapes.windowHeight / 4;
const TANK_Y = Shapes.windowHeight / 2;


function degreesToRadians(d: number): number {
  return (Math.PI * d) / 180;
}

function addShapes(engine: Renderer, ...shapes: Shapes.Shape[]) {
  engine.addShapes(...shapes);
}

function getAngleInFrontOfTank(e: MouseEvent<HTMLCanvasElement>): number {
  const { x, y } = offsetByTank(e);

  return Math.atan2(y, x) + (Math.PI / 2);
}

function offsetByTank(e: MouseEvent<HTMLCanvasElement>): { x: number, y: number } {
  return {
    x: e.clientX - TANK_X,
    y: e.clientY - TANK_Y,
  };
}


function App() {
  const canvasRef: RefObject<HTMLCanvasElement> = useRef(null);

  // create rendering engine once ref is set
  const [engine, setEngine] = useState<Renderer | null>(null);

  useEffect(() => {
    if (!engine && canvasRef.current) {
      let ctx = canvasRef.current.getContext('2d');

      if (ctx) {
        setEngine(new Renderer(ctx));
      } else {
        console.error('failed to create context!');
      }
    }
  }, [canvasRef.current]);

  // start rendering engine and create entities/shapes
  const [alphaText, setAlphaText] = useState<Shapes.Text | null>(null);
  const [betaText, setBetaText] = useState<Shapes.Text | null>(null);
  const [grid, setGrid] = useState<Shapes.Grid | null>(null);
  const [tank, setTank] = useState<Shapes.Tank | null>(null);

  useEffect(() => {
    if (engine && !engine.running) {
      const newTank = new Shapes.Tank({
        x: TANK_X,
        y: TANK_Y,
      });
      const alphaText = new Shapes.Text({
        x: 15,
        y: 15,
        textBaseline: 'top',
        textAlign: 'left',
        maxWidth: Shapes.windowWidth / 2,
        text: '',
        font: 'verdana',
        fontSize: 48,
        fillStyle: 'blue',
        strokeStyle: 'black',
      });
      const betaText = new Shapes.Text({
        x: 15,
        y: 65,
        textBaseline: 'top',
        textAlign: 'left',
        maxWidth: Shapes.windowWidth / 2,
        text: '',
        font: 'verdana',
        fontSize: 48,
        fillStyle: 'blue',
        strokeStyle: 'black',
      });
      const newGrid = new Shapes.Grid({
        x: Shapes.windowWidth / 2,
        y: Shapes.windowHeight / 2,
        w: Shapes.windowWidth,
        h: Shapes.windowHeight,
        strokeStyle: 'black',
        fillStyle: 'black',
      });
      const tankText = new Shapes.Text({
        x: 15,
        y: 115,
        textBaseline: 'top',
        textAlign: 'left',
        maxWidth: Shapes.windowWidth / 2,
        text: '',
        font: 'verdana',
        fontSize: 48,
        fillStyle: 'blue',
        strokeStyle: 'black',
      });

      setTank(newTank);
      setAlphaText(alphaText);
      setBetaText(betaText);
      setGrid(newGrid);
      setTankText(tankText);

      engine.addShapes(newGrid, newTank, alphaText, betaText, tankText);

      engine.start(100);
    }

    return () => {
      if (engine) {
        engine.stop();
      }
    };
  }, [engine]);

  // turn the turrent on click/point
  function handleMouseClick(e: MouseEvent<HTMLCanvasElement>) {
    const angle = getAngleInFrontOfTank(e);

    if (tank) {
      tank.setTurretRotation(angle);
    }
  }

  // process the orientation of the phone/device
  const [alpha, setAlpha] = useState<number>(0);
  const [beta, setBeta] = useState<number>(0);

  useEffect(() => {
    function handleOrientation(e: DeviceOrientationEvent) {
      let text = 'alpha: ';

      if (e.alpha !== null && e.alpha !== alpha) {
        setAlpha(e.alpha);
        text += e.alpha;
      } else {
        text += alpha;
      }

      if (alphaText) {
        alphaText.text = text;
      }

      text = 'beta: ';

      if (e.beta !== null && e.beta !== beta) {
        setBeta(e.beta);
        text += e.beta;
      } else {
        text += beta;
      }

      if (betaText) {
        betaText.text = text;
      }
    }

    window.addEventListener('deviceorientation', handleOrientation, true);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [alphaText, betaText]);

  const [tickN, tick] = useState<number>(0);
  const [tankText, setTankText] = useState<Shapes.Text | null>(null);

  // check orientation 60 times per second
  useEffect(() => {
    let n = tickN;

    const id = setInterval(() => {
      n += 1;
      tick(n);
    }, 1000 / 60);

    return window.clearInterval.bind(window, id);
  }, []);

  useEffect(() => {
    if (tank) {
      if (beta < 30) {
        // TODO: move tank forward / move back ground back
        if (tankText) {
          tankText.text = 'tank y: ' + tank.position.y;
        }

        if (grid) {
          grid.translateY(1);
        }
      }

      // TODO: turn tank / background from alpha
      if (grid) {
        grid.rotation = degreesToRadians(alpha);
      }
    }
  }, [tickN]);


  return (
    <canvas
      ref={canvasRef}
      width={Shapes.windowWidth}
      height={Shapes.windowHeight}
      onClick={handleMouseClick}
    />
  );
}


/*
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
        <button disabled={!engine} onClick={() => {
          if (engine && tank) {
            tank.rotate(-0.1);
          }
        }}>
          Turn Left 
        </button>
        <button disabled={!engine} onClick={() => {
          if (engine && tank) {
            tank.rotate(0.1);
          }
        }}>
          Turn Right 
        </button>
        <button disabled={!engine} onClick={() => {
          if (engine && tank) {
            tank.translateRelX(1);
          }
        }}>
          Rel Right
        </button>
        <button disabled={!engine} onClick={() => {
          if (engine && tank) {
            tank.translateRelX(-1);
          }
        }}>
          Rel Left
        </button>
        <button disabled={!engine} onClick={() => {
          if (engine && tank) {
            tank.translateRelY(-1);
          }
        }}>
          Rel Forward
        </button>
        <button disabled={!engine} onClick={() => {
          if (engine && tank) {
            tank.translateRelY(1);
          }
        }}>
          Rel Backward
        </button>
        <button disabled={!engine} onClick={() => {
          if (engine && tank) {
            tank.translateY(-1);
          }
        }}>
          Up
        </button>
        <button disabled={!engine} onClick={() => {
          if (engine && tank) {
            tank.translateY(1);
          }
        }}>
          Down
        </button>
        <button disabled={!engine} onClick={() => {
          if (engine && tank) {
            tank.translateX(-1);
          }
        }}>
          Left
        </button>
        <button disabled={!engine} onClick={() => {
          if (engine && tank) {
            tank.translateX(1);
          }
        }}>
          Right
        </button>
        <button disabled={!engine} onClick={() => {
          if (engine && tank) {
            tank.rotateTurret(1);
          }
        }}>
          Turn Turret Right
        </button>
        <button disabled={!engine} onClick={() => {
          if (engine && tank) {
            tank.setTurretRotation(Math.PI / 4);
          }
        }}>
          Set Turret Rotation
        </button>
      </div>
 */


export default App;
