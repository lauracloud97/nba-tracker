import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
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

