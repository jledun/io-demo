import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IoRunTimeDatasService {
  static dataLoading: boolean = true;

  constructor() { }

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
    if (value) return this.dataLoading = value;
    setTimeout(() => {this.dataLoading = value;}, 250);
  }

}
