import { Injectable } from '@angular/core';
import { LoopBackConfig, LoopBackAuth, LoopBackFilter } from '../sdk';
import {
  IoUser,
  IoUserInterface
} from '../sdk/models';
import { 
  IoUserApi
} from '../sdk/services';
import { environment } from '../../../environments/environment';
import { LbdataService } from '../../lbdata.service';
import { Observable, throwError, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  constructor(
    private userManagement: IoUserApi,
    private appService: LbdataService
  ) {
    LoopBackConfig.setBaseURL( `http://${environment.lbApp.ip}` );
    LoopBackConfig.setApiVersion( environment.lbApp.api );
    LoopBackConfig.whereOnUrl();
  }  

  /*
   * USER MANAGEMENT
   * */
  getModelDescription(): any {
    return IoUser.getModelDefinition();
  }
  public crtUser: Subject<IoUserInterface> = new Subject();
  getCrtUser(): void {
    this.userManagement.getCurrent().subscribe((user: IoUserInterface) => this.crtUser.next(user));
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
  userDelete(user: IoUserInterface) {}
  /*
   * USER MANAGEMENT
   * */
   
}
