import { Injectable } from '@angular/core';
import { LoopBackConfig, LoopBackAuth, LoopBackFilter } from './shared/sdk';
import {
  LogRefroidisseurInterface,
  MaterialInterface,
  MaterialTypeInterface
} from './shared/sdk/models';
import { 
  AlarmhistoryApi,
  EventhistoryApi,
  LogRefroidisseurApi,
  MaterialApi,
  MaterialTypeApi,
  RecipeApi,
  RecipeComponentsApi,
  RuntimeDataApi
} from './shared/sdk/services';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class LbdataService {

  constructor(
    private alarmhistoryApi: AlarmhistoryApi,
    private eventhistoryApi: EventhistoryApi,
    private logRefroidisseurApi: LogRefroidisseurApi,
    public materialApi: MaterialApi,
    private materialTypeApi: MaterialTypeApi,
    public recipeApi: RecipeApi,
    private recipeComponentApi: RecipeComponentsApi,
    public rtService: RuntimeDataApi
   ) {
    LoopBackConfig.setBaseURL( `http://${environment.lbApp.ip}` );
    LoopBackConfig.setApiVersion( environment.lbApp.api );
  }

  /* 
   * ALARM HISTORY API
   * */
  getAlarmHistory(filter) {
    return this.alarmhistoryApi.find(filter);
  }
  getStationList() {
    return this.alarmhistoryApi.stationlist();
  }
  /* 
   * ALARM HISTORY API
   * */

  /* 
   * EVENT HISTORY API
   * */
  getEventHistory(filter) {
    return this.eventhistoryApi.find(filter);
  }
  /* 
   * EVENT HISTORY API
   * */

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

  /* 
   * RECIPE / NOMENCLATURE / COMPONENTS API
   * */
  getRecipeList(filter) {
    return this.recipeApi.find(filter);
  }
  deleteRecipeById(id) {
    return this.recipeApi.deleteById(id);
  }
  upsertRecipe(recipe) {
    return this.recipeApi.upsert(recipe);
  }
  createRecipe(recipe) {
    return this.recipeApi.create(recipe)
  }
  upsertComponent(component) {
    return this.recipeComponentApi.upsert(component);
  }
  deleteComponentById(id) {
    return this.recipeComponentApi.deleteById(id)
  }
  createComponent(component) {
    return this.recipeComponentApi.create(component);
  }
  /* 
   * RECIPE / NOMENCLATURE / COMPONENTS API
   * */

  /* 
   * DATA CURVES API
   * */
  getLogData(filter) {
    return this.logRefroidisseurApi.find(filter);
  }
  /* 
  * DATA CURVES API
  * */

}
