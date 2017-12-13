/* tslint:disable */
import {
  Comment
} from '../index';

declare var Object: any;
export interface UomCategInterface {
  "name": string;
  "id"?: number;
  "createdAt": Date;
  "updatedAt": Date;
  "comment"?: any;
  comments?: Comment[];
}

export class UomCateg implements UomCategInterface {
  "name": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  "comment": any;
  comments: Comment[];
  constructor(data?: UomCategInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `UomCateg`.
   */
  public static getModelName() {
    return "UomCateg";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of UomCateg for dynamic purposes.
  **/
  public static factory(data: UomCategInterface): UomCateg{
    return new UomCateg(data);
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
      name: 'UomCateg',
      plural: 'UomCategs',
      path: 'UomCategs',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
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
        "comment": {
          name: 'comment',
          type: 'any'
        },
      },
      relations: {
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
