import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Game } from 'src/app/shared/models/game.model';

type HttpHeader = { [name:string] : string }

@Injectable({
  providedIn: 'root'
})
export class ApiGamesService {

  constructor(@Inject('API_URL') private apiURL: string,
  @Inject('API_HEADERS') private headers: HttpHeader, //todo
  private httpClient: HttpClient
  ) { }

  getTeamGames(teamId: number, dates: Array<string>): Observable <Array<Game>>{
    return this.httpClient.get<Array<Game>>(`${this.apiURL}/games?team_ids=${teamId}&dates=${dates}`, {headers: this.headers});
  }
  
}
