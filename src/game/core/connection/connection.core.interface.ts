import {EventEmitter} from "@angular/core";
import {PlayerInfoType, PlayerType, ScoreType} from "../../Types";

export enum ConnectionCommand {
  LEFT = 0,
  RIGHT = 1,
  UP = 2,
  DOWN = 3,
  ACTION = 4,
}

export type ConnectionFunctions = {
  startGame(): void
  leaveGame(): void
  sendCommand(command: ConnectionCommand): void
}
export interface ConnectionCoreInterface extends ConnectionFunctions {
  connect(): void
  disconnect(): void
  eventJoinData: EventEmitter<PlayerInfoType[]>
  eventPlayerJoined: EventEmitter<PlayerType>
  eventStatus: EventEmitter<number>
}
