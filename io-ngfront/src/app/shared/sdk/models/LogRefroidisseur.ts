/* tslint:disable */

declare var Object: any;
export interface LogRefroidisseurInterface {
  "changementTremie"?: boolean;
  "froidOn"?: boolean;
  "id"?: number;
  "maisOn"?: boolean;
  "manqueMais"?: boolean;
  "noMvt"?: boolean;
  "reference"?: string;
  "refroidisseurVide"?: boolean;
  "t1"?: number;
  "t2"?: number;
  "t3"?: number;
  "timestamp"?: Date;
  "vidangeOn"?: boolean;
  "attenteCompresseur"?: boolean;
}

export class LogRefroidisseur implements LogRefroidisseurInterface {
  "changementTremie": boolean;
  "froidOn": boolean;
  "id": number;
  "maisOn": boolean;
  "manqueMais": boolean;
  "noMvt": boolean;
  "reference": string;
  "refroidisseurVide": boolean;
  "t1": number;
  "t2": number;
  "t3": number;
  "timestamp": Date;
  "vidangeOn": boolean;
  "attenteCompresseur": boolean;
  constructor(data?: LogRefroidisseurInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `LogRefroidisseur`.
   */
  public static getModelName() {
    return "LogRefroidisseur";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of LogRefroidisseur for dynamic purposes.
  **/
  public static factory(data: LogRefroidisseurInterface): LogRefroidisseur{
    return new LogRefroidisseur(data);
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
      name: 'LogRefroidisseur',
      plural: 'LogRefroidisseurs',
      path: 'LogRefroidisseurs',
      idName: 'id',
      properties: {
        "changementTremie": {
          name: 'changementTremie',
          type: 'boolean'
        },
        "froidOn": {
          name: 'froidOn',
          type: 'boolean'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "maisOn": {
          name: 'maisOn',
          type: 'boolean'
        },
        "manqueMais": {
          name: 'manqueMais',
          type: 'boolean'
        },
        "noMvt": {
          name: 'noMvt',
          type: 'boolean'
        },
        "reference": {
          name: 'reference',
          type: 'string'
        },
        "refroidisseurVide": {
          name: 'refroidisseurVide',
          type: 'boolean'
        },
        "t1": {
          name: 't1',
          type: 'number'
        },
        "t2": {
          name: 't2',
          type: 'number'
        },
        "t3": {
          name: 't3',
          type: 'number'
        },
        "timestamp": {
          name: 'timestamp',
          type: 'Date'
        },
        "vidangeOn": {
          name: 'vidangeOn',
          type: 'boolean'
        },
        "attenteCompresseur": {
          name: 'attenteCompresseur',
          type: 'boolean'
        },
      },
      relations: {
      }
    }
  }
}
