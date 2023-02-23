import {inject, injectable} from "inversify";
import {EventEmitter} from "@angular/core";
import {FieldType, GameFieldElement, GameInterface, ScoreType} from "./Types";
import {AppPixiInterface} from "./pixi/app/app.pixi.interface";
import TYPES from "./inversify.types";
import {TexturesPixiInterface} from "./pixi/textures/textures.pixi.interface";
import {ConnectionCoreInterface} from "./core/connection/connection.core.interface";
import {MapControllerInterface} from "./controller/map/map.controller.interface";

@injectable()
export class Game implements GameInterface {
  scoresEvent: EventEmitter<ScoreType[]> = new EventEmitter<ScoreType[]>()
  map: GameFieldElement[][]= []
  private players: {}[] = [{},{},{}]

  constructor(
    @inject(TYPES.PIXI.APP) private pixiCore: AppPixiInterface,
    @inject(TYPES.PIXI.TEXTURES) private textures: TexturesPixiInterface,
    @inject(TYPES.CORE.CONNECTION) private connection: ConnectionCoreInterface,
    @inject(TYPES.CONTROLLER.MAP) private mapController: MapControllerInterface,
  ) {
  }

  init() {

  }

  async load(container: HTMLElement) {
    this.connection.connect()
    this.pixiCore.loadPixi(container, this.players.length)
    this.mapController.setupMap({height: 30, width: 30})
  }

  loadMap(mapSettings: {height: number, width: number} = {height: 30, width: 30}) {
    const map = this.pixiCore.generateMap(mapSettings.height, mapSettings.width)

    const sprite = this.textures.getSprite('player:1');
    /*const sprite = this.spriteGenerator.get('player:1');
    sprite.x = 20;
    sprite.y = 5;
    this.pixiCore.addChildToStage(sprite);*/

    map[2][6].type = FieldType.PLAYER
    map[2][6].sprite.texture = sprite.texture


    //this.pixiCore.generateMap(mapSettings.height, mapSettings.width);
  }

}
