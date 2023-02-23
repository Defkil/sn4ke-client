import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {ApiCreateRoomResponse, ApiJoinRoomResponse, ApiService} from "../../service/api.service";
import {catchError, Observable, Subscriber, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {GameDataService} from "../../service/game-data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  placeholderNicknameList = [
    'Sn4kem4ni4', 'Sssnake', 'Slithering Sammy', 'Coiled Carlos', 'Sneaky Steve', 'Fangtastic Fred',
    'Serpentine Sally', 'Twisted Tilly', 'Hissyfit Harry', 'Crawling Craig', 'Rattlesnake Rick', 'Python Pete',
    'Coiled', 'Sneaky', 'Serpent', 'Twisted', 'Hissy', 'Crawling', 'Rattler', 'Python'
  ].sort(() => 0.5 - Math.random())

  isPlayer = true;
  inputName = '';
  inputRoomCode = '';

  isCreateRoomAvaible: () => boolean = () => {
    if (this.isPlayer) {
      return this.inputName.length > 3;
    }
    return true
  }

  isJoinAvaible: () => boolean = () => {
    if (this.isPlayer) {
      return this.inputName.length > 3 && this.inputRoomCode.length === 3;
    }
    return this.inputRoomCode.length === 3;
  }

  constructor(
    private api: ApiService,
    private router: Router,
    private gameData: GameDataService,
  ) {}


  activeObservable: Subscription | null = null;
  joinRoom() {
    if (!this.isJoinAvaible()) {
      return;
    }
    this.activeObservable = this.api.joinRoom(this.inputName, this.isPlayer, this.inputRoomCode).subscribe((res) => {
      const data = res as ApiJoinRoomResponse;
      this.gameData.set(this.inputRoomCode, this.isPlayer, data.token, data.name, data.colorId);
      this.router.navigate(['/game']);
    })
  }

  async createRoom() {
    if (!this.isCreateRoomAvaible()) {
      return;
    }
    this.activeObservable = this.api.createRoom(this.inputName, this.isPlayer).subscribe((res) => {
      const data = res as ApiCreateRoomResponse;
      this.gameData.set(data.roomCode, this.isPlayer, data.token, data.name, data.colorId);
      this.router.navigate(['/game']);
    })
  }

  ngOnDestroy(): void {
    if (this.activeObservable) {
      this.activeObservable.unsubscribe();
    }
  }
}
