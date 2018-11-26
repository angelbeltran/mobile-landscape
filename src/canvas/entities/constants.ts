export const DT = 1; // TODO: tweak this to get the forces we want

export const windowWidth = window.innerWidth
  || (document.documentElement && document.documentElement.clientWidth)
  || document.body.clientWidth;
export const windowHeight = window.innerHeight
  || (document.documentElement && document.documentElement.clientHeight)
  || document.body.clientHeight;

export type ContextProp = 'direction' |'fillStyle' |'filter' |'font' |'globalAlpha' |'globalCompositeOperation' |'imageSmoothingEnabled' |'imageSmoothingQuality' |'lineCap' |'lineDashOffset' |'lineJoin' |'miterLimit' |'shadowBlur' |'shadowColor' |'shadowOffsetX' |'shadowOffsetY' |'strokeStyle' |'textAlign' |'textBaseline';
type ContextPropMap = {
  [key: string]: string | number | undefined;
}
export const globalDefaults: ContextPropMap = {
  direction: 'inherit',
  fillStyle: undefined,
  filter: undefined,
  font: undefined,
  globalAlpha: undefined,
  globalCompositeOperation: undefined,
  imageSmoothingEnabled: undefined,
  imageSmoothingQuality: undefined,
  lineCap: undefined,
  lineDashOffset: undefined,
  lineJoin: undefined,
  miterLimit: undefined,
  shadowBlur: undefined,
  shadowColor: undefined,
  shadowOffsetX: undefined,
  shadowOffsetY: undefined,
  strokeStyle: undefined,
  textAlign: undefined,
  textBaseline: undefined,
};
export const contextProps: ContextProp[] = [
  'direction',
  'fillStyle',
  'filter',
  'font',
  'globalAlpha',
  'globalCompositeOperation',
  'imageSmoothingEnabled',
  'imageSmoothingQuality',
  'lineCap',
  'lineDashOffset',
  'lineJoin',
  'miterLimit',
  'shadowBlur',
  'shadowColor',
  'shadowOffsetX',
  'shadowOffsetY',
  'strokeStyle',
  'textAlign',
  'textBaseline',
];
