import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { Game } from 'src/app/shared/models/game.model';
import { Team } from 'src/app/shared/models/team.model';

type HttpHeader = { [name:string] : string }
type HttpResponse = { data: Array<any>, meta: {total_pages: number, current_page: number, next_page: number, per_page: number, total_count: number}}

@Injectable({
  providedIn: 'root'
})
export class NbaAPIService {

  constructor(@Inject('API_URL') private apiURL: string,
  @Inject('API_HEADERS') private headers: HttpHeader, //todo
  private httpClient: HttpClient
  ) { }

  //hay que almacenar los datos de los partidos por equipo en local

  public getAllTeams(): Observable<Array<Team>>{
    return this.httpClient.get<HttpResponse>(`${this.apiURL}/teams`, {headers: this.headers}).pipe(map((res : HttpResponse) => res.data));
  }

  getTeamGames(teamId: number, dates: Array<string>): Observable <Array<Game>>{
    let dateQueryParam = '';
    dates.forEach(date => dateQueryParam += `&dates[]=${date}`);

    return this.httpClient.get<HttpResponse>(`${this.apiURL}/games?page=0&team_ids[]=${teamId}&per_page=12${dateQueryParam}`, {headers: this.headers})
    .pipe(map((res: HttpResponse)=> res.data));
  }
  
}
