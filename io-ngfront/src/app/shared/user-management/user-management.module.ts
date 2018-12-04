import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';

import { 
  MatButtonModule
} from '@angular/material';

import { UserConnectionComponent } from './user-connection/user-connection.component';
import { UserCreationComponent } from './user-creation/user-creation.component';
import { UserTopbarComponent } from './user-topbar/user-topbar.component';
import { UserEditorComponent } from './user-editor/user-editor.component';

@NgModule({
  declarations: [
    UserConnectionComponent,
    UserCreationComponent,
    UserTopbarComponent,
    UserEditorComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    MatButtonModule
  ],
  exports: [
    UserConnectionComponent,
    UserCreationComponent,
    UserTopbarComponent,
    UserEditorComponent
  ]
})
export class UserManagementModule { }
