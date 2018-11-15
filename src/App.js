import React, { useState, useEffect } from 'react';
import Tank from './Tank';
import Grid from './Grid';


function relativeCoordinates(e, { x, y }) {
  return {
    x: e.clientX - x,
    y: e.clientY - y,
  };
}

function computeAngle(e, reference) {
  const { x, y } = relativeCoordinates(e, reference);
  return Math.atan2(y, x);
}

function radiansToDegrees(radians) {
  return (180 * radians) / Math.PI
}


function App() {
  const xOffset = 0.5;
  const yOffset = 0.75;

  const yExtra = window.innerHeight - window.innerWidth;
  const tankCenter = {
    x: xOffset * window.innerWidth,
    y: (yOffset * window.innerWidth) + (yExtra / 2),
  };

  let initialAlphaSet = false;
  let initialAlpha = 0;

  const [angle, setAngle] = useState(0);
  const [alpha, setAlpha] = useState(0);
  const [tiltedUp, setTiltedUp] = useState(false);

  function handleOrientation(orientation) {
    if (initialAlphaSet) {
      setAlpha(orientation.alpha - initialAlpha);
      if (orientation.beta >= 30 && !tiltedUp) {
        setTiltedUp(true);
      } else if (orientation.beta < 30 && tiltedUp) {
        setTiltedUp(false);
      }
    } else {
      initialAlpha = orientation.alpha;
      initialAlphaSet = true;
    }
  }
  
  useEffect(() => {
    window.addEventListener('deviceorientation', handleOrientation);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  });

  const [y, setY] = useState(0);

  useEffect(() => {
    if (!tiltedUp) {
      const id = setInterval(() => {
        setY(y + 1);
      }, 1000 / 60);

      return () => {
        clearInterval(id);
      };
    }

    return () => {}
  }, [tiltedUp, y]);

  return (
    <svg version="1.1"
      baseProfile="full"
      width="100vw" height="100vh"
      viewBox={`${- 100 * xOffset} ${- 100 * yOffset} 100 100`}
      xmlns="http://www.w3.org/2000/svg"

      onClick={e => {
        const degrees = radiansToDegrees(computeAngle(e, tankCenter));
        setAngle(degrees + 90);
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Tank
        x={0}
        y={0}
        angle={angle}
      />

      <Grid y={y} />

      <text
        x="-20"
        y="10"
      >
        {`${tiltedUp}`}
      </text>
    </svg>
  );
}

export default App;
