import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { ApiTeamsService } from 'src/app/services/api-teams-service/api-teams.service';
import { Team } from 'src/app/shared/models/team.model';

@Component({
  selector: 'app-teams-tracker',
  templateUrl: './teams-tracker.component.html',
  styleUrls: ['./teams-tracker.component.css']
})
export class TeamsTrackerComponent implements OnInit {

  public $teams: Observable<Array<Team>>;
  public form: FormGroup;
  public selectedTeamIds: Array<number>; //cambiar a mapa team games

  constructor(private apiTeamsService: ApiTeamsService,
    private formBuilder: FormBuilder) {
      this.selectedTeamIds = [];
      this.$teams = new Observable();
      this.form = this.formBuilder.group({
        'team': [null, Validators.required]
      })
    }

  ngOnInit(): void {
    
    this.$teams = this.apiTeamsService.getAllTeams();
  }

  onSubmit(): void{
    if(this.form.valid){
      this.selectedTeamIds.push(this.form.value.team);
      //peticion a games
    }
  }

}
