import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { IoRunTimeDatasService } from '../shared/io-nglib';
import { LoopBackConfig, LoopBackAuth, EventhistoryInterface, LoopBackFilter } from '../shared/sdk';
import { Alarmhistory, AlarmhistoryInterface } from '../shared/sdk/models';
import { AlarmhistoryApi } from '../shared/sdk/services';
import { environment } from '../../environments/environment';

enum clientsize {
  handset = 'handset',
  tablet = 'tablet',
  web = 'web'
}
class userFilter {
  datedebut?: Date;
  datefin?: Date;
  station?: String;
}

@Component({
  selector: 'app-alarmhistory',
  templateUrl: './alarmhistory.component.html',
  styleUrls: ['./alarmhistory.component.scss']
})
export class AlarmhistoryComponent implements OnInit, OnDestroy {
  maxLength: number = 50;
  refresh_interval; 
  interval_status: number = 0;
  toutFilterScroll;
  filter: LoopBackFilter = {
    where: {},
    limit: this.maxLength,
    skip: 0,
    order: ['alStartTime DESC', 'alStartTimeMs DESC']
  };
  alarms: AlarmhistoryInterface[];
  stationlist: string[];
  displayedColumns = [
    'alStartTime',
    'alStation',
    'alUserFull',
    'alStatus',
    'alMessage'
  ];
  client: clientsize = clientsize.web;
  load: boolean = false;
  tmpFilter: userFilter = {
    datedebut: null,
    datefin: null,
    station: ""
  }

  getData() {
    IoRunTimeDatasService.setDataLoading( true );
    this.load = true;
    this.filter.where = this.parseFilter( this.tmpFilter );

    // console.log( this.filter.skip );
    this.alarmhistoryApi.find( this.filter ).subscribe(
      ( data ) => {
        if ( this.filter.skip <= 0 ) {
          this.alarms = data;
        }else{
          this.alarms = this.alarms.concat( data );
          this.filter.limit = this.filter.limit + this.filter.skip;
          this.filter.skip = 0;
        }
      },
      ( err ) => {
        console.log ( err );
      },
      () => { IoRunTimeDatasService.setDataLoading( false ); this.load = false; }
    );
  }
  getStationList() {
    IoRunTimeDatasService.setDataLoading( true );
    this.load = true;
    this.alarmhistoryApi.stationlist().subscribe(
      ( data ) => {
        this.stationlist = data.StationList;
      },
      ( err ) => {
        console.log( err );
      },
      () => {
        this.getData();
      }
    )
  }

  getUserTimestamp( data ) {
    return `${new Date( data ).toLocaleDateString()} - ${new Date( data ).toLocaleTimeString() }`; 
  }

  // filter management
  resetFilter() {
    this.tmpFilter = {
      datedebut: null,
      datefin: null,
      station: ""
    }
    this.getData();
  }
  parseFilter( tmp: userFilter ) {
    let whereConditions = []
    if ( tmp.datedebut ) whereConditions.push( { alStartTime: { 'gte': tmp.datedebut } } );
    if ( tmp.datefin ) whereConditions.push( { alStartTime: { 'lte': tmp.datefin } } );
    if ( tmp.station ) whereConditions.push( { alStation: tmp.station } );
    switch( whereConditions.length ) {
      case 0:
      return {};
      case 1:
      return whereConditions[0];
      default:
      return { and: whereConditions };
    }
  }

  // scroll management
  scrollManager( result ) {
    let scrollPosition = result.getElementRef().nativeElement.scrollHeight - result.getElementRef().nativeElement.scrollTop - result.getElementRef().nativeElement.clientHeight;
    if ( scrollPosition < 20 && !this.load ) {
      this.stopInterval();
      this.filter.skip += this.filter.limit;
      this.filter.limit = this.maxLength;
      this.getData();
      this.startInterval();
    }
  }
  resetScroll() {
    window.scrollTo(0, 0);
  }
  displayScrollToTopButton() {
    return window.scrollY > 40;
  }

  setClient( size: clientsize, result ) {
    if ( result.matches ) this.client = size;
  }

  constructor(
    private alarmhistoryApi: AlarmhistoryApi,
    private breakpointObserver: BreakpointObserver,
    private scroll: ScrollDispatcher
  ) {
    LoopBackConfig.setBaseURL( `http://${environment.lbApp.ip}` );
    LoopBackConfig.setApiVersion( environment.lbApp.api );

    // responsive breakpoints integration
    breakpointObserver.observe( Breakpoints.Handset ).subscribe( result => this.setClient( clientsize.handset, result ) );
    breakpointObserver.observe( Breakpoints.Tablet ).subscribe( result => this.setClient( clientsize.tablet, result ) );
    breakpointObserver.observe( Breakpoints.Web ).subscribe( result => this.setClient( clientsize.web, result ) );

    // scroll reactions
    scroll.scrolled( 1000 ).subscribe( result => this.scrollManager( result ) );
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
    ngOnInit() {
      this.resetScroll();
      this.getStationList();
    }
    ngOnDestroy() {
      this.stopInterval();
    }

}
