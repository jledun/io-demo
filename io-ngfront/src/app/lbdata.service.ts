import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LbdataService {

  constructor(
    private router: Router
  ) { }

  goToHomePage() {
    this.router.navigate(['/']);
  }

}
