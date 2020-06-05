import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ChartsModule } from 'ng2-charts';
import { ScrollingModule } from '@angular/cdk/scrolling';
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
    ScrollingModule 
  ], exports: [
    AlarmhistoryComponent,
    EventhistoryComponent,
    ProcesshistoryComponent
  ]
})
export class HistoryModule { }
