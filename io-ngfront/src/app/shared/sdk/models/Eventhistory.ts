/* tslint:disable */

declare var Object: any;
export interface EventhistoryInterface {
  "evType"?: number;
  "evTime"?: Date;
  "evTimeMs"?: number;
  "evInfo"?: string;
  "evUser"?: string;
  "evUserFull"?: string;
  "evMessage"?: string;
  "evValue"?: string;
  "evPrevValue"?: string;
  "evStation"?: string;
  "evSource"?: string;
  "evDeleted"?: number;
  "lastUpdate"?: Date;
  "lastUpdateMs"?: number;
  "bias"?: number;
  "evComment"?: string;
}

export class Eventhistory implements EventhistoryInterface {
  "evType": number;
  "evTime": Date;
  "evTimeMs": number;
  "evInfo": string;
  "evUser": string;
  "evUserFull": string;
  "evMessage": string;
  "evValue": string;
  "evPrevValue": string;
  "evStation": string;
  "evSource": string;
  "evDeleted": number;
  "lastUpdate": Date;
  "lastUpdateMs": number;
  "bias": number;
  "evComment": string;
  constructor(data?: EventhistoryInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Eventhistory`.
   */
  public static getModelName() {
    return "Eventhistory";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Eventhistory for dynamic purposes.
  **/
  public static factory(data: EventhistoryInterface): Eventhistory{
    return new Eventhistory(data);
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
      name: 'Eventhistory',
      plural: 'Eventhistories',
      path: 'Eventhistories',
      idName: 'bias',
      properties: {
        "evType": {
          name: 'evType',
          type: 'number'
        },
        "evTime": {
          name: 'evTime',
          type: 'Date'
        },
        "evTimeMs": {
          name: 'evTimeMs',
          type: 'number'
        },
        "evInfo": {
          name: 'evInfo',
          type: 'string'
        },
        "evUser": {
          name: 'evUser',
          type: 'string'
        },
        "evUserFull": {
          name: 'evUserFull',
          type: 'string'
        },
        "evMessage": {
          name: 'evMessage',
          type: 'string'
        },
        "evValue": {
          name: 'evValue',
          type: 'string'
        },
        "evPrevValue": {
          name: 'evPrevValue',
          type: 'string'
        },
        "evStation": {
          name: 'evStation',
          type: 'string'
        },
        "evSource": {
          name: 'evSource',
          type: 'string'
        },
        "evDeleted": {
          name: 'evDeleted',
          type: 'number'
        },
        "lastUpdate": {
          name: 'lastUpdate',
          type: 'Date'
        },
        "lastUpdateMs": {
          name: 'lastUpdateMs',
          type: 'number'
        },
        "bias": {
          name: 'bias',
          type: 'number'
        },
        "evComment": {
          name: 'evComment',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
