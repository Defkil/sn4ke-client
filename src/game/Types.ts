import {EventEmitter} from "@angular/core";

export type ScoreType = {
  score: number;
  name: string;
}


export type PlayerType = {name: string, colorId: number}

export type PlayerInfoType = ScoreType & PlayerType

export interface GameInterface {
  load(container: HTMLElement): Promise<void>
  scoresEvent: EventEmitter<ScoreType[]>
}
import {Sprite} from "pixi.js";

export enum FieldType {
  EMPTY = 'empty',
  PLAYER = 'player',
  POWERUP = 'powerup'
}

export type GameFieldPlayerIndex = number
export type GameFieldPowerUpIndex = number

export type GameFieldElement = {
  type: FieldType.EMPTY
  sprite: Sprite,
} | {
  type: FieldType.PLAYER
  sprite: Sprite,
  data: GameFieldPlayerIndex
} | {
  type: FieldType.POWERUP
  sprite: Sprite,
  data: GameFieldPowerUpIndex
}

export enum GameStatus {
  INIT,
  PLAYING,
  WAITING,
  COUNTDOWN_5,
  COUNTDOWN_4,
  COUNTDOWN_3,
  COUNTDOWN_2,
  COUNTDOWN_1,
}
