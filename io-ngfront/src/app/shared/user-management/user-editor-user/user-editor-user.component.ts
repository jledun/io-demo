import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material';
import { LoopBackFilter } from '../../sdk';
import { IoUser, IoUserInterface } from '../../sdk/models';
import { UserManagerService } from '../user-manager.service';
import { IoRunTimeDatasService, ApplicationParamTemplate } from '../../lib';
import { ApplicationParamPopupComponent } from '../../lib/application-param-popup/application-param-popup.component';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

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
    {field: 'updatedAt', title: "Dernière connexion le", editable: false, order: 4},
    {field: 'active', title: 'activer / désactiver', editable: true, subtitle: `Un utilisateur désactivé ne peux plus se connecter`, order: 5}
  ];

  constructor(
    private userManager: UserManagerService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
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

  refresh() {
    IoRunTimeDatasService.setDataLoading(true);
    const propertiesDef = this.userManager.getModelDescription().properties;
    this.getUser.pipe(
      map(userData => this.user = {...userData}),
      map(
        userData => Object.keys(userData).map(
          key => Object.assign(
            {}, 
            propertiesDef[key],
            {field: key, value: userData[key]},
            this._paramsToEdit.find(param => param.field === key)
          )
        ).filter(
          toEdit => this._paramsToEdit.findIndex(param => param.field === toEdit.field) >= 0
        ).sort((a, b) => a.order - b.order)
      )
    ).subscribe(
      (data: Array<any>) => {
        this.paramsToEdit = [].concat(data);
        IoRunTimeDatasService.setDataLoading(false);
      },
      err => {
        console.log(err);
        IoRunTimeDatasService.setDataLoading(false);
      },
      () => {}
    );
  }

  paramClick(param: ApplicationParamTemplate): void {
    if (!param.field) return;
    const editDialog = this.dialog.open(ApplicationParamPopupComponent, {
      data: {...param},
      minWidth: "600px"
    });

    editDialog.afterClosed().subscribe(
      data => console.log(data)
    );
  }

  paramChange(event): void {
    console.log('change', event);
  }

  goBackToUsers() {
    this.router.navigate(['/settings/', {outlets: {settingsRouterOutlet: ['users']}}]);
  }

}
