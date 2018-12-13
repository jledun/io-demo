import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent {

  constructor(
    private router: Router
  ) { }

  goBackToUsers() {
    this.router.navigate(['/settings/', {outlets: {settingsRouterOutlet: ['users']}}]);
  }

}
