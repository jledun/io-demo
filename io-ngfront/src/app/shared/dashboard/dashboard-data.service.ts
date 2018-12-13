import { Injectable } from '@angular/core';
import { 
  RuntimeDataApi
} from '../sdk/services';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class DashboardDataService {

  constructor(
    public rtService: RuntimeDataApi
   ) { }
}
