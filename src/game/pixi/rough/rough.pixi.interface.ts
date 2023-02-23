import {Options} from "roughjs/bin/core";

export type ImageOptions = Options;

export type RectangleOptions = {
  x: number,
  y: number,
  width: number,
  height: number,
  options?: ImageOptions,
  padding?: number
}
export interface RoughPixiInterface {
  rectangle(data: RectangleOptions): string;
}
