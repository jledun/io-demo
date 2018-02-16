import { Injectable } from '@angular/core';

@Injectable()
export class IoRunTimeDatasService {
  static dataLoading: boolean = true;

  constructor() {
    // console.log('hey ! New data service implemented !');
  }

  static getUserDateTime() {
    return `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`;
  }
  
  static getUserDate( param: Date ) {
    return `${new Date(param).toLocaleDateString()}`;
  }

  static getDataLoading() {
    return this.dataLoading;
  }
  static setDataLoading( value ) {
    return this.dataLoading = value;
  }

}
