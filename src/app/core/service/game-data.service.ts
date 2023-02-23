import { Injectable } from '@angular/core';

export type GameData = {
  roomCode: string,
  isPlayer: boolean,
  token: string,
  name?: string,
  colorId?: number
}

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  data: GameData | null = null;
  constructor() { }

  set(roomCode: string, isPlayer: boolean, token: string, name?: string, colorId?: number) {
    this.data = { roomCode, isPlayer, token, name, colorId };
    localStorage.setItem('gameData', JSON.stringify(this.data));
  }

  get() {
    if (this.data) {
      return this.data;
    }
    const data = localStorage.getItem('gameData');
    if (data) {
      this.data = JSON.parse(data);
      //todo check if token is valid
      return this.data;
    }
    return null;
  }
}
