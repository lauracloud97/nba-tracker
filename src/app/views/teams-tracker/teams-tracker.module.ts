import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamCardComponent } from './team-card/team-card.component';
import { TeamsTrackerComponent } from './teams-tracker.component';
import { GamesPageComponent } from './games-page/games-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeamsTrackerRoutingModule } from './teams-tracker-routing.module';

@NgModule({
  declarations: [
    TeamCardComponent,
    TeamsTrackerComponent,
    GamesPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TeamsTrackerRoutingModule
  ]
})
export class TeamsTrackerModule { }
