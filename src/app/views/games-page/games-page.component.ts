import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { NbaAPIService } from 'src/app/services/nba-api-service/nba-api.service';
import { Game } from 'src/app/shared/models/game.model';
import { Team } from 'src/app/shared/models/team.model';

@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.css']
})
export class GamesPageComponent implements OnInit {

  public buttonText: string = '<< Back to all team stats';
  public $games: Observable<Array<Game>>;
  public team: Team | undefined;
  private $subscription : Subscription = new Subscription();

  constructor(private activatedRoute: ActivatedRoute,
    private nbaApiService: NbaAPIService) { 
      this.$games = new Observable();
  }

  ngOnInit(): void {
    this.$subscription.add(this.activatedRoute.params.subscribe((data: Params) =>{
      if(data['teamCode'] != null){
        const teamId : number = parseInt(data['teamCode']);
        this.nbaApiService.getTeam(teamId).subscribe((data: Team) => {
          this.team = data;
          this.$games = this.nbaApiService.getTeamGames(teamId);
        });
      }
    }));
  }

  ngOnDestroy(){
    this.$subscription.unsubscribe();
  }

}
