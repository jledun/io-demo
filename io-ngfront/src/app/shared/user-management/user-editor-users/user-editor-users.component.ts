import { Component, OnInit } from '@angular/core';
import { LoopBackFilter } from '../../sdk';
import { IoUser, IoUserInterface } from '../../sdk/models';
import { UserManagerService } from '../user-manager.service';
import { IoRunTimeDatasService } from '../../lib/io-run-time-datas.service';

@Component({
  selector: 'app-user-editor-users',
  templateUrl: './user-editor-users.component.html',
  styleUrls: ['./user-editor-users.component.scss']
})
export class UserEditorUsersComponent implements OnInit {
  userList: Array<IoUserInterface> = [];
  _filter: LoopBackFilter = {
    order: "username ASC"
  };
  displayedColumns: Array<string> = ['realName', 'username', 'email', 'createdAt', 'lastConnection', 'active', 'editButton'];

  constructor(
    private userManager: UserManagerService
  ) { }

  ngOnInit() {
    this.refreshDatas();
  }

  refreshDatas() {
    IoRunTimeDatasService.setDataLoading(true);
    this.userManager.getUsers(this._filter).subscribe(
      data => {
        this.userList = [].concat(data);
        IoRunTimeDatasService.setDataLoading(false);
      },
      err => {
        console.log(err);
        IoRunTimeDatasService.setDataLoading(false);
      },
      () => {}
    );
  }

}
