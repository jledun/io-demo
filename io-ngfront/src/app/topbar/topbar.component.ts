import { Component, OnInit, OnDestroy } from '@angular/core';
import { IoRunTimeDatasService } from '../shared/io-nglib';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit, OnDestroy {
  actualdatetime: string = `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
  actualdatetime_interval;

  test() {
    //alert('test');
  }
  refreshDateTime() {
    this.actualdatetime = IoRunTimeDatasService.getUserDateTime();
  }

  constructor() { }

  ngOnInit() {
    this.actualdatetime_interval = setInterval( () => {
      this.refreshDateTime();
    }, 1000 );
  }
  ngOnDestroy() {
    clearInterval( this.actualdatetime_interval );
  }

}
