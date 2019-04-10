import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-round-indicator',
  templateUrl: './round-indicator.component.html',
  styleUrls: ['./round-indicator.component.scss']
})
export class RoundIndicatorComponent implements OnInit, OnChanges {
  @Input() name: string = '';
  @Input() unit: string = '';
  @Input() value: number = 0;
  @Input() maxValue: number = 0;

  public doughnutChartLabels: Label[] = ['', 'Réserve'];
  public doughnutChartData: SingleDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: ChartOptions = {
    rotation: 0.5 * Math.PI
  };

  private refreshData() {
    this.doughnutChartLabels = [this.name, 'Réserve'];
    this.doughnutChartData = [this.value, this.maxValue - this.value];
  }

  constructor() { }

  ngOnInit() {
    this.refreshData();
  }
  ngOnChanges(s: SimpleChanges) {
    if (s.hasOwnProperty('value') && !s.value.firstChange) {
      this.doughnutChartData = [s.value.currentValue, this.maxValue - s.value.currentValue];
    }
  }

}
