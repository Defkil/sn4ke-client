import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

export type ApiCreateRoomResponse = {
  token: string,
  name?: string,
  colorId?: number
  roomCode: string
}

export type ApiJoinRoomResponse = {
  token: string,
  name?: string,
  colorId?: number
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  createRoom(name: string, isPlayer: boolean): Observable<ApiCreateRoomResponse> {
    return this.http.post<ApiCreateRoomResponse>('http://127.0.0.1:3000/create-room', { name, isPlayer}, {
       observe: 'body'
    }).pipe(catchError(this.handleError));
  }

  joinRoom(name: string, isPlayer: boolean, roomCode: string): Observable<ApiJoinRoomResponse> {
    return this.http.post<ApiJoinRoomResponse>('http://127.0.0.1:3000/join-room', {name, isPlayer, roomCode}, {
      observe: 'body'
    }).pipe(catchError(this.handleError));
  }

  isSessionActive(roomCode: string, token: string): Observable<boolean> {
    return this.http.post<boolean>('http://127.0.0.1:3000/is-session-active', {roomCode, token}, {
      observe: 'body'
    }).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    let errorMessage = 'An error occurred on maybe your side. Check your internet connection and try again.'
    if (error.status !== 0) {
      errorMessage = 'An error occurred on our side. Error Code ' + error.status + ' Please try again later.'
    }
    //todo show error bubble
    return throwError(() => new Error(errorMessage));
  }
}
