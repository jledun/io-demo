import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DashboardDataService } from '../dashboard-data.service';
import { DataRefresher } from '../../lib/class/dataRefresher.class';

enum clientsize {
  handset = 'handset',
  tablet = 'tablet',
  web = 'web'
}

@Component({
  selector: 'app-exemple-fullscreen',
  templateUrl: './exemple-fullscreen.component.html',
  styleUrls: ['./exemple-fullscreen.component.scss']
})
export class ExempleFullscreenComponent implements OnInit, OnDestroy {
  runtime: any = {};
  toutUpdate;
  toutUpdateStatus: boolean = false;
  runUpdate: boolean = true;
  toutChange;
  toutRetry;
  client: clientsize = clientsize.web;
  load: boolean = false;
  intervalTime: number = 1000;
  refresher: DataRefresher;
  
  toggle( value: string = '' ) {
    if (!value) return;
    if (!this[value]) return;
    return this[value] = !this[value];
  }
  toggleAlarm(item, msgType, msgWay) {
    item.runtime.flow[msgType][msgWay] = !item.runtime.flow[msgType][msgWay];
  }

  setClient( size: clientsize, result ) {
    if ( result.matches ) this.client = size;
  }

  getColor(component) {
    if (component.runtime.flow.fault.low || component.runtime.flow.fault.high) return "warn-color";
    if (component.runtime.flow.alarms.low || component.runtime.flow.alarms.high) return "accent-color";
    return "";
  }
  getClassName(component) {
    return `content-${component.name.toLowerCase().replace(' ','')}`;
  }
  alarm() {
    return this.runtime.production.components.reduce((acc, value) => {
      return acc = acc || value.runtime.flow.alarms.low || value.runtime.flow.alarms.high;
    }, false) && !this.danger();
  }
  danger() {
    return this.runtime.production.components.reduce((acc, value) => {
      return acc = acc || value.runtime.flow.fault.low || value.runtime.flow.fault.high;
    }, false);
  }

  constructor(
    private lbdata: DashboardDataService,
    private breakpointObserver: BreakpointObserver,
  ) {    
    // responsive breakpoints integration
    breakpointObserver.observe( Breakpoints.Handset ).subscribe( result => this.setClient( clientsize.handset, result ) );
    breakpointObserver.observe( Breakpoints.Tablet ).subscribe( result => this.setClient( clientsize.tablet, result ) );
    breakpointObserver.observe( Breakpoints.Web ).subscribe( result => this.setClient( clientsize.web, result ) );
    
    this.refresher = new DataRefresher();
    this.refresher.updateTime = this.intervalTime;
    this.refresher.dataService = this.lbdata.rtService;
    this.refresher.run();
    this.refresher.data.subscribe(data => this.runtime = data[0]);
  }

  intervalTimeChange() {
    if (this.toutChange) clearTimeout(this.toutChange);
    setTimeout(() => {
      // this.startAutoUpdate();
      this.refresher.updateTime = this.intervalTime;
    }, 1000);
  }
  ngOnInit() { }
  ngOnDestroy() {
    this.refresher.destroy();
  }

}
