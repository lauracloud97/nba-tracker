import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', loadChildren: () => import('./views/teams-tracker/teams-tracker.module').then( m => m.TeamsTrackerModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' }
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
