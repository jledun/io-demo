import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { IoRunTimeDatasService } from '../../lib/io-run-time-datas.service';
import { LoopBackFilter } from '../../sdk';
import { LogProcessInterface } from '../../sdk/models';
import { HistoryService } from '../history.service';

enum clientsize {
  handset = 'handset',
  tablet = 'tablet',
  web = 'web'
}
class userFilter {
  showdate?: Date;
  process?: string;
}

@Component({
  selector: 'app-processhistory',
  templateUrl: './processhistory.component.html',
  styleUrls: ['./processhistory.component.scss']
})
export class ProcesshistoryComponent implements OnInit, OnDestroy {
  maxLength: number = 50;
  refresh_interval; 
  interval_status: number = 0;
  client: clientsize = clientsize.web;
  load: boolean = false;
  lbFilter: LoopBackFilter = {
    where: {},
    order: "id DESC",
    limit: 50
  }
  
  setClient( size: clientsize, result ) {
    if ( result.matches ) this.client = size;
    this.lineChartOptions.responsive = this.client === clientsize.handset || this.client === clientsize.tablet;
  }

  getData() {
    this.load = true;
    IoRunTimeDatasService.setDataLoading( true );
    this.lbdata.getLogData( this.lbFilter ).subscribe(
      ( data: LogProcessInterface[] ) => {
        if ( !data ) return;
        if ( data.length <= 0 ) return;
        this.lineChartData.find(d => d.label === 'Flour flow').data = data.map(d => d.flour).reverse();
        this.lineChartData.find(d => d.label === 'Eggs flow').data = data.map(d => d.eggs).reverse();
        this.lineChartData.find(d => d.label === 'Sugar flow').data = data.map(d => d.sugar).reverse();
        this.lineChartData.find(d => d.label === 'Butter flow').data = data.map(d => d.butter).reverse();
        this.lineChartLabels = data.map(d => new Date(d.timestamp).toLocaleTimeString()).reverse();
      },
      ( err ) => {
        console.log( err );
      },
      () => {
        this.load = false;
        IoRunTimeDatasService.setDataLoading( false );
      }
    );
  }

  // lineChart
  public lineChartData:Array<any> = [
    {data: [], label: 'Flour flow'},
    {data: [], label: 'Eggs flow'},
    {data: [], label: 'Sugar flow'},
    {data: [], label: 'Butter flow'}
  ];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions: ChartOptions = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // flour
      backgroundColor: 'rgba(230, 230, 0, 0.1)',
      borderColor: 'rgba(230, 230, 0,1)',
      pointBackgroundColor: 'rgba(230, 230, 0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(230, 230, 0,0.8)'
    },
    { // eggs
      backgroundColor: 'rgba(255, 128, 128, 0.1)',
      borderColor: 'rgba(255, 128, 128,1)',
      pointBackgroundColor: 'rgba(255, 128, 128,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255, 128, 128,1)'
    },
    { // sugar
      backgroundColor: 'rgba(102, 217, 255, 0.1)',
      borderColor: 'rgba(102, 217, 255,1)',
      pointBackgroundColor: 'rgba(102, 217, 255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(102, 217, 255,0.8)'
    },
    { // butter
      backgroundColor: 'rgba(173, 173, 133, 0.1)',
      borderColor: 'rgba(173, 173, 133,1)',
      pointBackgroundColor: 'rgba(173, 173, 133,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(173, 173, 133,1)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  constructor(
    private lbdata: HistoryService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.lineChartLabels = [];
    for ( let i = 0; i < 24; i++ ) this.lineChartLabels.push(i);
    
    // responsive breakpoints integration
    breakpointObserver.observe( Breakpoints.Handset ).subscribe( result => this.setClient( clientsize.handset, result ) );
    breakpointObserver.observe( Breakpoints.Tablet ).subscribe( result => this.setClient( clientsize.tablet, result ) );
    breakpointObserver.observe( Breakpoints.Web ).subscribe( result => this.setClient( clientsize.web, result ) );
  }

  ngOnInit() {
    this.getData();
    this.startInterval();
  }
  ngOnDestroy() {
    this.stopInterval();
  }
  
  toggleInterval() {
    switch (this.interval_status ) {
      case 0: this.startInterval(); break;
      default: this.stopInterval(); break;
    }
  }
  stopInterval() {
    if ( this.refresh_interval ) clearInterval( this.refresh_interval );
    this.interval_status = 0;
  }
  startInterval() {
    this.stopInterval();
    this.refresh_interval = setInterval( () => {
      this.getData();
    }, 5000);
    this.interval_status = 1;
  }

}
