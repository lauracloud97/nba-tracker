import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesPageComponent } from './views/games-page/games-page.component';
import { TeamsTrackerComponent } from './views/teams-tracker/teams-tracker.component';

export const appRoutes: Routes = [
  { path: '', component: TeamsTrackerComponent },
  { path: 'results/:teamCode', component: GamesPageComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
