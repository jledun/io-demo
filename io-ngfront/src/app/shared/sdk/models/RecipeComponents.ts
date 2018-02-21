/* tslint:disable */
import {
  Material
} from '../index';

declare var Object: any;
export interface RecipeComponentsInterface {
  "quantity": number;
  "unit": string;
  "order"?: number;
  "id"?: number;
  "recipeId"?: number;
  "materialId"?: number;
  material?: Material;
}

export class RecipeComponents implements RecipeComponentsInterface {
  "quantity": number;
  "unit": string;
  "order": number;
  "id": number;
  "recipeId": number;
  "materialId": number;
  material: Material;
  constructor(data?: RecipeComponentsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RecipeComponents`.
   */
  public static getModelName() {
    return "RecipeComponents";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RecipeComponents for dynamic purposes.
  **/
  public static factory(data: RecipeComponentsInterface): RecipeComponents{
    return new RecipeComponents(data);
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
      name: 'RecipeComponents',
      plural: 'RecipeComponents',
      path: 'RecipeComponents',
      idName: 'id',
      properties: {
        "quantity": {
          name: 'quantity',
          type: 'number'
        },
        "unit": {
          name: 'unit',
          type: 'string'
        },
        "order": {
          name: 'order',
          type: 'number',
          default: 0
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "recipeId": {
          name: 'recipeId',
          type: 'number'
        },
        "materialId": {
          name: 'materialId',
          type: 'number'
        },
      },
      relations: {
        material: {
          name: 'material',
          type: 'Material',
          model: 'Material',
          relationType: 'belongsTo',
                  keyFrom: 'materialId',
          keyTo: 'id'
        },
      }
    }
  }
}
