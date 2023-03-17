/**
 * 资源管理和加载
 */
import { LoadingManager, TextureLoader } from "three";
import { resources } from "./Assets";
export class Resources {
  private manager: LoadingManager;
  private callback: () => void;
  private textureLoader!: InstanceType<typeof TextureLoader>;
  public textures: any;
  constructor(callback: () => void) {
    this.callback = callback; // 资源加载完成的回调

    this.textures = {}; // 贴图数据
    this.manager = new LoadingManager();
    this.LoadingResources();
    this.loadResources();
  }

  /**
   * 加载状态管理
   */
  private LoadingResources() {
    // 开始加载
    this.manager.onStart = () => {
      console.log("开始加载资源文件");
    };
    // 加载完成
    this.manager.onLoad = () => {
      console.log("加载完成");
      this.callback();
    };
    // 正在进行中
    this.manager.onProgress = (url) => {
      console.log(`正在加载：${url}`);
    };

    this.manager.onError = (url) => {
      console.log("加载失败：" + url);
    };
  }
  /**
   * 加载资源
   */
  private loadResources(): void {
    this.textureLoader = new TextureLoader(this.manager);
    resources.textures?.forEach((item) => {
      this.textureLoader.load(item.path, (e) => {
        this.textures[item.name] = e;
      });
    });
  }
}
