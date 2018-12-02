import React, { MouseEvent } from 'react';
import Loading from './Loading';
import { windowWidth, windowHeight } from './canvas';
import { getAngleInFrontOfTank } from './utils';
import useCanvasContext from './effects/canvas';
import useEngine from './effects/engine';
import useStart from './effects/start';
import useAnimations from './effects/animations';


export default function App() {
  // create canvas context
  const [canvasRef, ctx] = useCanvasContext();

  const canvasEl = (
    <canvas
      key="canvas"
      ref={canvasRef}
      width={windowWidth}
      height={windowHeight}
      onClick={handleMouseClick}
    />
  );

  // display loading screen until everything is loaded
  const loadingScreen = (
    <>
      <Loading />
      {canvasEl}
    </>
  );

  if (!ctx) {
    return loadingScreen;
  }

  // create rendering engine once ref is set
  const engine = useEngine(ctx);
  if (!engine) {
    return loadingScreen;
  }

  // start rendering engine and create entities/shapes
  const [alphaText, betaText, grid, tank, tankText] = useStart(engine);

  // turn the turret on click/point
  function handleMouseClick(e: MouseEvent<HTMLCanvasElement>) {
    const angle = getAngleInFrontOfTank(e);

    if (tank) {
      tank.setTurretRotation(angle);
    }
  }

  if (!alphaText || !betaText || !tankText || !tank) {
    return loadingScreen;
  }

  // program the animations
  useAnimations(engine, tank, alphaText, betaText, tankText);

  //return canvasEl;

  return (
    <>
      {canvasEl}
      <button onClick={() => engine.camera.rotate(- Math.PI / 8)}>
        Turn Left
      </button>
      <button onClick={() => engine.camera.translateRelX(- 50)}>
        Left
      </button>
      <button onClick={() => engine.camera.translateRelY(50)}>
        Down
      </button>
      <button onClick={() => engine.camera.translateRelY(- 50)}>
        Up
      </button>
      <button onClick={() => engine.camera.translateRelX(50)}>
        Right
      </button>
      <button onClick={() => engine.camera.rotate(Math.PI / 8)}>
        Turn Right
      </button>
      <button onClick={() => tank.turret.rotate(Math.PI / 8)}>
        Turn Turret Right
      </button>
      <button onClick={() => tank.turret.translateRelY(- 10)}>
        Move Turret Up 
      </button>
    </>
  )
}
