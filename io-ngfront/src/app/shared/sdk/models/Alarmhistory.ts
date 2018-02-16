/* tslint:disable */

declare var Object: any;
export interface AlarmhistoryInterface {
  "alStartTime"?: Date;
  "alStartTimeMs"?: number;
  "alTag"?: string;
  "alMessage"?: string;
  "alAck"?: number;
  "alActive"?: number;
  "alTagValue"?: number;
  "alPrevTagValue"?: number;
  "alGroup"?: number;
  "alPriority"?: number;
  "alSelection"?: string;
  "alType"?: number;
  "alAckReq"?: number;
  "alNormTime"?: Date;
  "alNormTimeMs"?: number;
  "alAckTime"?: Date;
  "alAckTimeMs"?: number;
  "alUser"?: string;
  "alUserComment"?: string;
  "alUserFull"?: string;
  "alStation"?: string;
  "alDeleted"?: number;
  "alEventTime"?: Date;
  "alEventTimeMs"?: number;
  "lastUpdate"?: Date;
  "lastUpdateMs"?: number;
}

export class Alarmhistory implements AlarmhistoryInterface {
  "alStartTime": Date;
  "alStartTimeMs": number;
  "alTag": string;
  "alMessage": string;
  "alAck": number;
  "alActive": number;
  "alTagValue": number;
  "alPrevTagValue": number;
  "alGroup": number;
  "alPriority": number;
  "alSelection": string;
  "alType": number;
  "alAckReq": number;
  "alNormTime": Date;
  "alNormTimeMs": number;
  "alAckTime": Date;
  "alAckTimeMs": number;
  "alUser": string;
  "alUserComment": string;
  "alUserFull": string;
  "alStation": string;
  "alDeleted": number;
  "alEventTime": Date;
  "alEventTimeMs": number;
  "lastUpdate": Date;
  "lastUpdateMs": number;
  constructor(data?: AlarmhistoryInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Alarmhistory`.
   */
  public static getModelName() {
    return "Alarmhistory";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Alarmhistory for dynamic purposes.
  **/
  public static factory(data: AlarmhistoryInterface): Alarmhistory{
    return new Alarmhistory(data);
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
      name: 'Alarmhistory',
      plural: 'Alarmhistories',
      path: 'Alarmhistories',
      idName: 'alStartTime',
      properties: {
        "alStartTime": {
          name: 'alStartTime',
          type: 'Date'
        },
        "alStartTimeMs": {
          name: 'alStartTimeMs',
          type: 'number'
        },
        "alTag": {
          name: 'alTag',
          type: 'string'
        },
        "alMessage": {
          name: 'alMessage',
          type: 'string'
        },
        "alAck": {
          name: 'alAck',
          type: 'number'
        },
        "alActive": {
          name: 'alActive',
          type: 'number'
        },
        "alTagValue": {
          name: 'alTagValue',
          type: 'number'
        },
        "alPrevTagValue": {
          name: 'alPrevTagValue',
          type: 'number'
        },
        "alGroup": {
          name: 'alGroup',
          type: 'number'
        },
        "alPriority": {
          name: 'alPriority',
          type: 'number'
        },
        "alSelection": {
          name: 'alSelection',
          type: 'string'
        },
        "alType": {
          name: 'alType',
          type: 'number'
        },
        "alAckReq": {
          name: 'alAckReq',
          type: 'number'
        },
        "alNormTime": {
          name: 'alNormTime',
          type: 'Date'
        },
        "alNormTimeMs": {
          name: 'alNormTimeMs',
          type: 'number'
        },
        "alAckTime": {
          name: 'alAckTime',
          type: 'Date'
        },
        "alAckTimeMs": {
          name: 'alAckTimeMs',
          type: 'number'
        },
        "alUser": {
          name: 'alUser',
          type: 'string'
        },
        "alUserComment": {
          name: 'alUserComment',
          type: 'string'
        },
        "alUserFull": {
          name: 'alUserFull',
          type: 'string'
        },
        "alStation": {
          name: 'alStation',
          type: 'string'
        },
        "alDeleted": {
          name: 'alDeleted',
          type: 'number'
        },
        "alEventTime": {
          name: 'alEventTime',
          type: 'Date'
        },
        "alEventTimeMs": {
          name: 'alEventTimeMs',
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
      },
      relations: {
      }
    }
  }
}
