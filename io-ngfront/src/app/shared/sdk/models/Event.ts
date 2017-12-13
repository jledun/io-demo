/* tslint:disable */
import {
  Comment,
  Topic,
  EventType
} from '../index';

declare var Object: any;
export interface EventInterface {
  "content": string;
  "timestamp": Date;
  "active"?: boolean;
  "id"?: number;
  "comment"?: any;
  "createdAt": Date;
  "updatedAt": Date;
  "updatedBy"?: number;
  "topicId"?: number;
  "eventTypeId"?: number;
  "eventTypesId"?: number;
  comments?: Comment[];
  topic?: Topic;
  eventTypes?: EventType;
}

export class Event implements EventInterface {
  "content": string;
  "timestamp": Date;
  "active": boolean;
  "id": number;
  "comment": any;
  "createdAt": Date;
  "updatedAt": Date;
  "updatedBy": number;
  "topicId": number;
  "eventTypeId": number;
  "eventTypesId": number;
  comments: Comment[];
  topic: Topic;
  eventTypes: EventType;
  constructor(data?: EventInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Event`.
   */
  public static getModelName() {
    return "Event";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Event for dynamic purposes.
  **/
  public static factory(data: EventInterface): Event{
    return new Event(data);
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
      name: 'Event',
      plural: 'Events',
      path: 'Events',
      idName: 'id',
      properties: {
        "content": {
          name: 'content',
          type: 'string'
        },
        "timestamp": {
          name: 'timestamp',
          type: 'Date'
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
        "topicId": {
          name: 'topicId',
          type: 'number'
        },
        "eventTypeId": {
          name: 'eventTypeId',
          type: 'number'
        },
        "eventTypesId": {
          name: 'eventTypesId',
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
        topic: {
          name: 'topic',
          type: 'Topic',
          model: 'Topic',
          relationType: 'belongsTo',
                  keyFrom: 'topicId',
          keyTo: 'id'
        },
        eventTypes: {
          name: 'eventTypes',
          type: 'EventType',
          model: 'EventType',
          relationType: 'belongsTo',
                  keyFrom: 'eventTypesId',
          keyTo: 'id'
        },
      }
    }
  }
}
