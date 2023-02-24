import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { NbaAPIService } from 'src/app/core/services/nba-api-service/nba-api.service';
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
  @Output() close: EventEmitter<number> = new EventEmitter<number>();

  public readonly buttonText : string = 'See game results >>';

  public logoUrl: string = '';
  public $games: Observable<Array<Game>>;

  public avgScored: number = 0;
  public avgConceded: number = 0;

  constructor(private nbaApiService: NbaAPIService,
    private ref: ChangeDetectorRef) {
    this.$games = new Observable();
   }

  ngOnInit(): void {
    this.getTeamInfo();
  }

  private getTeamInfo() : void {
    if(this.team){
      console.log("oninit")
      this.logoUrl = `https://interstate21.com/nba-logos/${this.team.abbreviation}.png`
      this.$games = this.nbaApiService.getTeamGames(this.team.id);
      this.$games.subscribe((data : Array<Game>) => this.calculateAVG(data));
    }
  }

  private calculateAVG(games: Array<Game>) : void {
    let totalScored : number = 0;
    let totalConceded : number = 0;
    games.forEach((game : Game) =>{
      totalScored += game.home_team.id == this.team?.id ? game.home_team_score : game.visitor_team_score;
      totalConceded += game.home_team.id == this.team?.id ? game.visitor_team_score : game.home_team_score;
    });

    this.avgScored = Math.floor(totalScored / games.length);
    this.avgConceded = Math.floor(totalConceded / games.length);

    this.ref.markForCheck();

  }

  ngOnChanges(changes: SimpleChanges) : void {

    if(changes['team'].currentValue != this.team){
      this.team = changes['team'].currentValue;
      this.getTeamInfo();
    }
  }

  onCloseCard(): void{
    this.close.emit(this.team?.id);
  }

}