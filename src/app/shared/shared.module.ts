import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../core/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConferenceTypePipe } from './pipes/conference-type/conference-type.pipe';

@NgModule({
  declarations: [
    ConferenceTypePipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports : [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ConferenceTypePipe
  ]
})
export class SharedModule { }
