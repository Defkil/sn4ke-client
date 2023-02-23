import {TexturesGeneratorConfig, TexturesGeneratorPixiInterface} from "./textures-generator.pixi.interface";
import {inject, injectable} from "inversify";
import {RoughPixiInterface} from "../rough/rough.pixi.interface";
import TYPES from "../../inversify.types";
import {TexturesPixiInterface} from "../textures/textures.pixi.interface";
import {PLAYER_COLORS} from "./textures-generator.pixi.config";
import {Texture} from "pixi.js";
import {GUI_BOX_SIZE} from "../pixi.config";
import {FieldType} from "../../Types";


@injectable()
export class TexturesGeneratorPixi implements TexturesGeneratorPixiInterface {
  constructor(
    @inject(TYPES.PIXI.ROUGH) private readonly roughCore: RoughPixiInterface,
    @inject(TYPES.PIXI.TEXTURES) private texturesPixi: TexturesPixiInterface,
  ) {
  }
  randomBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  generate(config: TexturesGeneratorConfig): void {
    const texturesString: { name: string, textures: string[] }[] = [];

    texturesString.push({
      name: FieldType.EMPTY,
      textures: this.generateEmptyElements()
    })

    for (let i = 0; i < config.playerCount; i++) {
      texturesString.push({
        name: `${FieldType.PLAYER}:${i}`,
        textures: this.generatePlayerElements(i)
      })
    }

    texturesString.forEach(({name, textures}) => {
      this.texturesPixi.add(name, textures.map((texture) => Texture.from(texture)));
    })
  }

  generateEmptyElements(): string[] {
    const res: string[] = [];
    for (let i = 0; i < 30; i++) {
      res.push(this.roughCore.rectangle({
        x: 0,
        y: 0,
        width: GUI_BOX_SIZE,
        height: GUI_BOX_SIZE,
        options: {
          stroke: 'black',
          strokeWidth: this.randomBetween(2, 3),
        }
      }))
    }
    return res;
  }
  generatePlayerElements(playerIndex: number): string[] {
    const colors = PLAYER_COLORS[playerIndex];
    const res: string[] = [];
    for (let i = 0; i < 4; i++) {
      res.push(this.roughCore.rectangle({
        x: 0,
        y: 0,
        width: GUI_BOX_SIZE,
        height: GUI_BOX_SIZE,
        options: {
          fill: colors[this.randomBetween(0, colors.length - 1)],
        }
      }))
    }
    return res;
  }
}
