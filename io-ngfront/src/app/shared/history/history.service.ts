import { Injectable } from '@angular/core';
import { LoopBackFilter } from '../sdk';
import {
  LogRefroidisseurInterface
} from '../sdk/models';
import { 
  AlarmhistoryApi,
  EventhistoryApi,
  LogRefroidisseurApi
} from '../sdk/services';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(
    private alarmhistoryApi: AlarmhistoryApi,
    private eventhistoryApi: EventhistoryApi,
    private logRefroidisseurApi: LogRefroidisseurApi
   ) { }

  /* 
   * ALARM HISTORY API
   * */
  getAlarmHistory(filter) {
    return this.alarmhistoryApi.find(filter);
  }
  getStationList() {
    return this.alarmhistoryApi.stationlist();
  }
  /* 
   * ALARM HISTORY API
   * */

  /* 
   * EVENT HISTORY API
   * */
  getEventHistory(filter) {
    return this.eventhistoryApi.find(filter);
  }
  /* 
   * EVENT HISTORY API
   * */

  /* 
   * DATA CURVES API
   * */
  getLogData(filter) {
    return this.logRefroidisseurApi.find(filter);
  }
  /* 
  * DATA CURVES API
  * */
  
}
