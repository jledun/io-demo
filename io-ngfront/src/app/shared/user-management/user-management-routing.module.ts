import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// import { UserConnectionComponent } from './user-connection/user-connection.component';
import { UserCreationComponent } from './user-creation/user-creation.component';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { UserCheckIdentityComponent } from './user-check-identity/user-check-identity.component';
// import { UserTopbarComponent } from './components/user-topbar/user-topbar.component';

const routes: Routes = [
  {path: 'create-user', component: UserCreationComponent},
  {path: 'checkIdentity', component: UserCheckIdentityComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
