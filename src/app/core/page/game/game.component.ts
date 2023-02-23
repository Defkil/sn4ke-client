import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {disconnect, getColors, getConnectionsEvents, getConnectionsFunctions, load} from 'src/game/index';
import {Subscription} from "rxjs";
import {ApiService} from "../../service/api.service";
import {GameDataService} from "../../service/game-data.service";
import {GameStatus, PlayerInfoType, PlayerType, ScoreType} from "../../../../game/Types";
import {Router} from "@angular/router";
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('gameContainer') gameContainer!: ElementRef;
  constructor(
    private api: ApiService,
    private gameDataService: GameDataService,
    private router: Router
  ) {
  }
  sessionCheckObservable: Subscription | null = null;
  roomCode = ''

  gameData = this.gameDataService.get();
  ngOnInit() {
    const gameData = this.gameDataService.get();
    if(!gameData) {
      //todo handle error
      console.error('No game data')
      return;
    }

    this.roomCode = gameData.roomCode;
  }

  async ngAfterViewInit() {
    if (!this.gameData) {
      //todo handle error
      console.error('No game data')
      return;
    }
    const navigationData: {type: string} = performance.getEntriesByType("navigation")[0] as any;
    if (navigationData.type !== "navigate") {
      this.sessionCheckObservable = this.api.isSessionActive(this.gameData.roomCode, this.gameData.token).subscribe(async (sessionStatus) => {
        if (!sessionStatus) {
          //todo handle error
          console.error('Session is not active')
          return;
        }
        await this.load()
      })
    } else {
      await this.load()
    }
  }

  private async load() {
    await this.loadCanvas()
    this.setupEvents()
  }

  playerInfos: PlayerInfoType[] = []

  activeStatus = GameStatus.WAITING
  private setupEvents() {
    const events = getConnectionsEvents()
    events.joinData.subscribe((data) => {
      this.playerInfos = data;
    })
    events.playerJoined.subscribe((data) => {
      this.playerInfos.push({
        name: data.name,
        colorId: data.colorId,
        score: 0,
      })
    })
    events.status.subscribe((data: number) => {
      if (data === GameStatus.INIT) {
        data = GameStatus.WAITING
      }
      if (this.activeStatus !== data) {
        this.activeStatus = data
      }
    })
  }

  GameStatus = GameStatus
  connectionFunctions = getConnectionsFunctions()

  private async loadCanvas() {
    await load(this.gameContainer.nativeElement)
  }

  ngOnDestroy(): void {
    if (this.sessionCheckObservable) {
      this.sessionCheckObservable.unsubscribe();
    }
    disconnect()
  }

  getColor(id: number) {
    return getColors(id)
  }

  leaveGame() {
    this.connectionFunctions.leaveGame()
    this.router.navigate(['/'])
  }

  startGame() {
    this.connectionFunctions.startGame()
  }
}
