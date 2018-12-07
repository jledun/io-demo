import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { IoUser, IoUserInterface } from '../../sdk/models';
import { IoRunTimeDatasService } from '../../lib/io-run-time-datas.service';
import { UserManagerService } from '../user-manager.service';
import { Observable, of, throwError } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-creation-card',
  templateUrl: './user-creation-card.component.html',
  styleUrls: ['./user-creation-card.component.scss']
})
export class UserCreationCardComponent implements OnInit {
  createUserForm: FormGroup;
  errorMsg: string = "";
  @ViewChild('firstName') firstNameInput: ElementRef;
  @ViewChild('LastName') lastNameInput: ElementRef;
  @ViewChild('email') emailInput: ElementRef;
  @ViewChild('passwd') passwdInput: ElementRef;
  @ViewChild('passwdConfirm') passwdConfirmInput: ElementRef;
  @ViewChild('formDirective') FD: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private userManager: UserManagerService,
    private alert: MatSnackBar
  ) { }

  ngOnInit() {
    this.createUserForm = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      passwd: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      passwdConfirm: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
    IoRunTimeDatasService.setDataLoading(false);
    setTimeout(() => this.firstNameInput.nativeElement.focus(), 100);
  }

  onSubmit() {
    if (!this.createUserForm.valid) {
      const lastname = this.createUserForm.get('lastName').valid;
      const firstname = this.createUserForm.get('firstName').valid;
      const email = this.createUserForm.get('email').valid;
      const passwd = this.createUserForm.get('passwd').valid;
      const passwdConfirm = this.createUserForm.get('passwdConfirm').valid;
      if (!lastname) return this.errorMsg = "Veuillez saisir un nom de famille.";
      if (!firstname) return this.errorMsg = "Veuillez saisir un prénom.";
      if (!email) return this.errorMsg = "Veuillez saisir un email valide.";
      if (!passwd || !passwdConfirm) {
        this.createUserForm.get('passwd').reset();
        this.createUserForm.get('passwdConfirm').reset();
      }
      if (!passwd) return this.errorMsg = "Veuillez saisir un mot de passe.";
      if (!passwdConfirm) return this.errorMsg = "Veuillez confirmer le mot de passe.";
    }
    if (this.createUserForm.get('passwd').value !== this.createUserForm.get('passwdConfirm').value) {
      this.createUserForm.get('passwd').reset();
      this.createUserForm.get('passwdConfirm').reset();
      this.passwdInput.nativeElement.focus();
      return this.errorMsg = "Les mots de passe ne concordent pas.";
    }
    const newUser: IoUserInterface = new IoUser({
      username: this.createUserForm.get('email').value.split('@')[0],
      email: this.createUserForm.get('email').value,
      realm: this.createUserForm.get('firstName').value.concat(' ', this.createUserForm.get('lastName').value),
      password: this.createUserForm.get('passwd').value,
      active: true
    });
    this.userManager.userExists(newUser.email)
      .pipe(
        concatMap(data => {
          if (data.userExists) return throwError(new Error(`L'adresse email '${newUser.email}' est déjà utilisé.`));
          return of(newUser);
        }),
        concatMap(data => {
          return this.userManager.userCreate(data);
        })
      )
      .subscribe(
        data => {
          this.firstNameInput.nativeElement.focus();
          this.createUserForm.reset();
          this.FD.resetForm();
          this.alert.open(`Utilisateur ${data.realm} enregistré`, 'Ok', {
            duration: 4000
          });
        },
        err => {
          this.createUserForm.get('passwd').reset();
          this.createUserForm.get('passwdConfirm').reset();
          this.emailInput.nativeElement.focus();
          return this.errorMsg = err.message;
        },
        () => {}
      );
    this.errorMsg = '';
  }

}
