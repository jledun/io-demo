import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApplicationParamTemplate } from '../application-param/application-param-template';

@Component({
  selector: 'app-application-param-popup',
  templateUrl: './application-param-popup.component.html',
  styleUrls: ['./application-param-popup.component.scss']
})
export class ApplicationParamPopupComponent implements OnInit {
  fieldCtrl: FormControl;

  constructor(
    public dialogRef: MatDialogRef<ApplicationParamPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ApplicationParamTemplate
  ) { }

  ngOnInit() {
    switch(this.data.field) {
      case "email":
        this.fieldCtrl = new FormControl(this.data.value,
          Validators.compose([
            Validators.required,
            Validators.email
          ])
        );
        break;

      default:
        this.fieldCtrl = new FormControl(this.data.value, Validators.required);
        break;
    }
    this.fieldCtrl.valueChanges.subscribe(
      data => {
        if (this.fieldCtrl.valid) this.data.value = data;
      }
    );
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
