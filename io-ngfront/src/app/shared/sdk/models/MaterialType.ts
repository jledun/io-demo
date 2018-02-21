/* tslint:disable */

declare var Object: any;
export interface MaterialTypeInterface {
  "name": string;
  "description"?: string;
  "id"?: number;
}

export class MaterialType implements MaterialTypeInterface {
  "name": string;
  "description": string;
  "id": number;
  constructor(data?: MaterialTypeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `MaterialType`.
   */
  public static getModelName() {
    return "MaterialType";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of MaterialType for dynamic purposes.
  **/
  public static factory(data: MaterialTypeInterface): MaterialType{
    return new MaterialType(data);
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
      name: 'MaterialType',
      plural: 'MaterialTypes',
      path: 'MaterialTypes',
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
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
