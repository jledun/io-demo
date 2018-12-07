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
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  constructor(
    private userManagement: IoUserApi
  ) {
    LoopBackConfig.setBaseURL( `http://${environment.lbApp.ip}` );
    LoopBackConfig.setApiVersion( environment.lbApp.api );
  }  

  /*
   * USER MANAGEMENT
   * */
  getCrtUser(): Observable<IoUserInterface> {
    return this.userManagement.getCurrent();
  }
  userLogIn(credentials: IoUserInterface, rememberMe: boolean = true) {
    return this.userManagement.login(credentials, 'user', rememberMe);
  }
  userLogOut() {
    return this.userManagement.logout();
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
  getUsers() {}
  userRetrieve(id: number) {}
  userCreate(user: IoUserInterface): Observable<IoUserInterface> {
    return this.userManagement.create(user);
  }
  userUpdate(user: IoUserInterface) {}
  userDelete(user: IoUserInterface) {}
  /*
   * USER MANAGEMENT
   * */
   
}
