import { Component, OnInit, OnDestroy } from '@angular/core';
import { IoRunTimeDatasService } from '../shared/lib';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit, OnDestroy {
  actualdatetime: string = `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
  actualdatetime_interval;
  loading: boolean = true;

  refreshDateTime() {
    this.actualdatetime = IoRunTimeDatasService.getUserDateTime();
    this.loading = IoRunTimeDatasService.getDataLoading();
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
