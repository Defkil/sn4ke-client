import {Sprite, Texture} from "pixi.js";

export interface TexturesPixiInterface {
  add(name: string, sprite: Texture | Texture[]): void
  get(name: string): Texture
  getSprite(name: string): Sprite
}
