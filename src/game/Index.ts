import 'reflect-metadata'
import {container} from "./inversify.container";
import TYPES from "./inversify.types";
import {GameInterface} from "./Types";
import {RectangleOptions, RoughPixiInterface} from "./pixi/rough/rough.pixi.interface";
import {ConnectionCoreInterface, ConnectionFunctions} from "./core/connection/connection.core.interface";
import {ColorsControllerInterface} from "./controller/colors/colors.controller.interface";
import {ConnectionCore} from "./core/connection/connection.core";

export const load = async (domContainer: HTMLElement): Promise<void> => {
  const app = container.get<GameInterface>(TYPES.GAME)
  await app.load(domContainer)
}

const connection = container.get<ConnectionCoreInterface>(TYPES.CORE.CONNECTION)
export const disconnect = () => {
  connection.disconnect()
}

const roughCore = container.get<RoughPixiInterface>(TYPES.PIXI.ROUGH)
export const roughRectangle = (data: RectangleOptions): string => {
  return roughCore.rectangle(data);
}

export const getConnectionsEvents = () => {
  return {
    joinData: connection.eventJoinData,
    playerJoined: connection.eventPlayerJoined,
    status: connection.eventStatus,
  }
}
export const getConnectionsFunctions: () => ConnectionFunctions = () => {
  return {
    startGame: () => connection.startGame(),
    leaveGame: () => connection.leaveGame(),
    sendCommand: (command: number) => connection.sendCommand(command),
  }
}

const colors = container.get<ColorsControllerInterface>(TYPES.CONTROLLER.COLORS)
export const getColors = (id: number) => {
  return colors.getMain(id)
}
