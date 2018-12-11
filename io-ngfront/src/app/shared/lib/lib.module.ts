import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSlideToggleModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoaderComponent } from './loader/loader.component';
import { DataRefresher } from './class/dataRefresher.class';
import { ApplicationParamComponent } from './application-param/application-param.component';
import { ApplicationParamPopupComponent } from './application-param-popup/application-param-popup.component';

@NgModule({
  declarations: [
    LoaderComponent,
    ApplicationParamComponent,
    ApplicationParamPopupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    FlexLayoutModule
  ],
  exports: [
    LoaderComponent,
    ApplicationParamComponent,
    ApplicationParamPopupComponent
  ],
  entryComponents: [
    ApplicationParamPopupComponent
  ]
})
export class LibModule { }
