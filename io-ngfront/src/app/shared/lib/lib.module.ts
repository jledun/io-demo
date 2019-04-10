import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatTooltipModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';

import { LoaderComponent } from './loader/loader.component';
import { DataRefresher } from './class/dataRefresher.class';
import { ApplicationParamComponent } from './application-param/application-param.component';
import { ApplicationParamPopupComponent } from './application-param-popup/application-param-popup.component';
import { RoundIndicatorComponent } from './round-indicator/round-indicator.component';
import { HorizontalBarIndicatorComponent } from './horizontal-bar-indicator/horizontal-bar-indicator.component';

@NgModule({
  declarations: [
    LoaderComponent,
    ApplicationParamComponent,
    ApplicationParamPopupComponent,
    RoundIndicatorComponent,
    HorizontalBarIndicatorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTooltipModule,
    FlexLayoutModule
  ],
  exports: [
    LoaderComponent,
    ApplicationParamComponent,
    ApplicationParamPopupComponent,
    RoundIndicatorComponent,
    HorizontalBarIndicatorComponent
  ],
  entryComponents: [
    ApplicationParamPopupComponent
  ]
})
export class LibModule { }
