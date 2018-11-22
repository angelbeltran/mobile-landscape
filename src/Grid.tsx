import React from 'react';


type Props = {
  y: number;
}

function Grid({ y }: Props) {
  const lines = [];
  const numRows = 20;
  const offset = 5 * numRows;

  for (let i = 0; i < numRows + 1; i += 1) {
    lines.push(
      <line
        key={`horizontal-${i}`}
        x1={-offset}
        x2={offset}
        y1={y + (10 * i) - offset}
        y2={y + (10 * i) - offset}
        stroke="black"
      />
    );
  }

  for (let i = 0; i < numRows + 1; i += 1) {
    lines.push(
      <line
        key={`vertical-${i}`}
        x1={(10 * i) - offset}
        x2={(10 * i) - offset}
        y1={y - offset}
        y2={y + offset}
        stroke="black"
      />
    );
  }

  return (
    <g>
      {lines}
    </g>
  );
}


export default Grid;
