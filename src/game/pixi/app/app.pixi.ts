import {inject, injectable} from "inversify";
import {AppPixiInterface} from "./app.pixi.interface";
import * as PIXI from "pixi.js";
import {GUI_BOX_GAP, GUI_BOX_GAP_MAX_RANDOM, GUI_CANVAS_PADDING} from "../pixi.config";
import TYPES from "../../inversify.types";
import {TexturesPixiInterface} from "../textures/textures.pixi.interface";
import {Application, ICanvas} from "pixi.js";
import {TexturesGeneratorPixiInterface} from "../textures-generator/textures-generator.pixi.interface";
import {FieldType, GameFieldElement} from "../../Types";

@injectable()
export class AppPixi implements AppPixiInterface {
  private app: PIXI.Application = new PIXI.Application({
    backgroundColor: 'transparent',
    backgroundAlpha: 0.1,
    resolution: 1,
  })

  styles: {
    boxSize: number,
    paddingLeft: number
  } = {
    boxSize: 0,
    paddingLeft: 0
  }
  constructor(
    @inject(TYPES.PIXI.TEXTURES) private textures: TexturesPixiInterface,
    @inject(TYPES.PIXI.TEXTURES_GENERATOR) private texturesGenerator: TexturesGeneratorPixiInterface,
  ) {}

  loadPixi(container: HTMLElement, playerCount: number) {
    this.texturesGenerator.generate({playerCount});
    container.appendChild(this.app.view as unknown as Node);
    this.resizeCanvas(container);
  }
  generateMap(height: number, width: number) {
    if (this.app.view.parentNode === null) {
      throw new Error('generate map was called before pixi was loaded');
    }
    this.styles = this.getDynamicBoxSize(width, height);
    const map: GameFieldElement[][]= []
    const randomNumber = () => {
      return Math.floor(Math.random() * (GUI_BOX_GAP_MAX_RANDOM * 2 + 1)) - GUI_BOX_GAP_MAX_RANDOM;
    }
    for (let y = 0; y < height; y++) {
      map[y] = [];
      for (let x = 0; x < width; x++) {
        const sprite = this.textures.getSprite(FieldType.EMPTY);
        sprite.x = x * this.styles.boxSize + GUI_BOX_GAP * x + randomNumber() + GUI_CANVAS_PADDING + this.styles.paddingLeft;
        sprite.y = y * this.styles.boxSize + GUI_BOX_GAP * y + randomNumber() + GUI_CANVAS_PADDING;
        sprite.width = this.styles.boxSize;
        sprite.height = this.styles.boxSize;
        this.app.stage.addChild(sprite);
        map[y][x] = {
          type: FieldType.EMPTY,
          sprite: sprite,
        };
      }
    }
    return map
  }
  addChildToStage(sprite: PIXI.Sprite) {
    this.app.stage.addChild(sprite);
  }

  resizeCanvas(container: HTMLElement) {
    let view = this.app.view as HTMLCanvasElement;
    view.width = container.offsetWidth;
    view.height = container.offsetHeight;
    this.app.renderer.resize(view.width, view.height);
  }

  getDynamicBoxSize(width: number, height: number): {boxSize: number, paddingLeft: number} {
    const widthBoxSize = (this.app.view.width - GUI_CANVAS_PADDING * 2 - GUI_BOX_GAP * (width - 1)) / width;
    const heightBoxSize = (this.app.view.height - GUI_CANVAS_PADDING * 2 - GUI_BOX_GAP * (height - 1)) / height;
    let boxSize = Math.min(widthBoxSize, heightBoxSize);
    let paddingLeft = 0;
    if (heightBoxSize < widthBoxSize) {
      paddingLeft = (this.app.view.width - GUI_CANVAS_PADDING * 2 - GUI_BOX_GAP * (width - 1) - width * boxSize) / 2;
    } else {
      boxSize = boxSize - 0.2
    }
    return {boxSize, paddingLeft};
  }


}
