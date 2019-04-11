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
  selector: 'app-exemple-web',
  templateUrl: './exemple-web.component.html',
  styleUrls: ['./exemple-web.component.scss']
})
export class ExempleWebComponent implements OnInit, OnDestroy {
  runtime: any = {};
  toutUpdate;
  toutUpdateStatus: boolean = false;
  runUpdate: boolean = true;
  toutChange;
  toutRetry;
  client: clientsize = clientsize.web;
  load: boolean = false;
  intervalTime: number = 5000;
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

  constructor(
    private lbdata: DashboardDataService,
    private breakpointObserver: BreakpointObserver,
  ) {
    // responsive breakpoints integration
    breakpointObserver.observe( Breakpoints.Handset ).subscribe( result => this.setClient( clientsize.handset, result ) );
    breakpointObserver.observe( Breakpoints.Tablet ).subscribe( result => this.setClient( clientsize.tablet, result ) );
    breakpointObserver.observe( Breakpoints.Web ).subscribe( result => this.setClient( clientsize.web, result ) );
    
    this.refresher = new DataRefresher(1000);
    this.refresher.dataService = this.lbdata.rtService;
    this.refresher.run();
    this.refresher.data.subscribe(data => {
      if (Object.keys(this.runtime).length <= 0) return this.runtime = data[0];
      this.runtime.production.name = data[0].production.name;
      this.runtime.production.lotnr = data[0].production.lotnr;
      this.runtime.production.status.production = data[0].production.status.production;
      this.runtime.production.status.fabrication = data[0].production.status.fabrication;
      this.runtime.production.status.mainFlow.setpoint.value = data[0].production.status.mainFlow.setpoint.value;
      this.runtime.production.status.mainFlow.setpoint.unit = data[0].production.status.mainFlow.setpoint.unit;
      this.runtime.production.status.mainFlow.real.value = data[0].production.status.mainFlow.real.value;
      this.runtime.production.status.mainFlow.real.unit = data[0].production.status.mainFlow.real.unit;
      for (let j = 0; j < this.runtime.production.components.length; j++) {
        const r = data[0].production.components.find(d => d.name === this.runtime.production.components[j].name);
        if (r) {
          this.runtime.production.components[j].partnber = r.partnber;
          this.runtime.production.components[j].proportion.setpoint.value = r.proportion.setpoint.value;
          this.runtime.production.components[j].proportion.setpoint.unit = r.proportion.setpoint.unit;
          this.runtime.production.components[j].proportion.current.value = r.proportion.current.value;
          this.runtime.production.components[j].proportion.current.unit = r.proportion.current.unit;
          this.runtime.production.components[j].lots = r.lots;
          this.runtime.production.components[j].runtime.flow.name = r.runtime.flow.name;
          this.runtime.production.components[j].runtime.flow.value = r.runtime.flow.value;
          this.runtime.production.components[j].runtime.flow.unit = r.runtime.flow.unit;
          this.runtime.production.components[j].runtime.flow.maxValue = r.runtime.flow.maxValue;
          this.runtime.production.components[j].runtime.flow.alarms.setpoint = r.runtime.flow.alarms.setpoint;
          this.runtime.production.components[j].runtime.flow.alarms.low = r.runtime.flow.alarms.low;
          this.runtime.production.components[j].runtime.flow.alarms.high = r.runtime.flow.alarms.high;
          this.runtime.production.components[j].runtime.flow.fault.setpoint = r.runtime.flow.fault.setpoint;
          this.runtime.production.components[j].runtime.flow.fault.low = r.runtime.flow.fault.low;
          this.runtime.production.components[j].runtime.flow.fault.high = r.runtime.flow.fault.high;
          this.runtime.production.components[j].runtime.setpoint.value = r.runtime.setpoint.value;
          this.runtime.production.components[j].runtime.setpoint.unit = r.runtime.setpoint.unit;
          for (let i = 0; i < this.runtime.production.components[j].runtime.custom.length; i++) {
            const s = r.runtime.custom.find(d => d.name === this.runtime.production.components[j].runtime.custom[i].name);
            if (s) {
              this.runtime.production.components[j].runtime.custom[i].name = s.name;
              this.runtime.production.components[j].runtime.custom[i].value = s.value;
              this.runtime.production.components[j].runtime.custom[i].unit = s.unit;
              this.runtime.production.components[j].runtime.custom[i].maxValue = s.maxValue;
            }
          };
        }
      };
    });
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
