import * as Canvas from './canvas';


const words = [
  'hello',
  'today',
  'tomorrow',
  'sunshine',
  'moonshine',
]; 
const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'black',
  'brown',
];

export function num() {
  return (100 * Math.random()) + 1;
}

export function text() {
  return words[Math.floor(words.length * Math.random())];
};

export function color() {
  return colors[Math.floor(colors.length * Math.random())];
};

export function Rect() {
  return new Canvas.Rect({
    x: 3 * num(),
    y: 2 * num(),
    h: num(),
    w: num(),
    fillStyle: color(),
    strokeStyle: color(),
    rotation: num() * Math.PI / num(),
    angularVelocity: num() / 100,
  })
};

export function Text() {
  return new Canvas.Text({
    x: 3 * num(),
    y: 2 * num(),
    text: text(),
    font: 'arial',
    fontSize: num(), // in pt
    fillStyle: color(),
    strokeStyle: color(),
    rotation: num() * Math.PI / num(),
    //moments: [Math.PI / 100],
    angularVelocity: num() / 100,
  });
};

export function Circle() {
  return new Canvas.Circle({
    x: 3 * num(),
    y: 2 * num(),
    radius: num() / 2,
    fillStyle: color(),
    strokeStyle: color(),
    rotation: 0,
  });
};

export function Line() {
  return new Canvas.Line({
    x: 3 * num(),
    y: 2 * num(),
    dx: num(),
    dy: num(),
    strokeStyle: color(),
    rotation: num(),
    //moments: [-Math.PI / 1000],
    angularVelocity: num() / 100,
  });
};
