import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoopBackFilter } from '../../sdk';
import { IoUser, IoUserInterface } from '../../sdk/models';
import { UserManagerService } from '../user-manager.service';
import { IoRunTimeDatasService, ApplicationParamTemplate } from '../../lib';
import { ApplicationParamPopupComponent } from '../../lib/application-param-popup/application-param-popup.component';
import { UserChangePasswordPopupComponent } from '../user-change-password-popup/user-change-password-popup.component';
import { UserDeletePopupComponent } from '../user-delete-popup/user-delete-popup.component';
import { Observable, of, throwError } from 'rxjs';
import { switchMap, map, concatMap } from 'rxjs/operators';

interface passwdChangeInterface {
  oldPasswd: string
  newPasswd: string
}

@Component({
  selector: 'app-user-editor-user',
  templateUrl: './user-editor-user.component.html',
  styleUrls: ['./user-editor-user.component.scss']
})
export class UserEditorUserComponent implements OnInit {
  user: IoUserInterface = new IoUser();
  connectedUser: IoUserInterface = new IoUser();
  getUser: Observable<IoUserInterface>;

  paramsToEdit: Array<ApplicationParamTemplate> = [];
  _paramsToEdit: Array<ApplicationParamTemplate> = [
    {
      field: 'realName', 
      title: 'Nom complet', 
      editable: false, 
      link: true, 
      order: 0
    }, {
      field: 'username', 
      title: "Nom d'utilisateur", 
      editable: false, 
      subtitle: "Identifiant de connexion", 
      order: 1
    }, {
      field: 'email', 
      title: "Adresse email", 
      editable: false, 
      link: true, 
      order: 2
    }, {
      field: 'createdAt', 
      title: "Crée le", 
      editable: false, 
      order: 3
    }, {
      field: 'updatedAt', 
      title: "Modifié le", 
      editable: false, 
      order: 4
    }, {
      field: 'lastConnection', 
      title: "Dernière connexion le", 
      editable: false, 
      order: 5
    }, {
      field: 'active', 
      title: 'activer / désactiver', 
      editable: true, 
      subtitle: `Un utilisateur désactivé ne peux plus se connecter`, 
      order: 6
    }
  ];
  passwdChangeParams: ApplicationParamTemplate = {
    field: 'passwordChange', 
    title: 'Changer le mot de passe', 
    link: true, 
    editable: false
  };
  deleteUserParam: ApplicationParamTemplate = {
    field: 'deleteUser', 
    title: "supprimer l'utilisateur", 
    link: true, 
    tooltip: `La suppression d'un utilisateur est définitive.`,
    editable: false
  };

