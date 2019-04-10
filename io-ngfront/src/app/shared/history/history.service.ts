import { Injectable } from '@angular/core';
import { LoopBackFilter } from '../sdk';
import { 
  AlarmhistoryApi,
  EventhistoryApi,
  LogProcessApi
} from '../sdk/services';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(
    private alarmhistoryApi: AlarmhistoryApi,
    private eventhistoryApi: EventhistoryApi,
    private logProcessApi: LogProcessApi
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
    return this.logProcessApi.find(filter);
  }
  /* 
  * DATA CURVES API
  * */
  
}
