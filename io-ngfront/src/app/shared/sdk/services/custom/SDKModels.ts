/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Uom } from '../../models/Uom';
import { UomCateg } from '../../models/UomCateg';
import { Comment } from '../../models/Comment';
import { Event } from '../../models/Event';
import { Topic } from '../../models/Topic';
import { EventType } from '../../models/EventType';

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
