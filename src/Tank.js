import React from 'react';


function Tank({ x, y, angle }) {
  const width = 20;
  const height = 20;

  const turretRadius = 4;

  const barrelWidth = width / 5;
  const barrelHeight = height / 2;

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* body */}
      <rect
        width={width}
        height={height}
        x={- (width / 2)}
        y={- (height / 2)}
        fill="green"
      />

      <g transform={`rotate(${angle})`}>
        {/* turret */}
        <circle
          r={turretRadius}
          fill="brown"
        />

        {/* barrel */}
        <rect
          width={barrelWidth}
          height={barrelHeight}
          x={- (barrelWidth / 2)}
          y={- barrelHeight - turretRadius}
          fill="brown"
        />
      </g>
    </g>
  );
}


export default Tank;
