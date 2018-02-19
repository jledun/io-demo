import { EventEmitter } from '@angular/core';
import { LoopBackFilter } from '../../sdk/';
import { IoRunTimeDatasService } from '../services/io-run-time-datas.service';

export class DataRefresher {
  private _sequence: number = 0;
  private _tSequence: number = 50;
  private _tUpdate: number = 5000;
  private _tRetry: number = 10000;
  private _crtExec: number = 0;
  private _iSequence: any;

  private _initialized: boolean = false;
  private _autorisation: boolean = true;
  private _running: boolean = false;
  private _fault: boolean = true;
  private _pending: boolean = false;

  private _dataService: any = {};
  private _filter: LoopBackFilter = {};

  private _data: any = {};
  public data: EventEmitter<any> = new EventEmitter();

  private _getData( retrying: boolean = false) {
    if (this.pending && !retrying) return;
    this.pending = true;
    this._dataService.find(this._filter).subscribe(
      (data) => {
        this.newData = data;
        this._sequence = 10;
      },
      (err) => {
        this._sequence = 20;
      },
      () => {
        this.pending = false;
      }
    );
  }

  private _mainSequence = () => {
    if (!this._initialized) return;
    switch(this._sequence) {
      case 0:
      // waiting autorisation to run
      if (this._autorisation) this._sequence = 10;
      break;

      case 10:
      // normal mode : refresh datas
      if (!this._autorisation) { this._sequence = 999; break; }
      this._running = true;
      this._fault = false;
      if (this._crtExec <= this._tSequence) this._getData(true)
      if (this._crtExec > this._tUpdate) this._crtExec = 0;
      break;

      case 20:
      // retry mode : refresh connection
      if (!this._autorisation) { this._sequence = 999; break; }
      this._fault = true;
      this._running = false;
      if (this._crtExec <= this._tSequence) this._getData(true)
      if (this._crtExec > this._tRetry) this._crtExec = 0;
      break;

      default:
      this._sequence = 0;
      this._running = false;
      this._fault = false;
      break;
    }
  }

  constructor(
    TimeUpdate: number = 0, 
    TimeRetry: number = 10000
  ) {
    if (TimeUpdate) this._tUpdate = TimeUpdate;
    if (TimeRetry) this._tRetry = TimeRetry;
    this._iSequence = setInterval(() => {
      this._mainSequence.call(this);
      this._crtExec += this._tSequence;
    }, this._tSequence);
    this.newData = {};
  }

  set newData(value: any) {
    this._data = value;
    this.data.emit(value);
  }
  set pending(value: boolean) { this._pending = value; IoRunTimeDatasService.setDataLoading(value); }
  get pending(): boolean { return this._pending; }
  set dataService(value: any) { this._dataService = value; this._initialized = this._dataService !== {}; }
  get dataService(): any { return this._dataService; }
  set filter(value: LoopBackFilter) { this._filter = value; }
  get filter(): LoopBackFilter { return this._filter; }
  set updateTime(value: number) { this._tUpdate = value; }
  get updateTime(): number { return this._tUpdate; }
  set retryTime(value: number) { this._tRetry = value; }
  get retryTime(): number { return this._tRetry; }
  get status(): any { return {
    running: this._running,
    pending: this._pending,
    fault: this._fault,
    mode: this._sequence,
    status: ''
  }}

  public run() {
    this._autorisation = true;
  }
  public suspend() {
    this._autorisation = false;
  }
  public destroy() {
    if (this._iSequence) clearInterval(this._iSequence);
  }

}
