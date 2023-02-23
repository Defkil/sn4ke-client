import {inject, injectable} from "inversify";
import {MapControllerInterface} from "./map.controller.interface";
import TYPES from "../../inversify.types";
import {AppPixiInterface} from "../../pixi/app/app.pixi.interface";
import {GameFieldElement} from "../../Types";

@injectable()
export class MapController implements MapControllerInterface {
  map: GameFieldElement[][]= []
  constructor(
    @inject(TYPES.PIXI.APP) private pixiCore: AppPixiInterface,
  ) {
  }
  setupMap(mapSettings: {height: number, width: number}) {
    this.map = this.pixiCore.generateMap(mapSettings.height, mapSettings.width)
  }
}
