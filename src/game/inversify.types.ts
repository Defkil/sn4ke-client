const TYPES = {
  GAME: Symbol('GAME'),
  CORE: {
    CONNECTION: Symbol('CORE.CONNECTION'),
  },
  CONTROLLER: {
    MAP: Symbol('CONTROLLER.MAP'),
    MSG_CODER: Symbol('CONTROLLER.MSG_CODER'),
    COLORS: Symbol('CONTROLLER.COLORS'),
  },
  PIXI: {
    APP: Symbol('PIXI.APP'),
    TEXTURES: Symbol('PIXI.TEXTURES'),
    TEXTURES_GENERATOR: Symbol('PIXI.TEXTURES_GENERATOR'),
    ROUGH: Symbol('PIXI.ROUGH'),
  }
}

export default TYPES
