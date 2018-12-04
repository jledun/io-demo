import { Component, OnDestroy } from '@angular/core';
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
export class AppComponent implements OnDestroy {
  datetime: string = `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`;
  datetime_interval;
  loading: boolean = false;

  isClientloading() {
    return IoRunTimeDatasService.getDataLoading();
  }

  constructor(
    private datasService: IoRunTimeDatasService,
    private userApi: UserApi
  ) {
    LoopBackConfig.setBaseURL( environment.lbApp.ip );
    LoopBackConfig.setApiVersion( environment.lbApp.api );
  }

  ngOnDestroy() { }

}
