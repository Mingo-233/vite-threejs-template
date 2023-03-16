import { PointLightHelper, AxesHelper, Light } from "three";
export class Helper {
  public helperList: any[];
  public scene;

  constructor(scene: any) {
    this.helperList = [];
    this.scene = scene;
  }

  public addLight(light: any) {
    const h = new PointLightHelper(light, 10);
    this.helperList.push(h);
    this.scene.add(h);
    return h;
  }

  public addAxes() {
    const h = new AxesHelper(500);
    this.helperList.push(h);
    this.scene.add(h);
    return h;
  }
}
