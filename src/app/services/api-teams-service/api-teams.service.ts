import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Team } from 'src/app/shared/models/team.model';
import { TeamCardComponent } from 'src/app/views/team-card/team-card.component';

type HttpHeader = { [name:string] : string }

@Injectable({
  providedIn: 'root'
})
export class ApiTeamsService {


  constructor(@Inject('API_URL') private apiURL: string,
  @Inject('API_HEADERS') private headers: HttpHeader, //todo
  private httpClient: HttpClient
  ) { }

  public getAllTeams(): Observable<Array<Team>>{
    return this.httpClient.get<Array<Team>>(`${this.apiURL}/teams`, {headers: new HttpHeaders(this.headers)}).pipe(map((res : any)=> res.data));
  }

  public getTeam(id:number): Observable<Team>{
    return this.httpClient.get<Team>(`${this.apiURL}/team/${id}`, { headers: this.headers})
  }
  
}
