import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoopBackConfig } from './shared/sdk';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LbdataService {
  public defaultPath: string = '/';

  constructor(
    private router: Router
  ) {
    LoopBackConfig.setBaseURL(environment.lbApp.ip);
    LoopBackConfig.setApiVersion(environment.lbApp.api);
    LoopBackConfig.whereOnUrl();
  }

  goToHomePage() {
    this.router.navigate([this.defaultPath]);
  }

}
