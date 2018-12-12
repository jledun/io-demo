import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-user-delete-popup',
  templateUrl: './user-delete-popup.component.html',
  styleUrls: ['./user-delete-popup.component.scss']
})
export class UserDeletePopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserDeletePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
