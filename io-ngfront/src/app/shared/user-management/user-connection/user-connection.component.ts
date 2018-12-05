import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserManagerService } from '../user-manager.service';
import { IoRunTimeDatasService } from '../../lib/io-run-time-datas.service';

@Component({
  selector: 'app-user-connection',
  templateUrl: './user-connection.component.html',
  styleUrls: ['./user-connection.component.scss']
})
export class UserConnectionComponent implements OnInit {
  timeBeforeFocus: number = 100;
  userFormGroup: FormGroup;
  passwdFormGroup: FormGroup;
  @ViewChild('username') usernameInput: ElementRef;
  @ViewChild('passwd') passwdInput: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private userManager: UserManagerService
  ) { }

  ngOnInit() {
    this.userFormGroup = this.formBuilder.group({
      userCtrl: ['', Validators.required]
    });
    this.passwdFormGroup = this.formBuilder.group({
      passwdCtrl: ['', Validators.required]
    });
    setTimeout(() => {
      IoRunTimeDatasService.setDataLoading(false);
      this.usernameInput.nativeElement.focus();
    }, this.timeBeforeFocus);
  }

  stepperSelectionChange(event) {
    switch(event.selectedIndex) {
      case 0:
        setTimeout(() => {
          this.usernameInput.nativeElement.focus();
        }, this.timeBeforeFocus);
        break;
      case 1:
        setTimeout(() => {
          this.passwdInput.nativeElement.focus();
        }, this.timeBeforeFocus);
        break;
      case 2:
        IoRunTimeDatasService.setDataLoading(true);
        // check validity
        let username = this.userFormGroup.get('userCtrl').value;
        username = (username.indexOf("@") > 0) ? 
          {email: username} :
          {username: username};
        const credentials = {
          ...username,
          password: this.passwdFormGroup.get('passwdCtrl').value
        }
        this.userManager.userLogIn(credentials).subscribe(
          data => console.log('success', data),
          err => {
            console.log('error', err);
            IoRunTimeDatasService.setDataLoading(false);
          },
          () => IoRunTimeDatasService.setDataLoading(false)
        );
        break;
    }
  }

}
