import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApplicationParamTemplate } from '../application-param/application-param-template';

@Component({
  selector: 'app-application-param-popup',
  templateUrl: './application-param-popup.component.html',
  styleUrls: ['./application-param-popup.component.scss']
})
export class ApplicationParamPopupComponent {

  constructor(
    public dialogRef: MatDialogRef<ApplicationParamPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ApplicationParamTemplate
  ) { }

  onNoClick() {
    this.dialogRef.close();
  }

}
