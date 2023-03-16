import {
  BoxGeometry,
  Clock,
  Color,
  Mesh,
  MeshLambertMaterial,
  MeshBasicMaterial,
  AmbientLight,
  PointLight,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

import * as _ from "lodash";
import { Pane } from "tweakpane";

// interfaces
import { IWord } from "../interfaces/IWord";

import { Basic } from "./Basic";
import Sizes from "../Utils/Sizes";
import { Resources } from "./Resources";
import { Helper } from "./Helper";

// shader
import boxVertex from "../../shaders/box/vertex.vs";
import boxFragment from "../../shaders/box/fragment.fs";
import { EventEmitter } from "pietile-eventemitter";

// interface
import { IEvents } from "../interfaces/IEvents";
export default class World {
  public basic: Basic;
  public scene: Scene;
  public camera: PerspectiveCamera;
  public renderer: WebGLRenderer;
  public controls: OrbitControls;
  public sizes: Sizes;
  public useShader = true;
  public clock: Clock;
  public helper: Helper;
  public debug: Pane;
  public resources: Resources;
  public emitter: EventEmitter<IEvents>;
  public option: IWord;
  public material!: any;
  constructor(option: IWord) {
    /**
     * 加载资源
     */
    this.option = option;
    this.emitter = new EventEmitter<IEvents>();
    this.basic = new Basic(option.dom);
    this.scene = this.basic.scene;
    this.renderer = this.basic.renderer;
    this.controls = this.basic.controls;
    this.camera = this.basic.camera;
    this.helper = new Helper(this.scene);
    this.sizes = new Sizes(this);
    this.clock = new Clock();
    this.debug = new Pane({
      title: "🎉 mingo 🎉",
      expanded: true,
    });
    this.initialize();

    this.resources = new Resources(() => {
      console.log("资源加载完成", this.resources);
      this.createBox(); // 写你的逻辑吧 hxd
      this.createLight();

      this.render();
    });
  }

  /**
   * 初始化场景
   */
  public initialize() {
    this.scene.background = new Color("#000");
    this.camera.position.set(5, 5, 5);
    this.emitter.on("resize", () => {
      this.renderer.setSize(
        Number(this.sizes.viewport.width),
        Number(this.sizes.viewport.height)
      );
      this.camera.aspect =
        Number(this.sizes.viewport.width) / Number(this.sizes.viewport.height);
      this.camera.updateProjectionMatrix();
    });
  }
  /**
   * 创建box
   */
  public createBox() {
    const geometry = new BoxGeometry(1, 1, 1);
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    loader.setDRACOLoader(dracoLoader);
    console.log(loader);
    loader.load(
      "./lib/Demo.glb",
      (gltf) => {
        console.log(gltf);
        // this.scene.add(gltf.scene);
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      function (error) {
        console.error("An error happened", error);
      }
    );
    if (this.useShader) {
      this.material = new ShaderMaterial({
        uniforms: {
          uTime: {
            value: 0,
          },
        },
        vertexShader: boxVertex,
        fragmentShader: boxFragment,
      });
    } else {
      this.material = new MeshBasicMaterial({
        // color: 0x00ff00,
        map: this.resources.textures["earth"],
      });
    }

    const cube = new Mesh(geometry, this.material);
    this.scene.add(cube);
    this.controls.target = _.cloneDeep(cube.position);
    const PARAMS = {
      cubeY: cube.position.y,
    };
    this.controls.update();
    this.debug
      .addInput(PARAMS, "cubeY", { min: -5, max: 5, step: 0.00001 })
      .on("change", (e) => {
        cube.position.y = e.value;
      });
  }
  public createLight() {
    const ambientLight = new AmbientLight(0x404040, 1); // soft white light
    this.scene.add(ambientLight);

    const pointLight = new PointLight(0xff0000, 1, 0);
    pointLight.position.set(500, 800, 150);
    this.scene.add(pointLight);

    // this.helper.addLight(pointLight)
    // this.helper.addAxes()
  }
  // public createHelper() {
  //   let a = new Helper()
  // }
  /**

  /**
   * 渲染函数
   */
  public render() {
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
    this.controls && this.controls.update();
    this.useShader &&
      ((this.material as ShaderMaterial).uniforms.uTime.value =
        this.clock.getElapsedTime());
  }
}
