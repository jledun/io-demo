import { Injectable } from '@angular/core';
import { LoopBackFilter } from '../../shared/sdk';
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
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(
    public materialApi: MaterialApi,
    private materialTypeApi: MaterialTypeApi
   ) { }

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
