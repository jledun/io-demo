import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import {
  Material,
  MaterialType,
  MaterialInterface,
  MaterialTypeInterface } from '../shared/sdk/models';
import {
  MaterialApi,
  MaterialTypeApi } from '../shared/sdk/services';
import { IoRunTimeDatasService } from '../shared/io-nglib/';
import { LoopBackConfig, LoopBackAuth, LoopBackFilter, RecipeComponents } from '../shared/sdk';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/concatMap';

@Component({
  selector: 'app-material-selector',
  templateUrl: './material-selector.component.html',
  styleUrls: ['./material-selector.component.scss']
})
export class MaterialSelectorComponent implements OnInit, OnDestroy {
  busy: boolean = false;
  materialList: MaterialInterface[] = [];
  materialTypeList: MaterialTypeInterface[] = [];
  _selected: MaterialInterface;

  @Input()
  get selected(): MaterialInterface { return this._selected; };
  @Output() selectedChange: EventEmitter<MaterialInterface> = new EventEmitter();
  set selected(value: MaterialInterface) {
    this._selected = value;
    this.selectedChange.emit(value);
  }

  refreshMaterialList(): Observable<MaterialInterface[]> {
    return this.materialService.find({include: "materialType"});
  }
  refreshMaterialTypeList(): Observable<MaterialTypeInterface[]> {
    return this.materialTypeService.find({});
  }
  refreshAll() {
    if (this.busy) return;
    this.loading = true;
    this.refreshMaterialList().concatMap( data => {
      this.materialList = <MaterialInterface[]>data;
      return this.refreshMaterialTypeList();
    }).subscribe(
      data => this.materialTypeList = <MaterialTypeInterface[]>data,
      err => console.log(err),
      () => this.loading = false
    )
  }

  resetSelected() {
    this.selected = new Material();
    console.log(this._selected);
  }
  createMatnr() {
    alert('not implemented yet :-(');
    this.resetSelected();
  }

  constructor(
    private materialService: MaterialApi,
    private materialTypeService: MaterialTypeApi
  ) {
    LoopBackConfig.setBaseURL( `http://${environment.lbApp.ip}` );
    LoopBackConfig.setApiVersion( environment.lbApp.api );
  }

  set loading(value) {
    this.busy = value;
    IoRunTimeDatasService.setDataLoading(value);
  }

  ngOnInit() {
    setTimeout(() => this.refreshAll(), 20);
  }
  ngOnDestroy() {}

}
