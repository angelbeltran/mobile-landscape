import { useRef, RefObject, useState, useEffect } from 'react';


export default function useCanvasContext(): [RefObject<HTMLCanvasElement>, CanvasRenderingContext2D | null] {
  const canvasRef: RefObject<HTMLCanvasElement> = useRef(null);

  const [ctx, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      let newCtx = canvasRef.current.getContext('2d');

      if (newCtx) {
        setContext(newCtx);
      } else {
        console.error('failed to create context!');
      }
    }
  }, [canvasRef.current]);

  return [canvasRef, ctx];
}

