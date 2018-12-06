import { Component, OnInit, OnDestroy } from '@angular/core';
import { IoRunTimeDatasService } from './shared/lib';
import { LoopBackConfig, LoopBackAuth } from './shared/sdk';
import { User } from './shared/sdk/models/User';
import { UserApi } from './shared/sdk/services/custom/User';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  datetime: string = `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`;
  datetime_interval;
  loading: boolean = false;
  timerLoading;

  runTimerLoading() {
    this.timerLoading = setInterval(() => {
      this.loading = IoRunTimeDatasService.getDataLoading();
    }, 1000);
  }
  resetTimerLoading() {
    if (this.timerLoading) clearInterval(this.timerLoading);
  }

  constructor(
    private datasService: IoRunTimeDatasService,
    private userApi: UserApi
  ) {
    LoopBackConfig.setBaseURL( environment.lbApp.ip );
    LoopBackConfig.setApiVersion( environment.lbApp.api );
  }

  ngOnInit() { 
    this.runTimerLoading();
  }
  ngOnDestroy() {
    this.resetTimerLoading();
  }

}
