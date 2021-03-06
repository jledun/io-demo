import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { IoRunTimeDatasService } from '../../lib/io-run-time-datas.service';
import { LoopBackFilter } from '../../sdk';
import { EventhistoryInterface } from '../../sdk/models';
import { HistoryService } from '../history.service';

enum clientsize {
  handset = 'handset',
  tablet = 'tablet',
  web = 'web'
}
class ProcessFilterDef {
  name: string;
  filter: any;
}
class userFilter {
  datedebut?: Date;
  datefin?: Date;
  process?: ProcessFilterDef;
}

@Component({
  selector: 'app-eventhistory',
  templateUrl: './eventhistory.component.html',
  styleUrls: ['./eventhistory.component.scss']
})
export class EventhistoryComponent implements OnInit, OnDestroy {
  maxLength: number = 50;
  refresh_interval; 
  interval_status: number = 0;
  toutFilterScroll;
  filter: LoopBackFilter = {
    where: {},
    limit: this.maxLength,
    skip: 0,
    order: ['evTime DESC', 'evTimeMs DESC']
  };
  events: EventhistoryInterface[] = [];
  displayedColumns = [
    'evTime',
    'evStation',
    'evUserFull',
    'evMessage'
  ];
  client: clientsize = clientsize.web;
  load: boolean = false;
  ProcessList: Array<ProcessFilterDef> = [
    {name: 'CP', filter: { evMessage: { like: 'CP%' } } },
    {name: 'CT1', filter: { evMessage: { like: 'CT1%' } } },
    {name: 'CT2', filter: { evMessage: { like: 'CT2%' } } },
    {name: 'CT3', filter: { evMessage: { like: 'CT3%' } } },
    {name: 'CT4', filter: { evMessage: { like: 'CT4%' } } },
  ];
  tmpFilter: userFilter = {
    datedebut: null,
    datefin: null,
    process: null
  }

  getData() {
    IoRunTimeDatasService.setDataLoading( true );
    this.load = true;
    this.filter.where = this.parseFilter( this.tmpFilter );

    // console.log( this.filter.skip );
    this.lbdata.getEventHistory( this.filter ).subscribe(
      ( data ) => {
        if ( this.filter.skip <= 0 ) {
          this.events = data;
        }else{
          this.events = this.events.concat( data );
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

  getUserTimestamp( data ) {
    return `${new Date( data ).toLocaleDateString()} - ${new Date( data ).toLocaleTimeString() }`; 
  }

  // filter management
  resetFilter() {
    this.tmpFilter = {
      datedebut: null,
      datefin: null,
      process: null
    }
    this.getData();
  }
  parseFilter( tmp: userFilter ) {
    let whereConditions = []
    if ( tmp.datedebut ) whereConditions.push( { evTime: { 'gte': tmp.datedebut } } );
    if ( tmp.datefin ) whereConditions.push( { evTime: { 'lte': tmp.datefin } } );
    if ( tmp.process ) whereConditions.push( tmp.process );
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
    private lbdata: HistoryService,
    private breakpointObserver: BreakpointObserver,
    private scroll: ScrollDispatcher
  ) {
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
    this.getData();
    // this.startInterval();
  }
  ngOnDestroy() {
    this.stopInterval();
  }

}
