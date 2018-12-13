import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-change-password-popup',
  templateUrl: './user-change-password-popup.component.html',
  styleUrls: ['./user-change-password-popup.component.scss']
})
export class UserChangePasswordPopupComponent implements OnInit {
  fGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserChangePasswordPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.fGroup = this.formBuilder.group({
      oldPasswd: ['', Validators.required],
      newPasswd: ['', Validators.required]
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
