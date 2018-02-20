/* tslint:disable */
import {
  RecipeComponents
} from '../index';

declare var Object: any;
export interface RecipeInterface {
  "name": string;
  "description"?: string;
  "matnr": string;
  "id"?: number;
  recipeComponents?: RecipeComponents[];
}

export class Recipe implements RecipeInterface {
  "name": string;
  "description": string;
  "matnr": string;
  "id": number;
  recipeComponents: RecipeComponents[];
  constructor(data?: RecipeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Recipe`.
   */
  public static getModelName() {
    return "Recipe";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Recipe for dynamic purposes.
  **/
  public static factory(data: RecipeInterface): Recipe{
    return new Recipe(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Recipe',
      plural: 'Recipes',
      path: 'Recipes',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "matnr": {
          name: 'matnr',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
        recipeComponents: {
          name: 'recipeComponents',
          type: 'RecipeComponents[]',
          model: 'RecipeComponents',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'recipeId'
        },
      }
    }
  }
}
