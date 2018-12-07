import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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
  credentialFormGroup: FormGroup;
  rememberMe: boolean = true;
  errorMsg: string = '';
  @ViewChild('username') usernameInput: ElementRef;
  @ViewChild('passwd') passwdInput: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private userManager: UserManagerService,
    public dialogRef: MatDialogRef<UserConnectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.credentialFormGroup = this.formBuilder.group({
      userCtrl: ['', Validators.required],
      passwdCtrl: ['', Validators.required]
    });
    setTimeout(() => {
      IoRunTimeDatasService.setDataLoading(false);
      this.usernameInput.nativeElement.focus();
    }, this.timeBeforeFocus);
  }

  rememberMeChange(event) {
    this.rememberMe = event.checked;
  }

  onSubmit() {
    // check validity
    if (!this.credentialFormGroup.valid) {
      const username = this.credentialFormGroup.get('userCtrl').valid;
      const passwd = this.credentialFormGroup.get('passwdCtrl').valid;
      if (!username && !passwd) return this.errorMsg = "Vous devez saisir tous les champs.";
      if (username && !passwd) return this.errorMsg = "Vous devez saisir le mot de passe.";
      if (!username && passwd) return this.errorMsg = "Vous devez saisir votre nom d'utilisateur ou votre email.";
    }
    this.errorMsg = "";

    IoRunTimeDatasService.setDataLoading(true);
    let username = this.credentialFormGroup.get('userCtrl').value;
    username = (username.indexOf("@") > 0) ? 
      {email: username} :
      {username: username};
    const credentials = {
      ...username,
      password: this.credentialFormGroup.get('passwdCtrl').value
    }
    this.userManager.userLogIn(credentials, this.rememberMe).subscribe(
      data => {
        IoRunTimeDatasService.setDataLoading(false);
        this.dialogRef.close(data);
      }, err => {
        this.errorMsg = "Nom d'utilisateur, email ou mot de passe incorrect.";
        this.passwdInput.nativeElement.value = null;
        this.credentialFormGroup.get('passwdCtrl').reset();
        IoRunTimeDatasService.setDataLoading(false);
      }, () => { }
    );
  }

  cancel() {
    this.dialogRef.close();
  }

}
