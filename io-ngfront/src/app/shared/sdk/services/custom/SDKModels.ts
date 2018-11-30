/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Uom } from '../../models/Uom';
import { UomCateg } from '../../models/UomCateg';
import { Comment } from '../../models/Comment';
import { Event } from '../../models/Event';
import { Topic } from '../../models/Topic';
import { EventType } from '../../models/EventType';
import { Alarmhistory } from '../../models/Alarmhistory';
import { Eventhistory } from '../../models/Eventhistory';
import { LogRefroidisseur } from '../../models/LogRefroidisseur';
import { Recipe } from '../../models/Recipe';
import { RecipeComponents } from '../../models/RecipeComponents';
import { MaterialType } from '../../models/MaterialType';
import { Material } from '../../models/Material';
import { IoUser } from '../../models/IoUser';
import { RuntimeData } from '../../models/RuntimeData';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    Uom: Uom,
    UomCateg: UomCateg,
    Comment: Comment,
    Event: Event,
    Topic: Topic,
    EventType: EventType,
    Alarmhistory: Alarmhistory,
    Eventhistory: Eventhistory,
    LogRefroidisseur: LogRefroidisseur,
    Recipe: Recipe,
    RecipeComponents: RecipeComponents,
    MaterialType: MaterialType,
    Material: Material,
    IoUser: IoUser,
    RuntimeData: RuntimeData,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
