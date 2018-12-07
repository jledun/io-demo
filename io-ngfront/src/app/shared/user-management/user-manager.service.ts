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
import { Observable } from 'rxjs/Observable';

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
  getUsers() {}
  userRetrieve(id: number) {}
  userCreate(user: IoUserInterface) {}
  userUpdate(user: IoUserInterface) {}
  userDelete(user: IoUserInterface) {}
  /*
   * USER MANAGEMENT
   * */
   
}
