import { Component, OnInit, OnDestroy } from '@angular/core';
import { IoRunTimeDatasService } from '../shared/io-nglib';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

enum clientsize {
  handset = 'handset',
  tablet = 'tablet',
  web = 'web'
}

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit, OnDestroy {
  actualdatetime: string = `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
  actualdatetime_interval;
  client: clientsize = clientsize.web;

  setClient( size: clientsize, result ) {
    if ( result.matches ) this.client = size;
  }

  refreshDateTime() {
    this.actualdatetime = IoRunTimeDatasService.getUserDateTime();
  }

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {  
    // responsive breakpoints integration
    breakpointObserver.observe( Breakpoints.Handset ).subscribe( result => this.setClient( clientsize.handset, result ) );
    breakpointObserver.observe( Breakpoints.Tablet ).subscribe( result => this.setClient( clientsize.tablet, result ) );
    breakpointObserver.observe( Breakpoints.Web ).subscribe( result => this.setClient( clientsize.web, result ) );
  }

  ngOnInit() {
    this.actualdatetime_interval = setInterval( () => {
      this.refreshDateTime();
    }, 1000 );
  }
  ngOnDestroy() {
    clearInterval( this.actualdatetime_interval );
  }

}
