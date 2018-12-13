import { Injectable } from '@angular/core';
import { LoopBackFilter } from '../sdk';
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
   ) { }

  /* 
   * RECIPE / NOMENCLATURE / COMPONENTS API
   * */
  getRecipeList(filter: LoopBackFilter) {
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
