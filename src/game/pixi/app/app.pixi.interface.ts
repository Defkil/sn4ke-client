import * as PIXI from "pixi.js";
import {GameFieldElement} from "../../Types";

export interface AppPixiInterface {
  loadPixi(container: HTMLElement, playerCount: number): void
  generateMap(height: number, width: number): GameFieldElement[][]
  addChildToStage(sprite: PIXI.Sprite): any
}
