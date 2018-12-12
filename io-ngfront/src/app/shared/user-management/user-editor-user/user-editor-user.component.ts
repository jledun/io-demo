import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { LoopBackFilter } from '../../sdk';
import { IoUser, IoUserInterface } from '../../sdk/models';
import { UserManagerService } from '../user-manager.service';
import { IoRunTimeDatasService, ApplicationParamTemplate } from '../../lib';
import { ApplicationParamPopupComponent } from '../../lib/application-param-popup/application-param-popup.component';
import { UserChangePasswordPopupComponent } from '../user-change-password-popup/user-change-password-popup.component';
import { UserDeletePopupComponent } from '../user-delete-popup/user-delete-popup.component';
import { Observable, of } from 'rxjs';
import { switchMap, map, concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-editor-user',
  templateUrl: './user-editor-user.component.html',
  styleUrls: ['./user-editor-user.component.scss']
})
export class UserEditorUserComponent implements OnInit {
  user: IoUserInterface = new IoUser();
  getUser: Observable<IoUserInterface>;

  paramsToEdit: Array<ApplicationParamTemplate> = [];
  _paramsToEdit: Array<ApplicationParamTemplate> = [
    {field: 'realName', title: 'Nom complet', editable: false, link: true, order: 0}, 
    {field: 'username', title: "Nom d'utilisateur", editable: false, subtitle: "Identifiant de connexion", order: 1}, 
    {field: 'email', title: "Adresse email", editable: false, link: true, order: 2}, 
    {field: 'createdAt', title: "Crée le", editable: false, order: 3}, 
    {field: 'updatedAt', title: "Modifié le", editable: false, order: 4}, 
    {field: 'lastConnection', title: "Dernière connexion le", editable: false, order: 5},
    {field: 'active', title: 'activer / désactiver', editable: true, subtitle: `Un utilisateur désactivé ne peux plus se connecter`, order: 6}
  ];
  passwdChangeParams: ApplicationParamTemplate = {field: 'passwordChange', title: 'Changer le mot de passe', link: true, editable: false};
  deleteUserParam: ApplicationParamTemplate = {field: 'deleteUser', title: "supprimer l'utilisateur", link: true, editable: false};

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
    this.refresh();
    const propertiesDef = this.userManager.getModelDescription().properties;
    this.paramsToEdit.forEach(param => {
      param = Object.assign({}, param, propertiesDef[param.field]);
    });
  }

  passwdChangeClick() {
    const passwdDialog = this.dialog.open(UserChangePasswordPopupComponent, {
      data: {...this.user},
      minWidth: "600px"
    });

    passwdDialog.afterClosed().subscribe(data => console.log(data));
  }
  deleteUserClick() {
    const deleteDialog = this.dialog.open(UserDeletePopupComponent, {
      data: {...this.user},
      minWidth: "600px"
    });

    deleteDialog.afterClosed().subscribe(data => console.log(data));
  }

  refreshSequence(): Observable<any> {
    const propertiesDef = this.userManager.getModelDescription().properties;
    return this.getUser.pipe(
      map(userData => this.user = {...userData}),
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
      ), map(
        paramsToEdit => this.paramsToEdit = [].concat(paramsToEdit)
      )
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
      concatMap((data: ApplicationParamTemplate): Observable<any> => this.refreshSequence()),
      map(data => {
        this.userManager.getCrtUser();
        return data;
      })
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

  goBackToUsers() {
    this.router.navigate(['/settings/', {outlets: {settingsRouterOutlet: ['users']}}]);
  }

}
