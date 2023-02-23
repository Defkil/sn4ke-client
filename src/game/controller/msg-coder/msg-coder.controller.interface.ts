import {PlayerType, ScoreType} from "../../Types";

export interface MsgCoderControllerInterface {
  decodeScores(data: Uint8Array): ScoreType[]
  decodeJoinData(data: Uint8Array): {scores: ScoreType[], players: PlayerType[]}
  decodePlayer(data: Uint8Array): PlayerType
}
