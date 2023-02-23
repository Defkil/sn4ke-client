import {ConnectionCommand, ConnectionCoreInterface} from "./connection.core.interface";
import {inject, injectable} from "inversify";
import TYPES from "../../inversify.types";
import {MsgCoderControllerInterface} from "../../controller/msg-coder/msg-coder.controller.interface";
import {EventEmitter} from "@angular/core";
import {GameStatus, PlayerInfoType, PlayerType, ScoreType} from "../../Types";


@injectable()
export class ConnectionCore implements ConnectionCoreInterface {
  constructor(
    @inject(TYPES.CONTROLLER.MSG_CODER) private msgCoder: MsgCoderControllerInterface,
  ) {
  }

  ws: any | null = null
  eventJoinData = new EventEmitter<PlayerInfoType[]>()
  eventPlayerJoined = new EventEmitter<PlayerType>()
  eventStatus = new EventEmitter<GameStatus>()
  startGame(): void {
    this.ws.emit('StartGame')
  }
  leaveGame(): void {
    this.ws.emit('LeaveGame')
  }
  sendCommand(command: ConnectionCommand): void {
  }
  connect(): void {
    console.log('looooooog');
    console.log(this.ws);
    //const ws = new WebSocket('ws://localhost:3000');
    ///*
    const dataString = localStorage.getItem('gameData')
    if (!dataString)
      throw Error("No game data")
    const data = JSON.parse(dataString)
    const name = data.name
    const token = data.token
    //const token = 'screen11-1111-1111-1111-111111111111'

    //@ts-ignore
    this.ws = io('ws://127.0.0.1:3000',{
      query: {
        token,
        room: data.roomCode,
      },
      autoConnect: false
    });
    this.ws.open()
    this.ws.on("connect", () => {
    });
    this.ws.on("JoinData", (data: any) => {
      const joinData = this.msgCoder.decodeJoinData(new Uint8Array(data))
      const res: PlayerInfoType[] = []
      const scores: {
        [key: string]: number
      } = {}

      for (const score of joinData.scores) {
        scores[score.name] = score.score
      }

      for (const player of joinData.players) {
        res.push({
          name: player.name,
          colorId: player.colorId,
          score: scores[player.name] || 0,
        })
      }
      console.log('endlich');
      console.log(res);
      this.eventJoinData.emit(res)
    });

    this.ws.on("error", (err: any) => {
      console.error(err);
    })
    this.ws.on("PlayerJoined", (data: any) => {
      this.eventPlayerJoined.emit(this.msgCoder.decodePlayer(new Uint8Array(data)))
    })
    this.ws.on("score", (data: any) => {
      const score = this.msgCoder.decodeScores(new Uint8Array(data))
    })
    this.ws.on("status", (data: GameStatus) => {
      console.log('status');
      console.log(data);
      this.eventStatus.emit(Number(data))
    })
    this.ws.emit('ping', 'true')
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close()
    }
  }
}
