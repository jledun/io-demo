/* tslint:disable */

declare var Object: any;
export interface LogProcessInterface {
  "timestamp"?: Date;
  "flour": number;
  "eggs": number;
  "sugar": number;
  "butter": number;
  "id"?: number;
}

export class LogProcess implements LogProcessInterface {
  "timestamp": Date;
  "flour": number;
  "eggs": number;
  "sugar": number;
  "butter": number;
  "id": number;
  constructor(data?: LogProcessInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `LogProcess`.
   */
  public static getModelName() {
    return "LogProcess";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of LogProcess for dynamic purposes.
  **/
  public static factory(data: LogProcessInterface): LogProcess{
    return new LogProcess(data);
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
      name: 'LogProcess',
      plural: 'LogProcesses',
      path: 'LogProcesses',
      idName: 'id',
      properties: {
        "timestamp": {
          name: 'timestamp',
          type: 'Date'
        },
        "flour": {
          name: 'flour',
          type: 'number'
        },
        "eggs": {
          name: 'eggs',
          type: 'number'
        },
        "sugar": {
          name: 'sugar',
          type: 'number'
        },
        "butter": {
          name: 'butter',
          type: 'number'
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
