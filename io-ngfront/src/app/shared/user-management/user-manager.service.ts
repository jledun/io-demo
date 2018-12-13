import { Injectable } from '@angular/core';
import { LoopBackFilter } from '../sdk';
import {
  IoUser,
  IoUserInterface
} from '../sdk/models';
import { 
  IoUserApi
} from '../sdk/services';
import { LbdataService } from '../../lbdata.service';
import { Observable, throwError, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {
  _crtUser: IoUserInterface = new IoUser();

  constructor(
    private userManagement: IoUserApi,
    private appService: LbdataService
  ) { }  

  /*
   * USER MANAGEMENT
   * */
  getModelDescription(): any {
    return IoUser.getModelDefinition();
  }
  public crtUser: Subject<IoUserInterface> = new Subject();
  refreshCrtUser(): void {
    this.userManagement.getCurrent().subscribe(
      (user: IoUserInterface) => {
        this._crtUser = {...user};
        this.crtUser.next(this._crtUser);
      },
      err => {
        this._crtUser = new IoUser();
        this.crtUser.next(this._crtUser);
      }, () => {}
    );
  }
  userLogIn(credentials: IoUserInterface, rememberMe: boolean = true) {
    return this.userManagement.login(credentials, 'user', rememberMe);
  }
  userLogOut() {
    return this.userManagement.logout().pipe(
      map(data => this.appService.goToHomePage())
    );
  }
  userExists(searchUser: string = null): Observable<any> {
    let username: string = '';
    let email: string = '';
    if (!searchUser) return throwError(new Error('Vous devez saisir un paramètre de recherche'));
    if (searchUser.indexOf('@') > 0) {
      email = searchUser;
    }else{
      username = searchUser;
    }
    return this.userManagement.userExists(username, email);
  }
  getUsers(filter: LoopBackFilter = {}): Observable<IoUserInterface[]> {
    return this.userManagement.find(filter);
  }
  userRetrieve(id: number): Observable<IoUserInterface> {
    return this.userManagement.findById(id);
  }
  userCreate(user: IoUserInterface): Observable<IoUserInterface> {
    return this.userManagement.create(user);
  }
  userConfirmIdentity(id: number = 0, token: string = ''): Observable<any> {
    return this.userManagement.confirm(id, token, null);
  }
  userUpdate(where: any = {}, field: any = {}): Observable<{count: 'number'}> {
    return this.userManagement.updateAll(where, field);
  }
  userDelete(user: IoUserInterface): Observable<IoUserInterface> {
    return this.userManagement.deleteById(user.id);
  }
  changePassword(oldPass: string = '', newPass: string = ''): Observable<any> {
    return this.userManagement.changePassword(oldPass, newPass);
  }
  /*
   * USER MANAGEMENT
   * */
   
}
