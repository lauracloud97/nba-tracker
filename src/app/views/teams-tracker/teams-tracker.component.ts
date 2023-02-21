import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { NbaAPIService } from 'src/app/services/nba-api-service/nba-api.service';
import { Team } from 'src/app/shared/models/team.model';

@Component({
  selector: 'app-teams-tracker',
  templateUrl: './teams-tracker.component.html',
  styleUrls: ['./teams-tracker.component.css']
})
export class TeamsTrackerComponent implements OnInit {

  public $teams: Observable<Array<Team>>;
  public form: FormGroup;
  public selectedTeams: Array<Team>;
  public teams: Array<Team>;
  public dates: Array<string>;


  constructor(private nbaApiService: NbaAPIService,
    private formBuilder: FormBuilder) {
      this.dates = [];
      this.selectedTeams = [];
      this.teams = [];
      this.$teams = new Observable();
      this.form = this.formBuilder.group({
        'team': [null, Validators.required]
      })
    }

  ngOnInit(): void {
    this.$teams = this.nbaApiService.getAllTeams();
    this.$teams.subscribe((data: Array<Team>) => this.teams = data);
    this.calculateDateRange();
  }

  private calculateDateRange() : void{
    const today: Date = new Date(Date.now());
    this.dates.push(today.toLocaleString('en-CA', { dateStyle: 'short'}));
    for(let i: number = 1; i < 12; i++){
      const date = new Date(today.getTime() - (i * 24 * 60 * 60 * 1000));
      this.dates.push(date.toLocaleString('en-CA', { dateStyle: 'short'}));
    }
  }

  onSubmit(): void{
    if(this.form.valid){
      const teamSelected : Team | undefined = this.teams.find(x => x.id == this.form.value.team);
      if(null != teamSelected)
        this.selectedTeams.push(teamSelected);
    }
  }

  onTeamCardClose(teamId: number): void{
    const index : number = this.selectedTeams.findIndex(x => x.id == teamId);
    if(index != -1)
      this.selectedTeams.splice(index, 1);
  }

}
