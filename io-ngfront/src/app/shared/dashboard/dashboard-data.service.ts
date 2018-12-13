import { Injectable } from '@angular/core';
import { LoopBackConfig, LoopBackAuth, LoopBackFilter } from '../sdk';
import { 
  RuntimeDataApi
} from '../sdk/services';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class DashboardDataService {

  constructor(
    public rtService: RuntimeDataApi
   ) {
    LoopBackConfig.setBaseURL(environment.lbApp.ip);
    LoopBackConfig.setApiVersion(environment.lbApp.api);
  }
}
