import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IoUser, IoUserInterface } from '../../sdk/models';
import { UserManagerService } from '../user-manager.service';
import { IoRunTimeDatasService } from '../../lib/io-run-time-datas.service';
import { concatMap } from 'rxjs/operators';

interface message {
  title?: string
  errorCode?: number 
  message?: string
}

@Component({
  selector: 'app-user-check-identity',
  templateUrl: './user-check-identity.component.html',
  styleUrls: ['./user-check-identity.component.scss']
})
export class UserCheckIdentityComponent implements OnInit {
  successMessage: message = {
    title: 'Ok',
    errorCode: 0,
    message: ''
  }
  errorMessage: message = {
    title: '',
    errorCode: 0,
    message: ''
  };

  constructor(
    private userManager: UserManagerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    IoRunTimeDatasService.setDataLoading(true);
    this.route.queryParamMap
      .pipe(
        concatMap(params => this.userManager.userConfirmIdentity(Number(params.get('uid')), params.get('token')))
      ).subscribe(
      confirmResult => {
        console.log(confirmResult);
        IoRunTimeDatasService.setDataLoading(false);
      },
      err => {
        this.errorMessage = {
          title: err.code,
          errorCode: Number(err.statusCode),
          message: err.message
        }
        IoRunTimeDatasService.setDataLoading(false);
      },
      () => {}
    );
  }

}
