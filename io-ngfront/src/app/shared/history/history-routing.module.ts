import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AlarmhistoryComponent } from './alarmhistory/alarmhistory.component';
import { EventhistoryComponent } from './eventhistory/eventhistory.component';
import { ProcesshistoryComponent } from './processhistory/processhistory.component';

const routes: Routes = [
  {path: 'alarmhistory', component: AlarmhistoryComponent},
  {path: 'eventhistory', component: EventhistoryComponent},
  {path: 'processhistory', component: ProcesshistoryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }
