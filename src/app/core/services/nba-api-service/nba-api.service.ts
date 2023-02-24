import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { share } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { Game } from 'src/app/shared/models/game.model';
import { Team } from 'src/app/shared/models/team.model';

type HttpHeader = { [name:string] : string }
type HttpResponse = { data: [], meta: {total_pages: number, current_page: number, next_page: number, per_page: number, total_count: number}}

@Injectable({
  providedIn: 'root'
})
export class NbaAPIService {

  private selectedTeams: Array<Team> = [];
  private teamGamesMap: Map<number, Array<Game>> = new Map<number, Array<Game>>();
  private dateRange: Array<string> = [];

  private readonly apiUrl: string = 'https://free-nba.p.rapidapi.com';
  private readonly headers = {
    'X-RapidAPI-Key': 'bcf73b3c29mshf9cee89e66816adp19d9b0jsnde04ea88108c',
    'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
  }

  constructor(private httpClient: HttpClient) { 
    this.setDateRange();
  }

  public getAllTeams(): Observable<Array<Team>>{
    return this.httpClient.get<HttpResponse>(`${this.apiUrl}/teams`, {headers: this.headers})
    .pipe(map((res : HttpResponse) => res.data), share());
  }

  public getTeamGames(teamId: number, dates: Array<string> = this.dateRange): Observable <Array<Game>>{
    if(this.teamGamesMap.has(teamId)){
      return new Observable((obs)=> {
        obs.next(this.teamGamesMap.get(teamId));
        obs.complete();
      });
    }else{
      let dateQueryParam = '';
      dates.forEach(date => dateQueryParam += `&dates[]=${date}`);
  
      return this.httpClient.get<HttpResponse>(`${this.apiUrl}/games?page=0&team_ids[]=${teamId}&per_page=12${dateQueryParam}`, {headers: this.headers})
      .pipe(map((res: HttpResponse)=> { 
        const games : Array<Game> = res.data.map((game: Game)=>{
          if(game.home_team_score == game.visitor_team_score)
            game.winnerTeam = -1;
          else
            game.winnerTeam = game.home_team_score > game.visitor_team_score ? game.home_team.id : game.visitor_team.id;
          return game;
        });
        this.teamGamesMap.set(teamId, games);
        return games;
      }), share());
    }

  }

  public getTeam(teamId: number) : Observable<Team> {
    const index = this.selectedTeams.findIndex((x : Team) => x.id == teamId);
    if(index > -1){
      return new Observable<Team>(obs => {
        obs.next(this.selectedTeams[index]);
        obs.complete();
      })
    }else{
      return this.httpClient.get<Team>(`${this.apiUrl}/teams/${teamId}`, {headers: this.headers})
      .pipe(map((res: Team)=> {
        this.selectedTeams.push(res);
        return res;
      }),share());
    }
  }

  public selectTeam(team: Team) : Array<Team>{
    this.selectedTeams.push(team);
    return this.selectedTeams;
  }

  public removeTeam(teamId: number) : Array<Team> {
    const index : number = this.selectedTeams.findIndex(x => x.id == teamId);
    if(index != -1){
      this.selectedTeams.splice(index, 1);
      this.teamGamesMap.delete(teamId);
    }
    
    return this.selectedTeams;
  }

  public getSelectedTeams() : Array<Team> {
    return this.selectedTeams;
  }

  public setDateRange() : void{
    const today: Date = new Date(Date.now());
    this.dateRange.push(today.toLocaleString('en-CA', { dateStyle: 'short'}));
    for(let i: number = 1; i < 12; i++){
      const date = new Date(today.getTime() - (i * 24 * 60 * 60 * 1000));
      this.dateRange.push(date.toLocaleString('en-CA', { dateStyle: 'short'}));
    }
  }
}
