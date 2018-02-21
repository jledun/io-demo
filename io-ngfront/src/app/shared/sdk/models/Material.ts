/* tslint:disable */
import {
  MaterialType
} from '../index';

declare var Object: any;
export interface MaterialInterface {
  "name": string;
  "matnr"?: string;
  "description"?: string;
  "id"?: number;
  "materialTypeId"?: number;
  materialType?: MaterialType;
}

export class Material implements MaterialInterface {
  "name": string;
  "matnr": string;
  "description": string;
  "id": number;
  "materialTypeId": number;
  materialType: MaterialType;
  constructor(data?: MaterialInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Material`.
   */
  public static getModelName() {
    return "Material";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Material for dynamic purposes.
  **/
  public static factory(data: MaterialInterface): Material{
    return new Material(data);
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
      name: 'Material',
      plural: 'Materials',
      path: 'Materials',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "matnr": {
          name: 'matnr',
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
        "materialTypeId": {
          name: 'materialTypeId',
          type: 'number'
        },
      },
      relations: {
        materialType: {
          name: 'materialType',
          type: 'MaterialType',
          model: 'MaterialType',
          relationType: 'belongsTo',
                  keyFrom: 'materialTypeId',
          keyTo: 'id'
        },
      }
    }
  }
}
