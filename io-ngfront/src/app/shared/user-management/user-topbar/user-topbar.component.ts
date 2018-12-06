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
    this._crtUser = Object.assign({}, value);
  }
  resetCrtUser = (): void => {
    this.crtUser = new IoUser({
      email: "",
      realm: "",
      username: "",
      active: false
    });
  }
  refreshCurrentUser() {
    this.lbdata.getCrtUser().subscribe(
      crtUser => this.crtUser = crtUser,
      err => {
        this.resetCrtUser();
        if (err.statusCode !== 401) console.log(err)
      }, () => console.log(this.crtUser)
    );
  }

  logout() {
    this.lbdata.userLogOut().subscribe(
      data => {
        console.log(data);
        this.refreshCurrentUser();
      },
      err => {
        console.log(err);
        this.refreshCurrentUser();
      },
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
      console.log('The dialog was closed');
      console.log(result);
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
