import {TexturesPixiInterface} from "./textures.pixi.interface";
import {injectable} from "inversify";
import {Sprite, Texture} from "pixi.js";

@injectable()
export class TexturesPixi implements TexturesPixiInterface {
  /**
   * Store of all textures
   */
  private readonly texture: Map<string, Texture[]> = new Map<string, Texture[]>();

  /**
   * Add a texture to the store
   * @param name texture name
   * @param sprite
   */
  add(name: string, sprite: Texture | Texture[]): void {
    if (!this.texture.has(name)) {
      this.texture.set(name, []);
    }
    const textures = this.texture.get(name);
    if (textures === undefined) {
      this.texture.set(name, []);
    }
    if (sprite instanceof Texture) {
      textures?.push(sprite);
    }
    if (sprite instanceof Array) {
      textures?.push(...sprite);
    }
  }

  /**
   * Get a random texture from the store
   * @param name texture name
   * @return random Sprite
   */
  getSprite(name: string): Sprite {
    return new Sprite(this.get(name));
  }

  get(name: string): Texture {
    const textures = this.texture.get(name);
    if (textures === undefined) {
      throw new Error(`Texture ${name} not found`)
    }

    return textures[Math.floor(Math.random() * textures.length)];
  }
}
