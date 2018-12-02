import { useEffect, useState } from 'react';
import { Renderer } from '../canvas';
  

export default function useEngine(ctx: CanvasRenderingContext2D): Renderer | null {
  const [engine, setEngine] = useState<Renderer | null>(null);

  useEffect(() => {
    setEngine(new Renderer(ctx));
  }, [ctx]);

  return engine;
}
