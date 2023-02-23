import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { GamesPageComponent } from './views/games-page/games-page.component';
import { TeamsTrackerComponent } from './views/teams-tracker/teams-tracker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TeamCardComponent } from './views/team-card/team-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GameStatPipe } from './shared/pipes/game-stat.pipe';
import { ResultColorDirective } from './shared/directives/result-color.directive';

@NgModule({
  declarations: [
    AppComponent,
    GamesPageComponent,
    TeamsTrackerComponent,
    TeamCardComponent,
    GameStatPipe,
    ResultColorDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    {
      provide: 'API_URL', useValue: 'https://free-nba.p.rapidapi.com'
    },
    {
      provide: 'API_HEADERS', useValue: {
        'X-RapidAPI-Key': 'bcf73b3c29mshf9cee89e66816adp19d9b0jsnde04ea88108c',
        'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

