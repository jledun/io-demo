/* tslint:disable */

declare var Object: any;
export interface RecipeComponentsInterface {
  "matnr": string;
  "quantity": number;
  "unit": string;
  "id"?: number;
  "recipeId"?: number;
}

export class RecipeComponents implements RecipeComponentsInterface {
  "matnr": string;
  "quantity": number;
  "unit": string;
  "id": number;
  "recipeId": number;
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
        "matnr": {
          name: 'matnr',
          type: 'string'
        },
        "quantity": {
          name: 'quantity',
          type: 'number'
        },
        "unit": {
          name: 'unit',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "recipeId": {
          name: 'recipeId',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
