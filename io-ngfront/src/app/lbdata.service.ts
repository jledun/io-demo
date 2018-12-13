import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LbdataService {
  public defaultPath: string = '/';

  constructor(
    private router: Router
  ) { }

  goToHomePage() {
    this.router.navigate([this.defaultPath]);
  }

}
