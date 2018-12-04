import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { MaterialService } from '../material.service';
import { Material, MaterialInterface, MaterialTypeInterface } from '../../sdk/models';
import { IoRunTimeDatasService } from '../../lib';
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

  @Input() typeName: string = "";

  refreshMaterialList(): Observable<MaterialInterface[]> {
    let where = {}
    if (this.typeName) {
      where = {materialTypeId: this.materialTypeList.find((matt) => matt.name === this.typeName).id}
    }
    return this.lbdata.getMaterial({
      where: where,
      include: "materialType"
    });
  }
  refreshMaterialTypeList(): Observable<MaterialTypeInterface[]> {
    return this.lbdata.getMaterialType({});
  }
  refreshAll() {
    if (this.busy) return;
    this.loading = true;
    this.refreshMaterialTypeList().concatMap( data => {
      this.materialTypeList = <MaterialTypeInterface[]>data;
      return this.refreshMaterialList();
    }).subscribe(
      data => this.materialList = <MaterialInterface[]>data,
      err => console.log(err),
      () => this.loading = false
    )
  }

  resetSelected() {
    this.selected = new Material();
  }
  createMatnr() {
    alert('not implemented yet :-(');
    this.resetSelected();
  }

  constructor(
    private lbdata: MaterialService
  ) { }

  set loading(value) {
    this.busy = value;
    IoRunTimeDatasService.setDataLoading(value);
  }

  ngOnInit() {
    setTimeout(() => this.refreshAll(), 20);
  }
  ngOnDestroy() {}

}
