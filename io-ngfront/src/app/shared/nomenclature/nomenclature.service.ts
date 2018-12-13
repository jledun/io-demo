import { Injectable } from '@angular/core';
import { LoopBackConfig, LoopBackAuth, LoopBackFilter } from '../sdk';
import {
  RecipeApi,
  RecipeComponentsApi
} from '../sdk/services';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class NomenclatureService {

  constructor(
    public recipeApi: RecipeApi,
    private recipeComponentApi: RecipeComponentsApi
   ) {
    LoopBackConfig.setBaseURL(environment.lbApp.ip);
    LoopBackConfig.setApiVersion(environment.lbApp.api);
  }

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
  
}
