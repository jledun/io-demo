import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { LbdataService } from '../lbdata.service';
import { LoopBackFilter } from '../shared/sdk';
import { LogRefroidisseurInterface } from '../shared/sdk/models';
import { IoRunTimeDatasService } from '../shared/io-nglib/';

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
  tmpFilter: userFilter = {
    showdate: new Date(),
    process: 'BD'
  };
  lbFilter: LoopBackFilter = {
    where: {},
    order: "id ASC"
  }
  
  setClient( size: clientsize, result ) {
    if ( result.matches ) this.client = size;
    this.lineChartOptions.responsive = this.client === clientsize.handset || this.client === clientsize.tablet;
  }
  
  getUserDisplayedDate() {
    return `${new Date( this.tmpFilter.showdate ).toLocaleDateString()}`;
  }

  getData() {
    this.load = true;
    IoRunTimeDatasService.setDataLoading( true );
    this.lbFilter.where = this.parseFilter( this.tmpFilter );
    this.lbdata.getLogData( this.lbFilter ).subscribe(
      ( data: LogRefroidisseurInterface[] ) => {
        if ( !data ) return;
        if ( data.length <= 0 ) return;
        let _lineChartData = [
          {data: [], label: 'Température T1'},
          {data: [], label: 'Température T2'},
          {data: [], label: 'Température T3'}
        ];
        let _lineChartLabels = [];
        data.forEach( ( log ) => {
          _lineChartData[0].data.push( log.t1 );
          _lineChartData[1].data.push( log.t2 );
          _lineChartData[2].data.push( log.t3 );
          _lineChartLabels.push( new Date( log.timestamp ).toLocaleTimeString() );
        });
        this.lineChartData = _lineChartData;
        this.lineChartLabels = _lineChartLabels;
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

  // filter management
  resetFilter() {
    this.tmpFilter = {
      showdate: new Date('2017-06-02'),
      process: 'BD'
    }
    this.getData();
  }
  parseFilter( tmp: userFilter ) {
    let whereConditions = []
    if ( tmp.showdate ) whereConditions.push( { and: [ { timestamp: this.getDateFilter( tmp.showdate )[0] }, { timestamp: this.getDateFilter( tmp.showdate )[1] } ] } );
    if ( tmp.process ) whereConditions.push( { reference: tmp.process } );
    switch( whereConditions.length ) {
      case 0:
      return {};
      case 1:
      return whereConditions[0];
      default:
      return { and: whereConditions };
    }
  }
  getDateFilter( selecteddate: Date ) {
    return [
      {'gte': new Date( new Date( selecteddate ).getFullYear(), new Date( selecteddate ).getMonth(), new Date( selecteddate ).getDate(), 0, 0, 0 )},
      {'lte': new Date( new Date( selecteddate ).getFullYear(), new Date( selecteddate ).getMonth(), new Date( selecteddate ).getDate(), 23, 59, 59 )}
    ]
  }
  dayBefore() { this.tmpFilter.showdate = new Date( this.tmpFilter.showdate.getFullYear(), this.tmpFilter.showdate.getMonth(), this.tmpFilter.showdate.getDate() - 1, 0, 0, 0 ) };
  dayAfter() { this.tmpFilter.showdate = new Date( this.tmpFilter.showdate.getFullYear(), this.tmpFilter.showdate.getMonth(), this.tmpFilter.showdate.getDate() + 1, 0, 0, 0 ) };

  // lineChart
  public lineChartData:Array<any> = [
    {data: [], label: 'Température T1'},
    {data: [], label: 'Température T2'},
    {data: [], label: 'Température T3'}
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }


  constructor(
    private lbdata: LbdataService,
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
    this.resetFilter();
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
