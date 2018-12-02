import {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import {
  Grid,
  Renderer,
  Tank,
  Text,
  windowWidth,
  windowHeight,
} from '../canvas';


type ReturnType = [Text | null, Text | null, Grid | null, Tank | null, Text | null];

// TODO: different name
export default function useStart(engine: Renderer): ReturnType {
  const [alphaText, setAlphaText] = useState<Text | null>(null);
  const [betaText, setBetaText] = useState<Text | null>(null);
  const [grid, setGrid] = useState<Grid | null>(null);
  const [tank, setTank] = useState<Tank | null>(null);
  const [tankText, setTankText] = useState<Text | null>(null);

  useEffect(() => {
    if (!engine.running) {
      engine.addShapes(
        createGrid(setGrid),
        createTank(setTank),
        createText(setAlphaText, '', - (windowWidth / 2) + 15, - (windowWidth / 2) - 15),
        createText(setBetaText, '', - (windowWidth / 2) + 15, - (windowWidth / 2) - 65),
        createText(setTankText, '', - (windowWidth / 2) + 15, - (windowWidth / 2) - 115),
      );

      engine.start(100);
    }

    return () => {
      engine.stop();
    };
  }, [engine]);

  return [alphaText, betaText, grid, tank, tankText];
}


function createGrid(setGrid: Dispatch<SetStateAction<Grid | null>>): Grid {
  const newGrid = new Grid({
    w: windowWidth,
    h: windowHeight,
    strokeStyle: 'black',
    fillStyle: 'black',
  });

  setGrid(newGrid);

  return newGrid;
}

function createTank(setTank: Dispatch<SetStateAction<Tank | null>>): Tank  {
  const tank = new Tank({});

  setTank(tank);

  return tank;
}

function createText(setText: Dispatch<SetStateAction<Text | null>>, text: string = '', x: number = 0, y: number = 0): Text {
  const newText = new Text({
    x,
    y,
    textBaseline: 'top',
    textAlign: 'left',
    maxWidth: windowWidth / 2,
    text,
    font: 'verdana',
    fontSize: 48,
    fillStyle: 'blue',
    strokeStyle: 'black',
  });

  setText(newText);

  return newText;
}
