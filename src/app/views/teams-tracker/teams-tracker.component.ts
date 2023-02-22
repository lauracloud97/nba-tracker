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
      });
    }

  ngOnInit(): void {
    this.selectedTeams = this.nbaApiService.getSelectedTeams();
    this.$teams = this.nbaApiService.getAllTeams();
    this.$teams.subscribe((data: Array<Team>) => this.teams = data);
  }

  onSubmit(): void{
    if(this.form.valid){
      const teamSelected : Team | undefined = this.teams.find(x => x.id == this.form.value.team);
      if(null != teamSelected){
        this.selectedTeams = this.nbaApiService.selectTeam(teamSelected);
      }
    }
  }

  onTeamCardClose(teamId: number): void{
    this.selectedTeams = this.nbaApiService.removeTeam(teamId);
  }

}