  constructor(
    private userManager: UserManagerService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getUser = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.userManager.userRetrieve(Number(params.get('id'))))
    );
    this.userManager.crtUser.subscribe(crtUser => {
      // backup connected user informations
      this.connectedUser = crtUser;
      // set options for change password button
      this.setPasswdChangeDisableStatus();
    });
    this.refresh();
  }

  refreshSequence(): Observable<any> {
    const propertiesDef = this.userManager.getModelDescription().properties;
    return this.getUser.pipe(
      // backup displayed user informations
      map(userData => this.user = {...userData}),
      // create parameters for application param list
      map(userData => Object.keys(userData)
        .map(
          key => Object.assign(
            {}, 
            propertiesDef[key],
            {field: key, value: userData[key]},
            this._paramsToEdit.find(param => param.field === key)
          )
        ).filter(
          toEdit => this._paramsToEdit.findIndex(param => param.field === toEdit.field) >= 0
        ).sort((a, b) => a.order - b.order)
      ), 
      // backup parameters for application param list
      map(
        paramsToEdit => this.paramsToEdit = [].concat(paramsToEdit)
      ),
      // refresh connected user info
      map(params => {
        this.userManager.refreshCrtUser();
        return params;
      })
    );
  }
  refresh(): void {
    IoRunTimeDatasService.setDataLoading(true);
    this.refreshSequence().subscribe(
      (data: Array<any>) => {
        IoRunTimeDatasService.setDataLoading(false);
      },
      err => {
        console.log(err);
        IoRunTimeDatasService.setDataLoading(false);
      },
      () => {}
    );
  }
  updateFieldSequence(data: ApplicationParamTemplate): Observable<any> {
    return of(data).pipe(
      concatMap((data: ApplicationParamTemplate): Observable<any> => {
        if (!data) return of(data);
        const where = {uuid: this.user.uuid};
        const toUpdate = {[data.field]: data.value};
        return this.userManager.userUpdate(where, toUpdate);
      }),
      map((data: any): any => {
        if (!data) return of(data);
        this.snackBar.open(`${data.count} ligne(s) mises à jour.`, 'Ok', {
          duration: 3000
        });
        return data;
      }),
      concatMap((data: ApplicationParamTemplate): Observable<any> => this.refreshSequence())
    );
  }

  paramClick(param: ApplicationParamTemplate): void {
    if (!param.field) return;
    const editDialog = this.dialog.open(ApplicationParamPopupComponent, {
      data: {...param},
      minWidth: "600px"
    });

    editDialog.afterClosed()
    .pipe(
      map((data: ApplicationParamTemplate): ApplicationParamTemplate => {
        if (!data || !data.hasOwnProperty('value') || data.value === param.value) return null;
        IoRunTimeDatasService.setDataLoading(true);
        return data;
      }),
      concatMap((data: ApplicationParamTemplate): Observable<any> => this.updateFieldSequence(data))
    ).subscribe(
      data => IoRunTimeDatasService.setDataLoading(false),
      err => {
        this.snackBar.open(`${err.message}.`, 'Ok', {
          duration: 3000
        });
        console.log(err);
        IoRunTimeDatasService.setDataLoading(false);
      },
      () => {}
    );
  }

  paramChange(data: ApplicationParamTemplate): void {
    if (data.value === this.user[data.field]) return;
    IoRunTimeDatasService.setDataLoading(true);
    this.updateFieldSequence(data).subscribe(
      data => IoRunTimeDatasService.setDataLoading(false),
      err => {
        this.snackBar.open(`${err.message}.`, 'Ok', {
          duration: 3000
        });
        console.log(err);
        IoRunTimeDatasService.setDataLoading(false);
      },
      () => {}
    );
  }

  setPasswdChangeDisableStatus() {
    this.passwdChangeParams.linkDisable = this.user.uuid !== this.connectedUser.uuid;
    this.passwdChangeParams.tooltip = 
      (this.passwdChangeParams.linkDisable) ? 
      `Seul l'utilisateur connecté peut changer son mot de passe.` :
      `Changer le mot de passe de l'utilisateur connecté.`;
  }
  changePassWdSequence(data: passwdChangeInterface): Observable<any> {
    return of(data).pipe(
      concatMap((data: passwdChangeInterface) => {
        // contrôle des données de paramétrage
        if (!data) return throwError(new Error(`Données incomplètes`));
        if (!data.hasOwnProperty('oldPasswd') || !data.hasOwnProperty('newPasswd'))
          return throwError(new Error(`Vous devez renseigner l'ancien et le nouveau mot de passe`));
        if (data.oldPasswd.length <= 0 || data.newPasswd.length <= 0)
          return throwError(new Error(`Données incomplète, au moins un champ est vide`));
        if (data.oldPasswd === data.newPasswd)
          return throwError(new Error(`Les anciens et nouveaux mot de passe sont identiques`));
        return of(data);
      }),
      concatMap(
        (data: passwdChangeInterface) => this.userManager.changePassword(data.oldPasswd, data.newPasswd)
      ),
      concatMap((data: any) => this.refreshSequence())
    );
  }
  passwdChangeClick() {
    const passwdDialog = this.dialog.open(UserChangePasswordPopupComponent, {
      data: {...this.user},
      minWidth: "600px"
    });

    passwdDialog.afterClosed().pipe(
      concatMap((data: passwdChangeInterface) => (data) ? this.changePassWdSequence(data) : of(null))
    ).subscribe(data => {
      if (data) {
        this.snackBar.open(`Mot de passe mis à jour.`, 'Ok', {
          duration: 3000
        });
        IoRunTimeDatasService.setDataLoading(false);
      }
    }, err => {
      this.snackBar.open(`Abandon : ${err.message}. Veuillez recommencer.`, 'Ok', {
        duration: 4000
      });
      IoRunTimeDatasService.setDataLoading(false);
    }, () => {});
  }
  deleteUserSequence(data: IoUserInterface): Observable<any> {
    return of(data).pipe(
      concatMap((data: IoUserInterface): Observable<IoUserInterface> => {
        if (!data.id) return throwError(new Error(`id utilisateur non renseigné`));
        return of(data);
      }),
      concatMap((data: IoUserInterface): Observable<IoUserInterface> => this.userManager.userDelete(data))
    );
  }
  deleteUserClick() {
    const deleteDialog = this.dialog.open(UserDeletePopupComponent, {
      data: {...this.user},
      minWidth: "600px"
    });

    deleteDialog.afterClosed().pipe(
      concatMap((data: IoUserInterface): Observable<IoUserInterface> => 
        (data) ? this.deleteUserSequence(data) : of(null)
      )
    ).subscribe(data => {
      if (data) {
        this.snackBar.open(`Utilisateur supprimé.`, 'Ok', {
          duration: 3000
        });
        IoRunTimeDatasService.setDataLoading(false);
        this.router.navigate(['/settings/', {outlets: {settingsRouterOutlet: ['users']}}]);
      }
    }, err => {
      this.snackBar.open(`Abandon : ${err.message}. Veuillez recommencer.`, 'Ok', {
        duration: 4000
      });
      IoRunTimeDatasService.setDataLoading(false);
    }, () => {});
  }

  goBackToUsers() {
    this.router.navigate(['/settings/', {outlets: {settingsRouterOutlet: ['users']}}]);
  }

}
