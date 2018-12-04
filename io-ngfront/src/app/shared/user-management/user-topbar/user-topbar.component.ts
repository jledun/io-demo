import { Component, OnInit } from '@angular/core';
import { LbUserManagerService } from '../lb-user-manager.service';
import { IoUser, IoUserInterface } from '../../sdk/models';

@Component({
  selector: 'app-user-topbar',
  templateUrl: './user-topbar.component.html',
  styleUrls: ['./user-topbar.component.scss']
})
export class UserTopbarComponent implements OnInit {
  private _crtUser: IoUserInterface;
  get crtUser(): IoUserInterface {
    return this._crtUser;
  }
  set crtUser(value: IoUserInterface) {
    console.log('set crtUser: ', value);
    this._crtUser = Object.assign({}, value);
  }
  resetCrtUser = (): void => {
    this.crtUser = new IoUser({
      email: "",
      realm: ""
    });
  }

  constructor(
    private lbdata: LbUserManagerService
  ) {
    this.resetCrtUser();
  }

  ngOnInit() {
    this.lbdata.getCrtUser().subscribe(
      crtUser => this.crtUser = crtUser,
      err => {
        this.resetCrtUser();
        if (err.statusCode !== 401) console.log(err)
      }, () => {}
    );
  }

}
