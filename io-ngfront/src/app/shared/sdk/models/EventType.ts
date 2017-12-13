/* tslint:disable */
import {
  Comment,
  Event
} from '../index';

declare var Object: any;
export interface EventTypeInterface {
  "name": string;
  "id"?: number;
  "comment"?: any;
  "createdAt": Date;
  "updatedAt": Date;
  "updatedBy"?: number;
  comments?: Comment[];
  events?: Event[];
}

export class EventType implements EventTypeInterface {
  "name": string;
  "id": number;
  "comment": any;
  "createdAt": Date;
  "updatedAt": Date;
  "updatedBy": number;
  comments: Comment[];
  events: Event[];
  constructor(data?: EventTypeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `EventType`.
   */
  public static getModelName() {
    return "EventType";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of EventType for dynamic purposes.
  **/
  public static factory(data: EventTypeInterface): EventType{
    return new EventType(data);
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
      name: 'EventType',
      plural: 'EventTypes',
      path: 'EventTypes',
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
        events: {
          name: 'events',
          type: 'Event[]',
          model: 'Event',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'eventTypeId'
        },
      }
    }
  }
}
