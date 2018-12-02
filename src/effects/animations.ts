import { useEffect } from 'react';
import { Tank, Text, Renderer } from '../canvas';
import { degreesToRadians } from '../utils';
import useTicks from './tick';
import useOrientation from './orientation';


export default function useAnimations(engine: Renderer, tank: Tank, alphaText: Text, betaText: Text, tankText: Text) {
  const [alpha, beta] = useOrientation(alphaText, betaText);
  const tick = useTicks();
useEffect(() => {
    if (beta < 30) {
      const dy = -1;

      moveTank(engine, tank, 0, dy, tankText, alphaText, betaText);
    }

    const angle = degreesToRadians(alpha);

    rotateTank(engine, tank, angle, tankText, alphaText, betaText);
  }, [tick]);
}


function moveTank(engine: Renderer, tank: Tank, dx: number, dy: number, tankText: Text, alphaText: Text, betaText: Text) {
  tankText.text = 'tank x,y: ' + tank.position.y + ', ' + tank.position.y;

  tank.translateRel(dx, dy);

  // camera follows the tank
  engine.camera.translateRel(dx, dy);

  // for dev
  alphaText.translateRel(dx, dy);
  betaText.translateRel(dx, dy);
  tankText.translateRel(dx, dy);
}


function rotateTank(engine: Renderer, tank: Tank, angle: number, tankText: Text, alphaText: Text, betaText: Text) {
  tank.rotation = -angle;

  // camera follows the tank
  engine.camera.rotation = - angle;
  engine.camera.setPerspective();

  // for dev
  alphaText.rotation = - angle;
  betaText.rotation = - angle;
  tankText.rotation = - angle;
}
