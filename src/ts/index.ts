import "normalize.css/normalize.css";
import World from "./world/Word";

// threejs-canvas
const dom = document.querySelector("#threejs-canvas") as HTMLElement;
new World({
  dom,
});
