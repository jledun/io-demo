import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-horizontal-bar-indicator',
  templateUrl: './horizontal-bar-indicator.component.html',
  styleUrls: ['./horizontal-bar-indicator.component.scss']
})
export class HorizontalBarIndicatorComponent implements OnInit, OnChanges {
  @Input() name: string = '';
  @Input() unit: string = '';
  @Input() value: number = 0;
  @Input() maxValue: number = 0;
  scaledValue: number = 0;

  constructor() { }

  ngOnInit() {
    this.scaledValue = Math.round((this.value * 100) / this.maxValue);
  }
  ngOnChanges(s: SimpleChanges) {
    if (s.hasOwnProperty('value') && !s.value.firstChange) {
      this.scaledValue = Math.round((s.value.currentValue * 100) / this.maxValue);
    }
  }

}
