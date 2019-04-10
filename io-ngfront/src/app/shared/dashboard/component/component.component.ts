import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent implements OnInit {
  @Input() component: any = {};  

  constructor() { }

  ngOnInit() {
  }

  spinnerColor() {
    return "green";
  }

}
