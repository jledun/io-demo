/* tslint:disable */
import {
  Comment
} from '../index';

declare var Object: any;
export interface TopicInterface {
  "name": string;
  "tag"?: string;
  "active"?: boolean;
  "id"?: number;
  "comment"?: any;
  "parentId"?: number;
  "createdAt": Date;
  "updatedAt": Date;
  "updatedBy"?: number;
  comments?: Comment[];
  parent?: Topic;
}

export class Topic implements TopicInterface {
  "name": string;
  "tag": string;
  "active": boolean;
  "id": number;
  "comment": any;
  "parentId": number;
  "createdAt": Date;
  "updatedAt": Date;
  "updatedBy": number;
  comments: Comment[];
  parent: Topic;
  constructor(data?: TopicInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Topic`.
   */
  public static getModelName() {
    return "Topic";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Topic for dynamic purposes.
  **/
  public static factory(data: TopicInterface): Topic{
    return new Topic(data);
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
      name: 'Topic',
      plural: 'Topics',
      path: 'Topics',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "tag": {
          name: 'tag',
          type: 'string'
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
        "comment": {
          name: 'comment',
          type: 'any'
        },
        "parentId": {
          name: 'parentId',
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
        parent: {
          name: 'parent',
          type: 'Topic',
          model: 'Topic',
          relationType: 'belongsTo',
                  keyFrom: 'parentId',
          keyTo: 'id'
        },
      }
    }
  }
}
