import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationParamTemplate } from './application-param-template';

@Component({
  selector: 'app-application-param',
  templateUrl: './application-param.component.html',
  styleUrls: ['./application-param.component.scss']
})
export class ApplicationParamComponent {
  @Input() param: ApplicationParamTemplate = {
    field: '',
    title: '',
    editable: false,
    link: false,
    icon: '',
    subtitle: '',
    type: 'string',
    name: '',
    value: ''
  };
  @Output() change: EventEmitter<any> = new EventEmitter();
  booleanValueChange(value) {
    this.change.emit(Object.assign({}, this.param, {value: value.checked}));
  }
  selectValueChange(event) {
    this.change.emit(event.value);
  }
  @Output() editValue: EventEmitter<any> = new EventEmitter();
  valueClick(value) {
    this.editValue.emit(value);
  }

  constructor() { }

}
