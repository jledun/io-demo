/* tslint:disable */
import {
  UomCateg,
  Comment
} from '../index';

declare var Object: any;
export interface UomInterface {
  "uomType": string;
  "name": string;
  "rounding"?: number;
  "factor"?: number;
  "offset"?: number;
  "active"?: boolean;
  "id"?: number;
  "createdAt": Date;
  "updatedAt": Date;
  "updatedBy"?: number;
  "uomCategsId"?: number;
  "comment"?: any;
  uomCategs?: UomCateg;
  comments?: Comment[];
}

export class Uom implements UomInterface {
  "uomType": string;
  "name": string;
  "rounding": number;
  "factor": number;
  "offset": number;
  "active": boolean;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  "updatedBy": number;
  "uomCategsId": number;
  "comment": any;
  uomCategs: UomCateg;
  comments: Comment[];
  constructor(data?: UomInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Uom`.
   */
  public static getModelName() {
    return "Uom";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Uom for dynamic purposes.
  **/
  public static factory(data: UomInterface): Uom{
    return new Uom(data);
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
      name: 'Uom',
      plural: 'Uoms',
      path: 'Uoms',
      idName: 'id',
      properties: {
        "uomType": {
          name: 'uomType',
          type: 'string',
          default: 'reference'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "rounding": {
          name: 'rounding',
          type: 'number',
          default: 0.01
        },
        "factor": {
          name: 'factor',
          type: 'number',
          default: 1
        },
        "offset": {
          name: 'offset',
          type: 'number',
          default: 0
        },
        "active": {
          name: 'active',
          type: 'boolean',
          default: true
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
        "updatedBy": {
          name: 'updatedBy',
          type: 'number'
        },
        "uomCategsId": {
          name: 'uomCategsId',
          type: 'number'
        },
        "comment": {
          name: 'comment',
          type: 'any'
        },
      },
      relations: {
        uomCategs: {
          name: 'uomCategs',
          type: 'UomCateg',
          model: 'UomCateg',
          relationType: 'belongsTo',
                  keyFrom: 'uomCategsId',
          keyTo: 'id'
        },
        comments: {
          name: 'comments',
          type: 'Comment[]',
          model: 'Comment',
          relationType: 'embedsOne',
                  keyFrom: 'comment',
          keyTo: 'id'
        },
      }
    }
  }
}
