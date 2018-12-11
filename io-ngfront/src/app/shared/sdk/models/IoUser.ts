/* tslint:disable */

declare var Object: any;
export interface IoUserInterface {
  "realName"?: string;
  "active"?: boolean;
  "uuid"?: string;
  "lastConnection"?: Date;
  "realm"?: string;
  "username"?: string;
  "email": string;
  "emailVerified"?: boolean;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "password"?: string;
  accessTokens?: any[];
}

export class IoUser implements IoUserInterface {
  "realName": string;
  "active": boolean;
  "uuid": string;
  "lastConnection": Date;
  "realm": string;
  "username": string;
  "email": string;
  "emailVerified": boolean;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  "password": string;
  accessTokens: any[];
  constructor(data?: IoUserInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `IoUser`.
   */
  public static getModelName() {
    return "IoUser";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of IoUser for dynamic purposes.
  **/
  public static factory(data: IoUserInterface): IoUser{
    return new IoUser(data);
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
      name: 'IoUser',
      plural: 'IoUsers',
      path: 'IoUsers',
      idName: 'id',
      properties: {
        "realName": {
          name: 'realName',
          type: 'string',
          default: ''
        },
        "active": {
          name: 'active',
          type: 'boolean',
          default: true
        },
        "uuid": {
          name: 'uuid',
          type: 'string',
          default: ''
        },
        "lastConnection": {
          name: 'lastConnection',
          type: 'Date',
          default: new Date(0)
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
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
        "password": {
          name: 'password',
          type: 'string'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
      }
    }
  }
}
