import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { RuntimeData } from '../shared/sdk/models';
import { RuntimeDataApi } from '../shared/sdk/services';
import { IoRunTimeDatasService, DataRefresher } from '../shared/io-nglib/';
import { LoopBackConfig, LoopBackAuth, LoopBackFilter } from '../shared/sdk';
import { environment } from '../../environments/environment';

enum clientsize {
  handset = 'handset',
  tablet = 'tablet',
  web = 'web'
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
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

  constructor(
    private rtService: RuntimeDataApi,
    private breakpointObserver: BreakpointObserver,
  ) {
    LoopBackConfig.setBaseURL( `http://${environment.lbApp.ip}` );
    LoopBackConfig.setApiVersion( environment.lbApp.api );
    
    // responsive breakpoints integration
    breakpointObserver.observe( Breakpoints.Handset ).subscribe( result => this.setClient( clientsize.handset, result ) );
    breakpointObserver.observe( Breakpoints.Tablet ).subscribe( result => this.setClient( clientsize.tablet, result ) );
    breakpointObserver.observe( Breakpoints.Web ).subscribe( result => this.setClient( clientsize.web, result ) );
    
    this.refresher = new DataRefresher();
    this.refresher.dataService = this.rtService;
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
