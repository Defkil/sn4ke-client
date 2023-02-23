import {injectable} from "inversify";
import {ImageOptions, RectangleOptions, RoughPixiInterface} from "./rough.pixi.interface";
import rough from "roughjs/bundled/rough.esm.js";


@injectable()
export class RoughPixi implements RoughPixiInterface {
  rectangle(data: RectangleOptions): string {
    let {x, y } = data;
    const {width, height, options, padding = 0} = data;
    if (padding !== 0) {
      x += padding / 2;
      y += padding / 2;
    }
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const rc = rough.canvas(canvas);
    rc.rectangle(x, y, width - padding, height - padding, options);
    return canvas.toDataURL();
  }

}
