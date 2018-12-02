import { useState, useEffect, Dispatch, SetStateAction } from 'react'; 


export default function useTicks(firstTick: number = 0): number {
  const [tick, setTick] = useState<number>(firstTick);

  // check orientation 60 times per second
  useEffect(() => {
    startTicking(tick, setTick);
  }, []);

  return tick;
}

function startTicking(tick: number, setTick: Dispatch<SetStateAction<number>>): () => void {
  let nextTick = tick;

  const id = setInterval(() => {
    nextTick += 1;
    setTick(nextTick);
  }, 1000 / 60);

  return window.clearInterval.bind(window, id);
}
