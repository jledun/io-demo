import { Injectable } from '@angular/core';
import { LoopBackConfig, LoopBackAuth, LoopBackFilter } from '../../shared/sdk';
import {
  MaterialInterface,
  MaterialTypeInterface
} from '../../shared/sdk/models';
import { 
  MaterialApi,
  MaterialTypeApi,
  RecipeApi,
  RecipeComponentsApi
} from '../../shared/sdk/services';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(
    public materialApi: MaterialApi,
    private materialTypeApi: MaterialTypeApi
   ) {
    LoopBackConfig.setBaseURL(environment.lbApp.ip);
    LoopBackConfig.setApiVersion(environment.lbApp.api);
  }

  /* 
   * MATERIAL & MATERIAL TYPE API API
   * */
  getMaterial(filter): Observable<MaterialInterface[]> {
    return this.materialApi.find(filter);
  }
  getMaterialType(filter): Observable<MaterialTypeInterface[]> {
    return this.materialTypeApi.find(filter);
  }
  /* 
   * MATERIAL & MATERIAL TYPE API API
   * */
   
}
