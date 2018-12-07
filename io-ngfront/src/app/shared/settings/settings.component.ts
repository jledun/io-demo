import { Component, OnInit } from '@angular/core';
import { IoRunTimeDatasService } from '../lib/io-run-time-datas.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    IoRunTimeDatasService.setDataLoading(false);
  }

}
