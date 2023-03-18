import World from '@/case/PlanetWorld';
const dom = document.querySelector('#threejs-canvas') as HTMLElement;
new World({
  dom,
});
