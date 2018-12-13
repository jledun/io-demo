import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApplicationParamTemplate } from '../../lib';

@Component({
  selector: 'app-user-delete-popup',
  templateUrl: './user-delete-popup.component.html',
  styleUrls: ['./user-delete-popup.component.scss']
})
export class UserDeletePopupComponent implements OnInit {
  confirmation: number = -1;
  deleteUserParam: ApplicationParamTemplate = {
    field: 'deleteUser', 
    title: `La suppression d'un utilisateur est définitive.`
  };
  refreshParams() {
    this.deleteUserParam = {
      field: 'deleteUser', 
      title: `La suppression d'un utilisateur est définitive.`,
      tooltip: `La suppression d'un utilisateur est définitive.`,
      editable: true,
      choicesPlaceHolder: "Confirmation",
      choices: [
        {viewValue: 'Non', value: 0},
        {viewValue: 'Oui', value: 1}
      ]
    };
  }

  constructor(
    public dialogRef: MatDialogRef<UserDeletePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.refreshParams();
  }

  deleteConfirmation(value) {
    this.confirmation = value;
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
