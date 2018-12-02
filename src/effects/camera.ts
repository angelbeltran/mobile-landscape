import { useState } from 'react';
import { Camera, origin } from '../canvas';

  
export default function useCamera(): Camera | null {
  const [camera, setCamera] = useState<Camera | null>(null);

  if (!camera) {
    setCamera(new Camera({
      x: origin.x,
      y: origin.y,
    }));
  }

  return camera;
}

