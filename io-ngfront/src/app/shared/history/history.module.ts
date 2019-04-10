import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  MatButtonModule, 
  MatCardModule, 
  MatCommonModule,
  MatDatepickerModule,
  MatFormFieldModule, 
  MatIconModule,
  MatInputModule, 
  MatNativeDateModule,
  MatSelectModule, 
  MatTableModule
} from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HistoryRoutingModule } from './history-routing.module';

import { AlarmhistoryComponent } from './alarmhistory/alarmhistory.component';
import { EventhistoryComponent } from './eventhistory/eventhistory.component';
import { ProcesshistoryComponent } from './processhistory/processhistory.component';

@NgModule({
  declarations: [
    AlarmhistoryComponent,
    EventhistoryComponent,
    ProcesshistoryComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    FlexLayoutModule,
    HistoryRoutingModule,
    MatButtonModule, 
    MatCardModule, 
    MatCommonModule,
    MatDatepickerModule,
    MatFormFieldModule, 
    MatIconModule,
    MatInputModule, 
    MatNativeDateModule,
    MatSelectModule, 
    MatTableModule,
    ChartsModule,
    ScrollDispatchModule 
  ], exports: [
    AlarmhistoryComponent,
    EventhistoryComponent,
    ProcesshistoryComponent
  ]
})
export class HistoryModule { }
