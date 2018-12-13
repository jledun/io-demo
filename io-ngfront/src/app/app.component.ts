import { Component, OnInit, OnDestroy } from '@angular/core';
import { IoRunTimeDatasService } from './shared/lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  datetime: string = `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`;
  datetime_interval;
  loading: boolean = false;
  timerLoading;

  runTimerLoading() {
    this.timerLoading = setInterval(() => {
      this.loading = IoRunTimeDatasService.getDataLoading();
    }, 1000);
  }
  resetTimerLoading() {
    if (this.timerLoading) clearInterval(this.timerLoading);
  }

  constructor(
    private datasService: IoRunTimeDatasService
  ) { }

  ngOnInit() { 
    this.runTimerLoading();
  }
  ngOnDestroy() {
    this.resetTimerLoading();
  }

}
