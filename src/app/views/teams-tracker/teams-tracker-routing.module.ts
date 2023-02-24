import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamGuard } from 'src/app/core/guards/team.guard';
import { GamesPageComponent } from './games-page/games-page.component';
import { TeamsTrackerComponent } from './teams-tracker.component';

export const teamsTrackerRoutes: Routes = [
  { path: '', component: TeamsTrackerComponent },
  { path: 'results/:teamCode', canActivate: [TeamGuard], component: GamesPageComponent }
]

@NgModule({
  imports: [
    RouterModule.forChild(teamsTrackerRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class TeamsTrackerRoutingModule { }