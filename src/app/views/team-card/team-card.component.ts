import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NbaAPIService } from 'src/app/services/nba-api-service/nba-api.service';
import { Game } from 'src/app/shared/models/game.model';
import { Team } from 'src/app/shared/models/team.model';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamCardComponent implements OnInit, OnChanges {

  @Input() team: Team | undefined;
  @Input() datesRange: Array<string> = [];
  @Output() close: EventEmitter<number> = new EventEmitter<number>();

  public logoUrl: string = '';
  public $games: Observable<Array<Game>>;

  public avgScored: number = 0;
  public avgConceded: number = 0;

  constructor(private nbaApiService: NbaAPIService,
    private router: Router,
  private ref: ChangeDetectorRef) {
    this.$games = new Observable();
   }

  ngOnInit(): void {
    if(this.team){
      this.logoUrl = `https://interstate21.com/nba-logos/${this.team.abbreviation}.png`
      this.$games = this.nbaApiService.getTeamGames(this.team.id, this.datesRange);
      this.$games.subscribe(data => this.calculateAVG(data));
    }
  }

  private calculateAVG(games: Array<Game>) : void {
    let totalScored : number = 0;
    let totalConceded : number = 0;
    games.forEach(game =>{
      totalScored += game.home_team.id == this.team?.id ? game.home_team_score : game.visitor_team_score;
      totalConceded += game.home_team.id == this.team?.id ? game.visitor_team_score : game.home_team_score;
    });

    this.avgScored = Math.floor(totalScored / games.length);
    this.avgConceded = Math.floor(totalConceded / games.length);

    this.ref.markForCheck();

  }

  calculateResult(game: Game) : boolean{
    return game.home_team.id == this.team?.id ? game.home_team_score > game.visitor_team_score : game.visitor_team_score > game.home_team_score;
  }

  ngOnChanges(changes: SimpleChanges) : void {
    //todo
  }

  goToGameResults(){
   this.router.navigate([`/results/${this.team?.id}`])
  }

  onCloseCard(): void{
    this.close.emit(this.team?.id);
  }

}