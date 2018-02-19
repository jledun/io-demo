/* tslint:disable */

declare var Object: any;
export interface RuntimeDataInterface {
  "id"?: number;
}

export class RuntimeData implements RuntimeDataInterface {
  "id": number;
  constructor(data?: RuntimeDataInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RuntimeData`.
   */
  public static getModelName() {
    return "RuntimeData";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RuntimeData for dynamic purposes.
  **/
  public static factory(data: RuntimeDataInterface): RuntimeData{
    return new RuntimeData(data);
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
      name: 'RuntimeData',
      plural: 'RuntimeData',
      path: 'RuntimeData',
      idName: 'id',
      properties: {
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
