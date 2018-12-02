import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Text } from '../canvas';


export default function useOrientation(alphaText: Text, betaText: Text): [number, number] {
  const [alpha, setAlpha] = useState<number>(0);
  const [beta, setBeta] = useState<number>(0);

  useEffect(() => {
    function handleOrientation(e: DeviceOrientationEvent) {
      setNextNumber(setAlpha, alpha, e.alpha, alphaText, 'alpha');
      setNextNumber(setBeta, beta, e.beta, betaText, 'beta');
    }

    window.addEventListener('deviceorientation', handleOrientation, true);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [alphaText, betaText]);

  return [alpha, beta];
}


function setNextNumber(setNumber: Dispatch<SetStateAction<number>>, prev: number, next: number | null, text: Text, label: string) {
  const nextNumber = getNextNumber(prev, next);
  setNumber(nextNumber);
  text.text = label + ': ' + nextNumber;
}


function getNextNumber(prev: number, next: number | null): number {
  if (next !== null) {
    return next;
  }

  return prev;
}
