import { Component } from '@angular/core';
import { IoRunTimeDatasService } from '../../../io-nglib/src/app';
import { LoopBackConfig, LoopBackAuth } from './shared/sdk';
import { User } from './shared/sdk/models/User';
import { UserApi } from './shared/sdk/services/custom/User';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    datasService: IoRunTimeDatasService,
    userApi: UserApi
  ) {
    LoopBackConfig.setBaseURL( environment.lbApp.ip );
    LoopBackConfig.setApiVersion( environment.lbApp.api );
    console.log( environment );
  }

}
