import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  MatDividerModule,
  MatListModule,
  MatSidenavModule
} from '@angular/material';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatDividerModule,
    MatListModule,
    MatSidenavModule
  ],
  exports: [
    SettingsComponent
  ]
})
export class SettingsModule { }
