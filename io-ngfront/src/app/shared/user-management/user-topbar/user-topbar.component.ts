import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserManagerService } from '../user-manager.service';
import { IoUser, IoUserInterface } from '../../sdk/models';
import { UserConnectionComponent } from '../user-connection/user-connection.component';

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
    this._crtUser = new IoUser({...value});
  }
  resetCrtUser = (): void => {
    this.crtUser = new IoUser({
      email: "",
      realName: "",
      username: "",
      active: false
    });
  }
  refreshCurrentUser() {
    this.lbdata.getCrtUser().subscribe(
      crtUser => this.crtUser = crtUser,
      err => this.resetCrtUser(),
      () => {}
    );
  }

  logout() {
    this.lbdata.userLogOut().subscribe(
      data => this.refreshCurrentUser(),
      err => this.refreshCurrentUser(),
      () => {}
    );
  }

  openConnectionDialog(): void {
    const dialogRef = this.dialog.open(UserConnectionComponent, {
      minWidth: "100vw",
      minHeight: "100vh",
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.hasOwnProperty('user')) this.crtUser = result.user;
    });
  }

  constructor(
    private lbdata: UserManagerService,
    public dialog: MatDialog
  ) {
    this.resetCrtUser();
  }

  ngOnInit() {
    this.refreshCurrentUser();
  }

}

