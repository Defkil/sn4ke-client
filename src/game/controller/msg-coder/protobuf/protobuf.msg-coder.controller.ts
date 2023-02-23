import {injectable} from "inversify";
import {MsgCoderControllerInterface} from "../msg-coder.controller.interface";
import {PlayerType, ScoreType} from "../../../Types";
import {load, Message, Root, Type} from 'protobufjs';

type LookupsListName = string

const LookupsList: {name: LookupsListName, handler: string}[] = [
  {name: "Scores", handler: "snake.Scores"},
  {name: "JoinData", handler: "snake.JoinData"},
  {name: "Player", handler: "snake.Player"},
]

@injectable()
export class ProtobufMsgCoderController implements MsgCoderControllerInterface {
  lookups = new Map<string, Type>();

  constructor() {
    load( "/assets/server.proto", (err, root) => {
      if (err)
        throw err;
      if (!root)
        throw Error("Root is null");

      LookupsList.forEach(lookup => {
        const type = root.lookupType(lookup.handler);
        if (!type)
          throw Error("Type not found");
        this.lookups.set(lookup.name, type);
      })
    });
  }
  decodeScores(data: Uint8Array): ScoreType[] {
    return this.decodeMessage(data, "Scores");
  }

  decodeJoinData(data: Uint8Array): {scores: ScoreType[], players: PlayerType[]} {
    return this.decodeMessage(data, "JoinData");
  }

  decodePlayer(data: Uint8Array): PlayerType {
    return this.decodeMessage(data, "Player");
  }

  private decodeMessage<T>(data: Uint8Array, type: LookupsListName): T {
    const typeHandler = this.lookups.get(type);
    if (!typeHandler)
      throw Error("Type not found");
    return typeHandler.decode(data) as unknown as T;
  }
}
