import * as PIXI from 'pixi.js';

export const appendRectangleToTexture = (texture, rectangleArray) =>
  rectangleArray.map(rectangle =>
    new PIXI.Texture(texture, rectangle)
  );
