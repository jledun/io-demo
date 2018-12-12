import { Component, OnInit } from '@angular/core';
import { IoRunTimeDatasService } from '../lib/io-run-time-datas.service';
import { UserManagerService } from '../user-management/user-manager.service';
import { IoUser, IoUserInterface } from '../sdk/models';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  crtUser: IoUserInterface = new IoUser();

  constructor(
    private userManager: UserManagerService
  ) { }

  ngOnInit() {
    this.userManager.getCrtUser().subscribe(
      data => {
        this.crtUser = {...data};
        IoRunTimeDatasService.setDataLoading(false);
      }, err => IoRunTimeDatasService.setDataLoading(false),
      () => {}
    );
  }

}
